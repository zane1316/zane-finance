// Investment Calculators
function calcFetchPrice() {
  const input = document.getElementById('calc-code').value.trim();
  const code = findStockCode(input);
  if (!code) return;
  const d = getStockData(code);
  if (d && d.price) {
    const buyInput = document.getElementById('calc-buy');
    if (!buyInput.value) buyInput.value = d.price.toFixed(2);
  }
}

function calcPL() {
  const buy = parseFloat(document.getElementById('calc-buy').value);
  const sell = parseFloat(document.getElementById('calc-sell').value);
  const qty = parseInt(document.getElementById('calc-qty').value) || 0;
  if (!buy || !sell || !qty) { alert('请填写完整信息'); return; }
  const amount = sell * qty;
  const buyAmount = buy * qty;
  const commissionBuy = Math.max(buyAmount * 0.00025, 5);
  const commissionSell = Math.max(amount * 0.00025, 5);
  const tax = amount * 0.0005;
  const transfer = amount * 0.00001;
  const totalFee = commissionBuy + commissionSell + tax + transfer;
  const gross = (sell - buy) * qty;
  const net = gross - totalFee;
  const rate = (net / buyAmount) * 100;

  document.getElementById('pl-gross').textContent = (gross>=0?'+':'') + formatNumber(gross,2);
  document.getElementById('pl-gross').className = gross>=0?'text-up':'text-down';
  document.getElementById('pl-commission').textContent = formatNumber(commissionBuy+commissionSell,2);
  document.getElementById('pl-tax').textContent = formatNumber(tax,2);
  document.getElementById('pl-transfer').textContent = formatNumber(transfer,2);
  document.getElementById('pl-net').textContent = (net>=0?'+':'') + formatNumber(net,2);
  document.getElementById('pl-net').className = net>=0?'text-up':'text-down';
  document.getElementById('pl-rate').textContent = (net>=0?'+':'') + formatNumber(rate,2)+'%';
  document.getElementById('pl-rate').className = net>=0?'text-up':'text-down';
  document.getElementById('calc-pl-result').classList.remove('hidden');

  // Pie chart
  const el = document.getElementById('pl-chart');
  const chart = echarts.init(el);
  chart.setOption({
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: { fontSize: 10 } },
    series: [{
      type: 'pie', radius: ['40%','70%'], center: ['50%','45%'],
      label: { show: false },
      data: [
        { value: buyAmount.toFixed(2), name: '本金', itemStyle: { color: '#1E40AF' } },
        { value: totalFee.toFixed(2), name: '税费', itemStyle: { color: '#9CA3AF' } },
        { value: Math.max(net,0).toFixed(2), name: '净收益', itemStyle: { color: net>=0?'#DC2626':'#16A34A' } }
      ]
    }]
  });
}

function calcDCA() {
  const monthly = parseFloat(document.getElementById('dca-monthly').value) || 0;
  const months = parseInt(document.getElementById('dca-months').value) || 0;
  const rate = parseFloat(document.getElementById('dca-rate').value) || 0;
  if (!monthly || !months) { alert('请填写完整信息'); return; }
  const r = rate / 100 / 12;
  const total = monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  const principal = monthly * months;
  const profit = total - principal;

  document.getElementById('dca-principal').textContent = formatNumber(principal,2);
  document.getElementById('dca-total').textContent = formatNumber(total,2);
  document.getElementById('dca-profit').textContent = '+' + formatNumber(profit,2);
  document.getElementById('dca-profit').className = 'font-bold text-up';
  document.getElementById('dca-result').classList.remove('hidden');

  const el = document.getElementById('dca-chart');
  const chart = echarts.init(el);
  const lumpData = [];
  const dcaData = [];
  let lump = principal;
  for (let i = 0; i <= months; i++) {
    lumpData.push((principal * Math.pow(1 + r, i)).toFixed(2));
    dcaData.push((monthly * ((Math.pow(1 + r, i) - 1) / r) * (1 + r)).toFixed(2));
  }
  chart.setOption({
    grid: { left: 10, right: 10, top: 10, bottom: 20 },
    xAxis: { type: 'category', data: Array.from({length:months+1},(_,i)=>i+'月'), axisLine:{show:false}, axisLabel:{fontSize:10} },
    yAxis: { type: 'value', axisLine:{show:false}, splitLine:{lineStyle:{color:'#f1f5f9'}}, axisLabel:{fontSize:10, formatter:v=>(v/10000).toFixed(0)+'万'} },
    series: [
      { name: '定投', data: dcaData, type: 'line', smooth: true, symbol: 'none', lineStyle: { color: '#1E40AF' } },
      { name: '一次性', data: lumpData, type: 'line', smooth: true, symbol: 'none', lineStyle: { color: '#DC2626', type: 'dashed' } }
    ]
  });
}

function calcKelly() {
  const winRate = parseFloat(document.getElementById('kelly-win').value) / 100;
  const gain = parseFloat(document.getElementById('kelly-gain').value) / 100;
  const loss = parseFloat(document.getElementById('kelly-loss').value) / 100;
  if (!gain || !loss) { alert('请填写完整信息'); return; }
  const b = gain / loss;
  const q = 1 - winRate;
  const f = (b * winRate - q) / b;
  const pct = Math.max(0, f * 100);

  document.getElementById('kelly-value').textContent = formatNumber(pct,1) + '%';
  document.getElementById('kelly-result').classList.remove('hidden');

  let advice = '';
  if (pct <= 0) advice = '凯利公式计算出建议仓位为0%，当前策略期望收益为负，不建议参与。';
  else if (pct > 30) advice = `计算出建议仓位为${formatNumber(pct,1)}%，但为控制风险，建议单只股票仓位不超过30%。`;
  else advice = `建议仓位为${formatNumber(pct,1)}%，在合理风险控制范围内。`;
  document.getElementById('kelly-advice').textContent = advice;
}

function initCalculator() {
  // placeholder for any calculator init
}
