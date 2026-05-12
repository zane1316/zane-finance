// ==================== News Page ====================
let newsRefreshInterval = null;
let currentNewsTab = 'hotspot';
let newsSectorCache = { gainers: [], losers: [] };
let newsConceptCache = [];

function initNewsPage() {
  setupNewsTabs();
  // Try to restore cached data immediately for Edge/proxy compatibility
  restoreNewsFromCache();
  refreshNewsData();
  setupTelegraphFallback();
  startNewsRefresh();
  // Delay market summary update to allow api.js to load index data first
  setTimeout(() => updateMarketSummary(), 1500);
  const announceInput = document.getElementById('news-announce-input');
  announceInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchAnnouncements();
  });
  document.getElementById('news-search-btn')?.addEventListener('click', searchAnnouncements);
}

function startNewsRefresh() {
  if (newsRefreshInterval) clearInterval(newsRefreshInterval);
  newsRefreshInterval = setInterval(() => {
    if (!document.getElementById('news').classList.contains('hidden')) {
      refreshNewsData();
    }
  }, 60000);
}

function stopNewsRefresh() {
  if (newsRefreshInterval) {
    clearInterval(newsRefreshInterval);
    newsRefreshInterval = null;
  }
}

function setupNewsTabs() {
  document.querySelectorAll('.news-tab').forEach(tab => {
    tab.addEventListener('click', () => switchNewsTab(tab.dataset.tab));
  });
}

function switchNewsTab(key) {
  currentNewsTab = key;
  document.querySelectorAll('.news-tab').forEach(tab => {
    const isActive = tab.dataset.tab === key;
    tab.classList.toggle('bg-primary', isActive);
    tab.classList.toggle('text-white', isActive);
    tab.classList.toggle('shadow-md', isActive);
    tab.classList.toggle('bg-white', !isActive);
    tab.classList.toggle('text-gray-700', !isActive);
    tab.classList.toggle('border', !isActive);
    tab.classList.toggle('border-gray-200', !isActive);
  });
  document.querySelectorAll('.news-panel').forEach(p => p.classList.add('hidden'));
  const active = document.getElementById('news-panel-' + key);
  if (active) active.classList.remove('hidden');
}

// JSONP helper for Eastmoney APIs (bypasses CORS and corp proxies)
function jsonpFetch(url, timeoutMs) {
  return new Promise((resolve, reject) => {
    const cbName = 'em_cb_' + Date.now() + '_' + Math.floor(Math.random() * 10000);
    const sep = url.includes('?') ? '&' : '?';
    const script = document.createElement('script');
    script.src = url + sep + 'cb=' + cbName;

    window[cbName] = function(data) {
      cleanup();
      resolve(data);
    };

    script.onerror = function() {
      cleanup();
      reject(new Error('JSONP load failed'));
    };

    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error('JSONP timeout'));
    }, timeoutMs || 6000);

    function cleanup() {
      clearTimeout(timeoutId);
      try { delete window[cbName]; } catch(e) {}
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    document.head.appendChild(script);
  });
}

