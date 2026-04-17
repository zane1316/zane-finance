// K-line Gallery (30 patterns) with Lightweight Charts
const klinePatterns = {
  single: [
    { id: 'dy', name: '大阳线', desc: '实体很长、几乎无上下影线，表示多方力量极强。', case: '2024年2月宁德时代放量大阳线，次日延续上涨8%。', bullish: true },
    { id: 'dyin', name: '大阴线', desc: '实体很长、几乎无上下影线，表示空方力量极强。', case: '2023年10月某消费龙头季报不及预期，收出大阴线后调整15%。', bullish: false },
    { id: 'szx', name: '十字星', desc: '开盘价与收盘价几乎相同，多空力量均衡，变盘信号。', case: '2024年1月贵州茅台高位十字星，随后缩量回调一周。', bullish: false },
    { id: 'czx', name: '锤子线', desc: '下影线长、实体小，出现在下跌末端为见底信号。', case: '2023年3月中芯国际低位锤子线，随后反弹20%。', bullish: true },
    { id: 'dcz', name: '倒锤头', desc: '上影线长、实体小，出现在下跌末端，多方试探反攻。', case: '2024年4月北方华创倒锤头后次日跳空高开，形成早晨之星。', bullish: true },
    { id: 'tzx', name: 'T字线', desc: '开盘价收盘价相同且在最高价，下影线长，下方承接强。', case: '2023年8月比亚迪T字线回踩20日均线后重拾升势。', bullish: true }
  ],
  combo: [
    { id: 'zcmt', name: '看涨吞没', desc: '前阴后阳，阳线实体完全覆盖阴线实体，底部反转信号。', case: '2024年3月隆基绿能看涨吞没，随后一周上涨12%。', bullish: true },
    { id: 'kcmt', name: '看跌吞没', desc: '前阳后阴，阴线实体完全覆盖阳线实体，顶部反转信号。', case: '2023年6月某AI概念股高位看跌吞没，两周回调25%。', bullish: false },
    { id: 'zmxz', name: '早晨之星', desc: '长阴→十字星→长阳，经典的底部反转组合。', case: '2024年3月贵州茅台早晨之星，随后涨幅达12%。', bullish: true },
    { id: 'hmxz', name: '黄昏之星', desc: '长阳→十字星→长阴，经典的顶部反转组合。', case: '2023年11月中际旭创黄昏之星，之后进入横盘整理。', bullish: false },
    { id: 'hsb', name: '红三兵', desc: '连续三根小阳线，步步高升，多方稳扎稳打。', case: '2024年2月长江电力红三兵突破年线，开启波段行情。', bullish: true },
    { id: 'szw', name: '三只乌鸦', desc: '连续三根阴线，空方步步紧逼，强烈看跌信号。', case: '2023年9月某医药股三只乌鸦，月跌幅超18%。', bullish: false },
    { id: 'wugd', name: '乌云盖顶', desc: '前阳后阴，阴线深入阳线实体一半以上，顶部看跌。', case: '2024年1月中信证券乌云盖顶，随后回调至10日均线。', bullish: false },
    { id: 'ctx', name: '刺透形态', desc: '前阴后阳，阳线深入阴线实体一半以上，底部看涨。', case: '2023年12月比亚迪刺透形态，止跌反弹。', bullish: true },
    { id: 'shlj', name: '身怀六甲', desc: '后K线实体完全被前K线实体包裹，趋势放缓信号。', case: '2024年5月药明康德身怀六甲，随后震荡整理。', bullish: false },
    { id: 'szxb', name: '十字星变盘', desc: '十字星出现在连续上涨或下跌后，预示方向选择。', case: '2024年6月宁德时代十字星变盘，随后向上突破。', bullish: true },
    { id: 'tkqk', name: '跳空缺口', desc: '价格跳过某一区间未成交，分为突破、中继、衰竭缺口。', case: '2024年2月AI板块集体跳空高开突破，形成突破缺口。', bullish: true },
    { id: 'ssf', name: '上升三法', desc: '一根长阳后连续三根小阴回调，再出一根长阳确认升势。', case: '2023年7月中际旭创上升三法，主升浪延续。', bullish: true }
  ],
  trend: [
    { id: 'jdd', name: '头肩顶', desc: '三个峰中间最高，跌破颈线后跌幅约为头到颈线的距离。', case: '2023年5月某消费龙头头肩顶，跌破后跌幅约20%。', bullish: false },
    { id: 'jdd2', name: '头肩底', desc: '三个谷中间最低，突破颈线后涨幅约为头到颈线的距离。', case: '2024年1月半导体ETF头肩底，突破后上涨15%。', bullish: true },
    { id: 'sdd', name: '双顶', desc: '两个相近高点，跌破颈线看跌。', case: '2023年8月华泰证券双顶，随后回落至前期低点。', bullish: false },
    { id: 'sdd2', name: '双底', desc: '两个相近低点，突破颈线看涨。', case: '2024年2月隆基绿能双底，突破后反弹30%。', bullish: true },
    { id: 'yqd', name: '圆弧底', desc: '价格呈圆弧状缓慢回升，底部扎实，后市看涨。', case: '2023年11月长江电力圆弧底，半年后创新高。', bullish: true },
    { id: 'vfz', name: 'V型反转', desc: '急跌后急涨，形成V字，通常伴随重大利好。', case: '2024年3月某新能源股V型反转，10日涨幅超40%。', bullish: true },
    { id: 'qxzl', name: '旗形整理', desc: '急速运动后小幅回调的平行通道，突破后继续原趋势。', case: '2023年10月AI龙头旗形整理，突破后再涨25%。', bullish: true },
    { id: 'xdzl', name: '楔形整理', desc: '收敛三角形，突破后通常延续原趋势。', case: '2024年4月中芯国际楔形整理，向上突破。', bullish: true }
  ],
  indicator: [
    { id: 'madc', name: 'MA多头排列', desc: '短中长期均线由上到下依次排列，趋势向上。', case: '2024年2月宁德时代MA5>MA10>MA20，主升浪确立。', bullish: true },
    { id: 'makd', name: 'MA空头排列', desc: '短中长期均线由下到上依次排列，趋势向下。', case: '2023年8月某医药股MA空头排列，持续走弱。', bullish: false },
    { id: 'macdjx', name: 'MACD金叉死叉', desc: 'DIF上穿DEA为金叉看涨，下穿为死叉看跌。', case: '2024年3月比亚迪MACD金叉，随后两周上涨18%。', bullish: true },
    { id: 'kdj', name: 'KDJ超买超卖', desc: 'K、D值>80超买，<20超卖，J值极端时信号更强。', case: '2024年1月某科技股KDJ超买后回落，<20时反弹。', bullish: false },
    { id: 'boll', name: '布林线收口突破', desc: '布林带收口表示波动收窄，突破上轨或下轨预示方向选择。', case: '2024年5月中芯国际布林收口后向上突破，涨幅15%。', bullish: true },
    { id: 'vol', name: '成交量堆量/缩量', desc: '上涨放量确认趋势，上涨缩量需警惕；下跌缩量或见底。', case: '2024年2月AI板块堆量上涨，量价齐升。', bullish: true }
  ]
};

