// Learning Path Level 1-10
const learningData = [
  {
    level: 1, title: '开户实战（3天）', duration: '3天',
    lessons: [
      { title: '券商选择与佣金对比', content: '<p>选择券商时，佣金是首要考虑因素。目前市场上主流券商佣金费率在万1.3至万2.5之间。华泰证券涨乐财富通以低佣金著称，东方财富依托资讯优势用户体验好，中信证券投研实力强。</p><p>除了佣金，还要关注交易软件的稳定性、客服响应速度以及是否支持同花顺登录。新手建议优先选择佣金低、APP好用的券商。</p><div class="bg-gray-50 p-3 rounded mt-2 text-sm"><b>佣金对比表</b><br>华泰证券：万1.3（大客户可谈）<br>东方财富：万2.5<br>中信证券：万2.5-万3</div>' },
      { title: '同花顺APP基础操作', content: '<p>下载同花顺APP后，第一步完成开户资料提交。开户成功后，熟悉四个核心界面：</p><ul class="list-disc list-inside text-sm"><li>自选股：长按个股可设置价格预警</li><li>行情页：查看分时图、K线图、五档盘口</li><li>交易页：买入/卖出/撤单/查询</li><li>F10资料：公司概况、财务数据、股东研究</li></ul><p>建议新手先用模拟盘练习下单流程，再转入真实资金。</p>' },
      { title: '银证转账与风险测评', content: '<p>银证转账时间通常为交易日9:00-16:00。节假日和周末无法转账，需提前规划资金使用。密码连续输错5次会锁定，可通过券商APP重置。</p><p>风险测评问卷共10题，结果分为C1-C5五个等级。C1-C2只能购买低风险产品，C3以上可购买股票型基金，C4以上可参与融资融券。</p>' }
    ]
  },
  {
    level: 2, title: '交易规则（2天）', duration: '2天',
    lessons: [
      { title: 'A股交易时间详解', content: '<p>A股交易日为周一至周五（节假日除外），具体时间安排如下：</p><div class="bg-gray-50 p-3 rounded text-sm space-y-1"><div><b>9:15-9:25</b> 集合竞价：可挂单撤单（9:20后不可撤单）</div><div><b>9:30-11:30</b> 连续竞价（上午盘）</div><div><b>13:00-14:57</b> 连续竞价（下午盘）</div><div><b>14:57-15:00</b> 收盘集合竞价</div></div><p>集合竞价阶段成交价为最大成交量对应的价格，不懂规则容易在开盘时被"骗线"。</p>' },
      { title: 'T+1制度与涨跌停板', content: '<p>A股实行T+1交易制度，即当日买入的股票，最早下一个交易日才能卖出。这与港美股T+0有本质区别。可转债、部分ETF支持T+0。</p><p>主板股票涨跌幅限制为±10%，ST股票为±5%，创业板和科创板为±20%，北交所为±30%。新股上市首日不设涨跌幅。</p><div class="bg-gray-50 p-3 rounded text-sm mt-2"><b>手续费拆解（以10万元交易为例）</b><br>佣金（双向）：约25元<br>印花税（卖出）：50元<br>过户费（双向）：1元<br>合计：约76元</div>' },
      { title: '交易成本计算器实操', content: '<p>高频交易者尤其要关注交易成本。假设每月交易20次，每次10万元，佣金万2.5，则月交易成本约1020元，年化超过1.2%。如果佣金能降到万1.3，年化可节省约6000元。</p><p>建议每笔交易前先使用本站"投资计算器"估算实际到手收益，避免被手续费侵蚀利润。</p>' }
    ]
  },
  {
    level: 3, title: '软件操作（3天）', duration: '3天',
    lessons: [
      { title: '同花顺界面解剖', content: '<p>打开任意个股页面，从上到下依次是：个股名称与代码、分时图/K线图切换区、技术指标区、五档买卖盘、成交明细、个股资讯。</p><p>F10资料是基本面分析的入口，重点看"公司概况""财务分析""股东研究""最新公告"四大模块。股东研究中要关注机构持仓和北向资金动向。</p>' },
      { title: '自选股与预警设置', content: '<p>自选股列表建议按行业或策略分组。右键个股可选择"加入自选""设置预警""画线工具"。预警条件支持价格突破、涨跌幅触发、换手率异动等。</p><p>建议为持仓股设置±5%的价格预警，为关注股设置突破近期高点的预警。</p>' },
      { title: '快捷键与操作技巧', content: '<p>同花顺常用快捷键能大幅提升看盘效率：</p><ul class="list-disc list-inside text-sm"><li>F5：分时图与K线图切换</li><li>F10：查看个股基本资料</li><li>Ctrl+F：公式管理器（可导入自定义指标）</li><li>61：沪A涨幅排名</li><li>63：深A涨幅排名</li><li>80：综合排名（涨速、量比、换手率）</li></ul>' }
    ]
  },
  {
    level: 4, title: 'K线基础（5天）', duration: '5天',
    lessons: [
      { title: '单根K线构成解析', content: '<p>K线由实体和影线组成。实体表示开盘价与收盘价之间的区间，影线表示当日的最高和最低价格。</p><div class="flex gap-4 my-3"><div class="flex-1 bg-red-50 p-3 rounded text-center"><div class="text-up font-bold">阳线</div><p class="text-xs text-gray-600">收盘价 > 开盘价，代表多方占优</p></div><div class="flex-1 bg-green-50 p-3 rounded text-center"><div class="text-down font-bold">阴线</div><p class="text-xs text-gray-600">收盘价 < 开盘价，代表空方占优</p></div></div><p>实体越长，说明多空力量越悬殊；影线越长，说明盘中争夺越激烈。十字星是变盘的前兆。</p>' },
      { title: '20种基础形态卡片', content: '<p>常见见底形态包括：锤子线、启明星、看涨吞没、刺透形态、早晨之星。常见见顶形态包括：流星线、吊颈线、看跌吞没、乌云盖顶、黄昏之星。</p><p>形态的有效性需要结合成交量和位置判断。下跌末端出现的锤子线比上涨中途的锤子线更可靠。突破重要均线后的吞没形态成功率更高。</p>' },
      { title: 'K线形态识别测试', content: '<p>学习K线不能只看理论，要多看历史走势图。建议每天复盘5只个股的日线图，标注当日K线形态并预测次日走势，次日再验证。</p><p>本站"K线分析"页面提供了30种经典形态的交互式图库，建议每天学习3-5种，一周内完成一轮复习。</p>' }
    ]
  },
  {
    level: 5, title: '组合形态（7天）', duration: '7天',
    lessons: [
      { title: '启明星与黄昏之星', content: '<p>启明星由三根K线组成：长阴线→十字星（或小实体）→长阳线。它出现在下跌末端，是强烈的见底信号。黄昏之星形态相反，出现在上涨末端，是见顶信号。</p><p>以贵州茅台2024年3月为例，股价在连续调整后收出早晨之星组合，随后两周涨幅达12%。黄昏之星则需要警惕放量滞涨。</p>' },
      { title: '吞没形态与三兵/乌鸦', content: '<p>看涨吞没要求阳线实体完全覆盖前一日阴线实体，且出现在下跌趋势中。看跌吞没则相反。吞没形态越果断，反转信号越强。</p><p>红三兵是连续三根逐步抬升的小阳线，表明多方稳扎稳打。三只乌鸦则是连续三根阴线，空方占据绝对优势。</p>' },
      { title: '假突破与陷阱识别', content: '<p>假突破是指股价短暂突破重要支撑或压力位后迅速反向运动。多头陷阱常见于牛市末期，空头陷阱常见于熊市末期。</p><p>识别陷阱的关键指标：成交量是否配合、突破后是否迅速收回、MACD是否出现背离。单独的K线形态容易失效，必须多指标共振。</p>' }
    ]
  },
  {
    level: 6, title: '均线系统（5天）', duration: '5天',
    lessons: [
      { title: '金叉死叉与均线排列', content: '<p>金叉是指短期均线上穿长期均线，如MA5上穿MA20，是买入信号。死叉则是短期均线下穿长期均线，是卖出信号。</p><p>多头排列是指MA5>MA10>MA20>MA60>MA250，此时趋势向上，持股为主。空头排列则相反，应以空仓或轻仓观望为主。</p>' },
      { title: '不同周期均线的用途', content: '<div class="bg-gray-50 p-3 rounded text-sm space-y-1"><div><b>MA5（周线）</b>：超短线参考，波动敏感</div><div><b>MA20（月线）</b>：波段操作的生命线</div><div><b>MA60（季线）</b>：中期趋势分界线</div><div><b>MA250（年线）</b>：长期牛熊分界线</div></div><p>跌破年线通常意味着长期趋势转弱，站上年线则意味着长期趋势向好。</p>' },
      { title: '均线支撑压力实战', content: '<p>均线不仅是趋势指标，也是动态支撑和压力位。当股价回调至MA20附近止跌回升，说明MA20支撑有效，可视为加仓点。反之，反弹至MA60遇阻回落，说明压力有效。</p><p>均线粘合后往往会选择方向突破，这是波段交易的重要观察窗口。</p>' }
    ]
  },
  {
    level: 7, title: '技术指标（7天）', duration: '7天',
    lessons: [
      { title: 'MACD指标实战', content: '<p>MACD由DIF线、DEA线和红绿柱组成。DIF上穿DEA为金叉，下穿为死叉。MACD的核心价值在于判断趋势的强度和背离。</p><p>顶背离：股价创出新高，但MACD未创新高，预示上涨动能减弱。底背离：股价创出新低，但MACD未创新低，预示下跌动能衰竭。背离信号出现后，通常会有3-5个交易日的调整或反弹。</p>' },
      { title: 'KDJ与RSI超买超卖', content: '<p>KDJ指标中，K值>80为超买区，<20为超卖区。J值>100或<0时信号更极端。RSI常用参数为14日，>70超买，<30超卖。</p><p>在强势上涨行情中，指标可能长期停留在超买区，此时不宜过早看空。在震荡行情中，超买超卖的参考价值更高。</p>' },
      { title: '布林带与成交量分析', content: '<p>布林带由中轨（MA20）、上轨和下轨组成。收口表示波动率下降，往往预示着即将突破。股价沿上轨运行表示强势，跌破中轨需警惕。</p><p>成交量是价格的确认指标。价升量增是健康走势；价升量缩需警惕顶部；价跌量缩可能是洗盘；价跌量增则是恐慌抛售。</p>' }
    ]
  },
  {
    level: 8, title: '基本面分析（7天）', duration: '7天',
    lessons: [
      { title: '三张表速读技巧', content: '<p>利润表看营收增速和净利润率，营收增速连续两季度>20%说明成长性较好。资产负债表看流动比率和资产负债率，流动比率>1.5、资产负债率<60%相对健康。现金流量表看经营现金流净额，持续为正且覆盖净利润是优质信号。</p><p>新手可关注ROE（净资产收益率），连续5年>15%的公司通常具有较强的护城河。</p>' },
      { title: 'ROE杜邦分析与估值', content: '<p>ROE = 净利率 × 总资产周转率 × 权益乘数。高ROE可能来自高利润率（如茅台）、高周转率（如零售）或高杠杆（如银行）。</p><p>估值常用PE（市盈率）和PB（市净率）。成长股看PEG，价值股看PB。PE<行业平均可能被低估，但低PE不一定好，需结合成长性判断。</p>' },
      { title: 'F10资料阅读指南', content: '<p>F10的"股东研究"模块中，机构持仓比例提升、北向资金持续流入是积极信号。"经营分析"中看主营构成，业务过于分散的公司风险更高。"最新公告"重点关注业绩预增/预减、重大资产重组、减持/增持公告。</p><p>业绩预增在发布当日和次日通常会有正向反应，减持公告则需要警惕短期抛压。</p>' }
    ]
  },
  {
    level: 9, title: '行业与宏观（5天）', duration: '5天',
    lessons: [
      { title: '产业链与行业轮动', content: '<p>以新能源产业链为例：上游是锂矿/钴矿/硅料，中游是电池/组件/设备，下游是整车/充电桩/运营商。上游涨价会压缩中游利润，中游技术进步会带动下游普及。</p><p>行业轮动通常遵循经济周期。复苏期金融地产先行，扩张期消费科技领涨，滞胀期资源股抗跌，衰退期防御板块占优。</p>' },
      { title: '政策敏感板块解读', content: '<p>新能源板块对补贴政策高度敏感，补贴退坡往往引发板块调整。医药板块受集采影响大，中标价大幅下降会压缩药企利润。中特估政策则利好低估值央企银行股。</p><p>建议关注财联社电报和政策文件，第一时间获取政策动向。政策利好往往有3-5天的主题炒作窗口。</p>' },
      { title: '美林投资时钟应用', content: '<p>美林时钟将经济周期分为复苏、过热、滞胀、衰退四个阶段。复苏期股票最佳，过热期商品最佳，滞胀期现金为王，衰退期债券占优。</p><p>在中国市场，由于政策调控频繁，美林时钟的轮转速度更快。投资者需要结合货币政策（降准降息利好股市）和财政政策（基建发力利好周期股）灵活调整配置。</p>' }
    ]
  },
  {
    level: 10, title: '交易系统（持续）', duration: '持续',
    lessons: [
      { title: '建立交易计划书', content: '<p>成熟的交易者每笔操作前都会写好交易计划书，包含：买入条件（技术形态+基本面触发）、目标仓位、止损位（通常-7%）、止盈位（通常+15%或跌破10日线）。</p><p>计划书的作用是克服情绪干扰。无论盘中如何波动，只要触发了预设条件就坚决执行，不因贪婪或恐惧而随意更改计划。</p>' },
      { title: '交易心理与情绪管理', content: '<p>导致亏损最常见的三种心理是：贪婪（追涨杀跌）、恐惧（底部割肉）、侥幸心理（不止损）。建议每天收盘后填写交易日记，记录当天的情绪状态和决策质量。</p><p>连续亏损时要强制降低仓位或暂停交易，避免报复性操作。股市永远不缺机会，缺的是耐心和纪律。</p>' },
      { title: '模拟交易复盘与总结', content: '<p>使用本站模拟盘完成至少20笔交易后，统计胜率和盈亏比。胜率>50%且盈亏比>1.5是健康的交易系统特征。如果胜率低但盈亏比高，说明止损严格、止盈果断。</p><p>复盘时重点分析：哪些交易是按计划执行的？哪些是冲动交易？亏损交易中是否有共同的模式？不断优化交易系统，形成属于自己的稳定盈利模式。</p>' }
    ]
  }
];

