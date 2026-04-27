// Funds Data & Page Logic
const fundCategories = ['全部', '股票型', '混合型', '债券型', '指数型', 'QDII', '货币型'];
let currentFundCategory = '全部';
let fundQuoteCache = {};
let allFundsFullCache = null;
let allFundsFullPromise = null;
let fundAliasesCache = null;
let fundAliasesPromise = null;
const FUND_PAGE_SIZE = 40;
let fundCurrentPage = 1;

function getFundAliases() {
  if (fundAliasesCache) return Promise.resolve(fundAliasesCache);
  if (fundAliasesPromise) return fundAliasesPromise;
  fundAliasesPromise = fetch('./js/fund-aliases.json')
    .then(r => r.ok ? r.json() : {})
    .then(data => { fundAliasesCache = data || {}; return fundAliasesCache; })
    .catch(err => { console.warn('Failed to load fund aliases:', err); fundAliasesCache = {}; return {}; });
  return fundAliasesPromise;
}

const curatedFunds = [
  // 股票型
  { code: 'of000001', name: '华夏成长混合', category: '股票型', manager: '王泽实', since: '2001-12-18' },
  { code: 'of110022', name: '易方达消费行业', category: '股票型', manager: '萧楠', since: '2010-08-20' },
  { code: 'of260108', name: '景顺长城新兴成长', category: '股票型', manager: '刘彦春', since: '2006-06-28' },
  { code: 'of163406', name: '兴全合润混合', category: '股票型', manager: '谢治宇', since: '2010-04-22' },
  { code: 'of001938', name: '中欧时代先锋', category: '股票型', manager: '周蔚文', since: '2015-11-03' },
  { code: 'of002190', name: '农银新能源主题', category: '股票型', manager: '邢军亮', since: '2016-03-29' },
  { code: 'of006098', name: '广发中证500ETF联接', category: '股票型', manager: '刘杰', since: '2018-09-11' },
  { code: 'of000083', name: '汇添富消费行业', category: '股票型', manager: '胡昕炜', since: '2013-05-03' },
  { code: 'of001975', name: '景顺长城沪港深精选', category: '股票型', manager: '鲍无可', since: '2015-04-15' },
  { code: 'of005911', name: '广发双擎升级', category: '股票型', manager: '刘格菘', since: '2018-11-02' },

  // 混合型
  { code: 'of161005', name: '富国天惠成长混合', category: '混合型', manager: '朱少醒', since: '2005-11-16' },
  { code: 'of163406', name: '兴全合润混合', category: '混合型', manager: '谢治宇', since: '2010-04-22' },
  { code: 'of001938', name: '中欧时代先锋', category: '混合型', manager: '周蔚文', since: '2015-11-03' },
  { code: 'of166002', name: '中欧新蓝筹', category: '混合型', manager: '周蔚文', since: '2008-07-25' },
  { code: 'of519732', name: '交银定期支付双息', category: '混合型', manager: '杨浩', since: '2013-09-04' },
  { code: 'of001714', name: '工银文体产业', category: '混合型', manager: '袁芳', since: '2015-12-30' },
  { code: 'of002001', name: '华夏回报混合', category: '混合型', manager: '蔡向阳', since: '2003-09-05' },
  { code: 'of070002', name: '嘉实增长混合', category: '混合型', manager: '邵健', since: '2003-07-09' },
  { code: 'of001410', name: '信达澳银新能源', category: '混合型', manager: '冯明远', since: '2015-07-31' },
  { code: 'of005827', name: '易方达蓝筹精选', category: '混合型', manager: '张坤', since: '2018-09-05' },

  // 债券型
  { code: 'of110007', name: '易方达稳健收益', category: '债券型', manager: '胡剑', since: '2005-09-19' },
  { code: 'of217022', name: '招商产业债券', category: '债券型', manager: '马龙', since: '2012-03-21' },
  { code: 'of000171', name: '富国信用债', category: '债券型', manager: '黄纪亮', since: '2013-06-25' },
  { code: 'of000032', name: '易方达信用债', category: '债券型', manager: '胡剑', since: '2013-04-24' },
  { code: 'of002705', name: '中欧强债', category: '债券型', manager: '黄华', since: '2016-05-17' },
  { code: 'of003547', name: '鹏华丰禄', category: '债券型', manager: '刘涛', since: '2016-11-17' },
  { code: 'of001868', name: '招商招旭纯债', category: '债券型', manager: '郭敏', since: '2016-03-15' },
  { code: 'of006962', name: '鹏华丰享', category: '债券型', manager: '方昶', since: '2019-06-19' },
  { code: 'of002775', name: '博时景兴纯债', category: '债券型', manager: '程卓', since: '2016-05-20' },
  { code: 'of006804', name: '嘉实超短债', category: '债券型', manager: '李金灿', since: '2019-01-24' },

  // 指数型
  { code: 'sh510300', name: '华泰柏瑞沪深300ETF', category: '指数型', manager: '柳军', since: '2012-05-04' },
  { code: 'sh510500', name: '南方中证500ETF', category: '指数型', manager: '罗文杰', since: '2013-02-06' },
  { code: 'sh510050', name: '华夏上证50ETF', category: '指数型', manager: '张弘弢', since: '2004-12-30' },
  { code: 'sh588000', name: '华夏上证科创板50ETF', category: '指数型', manager: '张弘弢', since: '2020-09-28' },
  { code: 'sz159915', name: '易方达创业板ETF', category: '指数型', manager: '成曦', since: '2011-09-20' },
  { code: 'sh512000', name: '华宝券商ETF', category: '指数型', manager: '丰晨成', since: '2016-08-30' },
  { code: 'sh512690', name: '鹏华酒ETF', category: '指数型', manager: '张羽翔', since: '2019-04-04' },
  { code: 'sh512480', name: '国联安半导体ETF', category: '指数型', manager: '黄欣', since: '2019-05-08' },
  { code: 'sh515030', name: '华夏新能源车ETF', category: '指数型', manager: '李俊', since: '2020-02-20' },
  { code: 'sh515790', name: '华夏光伏ETF', category: '指数型', manager: '李俊', since: '2020-12-01' },

  // QDII
  { code: 'of040046', name: '华安纳斯达克100指数', category: 'QDII', manager: '倪斌', since: '2013-08-02' },
  { code: 'of050025', name: '博时标普500ETF联接', category: 'QDII', manager: '万琼', since: '2012-06-14' },
  { code: 'of000614', name: '华安德国30(DAX)ETF联接', category: 'QDII', manager: '倪斌', since: '2014-08-12' },
  { code: 'of096001', name: '大成标普500等权重', category: 'QDII', manager: '刘淼', since: '2011-03-23' },
  { code: 'of110031', name: '易方达恒生国企ETF联接', category: 'QDII', manager: '余海燕', since: '2012-08-21' },
  { code: 'of164906', name: '交银中证海外中国互联网', category: 'QDII', manager: '蔡铮', since: '2015-05-27' },
  { code: 'of006327', name: '易方达中概互联50ETF联接', category: 'QDII', manager: '余海燕', since: '2018-07-31' },
  { code: 'of001092', name: '广发生物科技指数人民币', category: 'QDII', manager: '刘杰', since: '2015-03-30' },

  // 货币型
  { code: 'of000198', name: '天弘余额宝货币', category: '货币型', manager: '王昌俊', since: '2013-05-29' },
  { code: 'of110006', name: '易方达货币A', category: '货币型', manager: '石大怿', since: '2005-02-02' },
  { code: 'of003474', name: '南方天天利货币A', category: '货币型', manager: '夏晨曦', since: '2016-10-21' },
  { code: 'of000569', name: '招商招钱宝货币A', category: '货币型', manager: '曹晋', since: '2014-03-25' },
  { code: 'of000700', name: '泰达宏利货币A', category: '货币型', manager: '王靖', since: '2014-07-18' },
  { code: 'of000981', name: '景顺长城景益货币A', category: '货币型', manager: '陈威霖', since: '2014-12-16' },
  { code: 'of002657', name: '招商招利宝货币A', category: '货币型', manager: '曹晋', since: '2016-04-20' },
  { code: 'of000343', name: '华夏财富宝货币A', category: '货币型', manager: '周飞', since: '2013-10-25' }
];