let currentKlineCat = 'single';
let klineCharts = [];

function initKlineGallery() {
  renderKlineTabs();
  renderKlineGrid();
}

function renderKlineTabs() {
  document.querySelectorAll('.kline-tab').forEach(btn => {
    btn.className = btn.dataset.cat === currentKlineCat
      ? 'kline-tab px-4 py-2 rounded-lg text-sm font-medium bg-primary text-white'
      : 'kline-tab px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700';
    btn.onclick = () => { currentKlineCat = btn.dataset.cat; renderKlineTabs(); renderKlineGrid(); };
  });
}

function renderKlineGrid() {
  // Cleanup old charts
  klineCharts.forEach(c => c.remove());
  klineCharts = [];
  const container = document.getElementById('kline-grid');
  const items = klinePatterns[currentKlineCat];
  container.innerHTML = items.map((p, idx) => `
    <div class="kline-card bg-white rounded-xl shadow border border-border p-4">
      <div class="flex justify-between items-start mb-2">
        <h4 class="font-bold">${p.name}</h4>
        <span class="text-xs px-2 py-1 rounded-full ${p.bullish?'bg-red-100 text-up':'bg-green-100 text-down'}">${p.bullish?'看涨':'看跌'}</span>
      </div>
      <div id="kline-chart-${idx}" class="lw-chart rounded-lg bg-gray-50"></div>
      <p class="text-sm text-gray-600 mt-3">${p.desc}</p>
      <div class="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
        <span class="font-medium">案例：</span>${p.case}
      </div>
    </div>
  `).join('');

  // Render charts after DOM update
  setTimeout(() => {
    items.forEach((p, idx) => {
      const el = document.getElementById(`kline-chart-${idx}`);
      if (!el) return;
      const chart = LightweightCharts.createChart(el, {
        width: el.clientWidth,
        height: 220,
        layout: { background: { color: '#f8fafc' }, textColor: '#374151' },
        grid: { vertLines: { color: '#e2e8f0' }, horzLines: { color: '#e2e8f0' } },
        crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
        rightPriceScale: { borderColor: '#e2e8f0' },
        timeScale: { borderColor: '#e2e8f0', timeVisible: true }
      });
      const series = chart.addCandlestickSeries({
        upColor: '#DC2626', downColor: '#16A34A', borderVisible: false,
        wickUpColor: '#DC2626', wickDownColor: '#16A34A'
      });
      series.setData(generatePatternData(p.id, p.bullish));
      klineCharts.push(chart);
    });
  }, 50);
}

