// AI Analysis - 问财 (iwencai) iframe query with full A-share support

function queryAI() {
  const iframe = document.getElementById('ai-iframe');
  // Lazy-load iframe src on first interaction
  if (!iframe.src) {
    iframe.src = 'https://www.iwencai.com/unifiedwap/result?w=sh600519';
  }

  const input = document.getElementById('ai-stock-input').value.trim();
  if (!input) { alert('请输入股票代码或名称'); return; }

  resolveStockCode(input).then(code => {
    if (!code) { alert('未找到该股票，请尝试输入6位数字代码'); return; }
    iframe.src = `https://www.iwencai.com/unifiedwap/result?w=${code}`;
  });
}

function quickAI(code) {
  document.getElementById('ai-stock-input').value = code;
  queryAI();
}

// Resolve stock code using full A-share list (Eastmoney API) with fallbacks
async function resolveStockCode(input) {
  input = input.trim();

  // Direct code formats
  const lower = input.toLowerCase();
  if (/^(sh|sz|bj)\d{6}$/.test(lower)) return lower;
  if (/^\d{6}$/.test(input)) {
    return getStockPrefix(input) + input;
  }

  // Try full A-share list first
  let list = allAStockList;
  if (!list || list.length === 0) {
    try { list = await loadAllAStockList(); } catch(e) {}
  }

  if (list && list.length > 0) {
    // Exact name match
    const exact = list.find(s => s.name === input);
    if (exact) return exact.code;
    // Partial name match (case-insensitive)
    const partial = list.find(s => s.name.toLowerCase().includes(lower));
    if (partial) return partial.code;
  }

  // Fallback to existing findStockCode
  return findStockCode(input);
}
