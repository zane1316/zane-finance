// AI Analysis Engine
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

function queryAI() {
  const input = document.getElementById('ai-stock-input').value.trim();
  if (!input) { alert('请输入股票代码或名称'); return; }
  const code = findStockCode(input);
  if (!code) { alert('未找到该股票，请尝试输入6位数字代码'); return; }
  const s = stockMap[code];
  const d = getStockData(code);
  const name = s ? s.n : (d ? d.name : code);
  const price = d ? d.price : 0;
  const change = d ? d.changePercent : 0;

  const resultBox = document.getElementById('ai-result');
  const fallbackBox = document.getElementById('ai-fallback');
  resultBox.classList.remove('hidden');
  fallbackBox.classList.add('hidden');
  resultBox.innerHTML = '<div class="text-center py-8 text-gray-500"><svg class="animate-spin h-6 w-6 mx-auto mb-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>正在分析中...</div>';

  // Try DeepSeek API
  attemptDeepSeek(code, name, price, change)
    .then(ok => {
      if (!ok) showAIFallback(code, name, price, change);
    })
    .catch(() => showAIFallback(code, name, price, change));
}

function quickAI(code) {
  document.getElementById('ai-stock-input').value = code;
  queryAI();
}

async function attemptDeepSeek(code, name, price, change) {
  try {
    const prompt = `你是一位A股投教分析师。请基于以下信息对股票 ${name}（${code}）进行分析，要求输出结构化JSON：{"技术面":{"评分":1-10,"要点":"..."},"基本面":{"评分":1-10,"要点":"..."},"风险点":["...","..."],"学习要点":"..."}。当前价格约${price}元，近期涨跌幅约${change}%。禁止给出买入/卖出建议，仅提供观察角度和学习要点。`;
    const res = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: prompt }], max_tokens: 800 })
    });
    if (!res.ok) return false;
    const data = await res.json();
    const content = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!content) return false;
    let json = null;
    try {
      const match = content.match(/\{[\s\S]*\}/);
      if (match) json = JSON.parse(match[0]);
    } catch(e) {}
    if (!json) {
      document.getElementById('ai-result').innerHTML = `<div class="prose prose-sm max-w-none"><pre class="bg-gray-50 p-3 rounded text-sm">${content}</pre></div>`;
      return true;
    }
    renderAIResult(json, code, name, price, change);
    return true;
  } catch (e) {
    console.warn('DeepSeek API failed', e);
    return false;
  }
}

function renderAIResult(json, code, name, price, change) {
  const color = change >= 0 ? 'text-up' : 'text-down';
  document.getElementById('ai-result').innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b pb-3">
        <div><h3 class="text-xl font-bold">${name} <span class="text-gray-400 text-sm">${code}</span></h3><p class="text-sm text-gray-500">${s && s.sector ? s.sector : ''}</p></div>
        <div class="text-right"><p class="text-2xl font-bold ${color}">${formatNumber(price,2)}</p><p class="text-sm ${color}">${change>=0?'+':''}${formatNumber(change,2)}%</p></div>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-gray-50 p-3 rounded-lg"><div class="flex justify-between mb-1"><span class="font-bold">技术面</span><span class="text-primary font-bold">${json.技术面 && json.技术面.评分 ? json.技术面.评分 : '-'}/10</span></div><p class="text-sm text-gray-600">${json.技术面 && json.技术面.要点 ? json.技术面.要点 : ''}</p></div>
        <div class="bg-gray-50 p-3 rounded-lg"><div class="flex justify-between mb-1"><span class="font-bold">基本面</span><span class="text-primary font-bold">${json.基本面 && json.基本面.评分 ? json.基本面.评分 : '-'}/10</span></div><p class="text-sm text-gray-600">${json.基本面 && json.基本面.要点 ? json.基本面.要点 : ''}</p></div>
      </div>
      <div class="bg-red-50 border border-red-100 rounded-lg p-3">
        <p class="font-bold text-red-700 mb-1">风险点</p>
        <ul class="text-sm text-red-700 list-disc list-inside">${(json.风险点 || []).map(r => `<li>${r}</li>`).join('')}</ul>
      </div>
      <div class="bg-blue-50 border border-blue-100 rounded-lg p-3">
        <p class="font-bold text-blue-700 mb-1">学习要点</p>
        <p class="text-sm text-blue-700">${json.学习要点 || ''}</p>
      </div>
      <div class="text-xs text-gray-400 pt-2 border-t">AI分析仅供参考，不构成买卖建议。</div>
    </div>
  `;
}

function showAIFallback(code, name, price, change) {
  const resultBox = document.getElementById('ai-result');
  const fallbackBox = document.getElementById('ai-fallback');
  const color = change >= 0 ? 'text-up' : 'text-down';

  // Build aggregated analysis based on real data we have
  const sector = stockMap[code] ? stockMap[code].sector : '未知';
  const d = getStockData(code);
  let techAnalysis = '当前股价' + (price ? formatNumber(price,2) : '--') + '元。';
  if (change > 5) techAnalysis += '近期涨幅较大，注意追高风险。';
  else if (change > 0) techAnalysis += '近期走势偏强，可关注量能配合。';
  else if (change < -5) techAnalysis += '近期跌幅较深，关注支撑位是否有效。';
  else techAnalysis += '近期震荡整理，等待方向选择。';

  resultBox.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b pb-3">
        <div><h3 class="text-xl font-bold">${name} <span class="text-gray-400 text-sm">${code}</span></h3><p class="text-sm text-gray-500">${sector}</p></div>
        <div class="text-right"><p class="text-2xl font-bold ${color}">${price ? formatNumber(price,2) : '--'}</p><p class="text-sm ${color}">${change ? (change>=0?'+':'')+formatNumber(change,2)+'%' : '--'}</p></div>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-gray-50 p-3 rounded-lg"><p class="font-bold mb-1">技术面</p><p class="text-sm text-gray-600">${techAnalysis}</p></div>
        <div class="bg-gray-50 p-3 rounded-lg"><p class="font-bold mb-1">基本面</p><p class="text-sm text-gray-600">${name}属于${sector}板块。可关注最新季报中的营收增速、毛利率变化及行业政策动向。</p></div>
      </div>
      <div class="bg-amber-50 border border-amber-100 rounded-lg p-3">
        <p class="font-bold text-amber-700 mb-1">风险提示</p>
        <ul class="text-sm text-amber-700 list-disc list-inside">
          <li>板块轮动风险：${sector}板块受政策和景气周期影响较大。</li>
          <li>波动风险：个股波动可能高于大盘，需设置止损。</li>
          <li>信息滞后：本页面数据仅供参考，交易前请以交易所官方披露为准。</li>
        </ul>
      </div>
      <div class="bg-blue-50 border border-blue-100 rounded-lg p-3">
        <p class="font-bold text-blue-700 mb-1">学习要点</p>
        <p class="text-sm text-blue-700">建议结合K线形态与成交量变化综合判断。可前往"K线分析"页面学习相关形态特征，并使用"模拟交易"进行零成本演练。</p>
      </div>
      <div class="text-xs text-gray-400 pt-2 border-t">AI分析仅供参考，不构成买卖建议。（当前使用聚合分析，DeepSeek API受限）</div>
    </div>
  `;

  // Show iwencai iframe as extra tool
  fallbackBox.classList.remove('hidden');
  document.getElementById('ai-iframe').src = `https://www.iwencai.com/unifiedwap/result?w=${code}`;
}
