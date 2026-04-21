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
  autoSyncOnboarding
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

  if (!authBtn || !authModal) return

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
      if (authMsg) {
        authMsg.innerHTML = '<span class="text-green-600">已登录，数据将自动同步到云端</span>'
        authMsg.classList.remove('hidden')
      }
    } else {
      authBtn.innerHTML = '<span class="text-sm text-gray-600 hover:text-primary transition">登录 / 注册</span>'
      authBtn.className = 'px-3 py-1.5 rounded-xl hover:bg-blue-50 transition'
      if (authLogout) authLogout.classList.add('hidden')
      if (authForm) authForm.classList.remove('hidden')
      if (authMsg) authMsg.classList.add('hidden')
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
        authMsg.innerHTML = `<span class="text-red-500">发送失败: ${error.message}</span>`
      } else {
        authMsg.innerHTML = '<span class="text-green-600">登录链接已发送到邮箱，请查收后点击链接完成登录</span>'
        authEmail.value = ''
      }
    })
  }

  if (authGithub) {
    authGithub.addEventListener('click', async () => {
      const { error } = await signInWithOAuth('github')
      if (error) {
        authMsg.innerHTML = `<span class="text-red-500">登录失败: ${error.message}</span>`
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
