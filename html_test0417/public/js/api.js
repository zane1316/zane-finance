// Tencent Finance API wrapper (JSONP via script injection)
let apiCache = {};
let apiCallbacks = {};
let apiScriptId = 0;

function loadTencentAPI(codes, callback) {
  const id = 'tencent_api_' + (++apiScriptId);
  // Transform of-prefixed fund codes to jj prefix for Tencent API
  const apiCodes = codes.map(c => c.startsWith('of') ? c.replace(/^of/, 'jj') : c);
  const url = 'https://qt.gtimg.cn/q=' + apiCodes.join(',');
  const script = document.createElement('script');
  script.id = id;
  script.src = url;
  script.onerror = () => {
    cleanup(id);
    codes.forEach(c => { if (!apiCache[c]) apiCache[c] = { _failed: true }; });
    callback(new Error('API load failed'), null);
  };
  script.onload = () => {
    cleanup(id);
    const result = {};
    codes.forEach((originalCode, idx) => {
      const apiCode = apiCodes[idx];
      const varName = 'v_' + apiCode.toLowerCase().replace(/\./g, '_');
      if (typeof window[varName] !== 'undefined') {
        if (originalCode.startsWith('of')) {
          result[originalCode] = parseTencentFundData(window[varName]);
        } else {
          result[originalCode] = parseTencentData(window[varName]);
        }
        apiCache[originalCode] = result[originalCode];
        try { delete window[varName]; } catch(e) {}
      } else {
        result[originalCode] = apiCache[originalCode] || null;
      }
    });
    callback(null, result);
  };
  document.head.appendChild(script);
  setTimeout(() => {
    const s = document.getElementById(id);
    if (s) {
      cleanup(id);
      // Mark all requested codes as failed so UI doesn't show "syncing" forever
      codes.forEach(c => { if (!apiCache[c]) apiCache[c] = { _failed: true }; });
      callback(new Error('API timeout'), null);
    }
  }, 6000);
}

function cleanup(id) {
  const s = document.getElementById(id);
  if (s && s.parentNode) s.parentNode.removeChild(s);
}

function parseTencentData(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const parts = raw.split('~');
  return {
    name: parts[1] || '',
    code: parts[2] || '',
    price: parseFloat(parts[3]) || 0,
    close: parseFloat(parts[4]) || 0,
    open: parseFloat(parts[5]) || 0,
    volume: parseFloat(parts[6]) || 0,
    high: parseFloat(parts[33]) || 0,
    low: parseFloat(parts[34]) || 0,
    changeAmount: parseFloat(parts[31]) || 0,
    changePercent: parseFloat(parts[32]) || 0,
    turnover: parseFloat(parts[38]) || 0,
    pe: parseFloat(parts[39]) || 0,
    marketCap: parseFloat(parts[44]) || 0,
    volumeMoney: (parseFloat(parts[37]) || 0) / 10000
  };
}

function parseTencentFundData(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const parts = raw.split('~');
  // jj format: code~name~0~0~~nav~accum_nav~changePercent~date~
  const nav = parseFloat(parts[5]) || 0;
  const changePercent = parseFloat(parts[7]) || 0;
  return {
    name: parts[1] || '',
    code: parts[0] || '',
    price: nav,
    close: nav,
    open: nav,
    volume: 0,
    high: nav,
    low: nav,
    changeAmount: 0,
    changePercent: changePercent,
    turnover: 0,
    pe: 0,
    marketCap: 0,
    volumeMoney: 0
  };
}

function initAPI() {
  refreshAllQuotes();
  setInterval(refreshAllQuotes, 30000);
}

function refreshAllQuotes() {
  const allCodes = indexList.map(i => i.code).concat(allStocks.map(s => s.c));
  const chunkSize = 60;
  for (let i = 0; i < allCodes.length; i += chunkSize) {
    const chunk = allCodes.slice(i, i + chunkSize);
    loadTencentAPI(chunk, (err, data) => {
      if (err) {
        console.warn('Quote refresh failed for batch', i, err);
        return;
      }
      Object.assign(apiCache, data);
      updateTicker(data);
      updateIndexCards(data);
      if (!document.getElementById('market').classList.contains('hidden')) {
        updateMarketPage(data);
      }
      if (!document.getElementById('trading').classList.contains('hidden')) {
        updateTradingPrices(data);
      }
    });
  }
  const t = document.getElementById('market-update-time');
  if (t) t.textContent = '更新时间：' + new Date().toLocaleTimeString('zh-CN');

  // Refresh expanded sector quotes for currently viewed sector
  if (sectorExpandedData[currentSector] && !sectorExpandedLoading[currentSector]) {
    fetchExpandedSectorQuotes(currentSector, () => {
      if (!document.getElementById('market').classList.contains('hidden')) {
        updateMarketPage(apiCache);
      }
    });
  }

  // Refresh search results if visible
  const searchResultsEl = document.getElementById('search-results');
  const searchCardsEl = document.getElementById('search-result-cards');
  if (currentSearchCodes.length > 0 && searchResultsEl && !searchResultsEl.classList.contains('hidden') && searchCardsEl) {
    const refreshed = currentSearchCodes.map(c => ({ c, n: resolveStockName(c) || c }));
    renderSearchResultCards(refreshed, searchCardsEl);
  }
}