// Fetch with AbortController timeout (for APIs that support CORS)
function fetchJSON(url, timeoutMs) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs || 6000);
  return fetch(url, { signal: controller.signal })
    .then(r => {
      clearTimeout(timeoutId);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .catch(err => {
      clearTimeout(timeoutId);
      throw err;
    });
}

function refreshNewsData() {
  loadNewsSectorRanking();
  loadNewsConceptRanking();
  updateMarketSummary();
  loadMarketRadar();
  loadCapitalFlow();
  loadCapitalOutflow();
  loadNorthboundFlow();
  loadConvertibleBonds();
  loadGlobalMarkets();
  loadIPOCalendar();
  loadCapitalFlowHistory();

  const t = document.getElementById('news-update-time');
  if (t) {
    t.innerHTML = '<span class="w-1.5 h-1.5 bg-green-500 rounded-full live-indicator"></span>更新时间：' + new Date().toLocaleTimeString('zh-CN');
  }
}

// ==================== Sector Ranking (Eastmoney JSONP) ====================
function loadNewsSectorRanking() {
  const fields = 'f12,f14,f2,f3,f4,f5,f6,f7,f8,f9,f18,f20,f21';
  const fs = 'm:90+t:2';
  // Fetch gainers (descending)
  const gainersUrl = 'https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=20&po=1&np=1&ut=' + EASTMONEY_UT + '&fltt=2&invt=2&fid=f3&fs=' + fs + '&fields=' + fields;
  // Fetch losers (ascending)
  const losersUrl = 'https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=20&po=0&np=1&ut=' + EASTMONEY_UT + '&fltt=2&invt=2&fid=f3&fs=' + fs + '&fields=' + fields;

  function parseSectorItems(diff) {
    return diff.map(item => {
      const rawCode = item.f12 || '';
      const price = item.f2 === '-' ? 0 : (parseFloat(item.f2) || 0);
      return {
        code: rawCode,
        name: item.f14 || rawCode,
        price: price,
        changePercent: parseFloat(item.f3) || 0,
        changeAmount: parseFloat(item.f4) || 0,
        volume: item.f5 || 0,
        volumeMoney: item.f6 ? item.f6 / 10000 : 0,
        turnover: parseFloat(item.f8) || 0,
        marketCap: item.f20 ? item.f20 / 100000000 : 0
      };
    });
  }

  Promise.all([
    jsonpFetch(gainersUrl, 6000),
    jsonpFetch(losersUrl, 6000)
  ])
    .then(([gainersData, losersData]) => {
      let gainers = [];
      let losers = [];
      if (gainersData && gainersData.data && Array.isArray(gainersData.data.diff)) {
        gainers = parseSectorItems(gainersData.data.diff).filter(i => i.changePercent > 0).sort((a, b) => b.changePercent - a.changePercent);
      }
      if (losersData && losersData.data && Array.isArray(losersData.data.diff)) {
        losers = parseSectorItems(losersData.data.diff).filter(i => i.changePercent < 0).sort((a, b) => a.changePercent - b.changePercent);
      }
      newsSectorCache = { gainers, losers };
      const topGainers = gainers.slice(0, 10);
      const topLosers = losers.slice(0, 10);
      const sidebarSectors = gainers.slice(0, 5);
      renderNewsSectorGainers(topGainers);
      renderNewsSectorLosers(topLosers);
      renderNewsSidebarSectors(sidebarSectors);
      const cache = loadNewsCache() || {};
      cache.sectorGainers = topGainers;
      cache.sectorLosers = topLosers;
      cache.sidebarSectors = sidebarSectors;
      saveNewsCache(cache);
    })
    .catch(err => {
      console.warn('News sector ranking failed:', err);
      const cache = loadNewsCache();
      if (cache && cache.sectorGainers) {
        renderNewsSectorGainers(cache.sectorGainers);
        renderNewsSectorLosers(cache.sectorLosers);
        renderNewsSidebarSectors(cache.sidebarSectors);
        renderNewsCacheIndicator();
      } else {
        setNewsError('news-sector-gainers', '板块涨幅榜加载失败（请检查网络代理设置）');
        setNewsError('news-sector-losers', '板块跌幅榜加载失败（请检查网络代理设置）');
        setNewsError('news-sidebar-sectors', '暂无数据');
      }
    });
}

function setNewsError(elementId, msg) {
  const el = document.getElementById(elementId);
  if (el) el.innerHTML = '<p class="text-gray-400 text-sm py-2 text-center">' + msg + '</p>';
}

function renderNewsSectorGainers(list) {
  const el = document.getElementById('news-sector-gainers');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-4 text-center">暂无上涨板块</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 ${i % 2 === 0 ? 'bg-gray-50/50' : ''} px-2 rounded">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 bg-red-50 text-up text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate max-w-[120px]" title="${d.name}">${d.name}</span>
      </span>
      <span class="text-up font-medium">+${formatNumber(d.changePercent, 2)}%</span>
    </div>`).join('');
}

function renderNewsSectorLosers(list) {
  const el = document.getElementById('news-sector-losers');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-4 text-center">暂无下跌板块</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 ${i % 2 === 0 ? 'bg-gray-50/50' : ''} px-2 rounded">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 bg-green-50 text-down text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate max-w-[120px]" title="${d.name}">${d.name}</span>
      </span>
      <span class="text-down font-medium">${formatNumber(d.changePercent, 2)}%</span>
    </div>`).join('');
}

function renderNewsSidebarSectors(list) {
  const el = document.getElementById('news-sidebar-sectors');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-2 text-center">暂无数据</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 px-2 rounded hover:bg-gray-50 transition">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 bg-red-50 text-up text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate" title="${d.name}">${d.name}</span>
      </span>
      <span class="text-up font-medium">+${formatNumber(d.changePercent, 2)}%</span>
    </div>`).join('');
}

// ==================== Concept Ranking (Eastmoney JSONP) ====================
function loadNewsConceptRanking() {
  const fields = 'f12,f14,f2,f3,f4,f5,f6,f7,f8,f9,f18,f20,f21';
  const url = 'https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=20&po=1&np=1&ut=' + EASTMONEY_UT + '&fltt=2&invt=2&fid=f3&fs=m:90+t:3&fields=' + fields;

  jsonpFetch(url, 6000)
    .then(data => {
      if (!data || !data.data || !Array.isArray(data.data.diff)) {
        throw new Error('Invalid concept data');
      }
      const items = data.data.diff.map(item => {
        const rawCode = item.f12 || '';
        const price = item.f2 === '-' ? 0 : (parseFloat(item.f2) || 0);
        return {
          code: rawCode,
          name: item.f14 || rawCode,
          price: price,
          changePercent: parseFloat(item.f3) || 0,
          changeAmount: parseFloat(item.f4) || 0,
          volume: item.f5 || 0,
          volumeMoney: item.f6 ? item.f6 / 10000 : 0,
          turnover: parseFloat(item.f8) || 0
        };
      });
      newsConceptCache = items;
      const hotConcepts = items.filter(i => i.changePercent > 0).slice(0, 12);
      const sidebarConcepts = items.filter(i => i.changePercent > 0).slice(0, 5);
      renderNewsConceptHot(hotConcepts);
      renderNewsSidebarConcepts(sidebarConcepts);
      const cache = loadNewsCache() || {};
      cache.concepts = hotConcepts;
      cache.sidebarConcepts = sidebarConcepts;
      saveNewsCache(cache);
    })
    .catch(err => {
      console.warn('News concept ranking failed:', err);
      const cache = loadNewsCache();
      if (cache && cache.concepts) {
        renderNewsConceptHot(cache.concepts);
        renderNewsSidebarConcepts(cache.sidebarConcepts);
        renderNewsCacheIndicator();
      } else {
        setNewsError('news-concept-hot', '暂无热门概念（请检查网络代理设置）');
        setNewsError('news-sidebar-concepts', '暂无数据');
      }
    });
}

function renderNewsConceptHot(list) {
  const el = document.getElementById('news-concept-hot');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<span class="text-gray-400 text-sm">暂无热门概念</span>';
    return;
  }
  el.innerHTML = list.map(d => `
    <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-up border border-red-100">
      ${d.name} +${formatNumber(d.changePercent, 2)}%
    </span>`).join('');
}

function renderNewsSidebarConcepts(list) {
  const el = document.getElementById('news-sidebar-concepts');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-2 text-center">暂无数据</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 px-2 rounded hover:bg-gray-50 transition">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 bg-primary/10 text-primary text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate" title="${d.name}">${d.name}</span>
      </span>
      <span class="text-up font-medium">+${formatNumber(d.changePercent, 2)}%</span>
    </div>`).join('');
}

