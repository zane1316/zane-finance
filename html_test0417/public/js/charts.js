// K-line Gallery (42 patterns) with Lightweight Charts
const klinePatterns = {
  single: [
    { id: 'dy', name: '大阳线', desc: '实体很长、几乎无上下影线，表示多方力量极强。', case: '2024年2月宁德时代放量大阳线，次日延续上涨8%。', bullish: true, advice: '强势买入信号。若出现在突破关键阻力位或整理形态末端，且成交量明显放大，可积极跟进。' },
    { id: 'dyin', name: '大阴线', desc: '实体很长、几乎无上下影线，表示空方力量极强。', case: '2023年10月某消费龙头季报不及预期，收出大阴线后调整15%。', bullish: false, advice: '强烈卖出/观望信号。若跌破重要支撑位且放量，应考虑减仓或止损。' },
    { id: 'szx', name: '十字星', desc: '开盘价与收盘价几乎相同，多空力量均衡，变盘信号。', case: '2024年1月贵州茅台高位十字星，随后缩量回调一周。', bullish: false, advice: '观望信号。高位十字星偏空，低位十字星偏多，需结合次日走势确认方向。' },
    { id: 'czx', name: '锤子线', desc: '下影线长、实体小，出现在下跌末端为见底信号。', case: '2023年3月中芯国际低位锤子线，随后反弹20%。', bullish: true, advice: '潜在买入信号。要求出现在连续下跌后，下影线长度最好是实体的2倍以上，次日阳线确认后介入。' },
    { id: 'dcz', name: '倒锤头', desc: '上影线长、实体小，出现在下跌末端，多方试探反攻。', case: '2024年4月北方华创倒锤头后次日跳空高开，形成早晨之星。', bullish: true, advice: '试探性买入信号。需次日阳线确认，若高开高走可跟进；若次日低开则信号失效。' },
    { id: 'tzx', name: 'T字线', desc: '开盘价收盘价相同且在最高价，下影线长，下方承接强。', case: '2023年8月比亚迪T字线回踩20日均线后重拾升势。', bullish: true, advice: '买入信号。表明下方买盘强劲，若出现在支撑位附近且缩量，可靠性更高。' },
    { id: 'sjx', name: '射击之星', desc: '上影线长、实体小，出现在上涨末端为见顶信号。', case: '2023年7月某芯片股高位射击之星，随后两周回调18%。', bullish: false, advice: '卖出/减仓信号。出现在连续上涨后，上影线长度最好是实体的2倍以上，次日低开确认后减仓。' },
    { id: 'djx', name: '吊颈线', desc: '下影线长、实体小，出现在上涨末端，空方开始试探。', case: '2024年5月某医药股高位吊颈线，随后进入横盘整理。', bullish: false, advice: '警惕信号。虽形态与锤子线相同，但位置决定性质，出现在高位应提高警惕，考虑止盈。' },
    { id: 'fcx', name: '纺锤线', desc: '实体很小，上下影线均存在，多空拉锯、趋势可能放缓。', case: '2024年6月宁德时代整理期出现纺锤线，随后选择向上突破。', bullish: false, advice: '观望信号。表明市场犹豫不决，需等待后续K线确认方向，不宜贸然操作。' }
  ],
  combo: [
    { id: 'zcmt', name: '看涨吞没', desc: '前阴后阳，阳线实体完全覆盖阴线实体，底部反转信号。', case: '2024年3月隆基绿能看涨吞没，随后一周上涨12%。', bullish: true, advice: '买入信号。阳线实体越大、成交量越大，信号越可靠。可在收盘前或次日开盘时介入。' },
    { id: 'kcmt', name: '看跌吞没', desc: '前阳后阴，阴线实体完全覆盖阳线实体，顶部反转信号。', case: '2023年6月某AI概念股高位看跌吞没，两周回调25%。', bullish: false, advice: '卖出信号。阴线实体越大、成交量越大，看跌意味越强。应考虑减仓或止盈。' },
    { id: 'zmxz', name: '早晨之星', desc: '长阴→十字星→长阳，经典的底部反转组合。', case: '2024年3月贵州茅台早晨之星，随后涨幅达12%。', bullish: true, advice: '强烈买入信号。第三天阳线应深入第一天阴线实体的一半以上，成交量逐步放大为最佳。' },
    { id: 'hmxz', name: '黄昏之星', desc: '长阳→十字星→长阴，经典的顶部反转组合。', case: '2023年11月中际旭创黄昏之星，之后进入横盘整理。', bullish: false, advice: '强烈卖出信号。第三天阴线应深入第一天阳线实体的一半以上，高位出现应果断减仓。' },
    { id: 'hsb', name: '红三兵', desc: '连续三根小阳线，步步高升，多方稳扎稳打。', case: '2024年2月长江电力红三兵突破年线，开启波段行情。', bullish: true, advice: '买入/持仓信号。三根阳线实体逐渐放大为佳，若第三根放量突破压力位，可加仓。' },
    { id: 'szw', name: '三只乌鸦', desc: '连续三根阴线，空方步步紧逼，强烈看跌信号。', case: '2023年9月某医药股三只乌鸦，月跌幅超18%。', bullish: false, advice: '卖出信号。每日收盘价逐步走低，且最好有成交量配合，应果断离场。' },
    { id: 'wugd', name: '乌云盖顶', desc: '前阳后阴，阴线深入阳线实体一半以上，顶部看跌。', case: '2024年1月中信证券乌云盖顶，随后回调至10日均线。', bullish: false, advice: '卖出信号。阴线收盘价深入阳线实体越深、成交量越大，顶部反转概率越高。' },
    { id: 'ctx', name: '刺透形态', desc: '前阴后阳，阳线深入阴线实体一半以上，底部看涨。', case: '2023年12月比亚迪刺透形态，止跌反弹。', bullish: true, advice: '买入信号。阳线需深入阴线实体50%以上且带量，次日继续上涨可确认。' },
    { id: 'shlj', name: '身怀六甲', desc: '后K线实体完全被前K线实体包裹，趋势放缓信号。', case: '2024年5月药明康德身怀六甲，随后震荡整理。', bullish: false, advice: '观望信号。出现在趋势末端预示可能反转，但需下一根K线确认方向，方向不明时不宜操作。' },
    { id: 'szxb', name: '十字星变盘', desc: '十字星出现在连续上涨或下跌后，预示方向选择。', case: '2024年6月宁德时代十字星变盘，随后向上突破。', bullish: true, advice: '观望等待信号。十字星本身不代表方向，需结合次日走势和成交量判断，突破跟进。' },
    { id: 'tkqk', name: '跳空缺口', desc: '价格跳过某一区间未成交，分为突破、中继、衰竭缺口。', case: '2024年2月AI板块集体跳空高开突破，形成突破缺口。', bullish: true, advice: '突破缺口可跟进买入；中继缺口可持仓；衰竭缺口（放量滞涨）应考虑卖出。' },
    { id: 'ssf', name: '上升三法', desc: '一根长阳后连续三根小阴回调，再出一根长阳确认升势。', case: '2023年7月中际旭创上升三法，主升浪延续。', bullish: true, advice: '持仓/加仓信号。回调三根小阴成交量应萎缩，最后一根长阳放量突破前高为最佳买点。' },
    { id: 'txd', name: '塔形顶', desc: '一根长阳线后多根小阴小阳，再出一根长阴线，顶部形态。', case: '2023年8月某白酒股塔形顶，随后两个月持续下跌。', bullish: false, advice: '卖出信号。长阴线确认顶部形成，应及时减仓，尤其当跌破塔形整理平台下沿时。' },
    { id: 'txd2', name: '塔形底', desc: '一根长阴线后多根小阴小阳，再出一根长阳线，底部形态。', case: '2024年2月某新能源股塔形底，随后V型反弹。', bullish: true, advice: '买入信号。长阳线确认底部形成，若突破塔形整理平台上沿且放量，可积极跟进。' },
    { id: 'fsl', name: '分手线', desc: '两根K线开盘价相同但方向相反，趋势加速信号。', case: '2024年3月某科技股看涨分手线，随后加速上涨。', bullish: true, advice: '趋势延续信号。看涨分手线可持仓或追涨，看跌分手线应减仓。' }
  ],
  trend: [
    { id: 'jdd', name: '头肩顶', desc: '三个峰中间最高，跌破颈线后跌幅约为头到颈线的距离。', case: '2023年5月某消费龙头头肩顶，跌破后跌幅约20%。', bullish: false, advice: '卖出信号。跌破颈线时卖出第一仓位，回抽颈线确认无法站上时卖出剩余仓位。' },
    { id: 'jdd2', name: '头肩底', desc: '三个谷中间最低，突破颈线后涨幅约为头到颈线的距离。', case: '2024年1月半导体ETF头肩底，突破后上涨15%。', bullish: true, advice: '买入信号。突破颈线时买入第一仓位，回踩颈线确认支撑时加仓。' },
    { id: 'sdd', name: '双顶', desc: '两个相近高点，跌破颈线看跌。', case: '2023年8月华泰证券双顶，随后回落至前期低点。', bullish: false, advice: '卖出信号。跌破颈线时果断减仓，量度跌幅约等于顶到颈线的距离。' },
    { id: 'sdd2', name: '双底', desc: '两个相近低点，突破颈线看涨。', case: '2024年2月隆基绿能双底，突破后反弹30%。', bullish: true, advice: '买入信号。突破颈线时介入，回踩颈线不破为最佳加仓点。' },
    { id: 'yqd', name: '圆弧底', desc: '价格呈圆弧状缓慢回升，底部扎实，后市看涨。', case: '2023年11月长江电力圆弧底，半年后创新高。', bullish: true, advice: '买入信号。可在圆弧右侧逐步建仓，放量突破圆弧上沿时加仓。' },
    { id: 'vfz', name: 'V型反转', desc: '急跌后急涨，形成V字，通常伴随重大利好。', case: '2024年3月某新能源股V型反转，10日涨幅超40%。', bullish: true, advice: '追涨需谨慎。V型反转右侧确认后可小仓位跟进，但需设好止损，因V型顶部也容易急转直下。' },
    { id: 'qxzl', name: '旗形整理', desc: '急速运动后小幅回调的平行通道，突破后继续原趋势。', case: '2023年10月AI龙头旗形整理，突破后再涨25%。', bullish: true, advice: '持仓/突破跟进信号。整理期间应持仓不动，放量突破旗形上沿时加仓。' },
    { id: 'xdzl', name: '楔形整理', desc: '收敛三角形，突破后通常延续原趋势。', case: '2024年4月中芯国际楔形整理，向上突破。', bullish: true, advice: '观望等待突破。楔形末端将选择方向，放量突破上沿买入，跌破下沿卖出。' },
    { id: 'ksj', name: '扩散三角形', desc: '波动幅度越来越大，多空分歧加剧，通常出现在顶部。', case: '2023年6月某AI龙头扩散三角形，最终向下破位。', bullish: false, advice: '警惕信号。扩散三角形多出现在顶部，向下跌破下边线应果断卖出。' },
    { id: 'slj', name: '收敛三角形', desc: '波动幅度越来越小，多空趋于一致，突破后力度较大。', case: '2024年4月某半导体股收敛三角形，向上突破后涨幅20%。', bullish: true, advice: '观望等待突破。收敛末端突破方向决定趋势，放量突破可跟进。' },
    { id: 'jxzl', name: '矩形整理', desc: '价格在上下轨之间反复震荡，突破后延续原趋势。', case: '2024年1月比亚迪矩形整理，向上突破后开启主升浪。', bullish: true, advice: '观望/突破跟进。靠近下轨可低吸，靠近上轨可减仓；放量突破方向后跟进。' }
  ],
  indicator: [
    { id: 'madc', name: 'MA多头排列', desc: '短中长期均线由上到下依次排列，趋势向上。', case: '2024年2月宁德时代MA5>MA10>MA20，主升浪确立。', bullish: true, advice: '持仓/买入信号。多头排列形成后可持股待涨，回踩短期均线不破为低吸机会。' },
    { id: 'makd', name: 'MA空头排列', desc: '短中长期均线由下到上依次排列，趋势向下。', case: '2023年8月某医药股MA空头排列，持续走弱。', bullish: false, advice: '卖出/观望信号。空头排列形成后应离场观望，反弹至短期均线附近为减仓机会。' },
    { id: 'macdjx', name: 'MACD金叉死叉', desc: 'DIF上穿DEA为金叉看涨，下穿为死叉看跌。', case: '2024年3月比亚迪MACD金叉，随后两周上涨18%。', bullish: true, advice: '零轴上方金叉为强势买入信号；零轴下方金叉为弱势反弹，需谨慎。死叉则相反。' },
    { id: 'kdj', name: 'KDJ超买超卖', desc: 'K、D值>80超买，<20超卖，J值极端时信号更强。', case: '2024年1月某科技股KDJ超买后回落，<20时反弹。', bullish: false, advice: '超买区考虑减仓，超卖区考虑建仓。但单边行情中指标可能持续钝化，需结合趋势使用。' },
    { id: 'boll', name: '布林线收口突破', desc: '布林带收口表示波动收窄，突破上轨或下轨预示方向选择。', case: '2024年5月中芯国际布林收口后向上突破，涨幅15%。', bullish: true, advice: '收口后放量突破上轨买入；跌破下轨卖出。中轨可作为趋势判断依据。' },
    { id: 'vol', name: '成交量堆量/缩量', desc: '上涨放量确认趋势，上涨缩量需警惕；下跌缩量或见底。', case: '2024年2月AI板块堆量上涨，量价齐升。', bullish: true, advice: '上涨放量可跟进，上涨缩量应警惕；下跌放量应离场，下跌缩量可观望等待。' },
    { id: 'rsibl', name: 'RSI背离', desc: '价格创新高但RSI未创新高为顶背离看跌，反之底背离看涨。', case: '2023年11月某芯片股顶背离，随后回调15%。', bullish: false, advice: '顶背离卖出，底背离买入。背离信号需2-3个价格极值点确认，成功率高于单一指标。' },
    { id: 'ljbl', name: '量价背离', desc: '价格上涨但成交量萎缩，或价格下跌但成交量萎缩。', case: '2024年5月某股缩量创新高，随后快速回落。', bullish: false, advice: '上涨缩量背离应减仓，下跌缩量背离可能见底。量价配合是趋势健康的基础。' }
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
  klineCharts.forEach(({ chart }) => { try { chart.remove(); } catch(e) {} });
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
      <div class="mt-2 text-xs ${p.bullish?'bg-red-50 text-red-700':'bg-green-50 text-green-700'} p-2 rounded">
        <span class="font-medium">操作建议：</span>${p.advice || ''}
      </div>
      <div class="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
        <span class="font-medium">案例：</span>${p.case}
      </div>
    </div>
  `).join('');

  // Render charts after DOM update
  requestAnimationFrame(() => {
    items.forEach((p, idx) => {
      const el = document.getElementById(`kline-chart-${idx}`);
      if (!el) return;
      try {
        const chart = LightweightCharts.createChart(el, {
          width: el.clientWidth,
          height: 220,
          layout: { background: { color: '#f8fafc' }, textColor: '#374151' },
          grid: { vertLines: { color: '#e2e8f0' }, horzLines: { color: '#e2e8f0' } },
          rightPriceScale: { borderColor: '#e2e8f0' },
          timeScale: { borderColor: '#e2e8f0', timeVisible: true }
        });
        const seriesOptions = {
          upColor: '#DC2626', downColor: '#16A34A', borderVisible: false,
          wickUpColor: '#DC2626', wickDownColor: '#16A34A'
        };
        const series = chart.addSeries(LightweightCharts.CandlestickSeries, seriesOptions);
        series.setData(generatePatternData(p.id, p.bullish));
        klineCharts.push({ chart, container: el });
      } catch (err) {
        console.warn(`Kline chart render failed for ${p.name}:`, err);
        el.innerHTML = '<div class="flex items-center justify-center h-full text-gray-400 text-sm">图表加载失败</div>';
      }
    });
  });
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
  } else if (patternId === 'sjx') {
    data.push(makeCandle(date, 102, 101.5, 104, 101, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'djx') {
    data.push(makeCandle(date, 102, 101.5, 102.2, 99, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'fcx') {
    data.push(makeCandle(date, 101.5, 101, 102.5, 100.5, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'txd') {
    data.push(makeCandle(date, 100, 102, 102.5, 99.5, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.5, 101, 101.8, 100.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101, 101.2, 101.5, 100.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.2, 100.5, 101.5, 100.2, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 98, 100.8, 97.8, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'txd2') {
    data.push(makeCandle(date, 102, 100, 102.2, 99.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 101, 101.2, 100.2, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.8, 100.5, 101, 100.2, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 100.8, 101.2, 100.2, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.8, 103, 103.2, 100.5, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'fsl') {
    data.push(makeCandle(date, 101, 100, 101.5, 99.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101, 102.5, 102.8, 100.5, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'ksj') {
    data.push(makeCandle(date, 101, 100.5, 101.5, 100, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 101.5, 102, 99.5, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.5, 100, 102.5, 99.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100, 102, 102.5, 99, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 102, 99.5, 103, 98.5, false)); date.setDate(date.getDate()+1);
  } else if (patternId === 'slj') {
    data.push(makeCandle(date, 99, 102, 102.5, 98.5, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101, 100.5, 101.5, 99.5, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.5, 100.8, 101.2, 99.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.8, 100.2, 101, 100, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100.2, 101.5, 101.8, 100.2, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'jxzl') {
    data.push(makeCandle(date, 100, 101.5, 101.8, 99.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.2, 100.2, 101.5, 99.8, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100, 101.5, 101.8, 99.8, true)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 101.2, 100.2, 101.5, 99.8, false)); date.setDate(date.getDate()+1);
    data.push(makeCandle(date, 100, 102.5, 102.8, 99.8, true)); date.setDate(date.getDate()+1);
  } else if (patternId === 'rsibl') {
    for (let i=0;i<6;i++) { data.push(makeCandle(date, 99+i*0.5, 99.5+i*0.5, 100+i*0.5, 98.5+i*0.5, true)); date.setDate(date.getDate()+1); }
  } else if (patternId === 'ljbl') {
    for (let i=0;i<6;i++) { data.push(makeCandle(date, 99+i*0.5, 99.5+i*0.4, 100+i*0.5, 98.5+i*0.5, true)); date.setDate(date.getDate()+1); }
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
  klineCharts.forEach(({ chart, container }) => {
    try { chart.resize(container.clientWidth, 220); } catch(e) {}
  });
});