function initFunds() {
  renderFundTabs();
  renderFundWatchlist();
  renderFundCards();
  loadFundQuotes();
  renderFundRankings();
  // Pre-load aliases in background
  getFundAliases().catch(() => {});
}

function renderFundTabs() {
  const container = document.getElementById('fund-tabs');
  if (!container) return;
  container.innerHTML = fundCategories.map(cat => {
    const active = cat === currentFundCategory ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:text-primary hover:border-primary border border-gray-200';
    return `<button onclick="switchFundCategory('${cat}')" class="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${active}">${cat}</button>`;
  }).join('');
}

function switchFundCategory(cat) {
  currentFundCategory = cat;
  fundCurrentPage = 1;
  renderFundTabs();
  renderFundCards();
  loadFundQuotes();
  renderFundRankings();
}

function getAllFundsFull() {
  if (allFundsFullCache) return Promise.resolve(allFundsFullCache);
  if (allFundsFullPromise) return allFundsFullPromise;

  allFundsFullPromise = fetch('./js/all-funds-full.json')
    .then(r => {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    })
    .then(data => {
      allFundsFullCache = data;
      console.log('Loaded full fund list:', data.length);
      return data;
    })
    .catch(err => {
      console.warn('Failed to load full fund list:', err);
      allFundsFullPromise = null;
      return null;
    });
  return allFundsFullPromise;
}