// ==================== Index Sidebar ====================
// Market summary bar at top of news page
function updateMarketSummary() {
  // Update major index summary cards
  const idxMap = [
    { code: 'sh000001', elPrice: 'news-summary-sh', elChange: 'news-summary-sh-change' },
    { code: 'sz399001', elPrice: 'news-summary-sz', elChange: 'news-summary-sz-change' },
    { code: 'sz399006', elPrice: 'news-summary-cy', elChange: 'news-summary-cy-change' }
  ];
  idxMap.forEach(item => {
    const d = apiCache[item.code];
    const priceEl = document.getElementById(item.elPrice);
    const changeEl = document.getElementById(item.elChange);
    if (!priceEl || !changeEl) return;
    if (!d || !d.price) {
      priceEl.textContent = '--';
      changeEl.textContent = '--';
      changeEl.className = 'text-xs font-medium';
      return;
    }
    priceEl.textContent = formatNumber(d.price, 2);
    const color = d.changePercent >= 0 ? 'text-up' : 'text-down';
    changeEl.textContent = (d.changePercent >= 0 ? '+' : '') + formatNumber(d.changePercent, 2) + '%';
    changeEl.className = 'text-xs font-medium ' + color;
  });
}

// ==================== Market Radar (Limit Up / Down / Volume Surge) ====================
function loadMarketRadar() {
  const fields = 'f12,f14,f2,f3,f4,f5,f6,f7,f8';
  const fs = 'm:0+t:6,m:0+t:13,m:1+t:2,m:1+t:23';
  // Smart limit up/down detection based on market segment
  function isLimitUp(item) {
    const c = item.code;
    if (c.startsWith('68') || c.startsWith('30')) return item.changePercent >= 19.5;
    if (c.startsWith('8') || c.startsWith('4') || c.startsWith('9')) return item.changePercent >= 29.5;
    return item.changePercent >= 9.5;
  }
  function isLimitDown(item) {
    const c = item.code;
    if (c.startsWith('68') || c.startsWith('30')) return item.changePercent <= -19.5;
    if (c.startsWith('8') || c.startsWith('4') || c.startsWith('9')) return item.changePercent <= -29.5;
    return item.changePercent <= -9.5;
  }

  // Fetch limit-up stocks (descending by changePercent)
  const upUrl = 'https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=200&po=1&np=1&ut=' + EASTMONEY_UT + '&fltt=2&invt=2&fid=f3&fs=' + fs + '&fields=' + fields;
  // Fetch limit-down stocks (ascending by changePercent)
  const downUrl = 'https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=200&po=0&np=1&ut=' + EASTMONEY_UT + '&fltt=2&invt=2&fid=f3&fs=' + fs + '&fields=' + fields;

  function parseRadarItems(diff) {
    return diff.map(item => {
      const rawCode = item.f12 || '';
      const price = item.f2 === '-' ? 0 : (parseFloat(item.f2) || 0);
      return {
        code: rawCode,
        name: item.f14 || rawCode,
        price: price,
        changePercent: parseFloat(item.f3) || 0,
        volumeMoney: item.f6 ? item.f6 / 10000 : 0,
        turnover: parseFloat(item.f8) || 0
      };
    });
  }

  Promise.all([
    jsonpFetch(upUrl, 6000),
    jsonpFetch(downUrl, 6000)
  ])
    .then(([upData, downData]) => {
      let allItems = [];
      if (upData && upData.data && Array.isArray(upData.data.diff)) {
        allItems = allItems.concat(parseRadarItems(upData.data.diff));
      }
      if (downData && downData.data && Array.isArray(downData.data.diff)) {
        allItems = allItems.concat(parseRadarItems(downData.data.diff));
      }
      // Deduplicate by code
      const seen = new Set();
      allItems = allItems.filter(item => {
        if (seen.has(item.code)) return false;
        seen.add(item.code);
        return true;
      });

      const limitUp = allItems.filter(isLimitUp).sort((a, b) => b.changePercent - a.changePercent).slice(0, 15);
      const limitDown = allItems.filter(isLimitDown).sort((a, b) => a.changePercent - b.changePercent).slice(0, 15);
      const volumeSurge = allItems.filter(i => i.turnover > 5).sort((a, b) => b.volumeMoney - a.volumeMoney).slice(0, 15);
      renderRadarLimitUp(limitUp);
      renderRadarLimitDown(limitDown);
      renderRadarVolume(volumeSurge);
      // Update summary bar limit stats
      const limitEl = document.getElementById('news-summary-limit');
      if (limitEl) limitEl.textContent = limitUp.length + ' / ' + limitDown.length;
      const cache = loadNewsCache() || {};
      cache.radarLimitUp = limitUp;
      cache.radarLimitDown = limitDown;
      cache.radarVolume = volumeSurge;
      saveNewsCache(cache);
    })
    .catch(err => {
      console.warn('Market radar failed:', err);
      const cache = loadNewsCache();
      if (cache && cache.radarLimitUp) {
        renderRadarLimitUp(cache.radarLimitUp);
        renderRadarLimitDown(cache.radarLimitDown);
        renderRadarVolume(cache.radarVolume);
        renderNewsCacheIndicator();
      } else {
        setNewsError('news-radar-limitup', '数据加载失败（请检查网络代理设置）');
        setNewsError('news-radar-limitdown', '数据加载失败（请检查网络代理设置）');
        setNewsError('news-radar-volume', '数据加载失败（请检查网络代理设置）');
      }
    });
}