function generatePatternData(patternId, bullish) {
  const data = [];
  const base = 100;
  const date = new Date('2024-01-01');
  // Pre-trend: 10 candles
  for (let i = 0; i < 10; i++) {
    const o = base + (i * 0.2) + (Math.random() - 0.5) * 1.5;
    const c = o + (Math.random() - 0.5) * 1.5;
    data.push({ time: date.toISOString().split('T')[0], open: o, close: c, high: Math.max(o,c)+Math.random(), low: Math.min(o,c)-Math.random() });
    date.setDate(date.getDate() + 1);
  }
  // Pattern candles based on type
  if (patternId === 'dy') {
    data.push(makeCandle(date, 100, 105, 105.2, 99.8, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'dyin') {
    data.push(makeCandle(date, 105, 100, 105.2, 99.8, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'szx') {
    data.push(makeCandle(date, 102, 102.1, 103, 101, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'czx') {
    data.push(makeCandle(date, 100.5, 101, 101.2, 98, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'dcz') {
    data.push(makeCandle(date, 100.5, 101, 103, 100.2, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'tzx') {
    data.push(makeCandle(date, 102, 102, 102, 99, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'zcmt') {
    data.push(makeCandle(date, 102, 100, 102, 99.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 99, 102.5, 102.8, 98.8, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'kcmt') {
    data.push(makeCandle(date, 100, 102, 102.2, 99.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 102.5, 99.5, 102.8, 99.2, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'zmxz') {
    data.push(makeCandle(date, 102, 100, 102, 99.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.2, 100.1, 100.8, 99.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100, 103, 103.2, 99.8, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'hmxz') {
    data.push(makeCandle(date, 100, 102, 102.2, 99.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 102, 101.9, 102.5, 101.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 102, 99, 102.2, 98.8, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'hsb') {
    data.push(makeCandle(date, 100, 100.8, 101, 99.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.8, 101.5, 101.8, 100.5, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.5, 102.2, 102.5, 101.2, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'szw') {
    data.push(makeCandle(date, 102, 101.2, 102.2, 101, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.2, 100.4, 101.5, 100.2, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.4, 99.6, 100.6, 99.4, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'wugd') {
    data.push(makeCandle(date, 100, 102, 102.2, 99.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 102, 100.5, 102.2, 100.2, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'ctx') {
    data.push(makeCandle(date, 102, 100, 102, 99.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 99.5, 101.5, 101.8, 99.2, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'shlj') {
    data.push(makeCandle(date, 100, 102, 102.5, 99.5, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.5, 101, 101.8, 100.8, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'szxb') {
    data.push(makeCandle(date, 101.5, 101.5, 102, 101, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'tkqk') {
    data.push(makeCandle(date, 100, 102.5, 102.5, 99.8, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'ssf') {
    data.push(makeCandle(date, 99, 102, 102.2, 98.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.8, 101.2, 102, 101, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.2, 100.8, 101.5, 100.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.8, 100.5, 101, 100.2, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 103, 103.2, 100.2, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'jdd') {
    data.push(makeCandle(date, 100, 102, 102.5, 99.5, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.5, 101, 102, 100.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.8, 103.5, 104, 100.5, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 103, 102, 103.2, 101.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.8, 99.5, 102, 99.2, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'jdd2') {
    data.push(makeCandle(date, 102, 100, 102, 99.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 101, 101.5, 99.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 98, 100.8, 97.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 98.2, 99, 99.5, 97.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 99, 101.5, 101.8, 98.8, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'sdd') {
    data.push(makeCandle(date, 100, 102, 102.5, 99.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.5, 100.5, 102, 100.2, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 102.2, 102.8, 100.2, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.8, 100, 102, 99.5, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'sdd2') {
    data.push(makeCandle(date, 102, 100, 102, 99.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 101, 101.5, 100, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.8, 99.5, 101, 99.2, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 99.5, 101.5, 101.8, 99.2, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'yqd') {
    for (let i = 0; i < 8; i++) {
      const o = 99 + i * 0.1 + Math.sin(i)*0.5;
      const c = o + 0.2;
      data.push(makeCandle(date, o, c, Math.max(o,c)+0.3, Math.min(o,c)-0.2, true)); date.setDate(date.getDate()+1);
    }
  } else if (patternId === 'vfz') {
    data.push(makeCandle(date, 102, 99, 102, 98.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 99, 100.5, 100.8, 98.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 103, 103.2, 100.2, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'qxzl') {
    data.push(makeCandle(date, 99, 102, 102.5, 98.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.5, 101, 101.8, 100.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101, 100.5, 101.2, 100.2, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 100, 100.8, 99.8, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100, 103, 103.2, 99.8, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'xdzl') {
    data.push(makeCandle(date, 99, 101, 101.5, 98.5, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 100, 100.8, 99.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100, 100.5, 100.8, 99.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.2, 100, 100.5, 99.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100, 102, 102.2, 99.8, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'madc') {
    for (let i=0;i<12;i++) { data.push(makeCandle(date, 99+i*0.4, 99.5+i*0.4, 100+i*0.4, 98.5+i*0.4, true)); date.setDate(date.getDate()+1); }
  } else if (patternId === 'makd') {
    for (let i=0;i<12;i++) { data.push(makeCandle(date, 102-i*0.4, 101.5-i*0.4, 102.5-i*0.4, 100.5-i*0.4, false)); date.setDate(date.getDate()+1); }
  } else if (patternId === 'macdjx') {
    for (let i=0;i<8;i++) { data.push(makeCandle(date, 100, 100.2+i*0.3, 100.5+i*0.3, 99.5, true)); date.setDate(date.getDate()+1); }
  } else if (patternId === 'kdj') {
    data.push(makeCandle(date, 102, 102.5, 103, 101.5, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 102.2, 101.8, 102.5, 101.2, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'boll') {
    for (let i=0;i<6;i++) { data.push(makeCandle(date, 100, 100.2, 100.5, 99.8, true)); date.setDate(date.getDate()+1); }
    data.push(makeCandle(date, 100, 102.5, 102.8, 99.8, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'vol') {
    data.push(makeCandle(date, 99, 102, 102.5, 98.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.5, 103, 103.5, 101.2, true)); date.setDate(date.getDate()+1);
  } else {
    data.push(makeCandle(date, 100, 102, 102.2, 99.5, true)); date.setDate(date.getDate()+1);
  }
  return data;
}

function makeCandle(date, open, close, high, low, up) {
  const d = date.toISOString().split('T')[0];
  return { time: d, open: Number(open.toFixed(2)), close: Number(close.toFixed(2)), high: Number(high.toFixed(2)), low: Number(low.toFixed(2)) };
}

window.addEventListener('resize', () => {
  klineCharts.forEach(c => c.applyOptions({ width: c.chartElement().clientWidth }));
});
