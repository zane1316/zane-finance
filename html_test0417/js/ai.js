// AI Analysis - 问财 (iwencai) iframe query only

function queryAI() {
  const input = document.getElementById('ai-stock-input').value.trim();
  if (!input) { alert('请输入股票代码或名称'); return; }
  const code = findStockCode(input);
  if (!code) { alert('未找到该股票，请尝试输入6位数字代码'); return; }

  const iframe = document.getElementById('ai-iframe');
  iframe.src = `https://www.iwencai.com/unifiedwap/result?w=${code}`;
}

function quickAI(code) {
  document.getElementById('ai-stock-input').value = code;
  queryAI();
}