function renderRadarLimitUp(list) {
  const el = document.getElementById('news-radar-limitup');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-4 text-center">暂无涨停股</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-red-50/30'} px-2 rounded">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 bg-red-100 text-red-700 text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate max-w-[100px]" title="${d.name}">${d.name}</span>
        <span class="text-[10px] text-gray-400">${d.code}</span>
      </span>
      <span class="text-up font-medium">+${formatNumber(d.changePercent, 2)}%</span>
    </div>`).join('');
}

function renderRadarLimitDown(list) {
  const el = document.getElementById('news-radar-limitdown');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-4 text-center">暂无跌停股</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-green-50/30'} px-2 rounded">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 bg-green-100 text-green-700 text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate max-w-[100px]" title="${d.name}">${d.name}</span>
        <span class="text-[10px] text-gray-400">${d.code}</span>
      </span>
      <span class="text-down font-medium">${formatNumber(d.changePercent, 2)}%</span>
    </div>`).join('');
}

function renderRadarVolume(list) {
  const el = document.getElementById('news-radar-volume');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-4 text-center">暂无放量异动</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-amber-50/30'} px-2 rounded">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 bg-amber-100 text-amber-700 text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate max-w-[100px]" title="${d.name}">${d.name}</span>
      </span>
      <div class="text-right">
        <span class="text-up font-medium">+${formatNumber(d.changePercent, 2)}%</span>
        <span class="text-[10px] text-gray-400 ml-1">换手 ${formatNumber(d.turnover, 2)}%</span>
      </div>
    </div>`).join('');
}

// ==================== News Data Cache (for Edge / proxy compatibility) ====================
const NEWS_CACHE_KEY = 'zfinance_news_cache';
const NEWS_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function loadNewsCache() {
  try {
    const raw = localStorage.getItem(NEWS_CACHE_KEY);
    if (!raw) return null;
    const cache = JSON.parse(raw);
    if (Date.now() - cache.timestamp > NEWS_CACHE_TTL_MS) return null;
    return cache;
  } catch (e) {
    return null;
  }
}

function saveNewsCache(data) {
  try {
    localStorage.setItem(NEWS_CACHE_KEY, JSON.stringify({
      timestamp: Date.now(),
      ...data
    }));
  } catch (e) {}
}

function renderNewsCacheIndicator() {
  const t = document.getElementById('news-update-time');
  if (t && t.textContent.includes('缓存')) return;
  if (t) {
    t.innerHTML = '<span class="w-1.5 h-1.5 bg-amber-500 rounded-full"></span><span class="text-amber-600">显示缓存数据（实时数据加载失败，请检查网络代理设置）</span>';
  }
}

function restoreNewsFromCache() {
  const cache = loadNewsCache();
  if (!cache) return;
  if (cache.sectorGainers) renderNewsSectorGainers(cache.sectorGainers);
  if (cache.sectorLosers) renderNewsSectorLosers(cache.sectorLosers);
  if (cache.sidebarSectors) renderNewsSidebarSectors(cache.sidebarSectors);
  if (cache.concepts) renderNewsConceptHot(cache.concepts);
  if (cache.sidebarConcepts) renderNewsSidebarConcepts(cache.sidebarConcepts);
  if (cache.radarLimitUp) renderRadarLimitUp(cache.radarLimitUp);
  if (cache.radarLimitDown) renderRadarLimitDown(cache.radarLimitDown);
  if (cache.radarVolume) renderRadarVolume(cache.radarVolume);
  if (cache.capitalFlow) renderCapitalFlow(cache.capitalFlow);
  if (cache.capitalOutflow) renderCapitalOutflow(cache.capitalOutflow);
  if (cache.northboundFlow) renderNorthboundFlow(cache.northboundFlow);
  if (cache.convertibleBonds) renderConvertibleBonds(cache.convertibleBonds);
  if (cache.globalMarkets) renderGlobalMarkets(cache.globalMarkets);
  if (cache.ipoCalendar) renderIPOCalendar(cache.ipoCalendar);
  if (cache.capitalFlowHistory) renderCapitalFlowChart(cache.capitalFlowHistory);
  renderNewsCacheIndicator();
}

// ==================== Capital Flow (Eastmoney) ====================
function loadCapitalFlow() {
  const fields = 'f12,f14,f2,f3,f62';
  const url = 'https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=10&po=1&np=1&ut=' + EASTMONEY_UT + '&fltt=2&invt=2&fid=f62&fs=m:0+t:6,m:0+t:13,m:1+t:2,m:1+t:23&fields=' + fields;

  jsonpFetch(url, 6000)
    .then(data => {
      if (!data || !data.data || !Array.isArray(data.data.diff)) {
        throw new Error('Invalid flow data');
      }
      const items = data.data.diff.map(item => {
        const rawCode = item.f12 || '';
        const price = item.f2 === '-' ? 0 : (parseFloat(item.f2) || 0);
        return {
          code: rawCode,
          name: item.f14 || rawCode,
          price: price,
          changePercent: parseFloat(item.f3) || 0,
          netInflow: (parseFloat(item.f62) || 0) / 10000 // 万元 -> 亿元
        };
      });
      renderCapitalFlow(items);
      const cache = loadNewsCache() || {};
      cache.capitalFlow = items;
      saveNewsCache(cache);
    })
    .catch(err => {
      console.warn('Capital flow failed:', err);
      const cache = loadNewsCache();
      if (cache && cache.capitalFlow) {
        renderCapitalFlow(cache.capitalFlow);
        renderNewsCacheIndicator();
      } else {
        setNewsError('news-sidebar-flow', '数据加载失败（请检查网络代理设置）');
      }
    });
}

function renderCapitalFlow(list) {
  const el = document.getElementById('news-sidebar-flow');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-2 text-center">暂无数据</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 px-2 rounded hover:bg-gray-50 transition">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 bg-emerald-50 text-emerald-700 text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate" title="${d.name}">${d.name}</span>
      </span>
      <div class="text-right">
        <span class="text-emerald-600 font-medium">+${formatNumber(d.netInflow, 2)}亿</span>
        <span class="text-xs ${d.changePercent >= 0 ? 'text-up' : 'text-down'} ml-1">${d.changePercent >= 0 ? '+' : ''}${formatNumber(d.changePercent, 2)}%</span>
      </div>
    </div>`).join('');
}