function getFilteredFunds() {
  const rawQuery = (document.getElementById('fund-search')?.value || '').trim();
  const query = rawQuery.toLowerCase();
  // Default: show only curated funds (lightweight)
  let list = curatedFunds;

  if (query) {
    // Search mode: prefer full list if cached, fallback to sampled allFunds
    if (allFundsFullCache) {
      list = allFundsFullCache;
    } else if (typeof allFunds !== 'undefined' && Array.isArray(allFunds)) {
      list = allFunds;
    }
  }

  if (currentFundCategory !== '全部') {
    list = list.filter(f => f.category === currentFundCategory);
  }
  if (query) {
    // Build curated code set for highlighting
    const curatedCodes = new Set(curatedFunds.map(cf => cf.code));
    list = list.filter(f => {
      const nameL = f.name.toLowerCase();
      const codeL = f.code.toLowerCase();
      // Match name or code
      if (nameL.includes(query) || codeL.includes(query)) return true;
      // Match share class (e.g. search "C" matches all C-class funds)
      if (f.shareClass && f.shareClass.toLowerCase() === query) return true;
      // Match aliases
      if (fundAliasesCache && fundAliasesCache[f.code]) {
        const aliases = fundAliasesCache[f.code];
        if (aliases.some(a => a.toLowerCase().includes(query))) return true;
      }
      return false;
    }).map(f => {
      // Tag curated funds for UI badge
      return { ...f, isCurated: curatedCodes.has(f.code) };
    });
  } else {
    // Default view: tag curated funds
    const curatedCodes = new Set(curatedFunds.map(cf => cf.code));
    list = list.map(f => ({ ...f, isCurated: curatedCodes.has(f.code) }));
  }
  return list;
}

function getShareClassBadgeClass(sc) {
  if (!sc || sc === '无') return 'bg-gray-100 text-gray-500';
  if (sc === 'A') return 'bg-blue-100 text-blue-600';
  if (sc === 'B') return 'bg-purple-100 text-purple-600';
  if (sc === 'C') return 'bg-orange-100 text-orange-600';
  if (sc === 'E') return 'bg-pink-100 text-pink-600';
  if (sc === 'I') return 'bg-teal-100 text-teal-600';
  return 'bg-gray-100 text-gray-500';
}

function renderFundCards() {
  const container = document.getElementById('fund-cards');
  if (!container) return;
  const allFunds = getFilteredFunds();
  if (allFunds.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400"><p class="text-lg mb-2">未找到匹配的基金</p><p class="text-sm">请尝试其他关键词或分类</p></div>`;
    return;
  }
  const totalPages = Math.ceil(allFunds.length / FUND_PAGE_SIZE);
  const funds = allFunds.slice(0, fundCurrentPage * FUND_PAGE_SIZE);
  let html = funds.map((f, i) => {
    const q = fundQuoteCache[f.code];
    const price = q ? formatNumber(q.price, 4) : '--';
    const change = q ? q.changePercent : null;
    const changeStr = change !== null ? (change >= 0 ? '+' : '') + formatNumber(change, 2) + '%' : '--';
    const changeClass = change !== null ? (change >= 0 ? 'text-up' : 'text-down') : 'text-gray-400';
    const bgClass = change !== null ? (change >= 0 ? 'bg-red-50' : 'bg-green-50') : 'bg-gray-50';
    const isWatched = isInWatchlist('funds', f.code);
    const starBtn = `<button onclick="event.stopPropagation(); toggleWatchlist('funds', '${f.code}', '${f.name.replace(/'/g, "\\'")}');" class="${isWatched ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'} transition p-0.5" title="${isWatched ? '移除自选' : '加入自选'}">
      <svg class="w-4 h-4" fill="${isWatched ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
      </svg>
    </button>`;
    const shareClassBadge = (f.shareClass && f.shareClass !== '无')
      ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-medium ${getShareClassBadgeClass(f.shareClass)} ml-1">${f.shareClass}</span>`
      : '';
    const curatedBadge = f.isCurated
      ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-100 text-amber-600 ml-1">精选</span>`
      : '';
    return `
      <div onclick="showFundDetail('${f.code}')" class="card-gradient p-5 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 stagger-card relative cursor-pointer" style="animation-delay:${(i%8)*0.05}s">
        <div class="absolute top-3 right-3">${starBtn}</div>
        <div class="flex items-start justify-between mb-3 pr-6">
          <div class="min-w-0">
            <h4 class="font-bold text-gray-800 truncate" title="${f.name}">${f.name}${shareClassBadge}${curatedBadge}</h4>
            <p class="text-xs text-gray-400 mt-0.5">${f.code}</p>
          </div>
          <span class="px-2 py-0.5 rounded-lg text-xs font-medium ${getCategoryBadgeClass(f.category)}">${f.category}</span>
        </div>
        <div class="flex items-end justify-between mb-3">
          <div>
            <p class="text-xs text-gray-400 mb-1">最新净值</p>
            <p class="text-2xl font-bold ${changeClass}">${price}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-400 mb-1">日涨跌</p>
            <span class="inline-block px-2.5 py-1 rounded-lg text-sm font-bold ${bgClass} ${changeClass}">${changeStr}</span>
          </div>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
          <span>${f.manager ? '基金经理: ' + f.manager : ''}</span>
          <span>${f.since ? '成立: ' + f.since.split('-')[0] : ''}</span>
        </div>
      </div>
    `;
  }).join('');

  if (fundCurrentPage < totalPages) {
    html += `
      <div class="col-span-full flex justify-center py-4">
        <button onclick="loadMoreFunds()" class="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:text-primary hover:border-primary hover:bg-blue-50 transition shadow-sm">
          加载更多 (${funds.length} / ${allFunds.length})
        </button>
      </div>
    `;
  }

  container.innerHTML = html;
}

