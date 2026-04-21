// Supabase sync layer for cross-device data persistence
// Falls back gracefully to localStorage when not logged in or offline

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env?.VITE_SUPABASE_ANON_KEY || ''

let supabase = null
let syncEnabled = false

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    syncEnabled = true
    console.log('[Sync] Supabase initialized')
  } catch (e) {
    console.warn('[Sync] Supabase init failed:', e)
  }
}

// ---------- Auth ----------

export async function getCurrentUser() {
  if (!supabase) return null
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) return null
  return user
}

export async function signInWithEmail(email) {
  if (!supabase) return { error: new Error('云端同步服务暂未配置，不登录不影响正常使用') }
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: window.location.origin }
  })
  return { error }
}

export async function signInWithOAuth(provider) {
  if (!supabase) return { error: new Error('云端同步服务暂未配置，不登录不影响正常使用') }
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: window.location.origin }
  })
  return { error }
}

export async function signOut() {
  if (!supabase) return { error: new Error('云端同步服务暂未配置') }
  const { error } = await supabase.auth.signOut()
  return { error }
}

export function onAuthStateChange(callback) {
  if (!supabase) return { subscription: { unsubscribe: () => {} } }
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session?.user || null)
  })
}

// ---------- Cloud Storage ----------

export async function syncToCloud(table, payload) {
  if (!supabase || !syncEnabled) return false
  const user = await getCurrentUser()
  if (!user) return false
  const { error } = await supabase
    .from(table)
    .upsert({ user_id: user.id, ...payload, updated_at: new Date().toISOString() }, { onConflict: 'user_id' })
  if (error) {
    console.warn('[Sync] upsert failed:', error)
    return false
  }
  return true
}

export async function loadFromCloud(table) {
  if (!supabase || !syncEnabled) return null
  const user = await getCurrentUser()
  if (!user) return null
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('user_id', user.id)
    .single()
  if (error) {
    if (error.code !== 'PGRST116') console.warn('[Sync] load failed:', error)
    return null
  }
  return data
}

// ---------- Merge Helpers ----------

export async function mergeLocalToCloud() {
  // Trading account
  const localTrading = localStorage.getItem('zfinance_trading')
  if (localTrading) {
    try {
      const account = JSON.parse(localTrading)
      await syncToCloud('trading_accounts', {
        cash: account.cash,
        positions: account.positions,
        history: account.history,
        asset_curve: account.assetCurve || account.asset_curve || []
      })
    } catch (e) { console.warn('[Sync] merge trading failed:', e) }
  }

  // Learning progress
  const localLearning = localStorage.getItem('zfinance_learning_v2')
  if (localLearning) {
    try {
      const progress = JSON.parse(localLearning)
      for (const path of ['stock', 'fund']) {
        const p = progress[path]
        if (p) {
          await syncToCloud('learning_progress', {
            path_type: path,
            current_level: p.currentLevel || 1,
            completed_lessons: p.completedLessons || [],
            quiz_scores: p.quizScores || {}
          })
        }
      }
    } catch (e) { console.warn('[Sync] merge learning failed:', e) }
  }

  // Settings
  const onboarding = localStorage.getItem('zfinance_onboarding')
  if (onboarding) {
    await syncToCloud('user_settings', { onboarding_seen: true })
  }
}

export async function restoreFromCloud() {
  // Trading
  const cloudTrading = await loadFromCloud('trading_accounts')
  if (cloudTrading) {
    const account = {
      cash: cloudTrading.cash,
      positions: cloudTrading.positions || [],
      history: cloudTrading.history || [],
      assetCurve: cloudTrading.asset_curve || cloudTrading.assetCurve || []
    }
    localStorage.setItem('zfinance_trading', JSON.stringify(account))
  }

  // Learning
  for (const path of ['stock', 'fund']) {
    const cloudLearning = await loadFromCloud('learning_progress')
    // Note: learning_progress table doesn't filter by path_type in loadFromCloud.
    // We need to load both records. For simplicity we query all and merge.
  }

  // Better approach: load all learning records at once
  const user = await getCurrentUser()
  if (user) {
    const { data: learnings } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', user.id)
    if (learnings && learnings.length) {
      const localProgress = JSON.parse(localStorage.getItem('zfinance_learning_v2') || '{}')
      for (const row of learnings) {
        localProgress[row.path_type] = {
          currentLevel: row.current_level,
          completedLessons: row.completed_lessons || [],
          quizScores: row.quiz_scores || {}
        }
      }
      localStorage.setItem('zfinance_learning_v2', JSON.stringify(localProgress))
    }
  }

  // Settings
  const cloudSettings = await loadFromCloud('user_settings')
  if (cloudSettings && cloudSettings.onboarding_seen) {
    localStorage.setItem('zfinance_onboarding', '1')
  }
}

// ---------- Auto-sync wrappers ----------

export function autoSyncTrading(account) {
  localStorage.setItem('zfinance_trading', JSON.stringify(account))
  if (syncEnabled) {
    syncToCloud('trading_accounts', {
      cash: account.cash,
      positions: account.positions,
      history: account.history,
      asset_curve: account.assetCurve || account.asset_curve || []
    })
  }
}

export function autoSyncLearning(progress) {
  localStorage.setItem('zfinance_learning_v2', JSON.stringify(progress))
  if (syncEnabled) {
    for (const path of ['stock', 'fund']) {
      const p = progress[path]
      if (p) {
        syncToCloud('learning_progress', {
          path_type: path,
          current_level: p.currentLevel || 1,
          completed_lessons: p.completedLessons || [],
          quiz_scores: p.quizScores || {}
        })
      }
    }
  }
}

export function autoSyncOnboarding() {
  localStorage.setItem('zfinance_onboarding', '1')
  if (syncEnabled) {
    syncToCloud('user_settings', { onboarding_seen: true })
  }
}