// ==================== Capital Outflow (净流出) ====================
function loadCapitalOutflow() {
  const fields = 'f12,f14,f2,f3,f62';
  const url = 'https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=10&po=0&np=1&ut=' + EASTMONEY_UT + '&fltt=2&invt=2&fid=f62&fs=m:0+t:6,m:0+t:13,m:1+t:2,m:1+t:23&fields=' + fields;

  jsonpFetch(url, 6000)
    .then(data => {
      if (!data || !data.data || !Array.isArray(data.data.diff)) {
        throw new Error('Invalid outflow data');
      }
      const items = data.data.diff.map(item => {
        const rawCode = item.f12 || '';
        const price = item.f2 === '-' ? 0 : (parseFloat(item.f2) || 0);
        return {
          code: rawCode,
          name: item.f14 || rawCode,
          price: price,
          changePercent: parseFloat(item.f3) || 0,
          netInflow: (parseFloat(item.f62) || 0) / 10000
        };
      });
      renderCapitalOutflow(items);
      const cache = loadNewsCache() || {};
      cache.capitalOutflow = items;
      saveNewsCache(cache);
    })
    .catch(err => {
      console.warn('Capital outflow failed:', err);
      const cache = loadNewsCache();
      if (cache && cache.capitalOutflow) {
        renderCapitalOutflow(cache.capitalOutflow);
        renderNewsCacheIndicator();
      } else {
        setNewsError('news-sidebar-outflow', '数据加载失败');
      }
    });
}

