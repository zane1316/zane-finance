// SPA Router & Common Utilities
const sections = ['home','market','funds','learning','kline','ai','trading','calculator','news','glossary','resources','contact'];

// Lazy-load large data modules on first section visit
const lazyModules = {
  'market':  () => loadScript('./js/all-stocks.js'),
  'funds':   () => loadScript('./js/all-funds.js'),
  'learning':() => loadScript('./js/learning.js')
};
const loadedModules = new Set();

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.defer = true;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Failed to load ' + src));
    document.body.appendChild(s);
  });
}

async function ensureLazyModule(sectionId) {
  if (lazyModules[sectionId] && !loadedModules.has(sectionId)) {
    loadedModules.add(sectionId);
    await lazyModules[sectionId]();
  }
}

const pageMeta = {
  home: { title: 'Zane财经 - 新手炒股第一站 | 零基础到实盘实战', desc: 'Zane财经是专业的A股新手学习平台，提供实时行情、K线教学、模拟交易、AI分析等一站式炒股学习服务。' },
  market: { title: 'A股实时行情 - Zane财经', desc: '全市场A股实时行情数据，沪深京交易所全覆盖，支持行业板块与全市场排名。' },
  funds: { title: '基金精选与搜索 - Zane财经', desc: '精选优质基金，覆盖股票型、混合型、指数型、QDII等六大类别，支持全市场基金搜索。' },
  learning: { title: '股票与基金学习路径 - Zane财经', desc: '系统化的A股学习路径，从开户到建立交易系统，覆盖K线、指标、基本面与风控。' },
  kline: { title: 'K线技术分析 - Zane财经', desc: '42种K线形态图解，包含单根形态、组合形态、趋势形态与指标叠加分析。' },
  ai: { title: '股票智能查询 - Zane财经', desc: 'AI驱动的股票智能分析，接入同花顺问财，支持自然语言查询。' },
  trading: { title: '模拟交易 - Zane财经', desc: '50万虚拟资金模拟炒股，真实T+1交易规则，完整交割单记录。' },
  calculator: { title: '投资计算器 - Zane财经', desc: '盈亏计算、定投计算、止损止盈、凯利公式仓位管理等投资工具。' },
  news: { title: '财经资讯 - Zane财经', desc: '7×24市场快讯、板块热点、个股公告与要闻导航，一站式财经资讯中心。' },
  glossary: { title: '股票术语词典 - Zane财经', desc: '200+金融术语详解，涵盖基础概念、交易规则、技术分析、基金术语等七大分类。' },
  resources: { title: '外部资源库 - Zane财经', desc: '精选财经网站、数据平台、学习资源与工具推荐。' },
  contact: { title: '联系我们 - Zane财经', desc: '有任何建议或问题，欢迎随时与Zane财经团队取得联系。' }
};

function updatePageMeta(id) {
  const meta = pageMeta[id] || pageMeta.home;
  document.title = meta.title;
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute('content', meta.desc);
}

async function showSection(id) {
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
  // Update meta
  updatePageMeta(id);

  // Lazy-load heavy data modules before init
  await ensureLazyModule(id);

  // Trigger section init
  if (id === 'market') initMarket();
  if (id === 'funds') initFunds();
  if (id === 'learning') { switchLearningPath(currentLearningPath || 'stock'); }
  if (id === 'kline') initKlineGallery();
  if (id === 'trading') updateTradingUI();
  if (id === 'calculator') initCalculator();
  if (id === 'news') initNewsPage();
  if (id === 'glossary') initGlossary();
  if (id === 'resources') renderResources();

  // Cleanup intervals/listeners when leaving sections
  if (id !== 'funds' && typeof stopFundRefresh === 'function') stopFundRefresh();
  if (id !== 'news' && typeof stopNewsRefresh === 'function') stopNewsRefresh();
  if (id !== 'market' && typeof stopQuoteRefresh === 'function') stopQuoteRefresh();
}

function handleRoute() {
  const hash = window.location.hash.replace('#','') || 'home';
  if (sections.includes(hash)) showSection(hash);
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
  initAPI();
  if (typeof initLearningProgress === 'function') initLearningProgress();
  if (typeof initTrading === 'function') initTrading();
  handleRoute();
  // Onboarding
  if (!localStorage.getItem('zfinance_onboarding')) {
    setTimeout(() => document.getElementById('onboarding').classList.remove('hidden'), 800);
  }
});

document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Batch replace inline event handlers with addEventListener
document.getElementById('risk-banner-close')?.addEventListener('click', () => {
  document.getElementById('risk-banner').style.display = 'none';
});

document.getElementById('onboarding-close')?.addEventListener('click', closeOnboarding);
document.getElementById('contact-form')?.addEventListener('submit', submitFeedback);
document.getElementById('ai-query-btn')?.addEventListener('click', queryAI);
document.querySelectorAll('.ai-quick-btn').forEach(btn => {
  btn.addEventListener('click', () => quickAI(btn.dataset.aiCode));
});

function closeOnboarding() {
  document.getElementById('onboarding').classList.add('hidden');
  localStorage.setItem('zfinance_onboarding', '1');
  if (typeof window.autoSyncOnboarding === 'function') {
    window.autoSyncOnboarding();
  }
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