function getCategoryBadgeClass(cat) {
  const map = {
    '股票型': 'bg-red-50 text-red-600',
    '混合型': 'bg-purple-50 text-purple-600',
    '债券型': 'bg-amber-50 text-amber-600',
    '指数型': 'bg-blue-50 text-blue-600',
    'QDII': 'bg-indigo-50 text-indigo-600',
    '货币型': 'bg-emerald-50 text-emerald-600'
  };
  return map[cat] || 'bg-gray-50 text-gray-600';
}

function loadFundQuotes() {
  const funds = getFilteredFunds();
  const wl = loadWatchlist();
  const watchlistCodes = wl.funds.map(f => f.code);
  // Include visible funds + watchlist funds
  const visibleCount = Math.min(funds.length, fundCurrentPage * FUND_PAGE_SIZE);
  const codes = funds.slice(0, visibleCount).map(f => f.code).concat(watchlistCodes);
  const uniqueCodes = [...new Set(codes)];
  if (uniqueCodes.length === 0) return;
  const chunkSize = 40;
  for (let i = 0; i < uniqueCodes.length; i += chunkSize) {
    const chunk = uniqueCodes.slice(i, i + chunkSize);
    loadTencentAPI(chunk, (err, data) => {
      if (err) {
        console.warn('Fund quote load failed:', err);
        return;
      }
      Object.assign(fundQuoteCache, data);
      renderFundCards();
      renderFundRankings();
      renderFundWatchlist();
    });
  }
}

function renderFundRankings() {
  const container = document.getElementById('fund-rankings');
  if (!container) return;
  const RANKING_COUNT = 20;
  const pool = (typeof allFunds !== 'undefined' && Array.isArray(allFunds)) ? allFunds : curatedFunds;
  const funds = currentFundCategory === '全部'
    ? pool.filter(f => f.category !== '货币型')
    : pool.filter(f => f.category === currentFundCategory);
  const withQuotes = funds.map(f => {
    const q = fundQuoteCache[f.code];
    return { ...f, changePercent: q ? q.changePercent : null };
  }).filter(f => f.changePercent !== null);
  const sorted = withQuotes.sort((a, b) => b.changePercent - a.changePercent);
  const topGainers = sorted.slice(0, RANKING_COUNT);
  const topLosers = sorted.slice(-RANKING_COUNT).reverse();

  container.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
        <h3 class="font-bold mb-3 text-up flex items-center gap-2">
          <span class="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd"/></svg></span>
          ${currentFundCategory === '全部' ? '基金' : currentFundCategory}涨幅榜
        </h3>
        <div class="space-y-2 max-h-[500px] overflow-y-auto pr-1">${topGainers.map((f, i) => renderRankingRow(f, i + 1, true)).join('')}</div>
      </div>
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
        <h3 class="font-bold mb-3 text-down flex items-center gap-2">
          <span class="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1V9a1 1 0 112 0v2.586l4.293-4.293a1 1 0 011.414 0L16 9.586V7a1 1 0 112 0v5a1 1 0 01-1 1h-5z" clip-rule="evenodd"/></svg></span>
          ${currentFundCategory === '全部' ? '基金' : currentFundCategory}跌幅榜
        </h3>
        <div class="space-y-2 max-h-[500px] overflow-y-auto pr-1">${topLosers.map((f, i) => renderRankingRow(f, i + 1, false)).join('')}</div>
      </div>
    </div>
  `;
}

function renderRankingRow(f, rank, isUp) {
  const color = f.changePercent >= 0 ? 'text-up' : 'text-down';
  const badgeBg = rank <= 3 ? (isUp ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700') : 'bg-gray-100 text-gray-500';
  return `
    <div class="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition">
      <div class="flex items-center gap-3 min-w-0">
        <span class="w-6 h-6 flex items-center justify-center rounded-md text-xs font-bold ${badgeBg}">${rank}</span>
        <div class="min-w-0">
          <p class="font-medium text-sm truncate" title="${f.name}">${f.name}</p>
          <p class="text-xs text-gray-400">${f.code}</p>
        </div>
      </div>
      <span class="font-bold text-sm ${color}">${f.changePercent >= 0 ? '+' : ''}${formatNumber(f.changePercent, 2)}%</span>
    </div>
  `;
}

function loadMoreFunds() {
  fundCurrentPage++;
  renderFundCards();
  loadFundQuotes();
}

function doFundSearch() {
  fundCurrentPage = 1;
  const query = (document.getElementById('fund-search')?.value || '').trim().toLowerCase();
  const needsFull = query && !allFundsFullCache && !allFundsFullPromise;
  const needsAliases = query && !fundAliasesCache && !fundAliasesPromise;
  if (needsFull || needsAliases) {
    // First search: lazy-load full fund list + aliases
    const container = document.getElementById('fund-cards');
    if (container) {
      container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400"><p class="text-lg mb-2">正在加载全市场基金数据...</p><p class="text-sm">首次搜索约需1-2秒，请稍候</p></div>`;
    }
    Promise.all([
      needsFull ? getAllFundsFull() : Promise.resolve(),
      needsAliases ? getFundAliases() : Promise.resolve()
    ]).then(() => {
      renderFundCards();
      loadFundQuotes();
      renderFundRankings();
    });
    return;
  }
  renderFundCards();
  loadFundQuotes();
  renderFundRankings();
  startFundRefresh();
}