function renderCapitalOutflow(list) {
  const el = document.getElementById('news-sidebar-outflow');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-2 text-center">暂无数据</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 px-2 rounded hover:bg-gray-50 transition">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 bg-green-50 text-green-700 text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate" title="${d.name}">${d.name}</span>
      </span>
      <div class="text-right">
        <span class="text-green-600 font-medium">${formatNumber(d.netInflow, 2)}亿</span>
        <span class="text-xs ${d.changePercent >= 0 ? 'text-up' : 'text-down'} ml-1">${d.changePercent >= 0 ? '+' : ''}${formatNumber(d.changePercent, 2)}%</span>
      </div>
    </div>`).join('');
}

// ==================== Global Markets ====================
function loadGlobalMarkets() {
  // Query global indices via Eastmoney ulist
  const url = 'https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&invt=2&fields=f2,f3,f12,f14&secids=0.HSI,100.NDX,100.DXJS,100.N225';

  jsonpFetch(url, 6000)
    .then(data => {
      if (!data || !data.data || !Array.isArray(data.data.diff)) {
        throw new Error('Invalid global data');
      }
      const nameMap = { 'HSI': '恒生指数', 'NDX': '纳斯达克', 'DXJS': '道琼斯', 'N225': '日经225' };
      const items = data.data.diff.map(item => {
        const rawCode = item.f12 || '';
        return {
          code: rawCode,
          name: nameMap[rawCode] || item.f14 || rawCode,
          changePercent: parseFloat(item.f3) || 0
        };
      });
      renderGlobalMarkets(items);
      const cache = loadNewsCache() || {};
      cache.globalMarkets = items;
      saveNewsCache(cache);
    })
    .catch(err => {
      console.warn('Global markets failed:', err);
      const cache = loadNewsCache();
      if (cache && cache.globalMarkets) {
        renderGlobalMarkets(cache.globalMarkets);
        renderNewsCacheIndicator();
      } else {
        renderGlobalMarkets([]);
      }
    });
}

function renderGlobalMarkets(list) {
  const el = document.getElementById('news-sidebar-global');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-2 text-center">全球市场数据加载中...</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 px-2 rounded hover:bg-gray-50 transition">
      <span class="truncate" title="${d.name}">${d.name}</span>
      <span class="${d.changePercent >= 0 ? 'text-up' : 'text-down'} font-medium">${d.changePercent >= 0 ? '+' : ''}${formatNumber(d.changePercent, 2)}%</span>
    </div>`).join('');
}

// ==================== IPO Calendar ====================
function loadIPOCalendar() {
  const url = 'https://datacenter-web.eastmoney.com/api/data/v1/get?sortColumns=APPLY_DATE,SECURITY_CODE&sortTypes=-1,-1&pageSize=5&pageNumber=1&reportName=RPTA_WEB_IPO_APPLY&columns=SECURITY_CODE,SECURITY_NAME_ABBR,APPLY_DATE';

  jsonpFetch(url, 8000)
    .then(data => {
      if (!data || !data.result || !Array.isArray(data.result.data)) {
        throw new Error('Invalid IPO data');
      }
      const items = data.result.data.map(item => ({
        code: item.SECURITY_CODE || '',
        name: item.SECURITY_NAME_ABBR || '',
        applyDate: item.APPLY_DATE ? item.APPLY_DATE.slice(0, 10) : ''
      }));
      renderIPOCalendar(items);
      const cache = loadNewsCache() || {};
      cache.ipoCalendar = items;
      saveNewsCache(cache);
    })
    .catch(err => {
      console.warn('IPO calendar failed:', err);
      const cache = loadNewsCache();
      if (cache && cache.ipoCalendar) {
        renderIPOCalendar(cache.ipoCalendar);
        renderNewsCacheIndicator();
      } else {
        renderIPOCalendar([]);
      }
    });
}

