// ==================== News Page ====================
let newsRefreshInterval = null;
let currentNewsTab = 'hotspot';
let newsSectorCache = { gainers: [], losers: [] };
let newsConceptCache = [];
let newsTelegraphBlocked = false;

function initNewsPage() {
  // Setup tab switching
  setupNewsTabs();

  // Load data immediately
  refreshNewsData();

  // Handle telegraph iframe load error (X-Frame-Options)
  setupTelegraphFallback();

  // Start auto-refresh when visible
  if (newsRefreshInterval) clearInterval(newsRefreshInterval);
  newsRefreshInterval = setInterval(() => {
    if (!document.getElementById('news').classList.contains('hidden')) {
      refreshNewsData();
    }
  }, 60000);
}

function setupNewsTabs() {
  const tabs = document.querySelectorAll('.news-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.tab;
      switchNewsTab(key);
    });
  });
}

function switchNewsTab(key) {
  currentNewsTab = key;

  // Update tab styles
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

  // Show/hide panels
  document.querySelectorAll('.news-panel').forEach(panel => {
    panel.classList.add('hidden');
  });
  const activePanel = document.getElementById('news-panel-' + key);
  if (activePanel) activePanel.classList.remove('hidden');
}

function refreshNewsData() {
  loadNewsSectorRanking();
  loadNewsConceptRanking();
  updateNewsSidebarIndex();

  const t = document.getElementById('news-update-time');
  if (t) {
    t.innerHTML = '<span class="w-1.5 h-1.5 bg-green-500 rounded-full live-indicator"></span>更新时间：' + new Date().toLocaleTimeString('zh-CN');
  }
}