let fundRefreshInterval = null;

function startFundRefresh() {
  if (fundRefreshInterval) clearInterval(fundRefreshInterval);
  fundRefreshInterval = setInterval(() => {
    if (!document.getElementById('funds').classList.contains('hidden')) {
      loadFundQuotes();
    }
  }, 60000);
}

function stopFundRefresh() {
  if (fundRefreshInterval) {
    clearInterval(fundRefreshInterval);
    fundRefreshInterval = null;
  }
}

// ========== Fund Detail Modal ==========
let currentFundDetailCode = null;
let currentFundDetailTab = 'chart';
let fundDetailHistoryCache = {};

function showFundDetail(code) {
  currentFundDetailCode = code;
  currentFundDetailTab = 'chart';
  const modal = document.getElementById('fund-detail-modal');
  if (!modal) return;

  // Resolve fund info
  let fund = null;
  if (typeof allFundsFullCache !== 'undefined' && allFundsFullCache) {
    fund = allFundsFullCache.find(f => f.code === code);
  }
  if (!fund && typeof allFunds !== 'undefined' && Array.isArray(allFunds)) {
    fund = allFunds.find(f => f.code === code);
  }
  if (!fund) {
    fund = curatedFunds.find(f => f.code === code);
  }
  if (!fund) return;

  document.getElementById('fund-detail-name').textContent = fund.name;
  document.getElementById('fund-detail-code').textContent = fund.code + (fund.shareClass && fund.shareClass !== '无' ? '  |  ' + fund.shareClass + '类份额' : '');

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  renderFundDetailTab();
}

