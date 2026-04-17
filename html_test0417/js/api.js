// Tencent Finance API wrapper (JSONP via script injection)
let apiCache = {};
let apiCallbacks = {};
let apiScriptId = 0;

function loadTencentAPI(codes, callback) {
  const id = 'tencent_api_' + (++apiScriptId);
  const url = 'https://qt.gtimg.cn/q=' + codes.join(',');
  const script = document.createElement('script');
  script.id = id;
  script.src = url;
  script.onerror = () => {
    cleanup(id);
    callback(new Error('API load failed'), null);
  };
  script.onload = () => {
    cleanup(id);
    const result = {};
    codes.forEach(code => {
      const varName = 'v_' + code.toLowerCase().replace(/\./g, '_');
      if (typeof window[varName] !== 'undefined') {
        result[code] = parseTencentData(window[varName]);
        apiCache[code] = result[code];
        try { delete window[varName]; } catch(e) {}
      } else {
        result[code] = apiCache[code] || null;
      }
    });
    callback(null, result);
  };
  document.head.appendChild(script);
  setTimeout(() => {
    const s = document.getElementById(id);
    if (s) { cleanup(id); callback(new Error('API timeout'), null); }
  }, 10000);
}

function cleanup(id) {
  const s = document.getElementById(id);
  if (s && s.parentNode) s.parentNode.removeChild(s);
}

function parseTencentData(raw) {
  if (!raw || typeof raw !== 'string') return null;
  const parts = raw.split('~');
  // Typical format: v_sh600519="1~贵州茅台~600519~1680.50~..."
  // indices based on common Tencent API format
  return {
    name: parts[1] || '',
    code: parts[2] || '',
    price: parseFloat(parts[3]) || 0,
    close: parseFloat(parts[4]) || 0, // yesterday close
    open: parseFloat(parts[5]) || 0,
    volume: parseFloat(parts[6]) || 0,
    high: parseFloat(parts[33]) || 0,
    low: parseFloat(parts[34]) || 0,
    changeAmount: parseFloat(parts[31]) || 0,
    changePercent: parseFloat(parts[32]) || 0,
    turnover: parseFloat(parts[38]) || 0, // turnover rate %
    pe: parseFloat(parts[39]) || 0,
    marketCap: parseFloat(parts[44]) || 0, // 亿
    volumeMoney: (parseFloat(parts[37]) || 0) / 10000 // 亿
  };
}

function initAPI() {
  refreshAllQuotes();
  setInterval(refreshAllQuotes, 30000);
}

function refreshAllQuotes() {
  const allCodes = indexList.map(i => i.code).concat(allStocks.map(s => s.c));
  // Batch in chunks of 60 to keep URL short
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
}

function getStockData(code) {
  return apiCache[code] || null;
}

