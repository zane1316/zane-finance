// SPA Router & Common Utilities
const sections = ['home','market','learning','kline','ai','trading','calculator','resources','contact'];

function showSection(id) {
  sections.forEach(s => {
    const el = document.getElementById(s);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById(id);
  if (target) {
    target.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update nav active states
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
  });
  // Close mobile menu
  document.getElementById('mobile-menu').classList.add('hidden');
  // Trigger section init
  if (id === 'market') initMarket();
  if (id === 'learning') { renderLevelList(); renderLevelContent(); }
  if (id === 'kline') initKlineGallery();
  if (id === 'trading') updateTradingUI();
  if (id === 'calculator') initCalculator();
  if (id === 'resources') renderResources();
}

function handleRoute() {
  const hash = window.location.hash.replace('#','') || 'home';
  if (sections.includes(hash)) showSection(hash);
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
  handleRoute();
  initAPI();
  initLearningProgress();
  initTrading();
  // Onboarding
  if (!localStorage.getItem('zfinance_onboarding')) {
    setTimeout(() => document.getElementById('onboarding').classList.remove('hidden'), 800);
  }
});

document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

function closeOnboarding() {
  document.getElementById('onboarding').classList.add('hidden');
  localStorage.setItem('zfinance_onboarding', '1');
}

function formatNumber(n, digits=2) {
  return Number(n).toLocaleString('zh-CN', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function submitFeedback(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const msg = document.getElementById('contact-message').value;
  localStorage.setItem('zfinance_feedback_' + Date.now(), JSON.stringify({name,email,msg,time:new Date().toISOString()}));
  alert('反馈已提交，感谢您的建议！');
  e.target.reset();
}