function closeFundDetail() {
  const modal = document.getElementById('fund-detail-modal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
  currentFundDetailCode = null;
}

function switchFundDetailTab(tab) {
  currentFundDetailTab = tab;
  ['chart', 'info', 'dca'].forEach(t => {
    const btn = document.getElementById('fund-tab-' + t);
    if (btn) {
      if (t === tab) {
        btn.className = 'px-4 py-3 text-sm font-medium border-b-2 border-primary text-primary';
      } else {
        btn.className = 'px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700';
      }
    }
  });
  renderFundDetailTab();
}

function renderFundDetailTab() {
  const container = document.getElementById('fund-detail-content');
  if (!container || !currentFundDetailCode) return;
  if (currentFundDetailTab === 'chart') {
    renderFundDetailChartTab(container);
  } else if (currentFundDetailTab === 'info') {
    renderFundDetailInfoTab(container);
  } else if (currentFundDetailTab === 'dca') {
    renderFundDetailDCATab(container);
  }
}

function renderFundDetailChartTab(container) {
  container.innerHTML = `
    <div class="mb-4 flex items-center justify-between">
      <div class="flex gap-2">
        <button onclick="loadFundHistoryMonths(3)" class="px-3 py-1 text-xs rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition">近3月</button>
        <button onclick="loadFundHistoryMonths(6)" class="px-3 py-1 text-xs rounded-lg border border-primary text-primary bg-blue-50">近6月</button>
        <button onclick="loadFundHistoryMonths(12)" class="px-3 py-1 text-xs rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition">近1年</button>
        <button onclick="loadFundHistoryMonths(36)" class="px-3 py-1 text-xs rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition">近3年</button>
      </div>
    </div>
    <div id="fund-detail-chart" class="w-full h-[360px] rounded-xl bg-gray-50"></div>
    <div id="fund-detail-chart-loading" class="text-center py-12 text-gray-400">
      <p class="text-sm">正在加载历史净值数据...</p>
    </div>
  `;
  loadFundHistoryMonths(6);
}

function loadFundHistoryMonths(months) {
  const chartContainer = document.getElementById('fund-detail-chart');
  const loadingEl = document.getElementById('fund-detail-chart-loading');
  if (!currentFundDetailCode) return;

  // Highlight active button
  const btns = chartContainer?.parentElement?.querySelectorAll('button');
  btns?.forEach(b => {
    const m = parseInt(b.textContent.replace(/[^0-9]/g, '') || 6);
    if (m === months) {
      b.className = 'px-3 py-1 text-xs rounded-lg border border-primary text-primary bg-blue-50';
    } else {
      b.className = 'px-3 py-1 text-xs rounded-lg border border-gray-200 hover:border-primary hover:text-primary transition';
    }
  });

  if (loadingEl) loadingEl.style.display = 'block';

  fetchFundHistory(currentFundDetailCode, months).then(data => {
    if (loadingEl) loadingEl.style.display = 'none';
    if (!data || data.length === 0) {
      if (chartContainer) chartContainer.innerHTML = '<div class="text-center py-12 text-gray-400 text-sm">暂无历史净值数据</div>';
      return;
    }
    renderFundChart('fund-detail-chart', data);
  }).catch(err => {
    console.warn('Failed to load fund history:', err);
    if (loadingEl) loadingEl.style.display = 'none';
    if (chartContainer) chartContainer.innerHTML = '<div class="text-center py-12 text-gray-400 text-sm">加载失败，请稍后重试</div>';
  });
}

function fetchFundHistory(code, months) {
  const cacheKey = code + '_' + months;
  if (fundDetailHistoryCache[cacheKey]) return Promise.resolve(fundDetailHistoryCache[cacheKey]);

  const rawCode = code.replace(/^(of|sh|sz|bj)/, '');
  const per = Math.min(months * 22, 500); // roughly 22 trading days per month
  const url = `https://fundf10.eastmoney.com/F10DataApi.aspx?type=lsjz&code=${rawCode}&page=1&per=${per}`;

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callbackName = 'fundHist_' + rawCode + '_' + Date.now();
    window[callbackName] = function (result) {
      document.head.removeChild(script);
      delete window[callbackName];
      try {
        const data = parseFundHistory(result);
        fundDetailHistoryCache[cacheKey] = data;
        resolve(data);
      } catch (e) {
        reject(e);
      }
    };
    script.src = url + '&callback=' + callbackName;
    script.onerror = () => {
      document.head.removeChild(script);
      delete window[callbackName];
      reject(new Error('Script load error'));
    };
    document.head.appendChild(script);

    // Fallback: some Eastmoney APIs ignore callback, use timeout with direct fetch
    setTimeout(() => {
      if (window[callbackName]) {
        // Try direct fetch as fallback
        fetch(url).then(r => r.text()).then(text => {
          try {
            const data = parseFundHistory(text);
            fundDetailHistoryCache[cacheKey] = data;
            resolve(data);
          } catch (e) {
            // If callback hasn't fired either, reject
          }
        }).catch(() => {});
      }
    }, 3000);

    // Hard timeout
    setTimeout(() => {
      if (window[callbackName]) {
        delete window[callbackName];
        if (document.head.contains(script)) document.head.removeChild(script);
        reject(new Error('Timeout'));
      }
    }, 8000);
  });
}

function parseFundHistory(raw) {
  // Eastmoney returns: var apidata={ content:"...", records:123, pages:1, curpage:1 };
  // content is HTML table rows
  if (!raw) return [];
  let text = raw;
  if (typeof raw === 'object' && raw.content) {
    text = raw.content;
  }
  // Extract table rows
  const rows = [];
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let match;
  while ((match = rowRegex.exec(text)) !== null) {
    const rowText = match[1];
    const cells = [];
    const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    let cellMatch;
    while ((cellMatch = cellRegex.exec(rowText)) !== null) {
      cells.push(cellMatch[1].replace(/<[^>]+>/g, '').trim());
    }
    if (cells.length >= 2) {
      // cells: [date, nav, accum_nav, dailyChange]
      const date = cells[0];
      const nav = parseFloat(cells[1]);
      if (date && !isNaN(nav)) {
        rows.push({ time: date, value: nav });
      }
    }
  }
  // Sort by date ascending
  return rows.reverse();
}

