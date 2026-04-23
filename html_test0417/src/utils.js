// Shared utilities for Zane Finance

export function formatNumber(n, digits = 2) {
  return Number(n).toLocaleString('zh-CN', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

export function debounce(fn, ms) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export function throttle(fn, ms) {
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now - last >= ms) {
      last = now
      fn(...args)
    }
  }
}

export function isMarketOpen() {
  const now = new Date()
  const shTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }))
  const day = shTime.getDay()
  if (day === 0 || day === 6) return false
  const hours = shTime.getHours()
  const minutes = shTime.getMinutes()
  const time = hours * 60 + minutes
  // 9:30-11:30 (570-690), 13:00-15:00 (780-900)
  return (time >= 570 && time <= 690) || (time >= 780 && time <= 900)
}
