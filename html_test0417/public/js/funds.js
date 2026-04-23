// Funds Data & Page Logic
const fundCategories = ['全部', '股票型', '混合型', '债券型', '指数型', 'QDII', '货币型'];
let currentFundCategory = '全部';
let fundQuoteCache = {};
let allFundsFullCache = null;
let allFundsFullPromise = null;
const FUND_PAGE_SIZE = 40;
let fundCurrentPage = 1;

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
  renderFundCards();
  loadFundQuotes();
  renderFundRankings();
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
  const query = (document.getElementById('fund-search')?.value || '').trim().toLowerCase();
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
    list = list.filter(f => f.name.toLowerCase().includes(query) || f.code.toLowerCase().includes(query));
  }
  return list;
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
    return `
      <div class="card-gradient p-5 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 stagger-card" style="animation-delay:${(i%8)*0.05}s">
        <div class="flex items-start justify-between mb-3">
          <div class="min-w-0">
            <h4 class="font-bold text-gray-800 truncate" title="${f.name}">${f.name}</h4>
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
  if (funds.length === 0) return;
  // Only fetch quotes for currently visible funds
  const visibleCount = Math.min(funds.length, fundCurrentPage * FUND_PAGE_SIZE);
  const codes = funds.slice(0, visibleCount).map(f => f.code);
  const chunkSize = 40;
  for (let i = 0; i < codes.length; i += chunkSize) {
    const chunk = codes.slice(i, i + chunkSize);
    loadTencentAPI(chunk, (err, data) => {
      if (err) {
        console.warn('Fund quote load failed:', err);
        return;
      }
      Object.assign(fundQuoteCache, data);
      renderFundCards();
      renderFundRankings();
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
  if (query && !allFundsFullCache && !allFundsFullPromise) {
    // First search: lazy-load full fund list
    const container = document.getElementById('fund-cards');
    if (container) {
      container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400"><p class="text-lg mb-2">正在加载全市场基金数据...</p><p class="text-sm">首次搜索约需1-2秒，请稍候</p></div>`;
    }
    getAllFundsFull().then(() => {
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