function renderIPOCalendar(list) {
  const el = document.getElementById('news-sidebar-ipo');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-2 text-center">新股申购数据加载中...</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 px-2 rounded hover:bg-gray-50 transition">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 bg-amber-50 text-amber-700 text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate" title="${d.name}">${d.name}</span>
      </span>
      <span class="text-xs text-gray-400">${d.applyDate}</span>
    </div>`).join('');
}

// ==================== Telegraph: direct fallback (iframe blocked by X-Frame-Options) ====================
function setupTelegraphFallback() {
  const wrap = document.getElementById('news-telegraph-frame-wrap');
  const fallback = document.getElementById('news-telegraph-fallback');
  if (wrap) wrap.classList.add('hidden');
  if (fallback) fallback.classList.remove('hidden');
}

// ==================== Stock Announcement Search ====================
function searchAnnouncements() {
  const input = document.getElementById('news-announce-input');
  const resultsEl = document.getElementById('news-announce-results');
  if (!input || !resultsEl) return;

  const code = input.value.trim().replace(/^(sh|sz|bj)/, '');
  if (!/^\d{6}$/.test(code)) {
    resultsEl.innerHTML = '<div class="text-center py-8"><p class="text-amber-600 text-sm">请输入有效的6位股票代码</p></div>';
    return;
  }

  resultsEl.innerHTML = '<div class="text-center py-8"><span class="inline-block w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></span><span class="text-gray-400 text-sm ml-2">查询中...</span></div>';

  const url = 'https://np-anotice-stock.eastmoney.com/api/security/ann?sr=-1&page_size=20&page_index=1&ann_type=A&client_source=web&stock_list=' + code;

  // Try direct fetch first
  fetchJSON(url, 8000)
    .then(data => renderAnnouncements(data, code, resultsEl))
    .catch(err => {
      console.warn('Announcement direct fetch failed:', err);
      // Fallback: try JSONP via Eastmoney data center
      tryJSONPAnnouncements(code, resultsEl);
    });
}

function renderAnnouncements(data, code, resultsEl) {
  if (!data || !data.data || !Array.isArray(data.data)) {
    resultsEl.innerHTML = '<div class="text-center py-8"><p class="text-gray-400 text-sm">未找到公告数据</p></div>';
    return;
  }
  const list = data.data;
  if (list.length === 0) {
    resultsEl.innerHTML = '<div class="text-center py-8"><p class="text-gray-400 text-sm">该股票暂无公告</p></div>';
    return;
  }
  const stockName = list[0] && list[0].codes && list[0].codes[0] ? list[0].codes[0].stock_name : code;
  resultsEl.innerHTML = `
    <div class="mb-3 flex items-center justify-between">
      <span class="text-sm font-medium text-gray-700">${stockName} (${code})</span>
      <span class="text-xs text-gray-400">共 ${list.length} 条</span>
    </div>
    <div class="space-y-2">
      ${list.map(item => {
        const title = item.title || '无标题';
        const date = item.notice_date ? new Date(item.notice_date).toLocaleDateString('zh-CN') : '';
        const artCode = item.art_code;
        const href = artCode ? 'https://data.eastmoney.com/notices/detail/' + code + '/' + artCode + '.html' : '#';
        return `
          <a href="${href}" target="_blank" class="block p-3 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-sm hover:bg-blue-50/30 transition">
            <p class="text-sm text-gray-800 line-clamp-2">${title}</p>
            <p class="text-xs text-gray-400 mt-1">${date}</p>
          </a>`;
      }).join('')}
    </div>`;
}

function tryJSONPAnnouncements(code, resultsEl) {
  // Use Eastmoney's notice search via JSONP
  const cbName = 'em_ann_' + Date.now();
  const url = 'https://searchapi.eastmoney.com/api/suggest/get?input=' + code + '&type=14&count=5&cb=' + cbName;
  const script = document.createElement('script');
  script.src = url;
  script.onerror = () => {
    resultsEl.innerHTML = '<div class="text-center py-8"><p class="text-gray-400 text-sm">查询失败（可能是网络代理限制），请直接访问 <a href="https://data.eastmoney.com/notices/" target="_blank" class="text-primary underline">东方财富公告中心</a></p></div>';
    if (script.parentNode) script.parentNode.removeChild(script);
    delete window[cbName];
  };
  const timeoutId = setTimeout(() => {
    resultsEl.innerHTML = '<div class="text-center py-8"><p class="text-gray-400 text-sm">查询超时，请稍后重试</p></div>';
    if (script.parentNode) script.parentNode.removeChild(script);
    delete window[cbName];
  }, 6000);
  window[cbName] = function(data) {
    clearTimeout(timeoutId);
    if (script.parentNode) script.parentNode.removeChild(script);
    delete window[cbName];
    // JSONP fallback only gives suggestion data, not full announcements
    resultsEl.innerHTML = '<div class="text-center py-8"><p class="text-gray-400 text-sm">查询失败（可能是网络代理限制），请直接访问 <a href="https://data.eastmoney.com/notices/" target="_blank" class="text-primary underline">东方财富公告中心</a></p></div>';
  };
  document.head.appendChild(script);
}

// ==================== Northbound Capital Flow (沪深港通) ====================
function loadNorthboundFlow() {
  // Use Eastmoney's northbound fund flow API
  const fields = 'f12,f14,f2,f3,f62';
  const url = 'https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=10&po=1&np=1&ut=' + EASTMONEY_UT + '&fltt=2&invt=2&fid=f62&fs=b:BK0707&fields=' + fields;

  jsonpFetch(url, 6000)
    .then(data => {
      if (!data || !data.data || !Array.isArray(data.data.diff)) {
        throw new Error('Invalid northbound data');
      }
      const items = data.data.diff.map(item => {
        const rawCode = item.f12 || '';
        return {
          code: rawCode,
          name: item.f14 || rawCode,
          changePercent: parseFloat(item.f3) || 0,
          netInflow: (parseFloat(item.f62) || 0) / 10000
        };
      });
      renderNorthboundFlow(items);
      const cache = loadNewsCache() || {};
      cache.northboundFlow = items;
      saveNewsCache(cache);
    })
    .catch(err => {
      console.warn('Northbound flow failed:', err);
      const cache = loadNewsCache();
      if (cache && cache.northboundFlow) {
        renderNorthboundFlow(cache.northboundFlow);
        renderNewsCacheIndicator();
      } else {
        renderNorthboundFlow([]);
      }
    });
}

function renderNorthboundFlow(list) {
  const el = document.getElementById('news-sidebar-northbound');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-2 text-center">北向资金数据加载中...</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 px-2 rounded hover:bg-gray-50 transition">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 ${d.netInflow >= 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'} text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate" title="${d.name}">${d.name}</span>
      </span>
      <div class="text-right">
        <span class="${d.netInflow >= 0 ? 'text-red-600' : 'text-green-600'} font-medium">${d.netInflow >= 0 ? '+' : ''}${formatNumber(d.netInflow, 2)}亿</span>
      </div>
    </div>`).join('');
}

// ==================== Convertible Bonds ====================
function loadConvertibleBonds() {
  const fields = 'f12,f14,f2,f3,f4,f5,f6,f8';
  const url = 'https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=10&po=1&np=1&ut=' + EASTMONEY_UT + '&fltt=2&invt=2&fid=f3&fs=b:MK0354&fields=' + fields;

  jsonpFetch(url, 6000)
    .then(data => {
      if (!data || !data.data || !Array.isArray(data.data.diff)) {
        throw new Error('Invalid bond data');
      }
      const items = data.data.diff.map(item => {
        const rawCode = item.f12 || '';
        return {
          code: rawCode,
          name: item.f14 || rawCode,
          changePercent: parseFloat(item.f3) || 0,
          turnover: parseFloat(item.f8) || 0
        };
      });
      renderConvertibleBonds(items);
      const cache = loadNewsCache() || {};
      cache.convertibleBonds = items;
      saveNewsCache(cache);
    })
    .catch(err => {
      console.warn('Convertible bonds failed:', err);
      const cache = loadNewsCache();
      if (cache && cache.convertibleBonds) {
        renderConvertibleBonds(cache.convertibleBonds);
        renderNewsCacheIndicator();
      } else {
        renderConvertibleBonds([]);
      }
    });
}

