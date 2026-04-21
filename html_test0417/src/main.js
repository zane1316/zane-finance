// Zane Finance v8 - Vite entry point
// Imports charting libraries and exposes them globally for legacy scripts

import * as LightweightCharts from 'lightweight-charts'
import * as echarts from 'echarts'
import {
  getCurrentUser,
  signInWithEmail,
  signInWithOAuth,
  signOut,
  onAuthStateChange,
  mergeLocalToCloud,
  restoreFromCloud,
  autoSyncTrading,
  autoSyncLearning,
  autoSyncOnboarding,
  getSupabaseStatus
} from './sync.js'

window.LightweightCharts = LightweightCharts
window.echarts = echarts
window.autoSyncTrading = autoSyncTrading
window.autoSyncLearning = autoSyncLearning
window.autoSyncOnboarding = autoSyncOnboarding

// ---------- Auth UI ----------

function initAuthUI() {
  const authBtn = document.getElementById('auth-btn')
  const authModal = document.getElementById('auth-modal')
  const authClose = document.getElementById('auth-close')
  const authForm = document.getElementById('auth-form')
  const authEmail = document.getElementById('auth-email')
  const authMsg = document.getElementById('auth-message')
  const authLogout = document.getElementById('auth-logout')
  const authGithub = document.getElementById('auth-github')
  const authDivider = authModal?.querySelector('.relative.my-4') // the "or" divider

  if (!authBtn || !authModal) return

  // Check Supabase provider status
  const { status: sbStatus, providers } = getSupabaseStatus()
  const githubAvailable = providers.github === true
  const emailAvailable = providers.email === true && sbStatus === 'ready'
  const supabaseReady = sbStatus === 'ready'

  // Hide GitHub button if not configured
  if (authGithub && !githubAvailable) {
    authGithub.style.display = 'none'
    if (authDivider) authDivider.style.display = 'none'
  }

  // Show Supabase connection status in modal
  const statusEl = document.createElement('div')
  statusEl.id = 'auth-status-bar'
  statusEl.className = 'mb-3 text-xs px-3 py-2 rounded-lg'
  if (!supabaseReady) {
    statusEl.className += ' bg-amber-50 text-amber-700'
    statusEl.textContent = '云端同步服务暂时不可用，所有功能仍可正常使用，数据保存在本地浏览器。'
    if (authForm) authForm.style.display = 'none'
    if (authGithub && githubAvailable) authGithub.style.display = 'none'
    if (authDivider) authDivider.style.display = 'none'
  } else if (!emailAvailable) {
    statusEl.className += ' bg-amber-50 text-amber-700'
    statusEl.textContent = '邮箱登录暂时不可用（发送限制），请稍后重试或使用其他方式。'
    if (authForm) authForm.style.display = 'none'
  } else {
    statusEl.className += ' bg-green-50 text-green-700'
    statusEl.textContent = '云端同步服务正常，登录后数据自动同步。'
  }
  const modalContent = authModal.querySelector('.bg-white')
  if (modalContent) {
    const existing = modalContent.querySelector('#auth-status-bar')
    if (existing) existing.remove()
    const desc = modalContent.querySelector('p.text-gray-500')
    if (desc) desc.after(statusEl)
  }

  function updateAuthButton(user) {
    if (user) {
      const name = user.email ? user.email.split('@')[0] : '用户'
      authBtn.innerHTML = `
        <span class="w-7 h-7 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">${name.charAt(0).toUpperCase()}</span>
        <span class="hidden md:inline text-sm text-gray-700">${name}</span>
      `
      authBtn.className = 'flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-blue-50 transition'
      if (authLogout) authLogout.classList.remove('hidden')
      if (authForm) authForm.classList.add('hidden')
      if (authGithub) authGithub.classList.add('hidden')
      if (authDivider) authDivider.classList.add('hidden')
      if (authMsg) {
        authMsg.innerHTML = '<span class="text-green-600">已登录，数据将自动同步到云端</span>'
        authMsg.classList.remove('hidden')
      }
    } else {
      authBtn.innerHTML = '<span class="text-sm text-gray-600 hover:text-primary transition">登录 / 注册</span>'
      authBtn.className = 'px-3 py-1.5 rounded-xl hover:bg-blue-50 transition'
      if (authLogout) authLogout.classList.add('hidden')
      if (authMsg) authMsg.classList.add('hidden')
      // Restore form visibility based on availability
      if (authForm) authForm.style.display = emailAvailable ? '' : 'none'
      if (authGithub) authGithub.style.display = githubAvailable ? '' : 'none'
      if (authDivider) authDivider.style.display = (emailAvailable && githubAvailable) ? '' : 'none'
    }
  }

  authBtn.addEventListener('click', () => {
    authModal.classList.remove('hidden')
  })

  if (authClose) {
    authClose.addEventListener('click', () => {
      authModal.classList.add('hidden')
    })
  }

  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) authModal.classList.add('hidden')
    })
  }

  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const email = authEmail.value.trim()
      if (!email) return
      authMsg.innerHTML = '<span class="text-primary">正在发送登录链接...</span>'
      authMsg.classList.remove('hidden')
      const { error } = await signInWithEmail(email)
      if (error) {
        let msg = error.message
        if (msg.includes('Database error saving new user')) {
          msg = '服务器注册新用户失败，可能是达到用户数量上限或数据库配置问题。建议稍后重试或联系管理员检查 Supabase 控制台。'
        } else if (msg.includes('rate limit') || msg.includes('429')) {
          msg = '发送次数过于频繁，请稍后再试。'
        } else if (msg.includes('Email rate limit exceeded')) {
          msg = '邮箱发送次数达到上限，请 1 小时后再试。'
        }
        authMsg.innerHTML = `<span class="text-amber-600">${msg}</span>`
      } else {
        authMsg.innerHTML = '<span class="text-green-600">登录链接已发送到邮箱，请查收后点击链接完成登录</span>'
        authEmail.value = ''
      }
    })
  }

  if (authGithub) {
    authGithub.addEventListener('click', async () => {
      authMsg.innerHTML = '<span class="text-primary">正在跳转 GitHub 授权页面...</span>'
      authMsg.classList.remove('hidden')
      const { error } = await signInWithOAuth('github')
      if (error) {
        let msg = error.message
        if (msg.includes('provider is not enabled') || msg.includes('400')) {
          msg = 'GitHub 登录暂未启用，请使用邮箱登录或联系管理员开启。'
        }
        authMsg.innerHTML = `<span class="text-amber-600">${msg}</span>`
        authMsg.classList.remove('hidden')
      }
    })
  }

  if (authLogout) {
    authLogout.addEventListener('click', async () => {
      await signOut()
      authModal.classList.add('hidden')
    })
  }

  // Listen for auth state changes
  onAuthStateChange(async (event, user) => {
    updateAuthButton(user)
    if (user) {
      // User just logged in: merge local to cloud, then restore
      if (event === 'SIGNED_IN') {
        await mergeLocalToCloud()
        await restoreFromCloud()
        // Reload page to pick up restored data
        window.location.reload()
      }
    }
  })

  // Initial check
  getCurrentUser().then(user => updateAuthButton(user))
}

// Initialize auth UI after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuthUI)
} else {
  initAuthUI()
}

console.log('[Zane Finance v8] Chart libraries loaded via Vite')