function getStockData(code) {
  return apiCache[code] || null;
}

function updateTicker(data) {
  const container = document.getElementById('ticker-tape');
  if (!container) return;
  const items = [];
  indexList.forEach(idx => {
    const d = data[idx.code] || apiCache[idx.code];
    if (d) items.push(renderTickerItem(idx.name, d));
  });
  const stockArr = allStocks.map(s => {
    const d = data[s.c] || apiCache[s.c];
    return d ? { ...d, code: s.c, sname: s.n } : null;
  }).filter(Boolean).sort((a,b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 10);
  stockArr.forEach(d => items.push(renderTickerItem(d.sname, d)));
  if (items.length === 0) {
    container.innerHTML = '<span class="text-gray-400">行情同步中...</span>';
    return;
  }
  container.innerHTML = items.concat(items).map(it => `<span class="stock-item inline-flex items-center gap-1 px-3">${it}</span>`).join('');
}

function renderTickerItem(name, d) {
  const color = d.changePercent >= 0 ? 'text-up' : 'text-down';
  const arrow = d.changePercent >= 0 ? '▲' : '▼';
  return `<span class="${color}">${name} ${formatNumber(d.price,2)} ${arrow}${d.changePercent>=0?'+':''}${formatNumber(d.changePercent,2)}%</span>`;
}

function updateIndexCards(data) {
  const container = document.getElementById('index-cards');
  if (!container) return;
  container.innerHTML = indexList.map(idx => {
    const d = data[idx.code] || apiCache[idx.code];
    if (!d) return `<div class="bg-white p-4 rounded-lg shadow border border-border text-center"><p class="text-gray-500 text-sm">${idx.name}</p><p class="text-xl font-bold my-1">--</p><p class="text-sm">--</p></div>`;
    const color = d.changePercent >= 0 ? 'text-up' : 'text-down';
    return `
      <div class="bg-white p-4 rounded-lg shadow border border-border text-center">
        <p class="text-gray-500 text-sm">${idx.name}</p>
        <p class="text-xl font-bold my-1 ${color}">${formatNumber(d.price,2)}</p>
        <p class="text-sm ${color}">${d.changePercent>=0?'+':''}${formatNumber(d.changePercent,2)}%</p>
      </div>`;
  }).join('');
}

// ==================== Eastmoney API Integration ====================
let allAStockList = null;
let eastmoneyRankingCache = { gainers: [], losers: [] };
const EASTMONEY_UT = 'bd1d9ddb04089700cf9c27f6f7426281';
const STOCK_CACHE_KEY = 'zfinance_allstocks_v2';
const STOCK_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// Get correct exchange prefix for A-share code
function getStockPrefix(rawCode) {
  if (!rawCode || rawCode.length !== 6) return 'sz';
  const first = rawCode[0];
  const firstTwo = rawCode.substring(0, 2);
  if (first === '6' || firstTwo === '68' || firstTwo === '69') return 'sh';
  if (first === '8' || first === '4') return 'bj';
  return 'sz';
}

function loadAllAStockListFromCache() {
  try {
    const cached = localStorage.getItem(STOCK_CACHE_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (!data || !Array.isArray(data)) return null;
    if (Date.now() - timestamp > STOCK_CACHE_TTL) {
      console.log('Stock cache expired, will refresh from API');
      return null;
    }
    console.log(`Loaded ${data.length} stocks from local cache`);
    return data;
  } catch (e) {
    console.warn('Failed to load stock cache:', e);
    return null;
  }
}

function saveAllAStockListToCache(data) {
  try {
    localStorage.setItem(STOCK_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (e) {
    console.warn('Failed to save stock cache:', e);
  }
}

function loadAllAStockList() {
  if (allAStockList !== null) return Promise.resolve(allAStockList);

  // Try cache first
  const cached = loadAllAStockListFromCache();
  if (cached) {
    allAStockList = cached;
  }

  // Fallback to bundled local list if no cache (Eastmoney API often blocked by corp proxy)
  if (!allAStockList && typeof allAStockListLocal !== 'undefined' && Array.isArray(allAStockListLocal)) {
    allAStockList = allAStockListLocal;
    console.log(`Loaded ${allAStockList.length} A-share stocks from local bundle`);
  }

  const url = `https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=5000&po=1&np=1&ut=${EASTMONEY_UT}&fltt=2&invt=2&fid=f12&fs=m:0+t:6,m:0+t:13,m:1+t:2,m:1+t:23&fields=f12,f14`;
  return fetch(url)
    .then(r => r.json())
    .then(data => {
      if (!data || !data.data || !data.data.diff) {
        console.warn('Eastmoney API returned invalid data structure:', data);
        if (!allAStockList) allAStockList = [];
        return allAStockList;
      }
      allAStockList = data.data.diff.map(item => {
        const rawCode = item.f12;
        const prefix = getStockPrefix(rawCode);
        return { rawCode, code: prefix + rawCode, name: item.f14 };
      });
      saveAllAStockListToCache(allAStockList);
      console.log(`Loaded ${allAStockList.length} A-share stocks from Eastmoney`);
      return allAStockList;
    })
    .catch(err => {
      console.warn('Failed to load all A-stock list from API:', err);
      if (!allAStockList) {
        // Use local bundle as last resort if available
        if (typeof allAStockListLocal !== 'undefined' && Array.isArray(allAStockListLocal)) {
          allAStockList = allAStockListLocal;
          console.log(`Fallback: loaded ${allAStockList.length} stocks from local bundle`);
          return allAStockList;
        }
        allAStockList = null; // Allow retry on next call
        return [];
      }
      return allAStockList; // Return cached/local data even if API fails
    });
}

function loadEastmoneyRanking(direction, count = 20) {
  const po = direction === 'desc' ? 1 : 0;
  const fid = 'f3';
  const fields = 'f12,f14,f2,f3,f4,f5,f6,f7,f8,f9,f18,f20,f21';
  const url = `https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=${count}&po=${po}&np=1&ut=${EASTMONEY_UT}&fltt=2&invt=2&fid=${fid}&fs=m:0+t:6,m:0+t:13,m:1+t:2,m:1+t:23&fields=${fields}`;
  return fetch(url)
    .then(r => r.json())
    .then(data => {
      if (!data || !data.data || !data.data.diff) return [];
      return data.data.diff.map(item => {
        const rawCode = item.f12;
        const prefix = getStockPrefix(rawCode);
        const price = item.f2 === '-' ? 0 : (parseFloat(item.f2) || 0);
        return {
          code: prefix + rawCode,
          rawCode: rawCode,
          name: item.f14,
          price: price,
          changePercent: parseFloat(item.f3) || 0,
          changeAmount: parseFloat(item.f4) || 0,
          volume: item.f5 || 0,
          volumeMoney: item.f6 ? item.f6 / 10000 : 0,
          amplitude: parseFloat(item.f7) || 0,
          turnover: parseFloat(item.f8) || 0,
          pe: parseFloat(item.f9) || 0,
          prevClose: item.f18 === '-' ? 0 : (parseFloat(item.f18) || 0),
          marketCap: item.f20 ? item.f20 / 100000000 : 0,
          floatCap: item.f21 ? item.f21 / 100000000 : 0
        };
      });
    })
    .catch(err => {
      console.warn('Eastmoney ranking failed:', err);
      return [];
    });
}

function refreshAllMarketView() {
  const container = document.getElementById('stock-cards');
  const gainersEl = document.getElementById('top-gainers');
  const losersEl = document.getElementById('top-losers');
  if (!container || !gainersEl || !losersEl) return;

  // Always show loading state when explicitly refreshing
  container.innerHTML = '<div class="text-gray-400 text-sm py-4 flex items-center gap-2"><span class="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>正在加载沪深全市场数据...</div>';
  gainersEl.innerHTML = '<div class="text-gray-400 text-sm py-4 text-center">加载中...</div>';
  losersEl.innerHTML = '<div class="text-gray-400 text-sm py-4 text-center">加载中...</div>';

  Promise.all([
    loadEastmoneyRanking('desc', 20),
    loadEastmoneyRanking('asc', 20)
  ]).then(([gainers, losers]) => {
    if (!gainers.length && !losers.length) {
      container.innerHTML = '<div class="text-gray-400 text-sm py-4">暂无全市场数据（可能为非交易时间）</div>';
      gainersEl.innerHTML = '<p class="text-gray-400 text-sm py-4 text-center">暂无数据</p>';
      losersEl.innerHTML = '<p class="text-gray-400 text-sm py-4 text-center">暂无数据</p>';
      return;
    }

    eastmoneyRankingCache = { gainers, losers };

    // Render top 10 gainers as cards
    const topCards = gainers.slice(0, 10);
    container.innerHTML = topCards.map(d => {
      const color = d.changePercent >= 0 ? 'text-up' : 'text-down';
      const arrow = d.changePercent >= 0 ? '▲' : '▼';
      return `
        <div class="min-w-[180px] bg-white rounded-lg shadow border border-border p-3 cursor-pointer hover:shadow-md transition">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-bold text-sm">${d.name}</p>
              <p class="text-xs text-gray-500">${d.code}</p>
            </div>
            <span class="text-xs ${color}">${arrow}</span>
          </div>
          <p class="text-xl font-bold my-1 ${color}">${d.price > 0 ? formatNumber(d.price,2) : '--'}</p>
          <p class="text-xs ${color}">${d.changePercent>=0?'+':''}${formatNumber(d.changePercent,2)}%</p>
          <div class="mt-2 pt-2 border-t text-xs text-gray-400 space-y-1">
            <div class="flex justify-between"><span>换手</span><span>${formatNumber(d.turnover,2)}%</span></div>
            <div class="flex justify-between"><span>成交</span><span>${formatNumber(d.volumeMoney/10000,2)}亿</span></div>
            <div class="flex justify-between"><span>市值</span><span>${formatNumber(d.marketCap,2)}亿</span></div>
          </div>
          <a href="https://stock.finance.qq.com/sstock/ggcx/${d.code}.shtml" target="_blank" class="block mt-2 text-xs text-primary hover:underline"
            onclick="event.stopPropagation()"
          >数据来源：腾讯财经 ↗</a>
        </div>`;
    }).join('');

    // Render gainers list
    gainersEl.innerHTML = gainers.map((d, i) => `
      <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 ${i%2===0?'bg-gray-50/50':''} px-2 rounded">
        <span class="flex items-center gap-2"><span class="w-5 h-5 bg-red-50 text-up text-xs rounded flex items-center justify-center font-medium">${i+1}</span><span class="truncate max-w-[100px]" title="${d.name}">${d.name}</span><span class="text-gray-400 text-xs">${d.code}</span></span>
        <span class="text-up font-medium">+${formatNumber(d.changePercent,2)}%</span>
      </div>`).join('') || '<p class="text-gray-400 text-sm py-4 text-center">暂无上涨股票</p>';

    // Render losers list
    losersEl.innerHTML = losers.map((d, i) => `
      <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 ${i%2===0?'bg-gray-50/50':''} px-2 rounded">
        <span class="flex items-center gap-2"><span class="w-5 h-5 bg-green-50 text-down text-xs rounded flex items-center justify-center font-medium">${i+1}</span><span class="truncate max-w-[100px]" title="${d.name}">${d.name}</span><span class="text-gray-400 text-xs">${d.code}</span></span>
        <span class="text-down font-medium">${formatNumber(d.changePercent,2)}%</span>
      </div>`).join('') || '<p class="text-gray-400 text-sm py-4 text-center">暂无下跌股票</p>';
  }).catch(err => {
    console.warn('All-market view refresh failed:', err);
    container.innerHTML = '<div class="text-gray-400 text-sm py-4">全市场数据加载失败，请稍后重试 <button onclick="refreshAllMarketView()" class="text-primary underline ml-2">重试</button></div>';
    gainersEl.innerHTML = '<p class="text-gray-400 text-sm py-4 text-center">加载失败</p>';
    losersEl.innerHTML = '<p class="text-gray-400 text-sm py-4 text-center">加载失败</p>';
  });
}

// ==================== Market Page State ====================
let currentSector = 'semiconductor';

function initMarket() {
  renderSectorTabs();
  updateMarketPage(apiCache);
  initMarketSearch();
  clearMarketSearch();
  // Pre-load full A-share list for search
  loadAllAStockList().catch(() => {});
}

function renderSectorTabs() {
  const tabs = document.getElementById('sector-tabs');
  if (!tabs) return;
  tabs.innerHTML = sectors.map(sec => `
    <button onclick="switchSector('${sec.key}')" class="sector-tab px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${sec.key===currentSector?'bg-primary text-white':'bg-white text-gray-700 border border-border'}"
      data-key="${sec.key}">${sec.name}</button>
  `).join('');
}

let sectorExpandedData = {};
let sectorExpandedLoading = {};

function fetchExpandedSectorQuotes(sectorKey, callback) {
  const expanded = getExpandedSectorStocks(sectorKey);
  if (!expanded.length) {
    if (callback) callback(null, []);
    return;
  }
  sectorExpandedLoading[sectorKey] = true;
  const codes = expanded.map(s => s.c);
  const chunkSize = 60;
  const batches = [];
  for (let i = 0; i < codes.length; i += chunkSize) {
    batches.push(codes.slice(i, i + chunkSize));
  }
  let completed = 0;
  const allData = [];
  batches.forEach(chunk => {
    loadTencentAPI(chunk, (err, data) => {
      completed++;
      if (!err && data) {
        Object.entries(data).forEach(([code, quote]) => {
          if (quote) allData.push({ ...quote, code, sname: quote.name || resolveStockName(code) || code });
        });
      }
      if (completed === batches.length) {
        sectorExpandedData[sectorKey] = allData;
        sectorExpandedLoading[sectorKey] = false;
        if (callback) callback(null, allData);
      }
    });
  });
}

function switchSector(key) {
  currentSector = key;
  renderSectorTabs();
  const expanded = getExpandedSectorStocks(key);
  if (expanded.length > 0 && !sectorExpandedData[key] && !sectorExpandedLoading[key]) {
    fetchExpandedSectorQuotes(key, () => updateMarketPage(apiCache));
  }
  updateMarketPage(apiCache);
}

function renderStockCard(s, d) {
  if (!d) return `
    <div class="min-w-[160px] bg-white rounded-lg shadow border border-border p-3">
      <p class="font-bold">${s.n}</p><p class="text-xs text-gray-500">${s.c}</p>
      <p class="text-gray-400 text-sm mt-2">同步中...</p>
    </div>`;
  const color = d.changePercent >= 0 ? 'text-up' : 'text-down';
  const arrow = d.changePercent >= 0 ? '▲' : '▼';
  return `
    <div class="min-w-[180px] bg-white rounded-lg shadow border border-border p-3 cursor-pointer hover:shadow-md transition">
      <div class="flex justify-between items-start">
        <div>
          <p class="font-bold text-sm">${s.n}</p>
          <p class="text-xs text-gray-500">${s.c}</p>
        </div>
        <span class="text-xs ${color}">${arrow}</span>
      </div>
      <p class="text-xl font-bold my-1 ${color}">${formatNumber(d.price,2)}</p>
      <p class="text-xs ${color}">${d.changePercent>=0?'+':''}${formatNumber(d.changePercent,2)}%</p>
      <div class="mt-2 pt-2 border-t text-xs text-gray-400 space-y-1">
        <div class="flex justify-between"><span>换手</span><span>${formatNumber(d.turnover,2)}%</span></div>
        <div class="flex justify-between"><span>成交</span><span>${formatNumber(d.volumeMoney/10000,2)}亿</span></div>
        <div class="flex justify-between"><span>市值</span><span>${formatNumber(d.marketCap,2)}亿</span></div>
      </div>
      <a href="https://stock.finance.qq.com/sstock/ggcx/${s.c}.shtml" target="_blank" class="block mt-2 text-xs text-primary hover:underline"
        onclick="event.stopPropagation()"
      >数据来源：腾讯财经 ↗</a>
    </div>`;
}

function updateMarketPage(data) {
  const sec = sectors.find(s => s.key === currentSector);
  const container = document.getElementById('stock-cards');
  if (!container || !sec) return;

  // 1. Render curated stocks immediately
  let cardsHtml = sec.stocks.map(s => renderStockCard(s, data[s.c] || apiCache[s.c])).join('');

  // 2. Expanded stocks state
  const expanded = getExpandedSectorStocks(currentSector);
  if (expanded.length > 0) {
    if (sectorExpandedData[currentSector]) {
      const expandedHtml = expanded.map(s => {
        const d = sectorExpandedData[currentSector].find(e => e.code === s.c);
        return d ? renderStockCard(s, d) : '';
      }).join('');
      cardsHtml += expandedHtml;
    } else if (sectorExpandedLoading[currentSector]) {
      cardsHtml += `<div class="min-w-[180px] bg-white rounded-lg shadow border border-border p-3 flex items-center justify-center gap-2"><span class="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span><span class="text-gray-400 text-sm">加载更多${expanded.length}只股票...</span></div>`;
    } else {
      // Auto-trigger fetch on first view
      fetchExpandedSectorQuotes(currentSector, () => updateMarketPage(apiCache));
    }
  }
  container.innerHTML = cardsHtml;

  // 3. Rankings: merge curated + expanded
  const allSectorStocks = sec.stocks.map(s => {
    const d = data[s.c] || apiCache[s.c];
    return d ? { d, s } : null;
  }).filter(Boolean);

  if (sectorExpandedData[currentSector]) {
    sectorExpandedData[currentSector].forEach(e => {
      allSectorStocks.push({ s: { c: e.code, n: e.sname || e.name }, d: e });
    });
  }

  const gainers = [...allSectorStocks].filter(a => a.d.changePercent > 0).sort((a,b) => b.d.changePercent - a.d.changePercent).slice(0, 20);
  const losers = [...allSectorStocks].filter(a => a.d.changePercent < 0).sort((a,b) => a.d.changePercent - b.d.changePercent).slice(0, 20);

  document.getElementById('top-gainers').innerHTML = gainers.map((x, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 ${i%2===0?'bg-gray-50/50':''} px-2 rounded">
      <span class="flex items-center gap-2"><span class="w-5 h-5 bg-red-50 text-up text-xs rounded flex items-center justify-center font-medium">${i+1}</span><span class="truncate max-w-[100px]" title="${x.s.n}">${x.s.n}</span><span class="text-gray-400 text-xs">${x.s.c}</span></span>
      <span class="text-up font-medium">+${formatNumber(x.d.changePercent,2)}%</span>
    </div>`).join('') || '<p class="text-gray-400 text-sm py-4 text-center">暂无上涨股票</p>';

  document.getElementById('top-losers').innerHTML = losers.map((x, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 ${i%2===0?'bg-gray-50/50':''} px-2 rounded">
      <span class="flex items-center gap-2"><span class="w-5 h-5 bg-green-50 text-down text-xs rounded flex items-center justify-center font-medium">${i+1}</span><span class="truncate max-w-[100px]" title="${x.s.n}">${x.s.n}</span><span class="text-gray-400 text-xs">${x.s.c}</span></span>
      <span class="text-down font-medium">${formatNumber(x.d.changePercent,2)}%</span>
    </div>`).join('') || '<p class="text-gray-400 text-sm py-4 text-center">暂无下跌股票</p>';
}

// Resolve stock name from allAStockList or apiCache
function resolveStockName(code) {
  if (allAStockList && allAStockList.length > 0) {
    const found = allAStockList.find(s => s.code === code);
    if (found) return found.name;
  }
  const cached = apiCache[code];
  if (cached && cached.name) return cached.name;
  return null;
}

// ==================== Market Search ====================
let searchAutocompleteTimer = null;
let currentSearchCodes = [];

function initMarketSearch() {
  const input = document.getElementById('market-search');
  const btn = document.getElementById('market-search-btn');
  const clearBtn = document.getElementById('market-clear-btn');
  if (!input || !btn) return;

  btn.addEventListener('click', () => {
    hideSearchAutocomplete();
    doMarketSearch(input.value.trim());
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      hideSearchAutocomplete();
      doMarketSearch(input.value.trim());
    }
    if (e.key === 'Escape') hideSearchAutocomplete();
  });
  // Real-time autocomplete
  input.addEventListener('input', (e) => {
    if (e.isComposing) return; // Skip IME composition events
    clearTimeout(searchAutocompleteTimer);
    const val = input.value.trim();
    if (val.length < 1) { hideSearchAutocomplete(); return; }
    searchAutocompleteTimer = setTimeout(() => renderSearchAutocomplete(val), 150);
  });
  // Hide autocomplete on blur (with delay to allow click)
  input.addEventListener('blur', () => {
    setTimeout(hideSearchAutocomplete, 200);
  });
  if (clearBtn) clearBtn.addEventListener('click', clearMarketSearch);
}

function renderSearchAutocomplete(query) {
  const q = query.toLowerCase().trim();
  if (!q) return;
  const list = allAStockList && allAStockList.length > 0 ? allAStockList : [];
  if (!list.length) return;

  // Find top 8 matches sorted by relevance
  const matches = list
    .map(s => {
      const nameL = s.name.toLowerCase();
      let score = 0;
      if (s.name === query) score = 100;
      else if (nameL === q) score = 95;
      else if (nameL.startsWith(q)) score = 80;
      else if (s.rawCode === query) score = 90;
      else if (s.code.toLowerCase() === q) score = 85;
      else if (nameL.includes(q)) score = 60 + (nameL.indexOf(q) === 0 ? 10 : 0);
      else if (s.rawCode.includes(query)) score = 50;
      else if (s.code.toLowerCase().includes(q)) score = 45;
      return { ...s, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  if (!matches.length) { hideSearchAutocomplete(); return; }

  let dropdown = document.getElementById('market-search-dropdown');
  if (!dropdown) {
    const input = document.getElementById('market-search');
    const wrap = input.closest('.relative') || input.parentElement;
    dropdown = document.createElement('div');
    dropdown.id = 'market-search-dropdown';
    dropdown.className = 'absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-64 overflow-y-auto';
    wrap.style.position = 'relative';
    wrap.appendChild(dropdown);
  }

  dropdown.innerHTML = matches.map(s => `
    <div class="px-4 py-2.5 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-0" onclick="selectSearchResult('${s.code}', '${s.name.replace(/'/g, "\\'")}')">
      <div class="flex items-center gap-2">
        <span class="font-medium text-sm text-gray-800">${s.name}</span>
        <span class="text-xs text-gray-400">${s.code}</span>
      </div>
      <span class="text-xs text-primary">选择</span>
    </div>
  `).join('');
  dropdown.classList.remove('hidden');
}

function hideSearchAutocomplete() {
  const dropdown = document.getElementById('market-search-dropdown');
  if (dropdown) dropdown.classList.add('hidden');
}

function selectSearchResult(code, name) {
  const input = document.getElementById('market-search');
  if (input) input.value = name + ' (' + code + ')';
  hideSearchAutocomplete();
  doMarketSearch(code);
}

function doMarketSearch(query) {
  if (!query) return;
  const results = [];
  const q = query.trim().toLowerCase();
  let directCode = null;

  // Direct code parsing
  if (/^(sh|sz|bj)\d{6}$/.test(q)) {
    directCode = q;
  } else if (/^\d{6}$/.test(q)) {
    directCode = getStockPrefix(q) + q;
  }

  // Search in full A-share list (preferred)
  const list = allAStockList && allAStockList.length > 0 ? allAStockList : [];

  // If list never loaded, trigger async load and show loading state
  if (allAStockList === null) {
    const searchArea = document.getElementById('search-results');
    const sectorArea = document.getElementById('sector-tabs-area');
    const cardsEl = document.getElementById('search-result-cards');
    const clearBtn = document.getElementById('market-clear-btn');
    if (searchArea) searchArea.classList.remove('hidden');
    if (sectorArea) sectorArea.classList.add('hidden');
    if (cardsEl) cardsEl.innerHTML = '<div class="text-gray-400 text-sm py-4 flex items-center gap-2"><span class="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>正在加载全市场股票列表...</div>';
    if (clearBtn) clearBtn.classList.remove('hidden');

    loadAllAStockList().then(() => {
      doMarketSearch(query);
    });
    return;
  }

  if (list.length > 0) {
    const scored = list
      .map(s => {
        const nameL = s.name.toLowerCase();
        let score = 0;
        if (s.name === query.trim()) score = 100;
        else if (nameL === q) score = 95;
        else if (nameL.startsWith(q)) score = 80;
        else if (s.rawCode === query.trim()) score = 90;
        else if (s.code.toLowerCase() === q) score = 85;
        else if (nameL.includes(q)) score = 60;
        else if (s.rawCode.includes(query.trim())) score = 50;
        else if (s.code.toLowerCase().includes(q)) score = 45;
        return { ...s, score };
      })
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);

    scored.forEach(s => {
      if (!results.find(r => r.c === s.code)) {
        results.push({ c: s.code, n: s.name });
      }
    });
  }

  // Fallback to existing 220-stock list if no full list loaded
  if (results.length === 0 && list.length === 0) {
    // Only use findStockCode if query looks like a code (not pure Chinese name)
    if (/^\d/.test(query.trim()) || /^(sh|sz|bj)/i.test(query.trim())) {
      const code = findStockCode(query);
      if (code) {
        const stock = allStocks.find(s => s.c === code);
        if (stock) results.push(stock);
      }
    }
    const fallbackFuzzy = allStocks.filter(s =>
      s.n.toLowerCase().includes(q) || s.c.toLowerCase().includes(q)
    ).slice(0, 20);
    fallbackFuzzy.forEach(s => {
      if (!results.find(r => r.c === s.c)) results.push(s);
    });
  }

  // Add direct code as first result if not already present
  if (directCode && !results.find(r => r.c === directCode)) {
    const named = list.find(s => s.code === directCode);
    const displayName = named ? named.name : (resolveStockName(directCode) || directCode);
    results.unshift({ c: directCode, n: displayName });
  }

  const searchArea = document.getElementById('search-results');
  const sectorArea = document.getElementById('sector-tabs-area');
  const countEl = document.getElementById('search-result-count');
  const cardsEl = document.getElementById('search-result-cards');
  const clearBtn = document.getElementById('market-clear-btn');

  if (results.length === 0) {
    searchArea.classList.remove('hidden');
    sectorArea.classList.add('hidden');
    countEl.textContent = '未找到相关股票';
    cardsEl.innerHTML = '<p class="text-gray-400 text-sm py-4">未找到匹配的股票，请尝试输入完整代码或名称</p>';
    if (clearBtn) clearBtn.classList.remove('hidden');
    return;
  }

  searchArea.classList.remove('hidden');
  sectorArea.classList.add('hidden');
  countEl.textContent = `找到 ${results.length} 只`;
  if (clearBtn) clearBtn.classList.remove('hidden');

  // Save current search state for real-time refresh
  currentSearchCodes = results.map(r => r.c);

  // Fetch real-time data for results via Tencent API
  const codesToFetch = results.map(r => r.c);
  loadTencentAPI(codesToFetch, (err, data) => {
    if (!err) Object.assign(apiCache, data);
    renderSearchResultCards(results, cardsEl);
  });
}

function renderSearchResultCards(results, container) {
  container.innerHTML = results.map(s => {
    // Resolve name from allAStockList or apiCache
    let displayName = s.n;
    if (!displayName || displayName === s.c) {
      displayName = resolveStockName(s.c) || '未知股票';
    }
    const d = apiCache[s.c];
    if (!d || d._failed) {
      const isFailed = d && d._failed;
      return `
        <div class="min-w-[180px] bg-white rounded-lg shadow border border-border p-3">
          <p class="font-bold text-sm">${displayName}</p><p class="text-xs text-gray-500">${s.c}</p>
          <p class="text-gray-400 text-sm mt-2">${isFailed ? '暂无实时数据' : '同步中...'}</p>
          ${isFailed ? `<button onclick="refreshSearchResults()" class="mt-2 text-xs text-primary hover:underline">点击刷新</button>` : ''}
        </div>`;
    }
    const color = d.changePercent >= 0 ? 'text-up' : 'text-down';
    const arrow = d.changePercent >= 0 ? '▲' : '▼';
    return `
      <div class="min-w-[180px] bg-white rounded-lg shadow border border-border p-3 cursor-pointer hover:shadow-md transition">
        <div class="flex justify-between items-start">
          <div>
            <p class="font-bold text-sm">${displayName}</p>
            <p class="text-xs text-gray-500">${s.c}</p>
          </div>
          <span class="text-xs ${color}">${arrow}</span>
        </div>
        <p class="text-xl font-bold my-1 ${color}">${formatNumber(d.price,2)}</p>
        <p class="text-xs ${color}">${d.changePercent>=0?'+':''}${formatNumber(d.changePercent,2)}%</p>
        <div class="mt-2 pt-2 border-t text-xs text-gray-400 space-y-1">
          <div class="flex justify-between"><span>换手</span><span>${formatNumber(d.turnover,2)}%</span></div>
          <div class="flex justify-between"><span>成交</span><span>${formatNumber(d.volumeMoney/10000,2)}亿</span></div>
          <div class="flex justify-between"><span>市值</span><span>${formatNumber(d.marketCap,2)}亿</span></div>
        </div>
        <a href="https://stock.finance.qq.com/sstock/ggcx/${s.c}.shtml" target="_blank" class="block mt-2 text-xs text-primary hover:underline"
          onclick="event.stopPropagation()"
        >数据来源：腾讯财经 ↗</a>
      </div>`;
  }).join('');
}

function refreshSearchResults() {
  if (currentSearchCodes.length === 0) return;
  // Clear failed marks
  currentSearchCodes.forEach(c => {
    if (apiCache[c] && apiCache[c]._failed) delete apiCache[c];
  });
  const cardsEl = document.getElementById('search-result-cards');
  const results = currentSearchCodes.map(c => ({ c, n: resolveStockName(c) || c }));
  loadTencentAPI(currentSearchCodes, (err, data) => {
    if (!err) Object.assign(apiCache, data);
    renderSearchResultCards(results, cardsEl);
  });
}

function clearMarketSearch() {
  const input = document.getElementById('market-search');
  const searchArea = document.getElementById('search-results');
  const sectorArea = document.getElementById('sector-tabs-area');
  const clearBtn = document.getElementById('market-clear-btn');
  if (input) input.value = '';
  if (searchArea) searchArea.classList.add('hidden');
  if (sectorArea) sectorArea.classList.remove('hidden');
  if (clearBtn) clearBtn.classList.add('hidden');
  hideSearchAutocomplete();
  currentSearchCodes = [];
}