function renderConvertibleBonds(list) {
  const el = document.getElementById('news-sidebar-bonds');
  if (!el) return;
  if (!list.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm py-2 text-center">可转债数据加载中...</p>';
    return;
  }
  el.innerHTML = list.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 px-2 rounded hover:bg-gray-50 transition">
      <span class="flex items-center gap-2">
        <span class="w-5 h-5 ${d.changePercent >= 0 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'} text-xs rounded flex items-center justify-center font-medium">${i + 1}</span>
        <span class="truncate" title="${d.name}">${d.name}</span>
      </span>
      <div class="text-right">
        <span class="${d.changePercent >= 0 ? 'text-up' : 'text-down'} font-medium">${d.changePercent >= 0 ? '+' : ''}${formatNumber(d.changePercent, 2)}%</span>
      </div>
    </div>`).join('');
}

// ==================== Capital Flow History Chart (主力资金流向走势) ====================
let capitalFlowChartInstance = null;

function loadCapitalFlowHistory() {
  // Eastmoney Shanghai Index capital flow day kline
  const url = 'https://push2.eastmoney.com/api/qt/stock/fflow/daykline/get?lmt=10&klt=101&fields1=f1,f2,f3,f7&fields2=f51,f52,f53,f54,f55,f56&ut=' + EASTMONEY_UT + '&secid=1.000001';

  jsonpFetch(url, 8000)
    .then(data => {
      if (!data || !data.data || !Array.isArray(data.data.klines)) {
        throw new Error('Invalid capital flow history data');
      }
      const items = data.data.klines.map(line => {
        const parts = line.split(',');
        return {
          date: parts[0] || '',
          mainForce: parseFloat(parts[1]) || 0, // 主力净流入
          superLarge: parseFloat(parts[2]) || 0,
          large: parseFloat(parts[3]) || 0,
          medium: parseFloat(parts[4]) || 0,
          small: parseFloat(parts[5]) || 0
        };
      });
      renderCapitalFlowChart(items);
      const cache = loadNewsCache() || {};
      cache.capitalFlowHistory = items;
      saveNewsCache(cache);
    })
    .catch(err => {
      console.warn('Capital flow history failed:', err);
      const cache = loadNewsCache();
      if (cache && cache.capitalFlowHistory) {
        renderCapitalFlowChart(cache.capitalFlowHistory);
        renderNewsCacheIndicator();
      } else {
        const el = document.getElementById('news-capital-flow-chart');
        if (el) el.innerHTML = '<p class="text-gray-400 text-sm text-center py-16">资金流向数据加载失败</p>';
      }
    });
}

function renderCapitalFlowChart(items) {
  const el = document.getElementById('news-capital-flow-chart');
  if (!el || !window.echarts) return;
  if (!items || !items.length) {
    el.innerHTML = '<p class="text-gray-400 text-sm text-center py-16">暂无资金流向数据</p>';
    return;
  }

  if (capitalFlowChartInstance) {
    capitalFlowChartInstance.dispose();
  }
  capitalFlowChartInstance = window.echarts.init(el);

  const dates = items.map(d => d.date.slice(5)); // MM-DD
  const values = items.map(d => parseFloat((d.mainForce / 10000).toFixed(2))); // convert to 亿元

  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#d1d5db' : '#6b7280';
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const bgColor = isDark ? '#1f2937' : '#f9fafb';

  capitalFlowChartInstance.setOption({
    backgroundColor: bgColor,
    grid: { left: 10, right: 10, top: 10, bottom: 24 },
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? '#1f2937' : '#fff',
      borderColor: isDark ? '#4b5563' : '#e5e7eb',
      textStyle: { color: isDark ? '#e5e7eb' : '#374151', fontSize: 12 },
      formatter: function(params) {
        const v = params[0].value;
        const color = v >= 0 ? '#DC2626' : '#16A34A';
        return '<div style="font-size:12px">' + params[0].name + '<br/>主力净流入: <span style="color:' + color + ';font-weight:600">' + (v >= 0 ? '+' : '') + v + '亿</span></div>';
      }
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: { lineStyle: { color: gridColor } },
      axisTick: { show: false },
      axisLabel: { color: textColor, fontSize: 10, interval: 0 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: gridColor, type: 'dashed' } },
      axisLabel: {
        color: textColor,
        fontSize: 10,
        formatter: v => v + '亿'
      }
    },
    series: [{
      type: 'bar',
      data: values.map(v => ({
        value: v,
        itemStyle: { color: v >= 0 ? '#DC2626' : '#16A34A', borderRadius: [3, 3, 0, 0] }
      })),
      barWidth: '50%'
    }]
  });
}
