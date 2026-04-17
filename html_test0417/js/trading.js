// Simulated Trading Engine
const INIT_CAPITAL = 500000;
let tradeType = 'buy';
let account = null;

function initTrading() {
  const saved = localStorage.getItem('zfinance_trading');
  if (saved) {
    account = JSON.parse(saved);
  } else {
    resetTrading();
  }
}

function resetTrading() {
  account = {
    cash: INIT_CAPITAL,
    positions: [], // {code,name,qty,cost,date}
    history: [],
    assetCurve: [{date: todayStr(), value: INIT_CAPITAL}]
  };
  saveAccount();
  updateTradingUI();
}

function saveAccount() {
  localStorage.setItem('zfinance_trading', JSON.stringify(account));
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function setTradeType(type) {
  tradeType = type;
  document.getElementById('tab-buy').className = type==='buy' ? 'trade-type-tab px-4 py-2 font-medium border-b-2 border-primary text-primary' : 'trade-type-tab px-4 py-2 font-medium border-b-2 border-transparent text-gray-500';
  document.getElementById('tab-sell').className = type==='sell' ? 'trade-type-tab px-4 py-2 font-medium border-b-2 border-primary text-primary' : 'trade-type-tab px-4 py-2 font-medium border-b-2 border-transparent text-gray-500';
  const btn = document.getElementById('trade-submit-btn');
  btn.textContent = type==='buy'?'买入下单':'卖出下单';
  btn.className = type==='buy'?'w-full py-3 bg-up text-white rounded-lg font-medium':'w-full py-3 bg-down text-white rounded-lg font-medium';
}

let codeSuggestTimer = null;
function onTradeCodeInput() {
  const val = document.getElementById('trade-code').value.trim();
  const box = document.getElementById('trade-code-suggest');
  clearTimeout(codeSuggestTimer);
  if (!val) { box.classList.add('hidden'); return; }
  codeSuggestTimer = setTimeout(() => {
    const matches = allStocks.filter(s => s.c.includes(val) || s.n.includes(val)).slice(0, 6);
    if (matches.length) {
      box.innerHTML = matches.map(s => `<div class="px-3 py-2 hover:bg-gray-100 cursor-pointer" onclick="selectTradeCode('${s.c}','${s.n}')">${s.n} <span class="text-gray-400">${s.c}</span></div>`).join('');
      box.classList.remove('hidden');
    } else {
      box.classList.add('hidden');
    }
  }, 150);
}

function selectTradeCode(code, name) {
  document.getElementById('trade-code').value = code;
  document.getElementById('trade-code-suggest').classList.add('hidden');
  const d = getStockData(code);
  if (d && d.price) {
    document.getElementById('trade-price').value = d.price.toFixed(2);
  }
}

function setLimitPrice(dir) {
  const code = document.getElementById('trade-code').value.trim();
  const d = getStockData(code);
  if (!d || !d.close) return;
  const limit = dir==='up' ? d.close * 1.1 : d.close * 0.9;
  document.getElementById('trade-price').value = limit.toFixed(2);
}

function setTradeQty(mode) {
  const price = parseFloat(document.getElementById('trade-price').value) || 0;
  if (!price) return;
  let qty = 0;
  if (mode==='full') qty = Math.floor(account.cash / price / 100) * 100;
  else if (mode==='half') qty = Math.floor(account.cash / 2 / price / 100) * 100;
  else if (mode==='third') qty = Math.floor(account.cash / 3 / price / 100) * 100;
  if (qty < 0) qty = 0;
  document.getElementById('trade-quantity').value = qty;
}

function calcFees(amount, isSell) {
  const commission = Math.max(amount * 0.00025, 5);
  const tax = isSell ? amount * 0.0005 : 0;
  const transfer = amount * 0.00001;
  return { commission, tax, transfer, total: commission + tax + transfer };
}

function submitOrder() {
  const code = document.getElementById('trade-code').value.trim();
  const price = parseFloat(document.getElementById('trade-price').value);
  const qty = parseInt(document.getElementById('trade-quantity').value);
  if (!code || !price || !qty || qty % 100 !== 0) {
    alert('请输入有效的股票代码、价格和100的整数倍数量'); return;
  }
  const d = getStockData(code);
  const name = (stockMap[code] && stockMap[code].n) || (d ? d.name : code);
  const amount = price * qty;
  if (tradeType === 'buy') {
    const fees = calcFees(amount, false);
    const total = amount + fees.total;
    // Add slippage 0.5%
    const slip = amount * 0.005;
    const finalTotal = total + slip;
    if (finalTotal > account.cash) {
      alert('可用资金不足（含佣金与滑点）'); return;
    }
    account.cash -= finalTotal;
    const pos = account.positions.find(p => p.code === code);
    if (pos) {
      const totalCost = pos.cost * pos.qty + price * qty;
      pos.qty += qty;
      pos.cost = totalCost / pos.qty;
    } else {
      account.positions.push({ code, name, qty, cost: price, date: todayStr() });
    }
    account.history.unshift({ time: new Date().toLocaleString('zh-CN'), type: '买入', code, name, price, qty, amount: finalTotal, fees: fees.total });
  } else {
    const pos = account.positions.find(p => p.code === code);
    if (!pos || pos.qty < qty) { alert('持仓不足'); return; }
    if (pos.date === todayStr()) { alert('A股实行T+1交易，当日买入的股票不可卖出'); return; }
    const fees = calcFees(amount, true);
    const slip = amount * 0.005;
    const net = amount - fees.total - slip;
    account.cash += net;
    pos.qty -= qty;
    if (pos.qty === 0) account.positions = account.positions.filter(p => p.code !== code);
    account.history.unshift({ time: new Date().toLocaleString('zh-CN'), type: '卖出', code, name, price, qty, amount: net, fees: fees.total });
  }
  updateAssetCurve();
  saveAccount();
  updateTradingUI();
  alert('下单成功');
}

function updateAssetCurve() {
  const stockValue = account.positions.reduce((sum, p) => {
    const d = getStockData(p.code);
    return sum + (d ? d.price : p.cost) * p.qty;
  }, 0);
  const total = account.cash + stockValue;
  const today = todayStr();
  const last = account.assetCurve[account.assetCurve.length - 1];
  if (last && last.date === today) last.value = total;
  else account.assetCurve.push({ date: today, value: total });
  if (account.assetCurve.length > 60) account.assetCurve.shift();
}

function updateTradingUI() {
  if (document.getElementById('trading').classList.contains('hidden')) return;
  updateAssetCurve();
  const stockValue = account.positions.reduce((sum, p) => {
    const d = getStockData(p.code);
    return sum + (d ? d.price : p.cost) * p.qty;
  }, 0);
  const total = account.cash + stockValue;
  const init = INIT_CAPITAL;
  const dayPL = account.assetCurve.length >= 2
    ? total - account.assetCurve[account.assetCurve.length - 2].value
    : 0;
  const totalPL = total - init;
  const totalReturn = ((total - init) / init) * 100;

  document.getElementById('total-asset').textContent = formatNumber(total, 2);
  document.getElementById('available-fund').textContent = formatNumber(account.cash, 2);
  document.getElementById('stock-value').textContent = formatNumber(stockValue, 2);
  document.getElementById('day-pl').textContent = (dayPL >= 0 ? '+' : '') + formatNumber(dayPL, 2);
  document.getElementById('day-pl').className = dayPL >= 0 ? 'text-up' : 'text-down';
  document.getElementById('total-pl').textContent = (totalPL >= 0 ? '+' : '') + formatNumber(totalPL, 2);
  document.getElementById('total-pl').className = totalPL >= 0 ? 'text-up' : 'text-down';
  document.getElementById('total-return').textContent = (totalReturn >= 0 ? '+' : '') + formatNumber(totalReturn, 2) + '%';
  document.getElementById('total-return').className = totalReturn >= 0 ? 'text-up font-medium' : 'text-down font-medium';

  // Positions
  document.getElementById('position-list').innerHTML = account.positions.map(p => {
    const d = getStockData(p.code);
    const price = d ? d.price : p.cost;
    const pl = (price - p.cost) * p.qty;
    const plRate = ((price - p.cost) / p.cost) * 100;
    const color = pl >= 0 ? 'text-up' : 'text-down';
    return `<tr class="border-b">
      <td class="px-3 py-2">${p.name}<br><span class="text-xs text-gray-400">${p.code}</span></td>
      <td class="px-3 py-2 text-right">${formatNumber(p.cost,2)}</td>
      <td class="px-3 py-2 text-right">${formatNumber(price,2)}</td>
      <td class="px-3 py-2 text-right ${color}">${pl>=0?'+':''}${formatNumber(pl,2)}<br><span class="text-xs">${formatNumber(plRate,2)}%</span></td>
    </tr>`;
  }).join('') || '<tr><td colspan="4" class="px-3 py-4 text-center text-gray-400">暂无持仓</td></tr>';

  // History
  document.getElementById('trade-history').innerHTML = account.history.slice(0, 20).map(h => `
    <tr class="border-b">
      <td class="px-3 py-2">${h.time}</td>
      <td class="px-3 py-2 text-center ${h.type==='买入'?'text-up':'text-down'}">${h.type}</td>
      <td class="px-3 py-2 text-right">${formatNumber(h.price,2)}</td>
      <td class="px-3 py-2 text-right">${h.qty}</td>
      <td class="px-3 py-2 text-right">${formatNumber(h.amount,2)}</td>
    </tr>
  `).join('') || '<tr><td colspan="5" class="px-3 py-4 text-center text-gray-400">暂无成交记录</td></tr>';

  // Asset chart
  renderAssetChart();
}

function updateTradingPrices(data) {
  // Triggered by API refresh to update current prices in UI
  updateTradingUI();
}

function renderAssetChart() {
  const el = document.getElementById('asset-chart');
  if (!el) return;
  const chart = echarts.init(el);
  const dates = account.assetCurve.map(a => a.date);
  const values = account.assetCurve.map(a => a.value);
  chart.setOption({
    grid: { left: 10, right: 10, top: 10, bottom: 20 },
    xAxis: { type: 'category', data: dates, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { fontSize: 10 } },
    yAxis: { type: 'value', min: Math.min(...values) * 0.98, axisLine: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9' } }, axisLabel: { fontSize: 10, formatter: v => (v/10000).toFixed(1)+'万' } },
    series: [{ data: values, type: 'line', smooth: true, symbol: 'none', lineStyle: { color: '#1E40AF', width: 2 }, areaStyle: { color: { type: 'linear', x:0,y:0,x2:0,y2:1, colorStops: [{offset:0,color:'rgba(30,64,175,0.2)'},{offset:1,color:'rgba(30,64,175,0)'}] } } }]
  });
}