let learningProgress = {};

function initLearningProgress() {
  const saved = localStorage.getItem('zfinance_learning');
  if (saved) learningProgress = JSON.parse(saved);
  else {
    learningData.forEach(l => { learningProgress[l.level] = { completed: false, lessons: new Array(l.lessons.length).fill(false) }; });
    saveLearningProgress();
  }
}

function saveLearningProgress() {
  localStorage.setItem('zfinance_learning', JSON.stringify(learningProgress));
}

let currentLevel = 1;

function renderLevelList() {
  const nav = document.getElementById('level-nav');
  if (!nav) return;
  nav.innerHTML = learningData.map(l => {
    const p = learningProgress[l.level];
    const completedLessons = p ? p.lessons.filter(Boolean).length : 0;
    const pct = Math.round((completedLessons / l.lessons.length) * 100);
    const active = l.level === currentLevel ? 'bg-blue-50 border-primary' : 'bg-white border-transparent';
    return `
      <div onclick="switchLevel(${l.level})" class="cursor-pointer border-l-4 ${active} pl-3 py-2 hover:bg-gray-50 transition">
        <div class="flex justify-between items-center">
          <span class="text-sm font-medium">Level ${l.level}: ${l.title.split('（')[0]}</span>
          <span class="text-xs text-gray-400">${pct}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
          <div class="bg-primary h-1.5 rounded-full level-progress-bar" style="width:${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');

  // Total progress
  let totalLessons = 0, completedTotal = 0;
  learningData.forEach(l => {
    totalLessons += l.lessons.length;
    const p = learningProgress[l.level];
    if (p) completedTotal += p.lessons.filter(Boolean).length;
  });
  const totalPct = Math.round((completedTotal / totalLessons) * 100);
  document.getElementById('total-progress-text').textContent = totalPct + '%';
  document.getElementById('total-progress-bar').style.width = totalPct + '%';
}

function switchLevel(lv) {
  currentLevel = lv;
  renderLevelList();
  renderLevelContent();
}

function renderLevelContent() {
  const container = document.getElementById('level-content');
  const data = learningData.find(l => l.level === currentLevel);
  if (!container || !data) return;
  const p = learningProgress[data.level];
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="text-2xl font-bold">Level ${data.level}: ${data.title}</h2>
      <p class="text-gray-500 text-sm mt-1">预计学习时间：${data.duration}</p>
    </div>
    <div class="space-y-4">
      ${data.lessons.map((les, idx) => `
        <div class="border rounded-lg overflow-hidden">
          <button onclick="toggleLesson(${idx})" class="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left">
            <span class="font-medium">课时 ${idx+1}: ${les.title}</span>
            <span class="flex items-center gap-2">
              <input type="checkbox" ${p && p.lessons[idx]?'checked':''} onclick="event.stopPropagation();toggleLessonComplete(${idx})" class="w-4 h-4 text-primary">
              <svg id="les-chevron-${idx}" class="w-5 h-5 text-gray-400 transform transition ${idx===0?'rotate-180':''}" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/></svg>
            </span>
          </button>
          <div id="les-body-${idx}" class="px-4 py-4 text-sm leading-relaxed text-gray-700 ${idx===0?'':'hidden'}">
            ${les.content}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function toggleLesson(idx) {
  const body = document.getElementById(`les-body-${idx}`);
  const chevron = document.getElementById(`les-chevron-${idx}`);
  if (!body) return;
  body.classList.toggle('hidden');
  if (chevron) chevron.classList.toggle('rotate-180');
}

function toggleLessonComplete(idx) {
  const p = learningProgress[currentLevel];
  if (!p) return;
  p.lessons[idx] = !p.lessons[idx];
  saveLearningProgress();
  renderLevelList();
}