function renderFundChart(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '';

  const chart = window.LightweightCharts.createChart(el, {
    width: el.clientWidth,
    height: 360,
    layout: { background: { color: '#f8fafc' }, textColor: '#374151' },
    grid: { vertLines: { color: '#e2e8f0' }, horizLines: { color: '#e2e8f0' } },
    rightPriceScale: { borderColor: '#e2e8f0' },
    timeScale: { borderColor: '#e2e8f0', timeVisible: false },
    crosshair: { mode: 1 },
    handleScroll: { vertTouchDrag: false }
  });

  const lineColor = data[data.length - 1].value >= data[0].value ? '#DC2626' : '#16A34A';
  const areaColor = data[data.length - 1].value >= data[0].value ? 'rgba(220, 38, 38, 0.1)' : 'rgba(22, 163, 74, 0.1)';

  const series = chart.addSeries(window.LightweightCharts.AreaSeries, {
    lineColor: lineColor,
    topColor: areaColor,
    bottomColor: 'rgba(255,255,255,0)',
    lineWidth: 2,
    lastValueVisible: true,
    priceLineVisible: false
  });

  series.setData(data.map(d => ({ time: d.time, value: d.value })));
  chart.timeScale().fitContent();

  // Resize handler
  const resizeHandler = () => {
    chart.applyOptions({ width: el.clientWidth });
  };
  window.addEventListener('resize', resizeHandler);
  // Store cleanup on el
  el._chartCleanup = () => window.removeEventListener('resize', resizeHandler);
}

function renderFundDetailInfoTab(container) {
  let fund = null;
  if (allFundsFullCache) fund = allFundsFullCache.find(f => f.code === currentFundDetailCode);
  if (!fund && typeof allFunds !== 'undefined' && Array.isArray(allFunds)) {
    fund = allFunds.find(f => f.code === currentFundDetailCode);
  }
  if (!fund) fund = curatedFunds.find(f => f.code === currentFundDetailCode);

  const q = fundQuoteCache[currentFundDetailCode];
  const price = q ? formatNumber(q.price, 4) : '--';
  const change = q ? q.changePercent : null;
  const changeStr = change !== null ? (change >= 0 ? '+' : '') + formatNumber(change, 2) + '%' : '--';
  const changeClass = change !== null ? (change >= 0 ? 'text-up' : 'text-down') : 'text-gray-400';

  container.innerHTML = `
    <div class="space-y-5">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gray-50 rounded-xl p-4 text-center">
          <p class="text-xs text-gray-400 mb-1">最新净值</p>
          <p class="text-xl font-bold ${changeClass}">${price}</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-4 text-center">
          <p class="text-xs text-gray-400 mb-1">日涨跌</p>
          <p class="text-xl font-bold ${changeClass}">${changeStr}</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-4 text-center">
          <p class="text-xs text-gray-400 mb-1">基金类型</p>
          <p class="text-sm font-bold text-gray-700">${fund?.category || '--'}</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-4 text-center">
          <p class="text-xs text-gray-400 mb-1">份额类型</p>
          <p class="text-sm font-bold text-gray-700">${fund?.shareClass && fund.shareClass !== '无' ? fund.shareClass + '类' : '普通'}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-50 rounded-xl p-4">
          <p class="text-xs text-gray-400 mb-1">基金经理</p>
          <p class="text-sm font-bold text-gray-700">${fund?.manager || '--'}</p>
        </div>
        <div class="bg-gray-50 rounded-xl p-4">
          <p class="text-xs text-gray-400 mb-1">成立日期</p>
          <p class="text-sm font-bold text-gray-700">${fund?.since || '--'}</p>
        </div>
      </div>
      <div class="flex justify-center pt-2">
        <a href="https://fundf10.eastmoney.com/jbgk_${(currentFundDetailCode || '').replace(/^(of|sh|sz|bj)/, '')}.html" target="_blank"
          class="text-sm text-primary hover:underline flex items-center gap-1"
        >
          查看天天基金完整信息 →
        </a>
      </div>
    </div>
  `;
}

function renderFundDetailDCATab(container) {
  let fund = null;
  if (allFundsFullCache) fund = allFundsFullCache.find(f => f.code === currentFundDetailCode);
  if (!fund && typeof allFunds !== 'undefined' && Array.isArray(allFunds)) {
    fund = allFunds.find(f => f.code === currentFundDetailCode);
  }
  if (!fund) fund = curatedFunds.find(f => f.code === currentFundDetailCode);
  const q = fundQuoteCache[currentFundDetailCode];
  const currentNav = q ? q.price : null;

  container.innerHTML = `
    <div class="space-y-5">
      <div class="bg-blue-50 rounded-xl p-4">
        <p class="text-sm text-blue-700">基于真实历史净值进行定投回测，帮助您了解如果在过去某段时间开始定投该基金，收益情况会如何。</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs text-gray-500 mb-1">每月定投金额（元）</label>
          <input id="fund-dca-monthly" type="number" value="1000" class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
        </div>
        <div>
          <label class="block text-xs text-gray-500 mb-1">定投时长（月）</label>
          <select id="fund-dca-months" class="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="6">6个月</option>
            <option value="12" selected>1年</option>
            <option value="24">2年</option>
            <option value="36">3年</option>
          </select>
        </div>
        <div class="flex items-end">
          <button onclick="runFundDCA()" class="w-full py-2.5 btn-gradient text-white rounded-xl font-medium hover:shadow-md transition">开始回测</button>
        </div>
      </div>
      <div id="fund-dca-result" class="hidden">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div class="bg-gray-50 rounded-xl p-3 text-center">
            <p class="text-xs text-gray-400">投入本金</p>
            <p id="fund-dca-principal" class="text-lg font-bold text-gray-800">--</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3 text-center">
            <p class="text-xs text-gray-400">持有份额</p>
            <p id="fund-dca-shares" class="text-lg font-bold text-gray-800">--</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3 text-center">
            <p class="text-xs text-gray-400">当前市值</p>
            <p id="fund-dca-market" class="text-lg font-bold text-gray-800">--</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-3 text-center">
            <p class="text-xs text-gray-400">定投收益</p>
            <p id="fund-dca-profit" class="text-lg font-bold">--</p>
          </div>
        </div>
        <div id="fund-dca-chart" class="w-full h-[280px] rounded-xl bg-gray-50"></div>
      </div>
    </div>
  `;
}