// ==================== Sector Ranking (Eastmoney) ====================
function loadNewsSectorRanking() {
  const fields = 'f12,f14,f2,f3,f4,f5,f6,f7,f8,f9,f18,f20,f21';
  const url = `https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=20&po=1&np=1&ut=${EASTMONEY_UT}&fltt=2&invt=2&fid=f3&fs=m:90+t:2&fields=${fields}`;

  fetch(url)
    .then(r => r.json())
    .then(data => {
      if (!data || !data.data || !data.data.diff) return;
      const items = data.data.diff.map(item => {
        const rawCode = item.f12;
        const price = item.f2 === '-' ? 0 : (parseFloat(item.f2) || 0);
        return {
          code: rawCode,
          name: item.f14,
          price: price,
          changePercent: parseFloat(item.f3) || 0,
          changeAmount: parseFloat(item.f4) || 0,
          volume: item.f5 || 0,
          volumeMoney: item.f6 ? item.f6 / 10000 : 0,
          turnover: parseFloat(item.f8) || 0,
          marketCap: item.f20 ? item.f20 / 100000000 : 0
        };
      });
      const gainers = items.filter(i => i.changePercent > 0).sort((a, b) => b.changePercent - a.changePercent);
      const losers = items.filter(i => i.changePercent < 0).sort((a, b) => a.changePercent - b.changePercent);
      newsSectorCache = { gainers, losers };
      renderNewsSectorGainers(gainers.slice(0, 10));
      renderNewsSectorLosers(losers.slice(0, 10));
      renderNewsSidebarSectors(gainers.slice(0, 5));
    })
    .catch(err => {
      console.warn('News sector ranking failed:', err);
    });
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

// ==================== Concept Ranking (Eastmoney) ====================
function loadNewsConceptRanking() {
  const fields = 'f12,f14,f2,f3,f4,f5,f6,f7,f8,f9,f18,f20,f21';
  const url = `https://push2.eastmoney.com/api/qt/clist/get?pn=1&pz=20&po=1&np=1&ut=${EASTMONEY_UT}&fltt=2&invt=2&fid=f3&fs=m:90+t:3&fields=${fields}`;

  fetch(url)
    .then(r => r.json())
    .then(data => {
      if (!data || !data.data || !data.data.diff) return;
      const items = data.data.diff.map(item => {
        const rawCode = item.f12;
        const price = item.f2 === '-' ? 0 : (parseFloat(item.f2) || 0);
        return {
          code: rawCode,
          name: item.f14,
          price: price,
          changePercent: parseFloat(item.f3) || 0,
          changeAmount: parseFloat(item.f4) || 0,
          volume: item.f5 || 0,
          volumeMoney: item.f6 ? item.f6 / 10000 : 0,
          turnover: parseFloat(item.f8) || 0
        };
      });
      newsConceptCache = items;
      renderNewsConceptHot(items.filter(i => i.changePercent > 0).slice(0, 12));
      renderNewsSidebarConcepts(items.filter(i => i.changePercent > 0).slice(0, 5));
    })
    .catch(err => {
      console.warn('News concept ranking failed:', err);
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
function updateNewsSidebarIndex() {
  const el = document.getElementById('news-sidebar-index');
  if (!el) return;
  el.innerHTML = indexList.map(idx => {
    const d = apiCache[idx.code];
    if (!d) return `
      <div class="flex justify-between items-center text-sm py-2 border-b last:border-0">
        <span class="text-gray-600">${idx.name}</span>
        <span class="text-gray-400">--</span>
      </div>`;
    const color = d.changePercent >= 0 ? 'text-up' : 'text-down';
    return `
      <div class="flex justify-between items-center text-sm py-2 border-b last:border-0">
        <span class="text-gray-600">${idx.name}</span>
        <div class="text-right">
          <span class="font-medium ${color}">${formatNumber(d.price, 2)}</span>
          <span class="text-xs ${color} ml-1">${d.changePercent >= 0 ? '+' : ''}${formatNumber(d.changePercent, 2)}%</span>
        </div>
      </div>`;
  }).join('');
}

// ==================== Telegraph Fallback ====================
function setupTelegraphFallback() {
  const iframe = document.getElementById('news-telegraph-frame');
  const wrap = document.getElementById('news-telegraph-frame-wrap');
  const fallback = document.getElementById('news-telegraph-fallback');
  if (!iframe || !wrap || !fallback) return;

  // If iframe fails to load (e.g. X-Frame-Options), show fallback after timeout
  iframe.addEventListener('load', () => {
    // Check if iframe loaded but is empty/blocked
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc || doc.body.innerHTML === '') {
        showTelegraphFallback();
      }
    } catch (e) {
      // Cross-origin error means it's likely blocked
      showTelegraphFallback();
    }
  });

  iframe.addEventListener('error', () => {
    showTelegraphFallback();
  });

  // Fallback timeout: if iframe hasn't loaded meaningful content in 5s, show fallback
  setTimeout(() => {
    if (!newsTelegraphBlocked) {
      // Try to detect if iframe is usable
      try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if (!doc || doc.body.innerHTML === '' || doc.body.children.length === 0) {
          showTelegraphFallback();
        }
      } catch (e) {
        showTelegraphFallback();
      }
    }
  }, 5000);
}

function showTelegraphFallback() {
  if (newsTelegraphBlocked) return;
  newsTelegraphBlocked = true;
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

  const url = `https://np-anotice-stock.eastmoney.com/api/security/ann?sr=-1&page_size=20&page_index=1&ann_type=A&client_source=web&stock_list=${code}`;

  fetch(url)
    .then(r => r.json())
    .then(data => {
      if (!data || !data.data || !Array.isArray(data.data)) {
        resultsEl.innerHTML = '<div class="text-center py-8"><p class="text-gray-400 text-sm">未找到公告数据</p></div>';
        return;
      }
      const list = data.data;
      if (list.length === 0) {
        resultsEl.innerHTML = '<div class="text-center py-8"><p class="text-gray-400 text-sm">该股票暂无公告</p></div>';
        return;
      }
      const stockName = list[0]?.codes?.[0]?.stock_name || code;
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
            const href = artCode ? `https://data.eastmoney.com/notices/detail/${code}/${artCode}.html` : '#';
            return `
              <a href="${href}" target="_blank" class="block p-3 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-sm hover:bg-blue-50/30 transition">
                <p class="text-sm text-gray-800 line-clamp-2">${title}</p>
                <p class="text-xs text-gray-400 mt-1">${date}</p>
              </a>`;
          }).join('')}
        </div>`;
    })
    .catch(err => {
      console.warn('Announcement search failed:', err);
      resultsEl.innerHTML = '<div class="text-center py-8"><p class="text-gray-400 text-sm">查询失败，请稍后重试</p></div>';
    });
}