function updateTicker(data) {
  const container = document.getElementById('ticker-tape');
  if (!container) return;
  // Build items from index + sample stocks
  const items = [];
  indexList.forEach(idx => {
    const d = data[idx.code] || apiCache[idx.code];
    if (d) items.push(renderTickerItem(idx.name, d));
  });
  // Add top 10 stocks by abs change
  const stockArr = allStocks.map(s => {
    const d = data[s.c] || apiCache[s.c];
    return d ? { ...d, code: s.c, sname: s.n } : null;
  }).filter(Boolean).sort((a,b) => Math.abs(b.changePercent) - Math.abs(a.changePercent)).slice(0, 10);
  stockArr.forEach(d => items.push(renderTickerItem(d.sname, d)));
  if (items.length === 0) {
    container.innerHTML = '<span class="text-gray-400">行情同步中...</span>';
    return;
  }
  // Duplicate for seamless loop
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

// Market page state
let currentSector = 'semiconductor';

function initMarket() {
  renderSectorTabs();
  updateMarketPage(apiCache);
  initMarketSearch();
  // Reset search state when navigating to market
  clearMarketSearch();
}

function renderSectorTabs() {
  const tabs = document.getElementById('sector-tabs');
  if (!tabs) return;
  tabs.innerHTML = sectors.map(sec => `
    <button onclick="switchSector('${sec.key}')" class="sector-tab px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${sec.key===currentSector?'bg-primary text-white':'bg-white text-gray-700 border border-border'}"
      data-key="${sec.key}">${sec.name}</button>
  `).join('');
}

function switchSector(key) {
  currentSector = key;
  renderSectorTabs();
  updateMarketPage(apiCache);
}

function updateMarketPage(data) {
  const sec = sectors.find(s => s.key === currentSector);
  const container = document.getElementById('stock-cards');
  if (!container || !sec) return;
  container.innerHTML = sec.stocks.map(s => {
    const d = data[s.c] || apiCache[s.c];
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
  }).join('');

  // Gainers / losers from CURRENT SECTOR only, top 20 each
  const sectorArr = sec.stocks.map(s => {
    const d = data[s.c] || apiCache[s.c];
    return d ? { ...d, s } : null;
  }).filter(Boolean);
  const gainers = [...sectorArr].filter(a => a.changePercent > 0).sort((a,b) => b.changePercent - a.changePercent).slice(0, 20);
  const losers = [...sectorArr].filter(a => a.changePercent < 0).sort((a,b) => a.changePercent - b.changePercent).slice(0, 20);

  document.getElementById('top-gainers').innerHTML = gainers.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 ${i%2===0?'bg-gray-50/50':''} px-2 rounded">
      <span class="flex items-center gap-2"><span class="w-5 h-5 bg-red-50 text-up text-xs rounded flex items-center justify-center font-medium">${i+1}</span><span class="truncate max-w-[100px]" title="${d.s.n}">${d.s.n}</span><span class="text-gray-400 text-xs">${d.s.c}</span></span>
      <span class="text-up font-medium">+${formatNumber(d.changePercent,2)}%</span>
    </div>`).join('') || '<p class="text-gray-400 text-sm py-4 text-center">暂无上涨股票</p>';

  document.getElementById('top-losers').innerHTML = losers.map((d, i) => `
    <div class="flex justify-between items-center text-sm py-1.5 border-b last:border-0 ${i%2===0?'bg-gray-50/50':''} px-2 rounded">
      <span class="flex items-center gap-2"><span class="w-5 h-5 bg-green-50 text-down text-xs rounded flex items-center justify-center font-medium">${i+1}</span><span class="truncate max-w-[100px]" title="${d.s.n}">${d.s.n}</span><span class="text-gray-400 text-xs">${d.s.c}</span></span>
      <span class="text-down font-medium">${formatNumber(d.changePercent,2)}%</span>
    </div>`).join('') || '<p class="text-gray-400 text-sm py-4 text-center">暂无下跌股票</p>';
}

// Market search
function initMarketSearch() {
  const input = document.getElementById('market-search');
  const btn = document.getElementById('market-search-btn');
  const clearBtn = document.getElementById('market-clear-btn');
  if (!input || !btn) return;

  btn.addEventListener('click', () => doMarketSearch(input.value.trim()));
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doMarketSearch(input.value.trim()); });
  if (clearBtn) clearBtn.addEventListener('click', clearMarketSearch);
}

function doMarketSearch(query) {
  if (!query) return;
  const code = findStockCode(query);
  const results = [];

  // Only search within allStocks (our 220-stock universe)
  if (code) {
    const stock = allStocks.find(s => s.c === code);
    if (stock) results.push(stock);
  }
  // Always do fuzzy name/code search within allStocks
  const q = query.toLowerCase();
  const fuzzy = allStocks.filter(s =>
    s.n.toLowerCase().includes(q) || s.c.toLowerCase().includes(q)
  ).slice(0, 10);
  fuzzy.forEach(s => {
    if (!results.find(r => r.c === s.c)) results.push(s);
  });

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

  cardsEl.innerHTML = results.map(s => {
    const d = apiCache[s.c];
    if (!d) return `
      <div class="min-w-[180px] bg-white rounded-lg shadow border border-border p-3">
        <p class="font-bold text-sm">${s.n}</p><p class="text-xs text-gray-500">${s.c}</p>
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
  }).join('');
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
}