function runFundDCA() {
  const monthly = parseFloat(document.getElementById('fund-dca-monthly')?.value) || 0;
  const months = parseInt(document.getElementById('fund-dca-months')?.value) || 12;
  if (!monthly || !months || !currentFundDetailCode) return;

  fetchFundHistory(currentFundDetailCode, months).then(data => {
    if (!data || data.length < 10) {
      alert('历史数据不足，无法回测');
      return;
    }
    // Simulate monthly DCA using historical NAV
    // Use roughly evenly spaced data points
    const step = Math.max(1, Math.floor(data.length / months));
    const selected = [];
    for (let i = 0; i < data.length; i += step) {
      selected.push(data[i]);
      if (selected.length >= months) break;
    }
    if (selected.length < 2) {
      alert('历史数据不足，无法回测');
      return;
    }

    let totalShares = 0;
    let totalPrincipal = 0;
    const dcaSeries = [];
    const marketSeries = [];

    selected.forEach((point, idx) => {
      const nav = point.value;
      const shares = monthly / nav;
      totalShares += shares;
      totalPrincipal += monthly;
      const marketValue = totalShares * nav;
      dcaSeries.push({ time: point.time, principal: totalPrincipal, market: marketValue });
    });

    const lastNav = selected[selected.length - 1].value;
    const finalMarket = totalShares * lastNav;
    const profit = finalMarket - totalPrincipal;
    const profitPct = totalPrincipal > 0 ? (profit / totalPrincipal) * 100 : 0;

    document.getElementById('fund-dca-principal').textContent = formatNumber(totalPrincipal, 0) + '元';
    document.getElementById('fund-dca-shares').textContent = formatNumber(totalShares, 2);
    document.getElementById('fund-dca-market').textContent = formatNumber(finalMarket, 0) + '元';
    const profitEl = document.getElementById('fund-dca-profit');
    profitEl.textContent = (profit >= 0 ? '+' : '') + formatNumber(profitPct, 2) + '%';
    profitEl.className = 'text-lg font-bold ' + (profit >= 0 ? 'text-up' : 'text-down');

    document.getElementById('fund-dca-result').classList.remove('hidden');

    // Draw chart
    const chartEl = document.getElementById('fund-dca-chart');
    if (chartEl && window.echarts) {
      const chart = window.echarts.init(chartEl);
      chart.setOption({
        grid: { left: 10, right: 10, top: 10, bottom: 30 },
        tooltip: { trigger: 'axis' },
        legend: { bottom: 0, textStyle: { fontSize: 11 } },
        xAxis: {
          type: 'category',
          data: dcaSeries.map(d => d.time.slice(5)), // MM-DD
          axisLine: { show: false },
          axisLabel: { fontSize: 10, interval: Math.floor(dcaSeries.length / 6) }
        },
        yAxis: {
          type: 'value',
          axisLine: { show: false },
          splitLine: { lineStyle: { color: '#f1f5f9' } },
          axisLabel: { fontSize: 10, formatter: v => (v / 10000).toFixed(0) + '万' }
        },
        series: [
          { name: '累计投入', data: dcaSeries.map(d => d.principal.toFixed(2)), type: 'line', smooth: true, symbol: 'none', lineStyle: { color: '#9CA3AF', type: 'dashed' } },
          { name: '持有市值', data: dcaSeries.map(d => d.market.toFixed(2)), type: 'line', smooth: true, symbol: 'none', lineStyle: { color: profit >= 0 ? '#DC2626' : '#16A34A', width: 2 } }
        ]
      });
    }
  }).catch(err => {
    console.warn('DCA backtest failed:', err);
    alert('回测数据加载失败，请稍后重试');
  });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeFundDetail();
});
