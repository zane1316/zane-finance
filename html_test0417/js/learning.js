// Learning Path Level 1-10
const learningData = [
  {
    level: 1, title: '认识股市（3天）', duration: '3天',
    lessons: [
      {
        title: '什么是股票？A股市场的特点',
        content: `
          <p class="mb-3">股票本质上是一家公司的所有权凭证。当你买入一股贵州茅台，你就成为了茅台公司的微小股东，享有公司分红和股价上涨的收益权。与银行存款不同，股票不保本，收益和风险都由投资者自己承担。</p>
          <p class="mb-3"><strong>A股</strong>是指在中国境内注册、在沪深交易所上市、以人民币计价和交易的股票。它的核心特点包括：</p>
          <ul class="list-disc list-inside mb-3 space-y-1">
            <li><strong>T+1交易制度</strong>：今天买入的股票，最早明天才能卖出</li>
            <li><strong>涨跌停板限制</strong>：主板单日最多涨10%、跌10%，防止极端波动</li>
            <li><strong>散户占比高</strong>：A股散户交易量占比超过60%，情绪波动大，机会也多</li>
            <li><strong>政策驱动明显</strong>：产业政策、货币政策对板块影响远超美股</li>
          </ul>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">新手必读</p>
            <p class="text-sm text-blue-700">不要把炒股当成"快速致富"的工具。股市中"七亏二平一赚"的规律长期有效。先把学习放在第一位，用模拟盘练手，再投入真金白银。</p>
          </div>
          <p class="mb-3"><strong>股票 vs 基金 vs 债券：</strong></p>
          <div class="overflow-x-auto mb-3">
            <table class="w-full text-sm border-collapse">
              <thead><tr class="bg-gray-100"><th class="text-left p-2 rounded-tl-lg">对比项</th><th class="text-left p-2">股票</th><th class="text-left p-2">基金</th><th class="text-left p-2 rounded-tr-lg">债券</th></tr></thead>
              <tbody class="bg-white">
                <tr class="border-b border-gray-100"><td class="p-2 font-medium">风险</td><td class="p-2 text-red-600">高</td><td class="p-2 text-amber-600">中</td><td class="p-2 text-green-600">低</td></tr>
                <tr class="border-b border-gray-100"><td class="p-2 font-medium">收益潜力</td><td class="p-2 text-up">高</td><td class="p-2 text-primary">中高</td><td class="p-2 text-down">较低</td></tr>
                <tr class="border-b border-gray-100"><td class="p-2 font-medium">时间投入</td><td class="p-2">多</td><td class="p-2">少</td><td class="p-2">极少</td></tr>
                <tr class="border-b border-gray-100"><td class="p-2 font-medium">门槛</td><td class="p-2">100股起</td><td class="p-2">10元起</td><td class="p-2">1000元起</td></tr>
                <tr><td class="p-2 font-medium rounded-bl-lg">适合谁</td><td class="p-2">愿意研究</td><td class="p-2">新手/上班族</td><td class="p-2 rounded-br-lg">保守型</td></tr>
              </tbody>
            </table>
          </div>
          <p class="mb-3"><strong>新手建议：</strong>从<strong>指数基金定投</strong>开始，同时用少量资金（不超过总资产的20%）学习个股操作。基金波动相对较小，能让你先熟悉市场节奏；等积累了一定经验再逐步增加股票比例。</p>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. A股实行T+1还是T+0？</p>
              <p>2. 主板股票的涨跌幅限制是多少？</p>
              <p>3. 为什么A股被称为"政策市"？</p>
            </div>
          </details>
        `
      },
      {
        title: '基金投资：新手的最佳起点',
        content: `
          <p class="mb-3">很多新手一开户就急着想买股票，但<strong>基金才是大多数新手最应该开始的理财工具</strong>。基金的本质是"把钱交给专业的人，让他帮你买股票/债券"。你不需要研究个股，不需要盯盘，就能获得市场平均收益。</p>
          <p class="mb-3"><strong>为什么新手应该从基金开始？</strong></p>
          <ul class="list-disc list-inside mb-3 space-y-1">
            <li><strong>门槛低</strong>：10元就能买，不像股票最少要买100股（一手）</li>
            <li><strong>分散风险</strong>：一只基金通常持有几十甚至上百只股票，单只股票暴雷对整体影响很小</li>
            <li><strong>专业管理</strong>：基金经理和投研团队全职研究市场，普通散户很难匹敌</li>
            <li><strong>省时省力</strong>：不需要盯盘、不需要看财报、不需要研究K线</li>
            <li><strong>心态友好</strong>：基金波动通常小于个股，新手不容易因剧烈波动而恐慌操作</li>
          </ul>
          <p class="mb-3"><strong>常见基金类型速览：</strong></p>
          <div class="overflow-x-auto mb-3">
            <table class="w-full text-sm border-collapse">
              <thead><tr class="bg-gray-100"><th class="text-left p-2 rounded-tl-lg">类型</th><th class="text-left p-2">特点</th><th class="text-left p-2">风险</th><th class="text-left p-2 rounded-tr-lg">适合</th></tr></thead>
              <tbody class="bg-white">
                <tr class="border-b border-gray-100"><td class="p-2 font-medium">货币型</td><td class="p-2">余额宝类产品，随存随取</td><td class="p-2 text-green-600">极低</td><td class="p-2">活期理财</td></tr>
                <tr class="border-b border-gray-100"><td class="p-2 font-medium">债券型</td><td class="p-2">主要投资国债、企业债</td><td class="p-2 text-green-600">低</td><td class="p-2">稳健保值</td></tr>
                <tr class="border-b border-gray-100"><td class="p-2 font-medium">指数型</td><td class="p-2">跟踪沪深300等指数</td><td class="p-2 text-amber-600">中</td><td class="p-2">新手首选</td></tr>
                <tr class="border-b border-gray-100"><td class="p-2 font-medium">混合型</td><td class="p-2">股票+债券灵活配置</td><td class="p-2 text-amber-600">中高</td><td class="p-2">长期持有</td></tr>
                <tr class="border-b border-gray-100"><td class="p-2 font-medium">股票型</td><td class="p-2">80%以上仓位买股票</td><td class="p-2 text-red-600">高</td><td class="p-2">能承受波动</td></tr>
                <tr><td class="p-2 font-medium rounded-bl-lg">QDII</td><td class="p-2">投资海外 markets</td><td class="p-2 text-amber-600">中</td><td class="p-2 rounded-br-lg">分散A股风险</td></tr>
              </tbody>
            </table>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">新手路径建议</p>
            <p class="text-sm text-blue-700"><strong>第一步</strong>：用货币基金（如余额宝）存放日常备用金。<br><strong>第二步</strong>：每月定投沪深300指数基金，金额不用多，500-1000元即可，目的是"先上车"。<br><strong>第三步</strong>：在定投的同时，用本站模拟盘学习个股操作，但实盘资金不超过总资产的20%。<br><strong>记住</strong>：基金让你"睡得着觉"，股票让你"学得快"。两者结合，才是新手最优解。</p>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">重要提醒</p>
            <p class="text-sm text-yellow-700">基金≠稳赚。2020-2021年大量新手在高点买入明星基金，随后市场回调，很多基金净值回撤超过30%。基金投资同样需要择时和纪律，定投是最适合新手的入场方式，因为它天然实现了"低位多买、高位少买"的效果。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 基金和股票相比，最大的优势是什么？</p>
              <p>2. 为什么指数基金被称为"新手首选"？</p>
              <p>3. 新手建议的理财三步路径是什么？</p>
              <p>4. 定投为什么能天然实现"低位多买、高位少买"？</p>
            </div>
          </details>
        `
      },
      {
        title: '开户全流程实战',
        content: `
          <p class="mb-3">炒股第一步是开立证券账户。目前开户全部可以在线上完成，只需要身份证和银行卡，15分钟即可搞定。以下是详细步骤：</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>步骤1：选择券商</strong></p>
            <p>新手优先考虑佣金率低、APP体验好的大券商。华泰证券（涨乐财富通）、东方财富、平安证券、招商证券都是不错的选择。佣金默认万2.5，资金量大可以谈到万1.3甚至更低。</p>
            <p><strong>步骤2：下载APP并提交资料</strong></p>
            <p>上传身份证正反面、录制人脸识别视频、绑定银行卡（必须是本人借记卡）、完成风险测评问卷。</p>
            <p><strong>步骤3：等待审核</strong></p>
            <p>通常1个工作日内完成审核，你会收到资金账号和密码。首次登录必须修改密码。</p>
          </div>
          <p class="mb-3"><strong>开户注意事项：</strong></p>
          <ul class="list-disc list-inside mb-3 space-y-1">
            <li>每人最多可在<strong>3家券商</strong>开立沪A账户，深A账户不受限制</li>
            <li>佣金是<strong>双向收取</strong>的（买入和卖出都要付），但印花税只在卖出时收</li>
            <li>开户时务必开通<strong>可转债</strong>和<strong>创业板</strong>权限（创业板需2年交易经验）</li>
            <li>北交所、港股通、融资融券属于进阶权限，新手暂不急需</li>
          </ul>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">常见陷阱</p>
            <p class="text-sm text-yellow-700">不要在第三方平台"一键开户"——这些渠道佣金通常较高且难以调低。直接下载券商官方APP开户，开户后主动联系客户经理要求调佣。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 每人最多可以开几个沪A账户？</p>
              <p>2. 佣金是单向还是双向收取？</p>
              <p>3. 为什么建议直接找券商官方APP开户？</p>
            </div>
          </details>
        `
      },
      {
        title: '银证转账与风险测评',
        content: `
          <p class="mb-3">开户成功后，你需要把银行卡里的钱转到证券账户才能买股票。这个过程叫<strong>银证转账</strong>，完全免费且实时到账。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>转账时间</strong></p>
            <p>交易日 8:30 - 16:00（不同券商略有差异）。周末和节假日无法转账，需提前规划资金。密码连续输错5次会锁定，可通过券商APP重置。</p>
            <p><strong>转账限额</strong></p>
            <p>单笔和日累计限额由银行设定，通常在50万-500万之间。如需大额转账，提前在手机银行调高限额。</p>
          </div>
          <p class="mb-3"><strong>风险测评详解：</strong>开户时必须完成风险测评问卷（约10道题），结果分为C1到C5五个等级：</p>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-2 mb-3 text-sm text-center">
            <div class="bg-green-50 p-2 rounded"><p class="font-medium">C1</p><p class="text-xs text-gray-600">保守型</p></div>
            <div class="bg-green-100 p-2 rounded"><p class="font-medium">C2</p><p class="text-xs text-gray-600">稳健型</p></div>
            <div class="bg-yellow-50 p-2 rounded"><p class="font-medium">C3</p><p class="text-xs text-gray-600">平衡型</p></div>
            <div class="bg-orange-50 p-2 rounded"><p class="font-medium">C4</p><p class="text-xs text-gray-600">积极型</p></div>
            <div class="bg-red-50 p-2 rounded"><p class="font-medium">C5</p><p class="text-xs text-gray-600">激进型</p></div>
          </div>
          <p class="mb-3">C1-C2只能购买低风险产品（货币基金、国债逆回购）；C3及以上可以购买股票和混合基金；C4及以上可开通创业板、可转债；C5才能开通融资融券（杠杆交易）。<strong>建议新手诚实作答，不要为了追求权限而虚报风险承受能力。</strong></p>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">实操建议</p>
            <p class="text-sm text-blue-700">首次转入资金建议不超过1万元。先熟悉下单流程、盈亏计算，再逐步加仓。股市不会因为你少投了一万就少了机会，但会因为多投了一万而多了焦虑。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 银证转账的可用时间是？</p>
              <p>2. C3等级可以购买哪些产品？</p>
              <p>3. 为什么建议首次入金不超过1万元？</p>
            </div>
          </details>
        `
      },
      {
        title: '股市参与者生态',
        content: `
          <p class="mb-3">理解股市中不同参与者的行为模式，是新手超越同龄投资者的关键一步。A股市场不是散户与散户的零和博弈，而是散户、机构、北向资金、国家队、游资五大力量之间的多维博弈。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>散户（个人投资者）</strong></p>
            <p>A股散户数量超过2亿，但资金占比不到30%。散户的典型特征是：追涨杀跌、信息滞后、情绪化交易、缺乏风控。据统计，散户年化收益率中位数为负。但散户也有独特优势——船小好调头，没有持仓比例限制，可以全仓单只股票。</p>
            <p><strong>机构投资者（公募/私募/保险/社保）</strong></p>
            <p>机构拥有研究团队、数据优势和信息渠道。公募基金持仓每季度披露（季报/半年报/年报），可以通过"机构重仓股"了解聪明钱的动向。但机构也有劣势：规模大导致进出不便，业绩排名压力导致羊群效应，风控限制导致灵活性不足。</p>
            <p><strong>北向资金（沪深港通）</strong></p>
            <p>通过香港交易所流入A股的境外资金。北向资金被称为"聪明钱"，因为外资研究机构对A股的估值体系更成熟。每天收盘后可以在东方财富查看"北向资金净流入"——连续多日大幅流入通常是中期底部信号，连续流出则需警惕。</p>
            <p><strong>国家队（证金/汇金/社保基金）</strong></p>
            <p>在市场极端恐慌时（如2015年股灾、2024年初大跌），国家队会入场维稳。国家队的持仓以大盘蓝筹为主（银行、保险、券商、石油），特点是长期持有、不频繁交易。跟紧国家队不适合追求高收益，但适合保守型投资者避险。</p>
            <p><strong>游资（短线大户）</strong></p>
            <p>游资是A股最活跃的短期资金，典型的如"章盟主""方新侠"等。游资偏好小市值、题材热的股票，擅长打造涨停板。龙虎榜（每日盘后公布）可以查看游资席位。新手不建议追随游资——游资的进出速度散户跟不上，往往成为接盘侠。</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">实战演练</p>
            <p class="text-sm text-blue-700">打开同花顺APP → 首页 → "资金流向" → 查看"北向资金"今日净流入金额。再点击 "龙虎榜" → 查看今日哪只股票的买入席位最多。记录你观察到的现象：北向资金流入时大盘通常涨还是跌？龙虎榜上有机构专用席位的股票次日表现如何？</p>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">核心洞察</p>
            <p class="text-sm text-yellow-700">不同参与者的"时间框架"不同：游资看分钟线，散户看日线，机构看季度线，国家队看年线。当你决定买入一只股票时，先问问自己——你和谁在交易？对方为什么卖？如果你不知道对手是谁，就不要下单。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 北向资金为什么被称为"聪明钱"？</p>
              <p>2. 国家队的典型持仓特征是什么？</p>
              <p>3. 为什么不建议新手追随游资操作？</p>
              <p>4. 散户相对于机构的唯一优势是什么？</p>
            </div>
          </details>
        `
      }
    ]
  },
  {
    level: 2, title: '交易规则（2天）', duration: '2天',
    lessons: [
      {
        title: 'A股交易时间与竞价机制',
        content: `
          <p class="mb-3">A股交易时间为<strong>周一至周五</strong>（节假日除外），每天分为四个阶段，每个阶段的规则都不同：</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <div class="flex gap-3"><span class="font-medium min-w-[80px]">9:15-9:20</span><span>开盘集合竞价——可挂单、可撤单。主力常在此阶段试盘，价格可能大幅波动但不一定真实。</span></div>
            <div class="flex gap-3"><span class="font-medium min-w-[80px]">9:20-9:25</span><span>开盘集合竞价——可挂单、<strong>不可撤单</strong>。此时挂单是真实的，9:25统一撮合成交。</span></div>
            <div class="flex gap-3"><span class="font-medium min-w-[80px]">9:30-11:30</span><span>连续竞价（上午盘）——价格优先、时间优先，实时撮合。</span></div>
            <div class="flex gap-3"><span class="font-medium min-w-[80px]">13:00-14:57</span><span>连续竞价（下午盘）——与上午盘规则相同。</span></div>
            <div class="flex gap-3"><span class="font-medium min-w-[80px]">14:57-15:00</span><span>收盘集合竞价——只接受挂单，不可撤单，15:00统一撮合出收盘价。</span></div>
          </div>
          <p class="mb-3"><strong>集合竞价的核心逻辑</strong>：系统在所有买卖订单中，找出一个能成交最大数量的价格作为开盘价/收盘价。如果某只股票在9:25的开盘价远高于昨日收盘价，说明买盘强劲，可能高开高走。</p>
          <p class="mb-3"><strong>连续竞价的成交原则</strong>：<strong>价格优先</strong>（买单越高越先成交，卖单越低越先成交）、<strong>时间优先</strong>（同价格下先挂单的先成交）。这也是为什么涨停板时你挂单买入很难成交——有太多人排队在你前面。</p>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">新手陷阱</p>
            <p class="text-sm text-yellow-700">9:15-9:20看到的涨跌幅可能是假的——主力挂大单再撤单，诱导散户跟风。等到9:20之后再看竞价方向才更可靠。很多新手在9:18看到某股"涨停"就追进去，结果9:24主力撤单，开盘直接跳水。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 为什么9:20-9:25的挂单比9:15-9:20更可信？</p>
              <p>2. 连续竞价的成交原则是什么？</p>
              <p>3. 涨停板时为什么很难买入？</p>
            </div>
          </details>
        `
      },
      {
        title: 'T+1、涨跌停与特殊标识',
        content: `
          <p class="mb-3"><strong>T+1制度</strong>是A股最核心的交易规则之一：今天（T日）买入的股票，必须等到下一个交易日（T+1日）才能卖出。这意味着你无法做到"日内高抛低吸"。</p>
          <p class="mb-3">但有几个例外支持T+0：</p>
          <ul class="list-disc list-inside mb-3 space-y-1">
            <li>可转债：当天买入可当天卖出，且无涨跌幅限制</li>
            <li>部分ETF（如跨境ETF、商品ETF、债券ETF）</li>
            <li> already持仓的股票可以"先卖后买"做T（需要提前持有底仓）</li>
          </ul>
          <p class="mb-3"><strong>涨跌幅限制</strong>是为了防止股价极端波动而设置的保护机制：</p>
          <div class="overflow-x-auto mb-3">
            <table class="w-full text-sm border-collapse">
              <thead><tr class="bg-gray-100"><th class="p-2 text-left">板块</th><th class="p-2 text-left">涨跌幅限制</th><th class="p-2 text-left">典型股票</th></tr></thead>
              <tbody>
                <tr class="border-b"><td class="p-2">沪深主板</td><td class="p-2">±10%</td><td class="p-2">贵州茅台、中国平安</td></tr>
                <tr class="border-b"><td class="p-2">ST股票</td><td class="p-2">±5%</td><td class="p-2">名称以ST开头的股票</td></tr>
                <tr class="border-b"><td class="p-2">创业板（30开头）</td><td class="p-2">±20%</td><td class="p-2">宁德时代、迈瑞医疗</td></tr>
                <tr class="border-b"><td class="p-2">科创板（68开头）</td><td class="p-2">±20%</td><td class="p-2">中芯国际、海光信息</td></tr>
                <tr><td class="p-2">北交所（8开头）</td><td class="p-2">±30%</td><td class="p-2">北交所上市公司</td></tr>
              </tbody>
            </table>
          </div>
          <p class="mb-3"><strong>特殊标识：</strong></p>
          <ul class="list-disc list-inside mb-3 space-y-1">
            <li><strong>ST</strong>：连续亏损两年，被实施"特别处理"，涨跌幅±5%</li>
            <li><strong>*ST</strong>：连续亏损三年，有退市风险</li>
            <li><strong>N</strong>：上市首日（New），无涨跌幅限制</li>
            <li><strong>C</strong>：注册制新股上市后第2-5天</li>
            <li><strong>U</strong>：科创板公司尚未盈利</li>
            <li><strong>W</strong>：同股不同权（如小米如果在A股）</li>
          </ul>
          <div class="bg-red-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-red-800 mb-1">风险提示</p>
            <p class="text-sm text-red-700">新手强烈建议远离ST/*ST股票和上市首日的新股。ST股基本面差、流动性差，容易连续跌停；新股上市首日波动极大，散户追高往往深套。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. T+1是什么意思？有哪些品种可以T+0？</p>
              <p>2. 创业板和科创板的涨跌幅限制是多少？</p>
              <p>3. *ST和ST有什么区别？</p>
            </div>
          </details>
        `
      },
      {
        title: '交易成本精算',
        content: `
          <p class="mb-3">很多新手只关注股价涨跌，却忽略了<strong>交易成本</strong>对收益的侵蚀。频繁交易 + 高佣金 = 稳定亏损。让我们算一笔细账：</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>A股交易成本构成（买入 + 卖出各一次）：</strong></p>
            <div class="flex justify-between border-b pb-1"><span>佣金（双向）</span><span>万0.85 ~ 万2.5</span></div>
            <div class="flex justify-between border-b pb-1"><span>印花税（仅卖出）</span><span>千0.5（国家收取，全国统一）</span></div>
            <div class="flex justify-between border-b pb-1"><span>过户费（双向）</span><span>千0.01</span></div>
            <div class="flex justify-between pt-1 font-medium"><span>合计（以万2佣金为例）</span><span>约万6.6</span></div>
          </div>
          <p class="mb-3"><strong>实战计算</strong>：假设你每月交易20次，每次买入和卖出各10万元，佣金万2：</p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li>每月佣金 = 20 × 10万 × 万2 × 2（双向）= 800元</li>
            <li>每月印花税 = 20 × 10万 × 千0.5 = 1000元</li>
            <li>每月过户费 = 20 × 10万 × 千0.01 × 2 = 40元</li>
            <li>每月总成本 = <strong>1840元</strong>，年化超过<strong>2.2万元</strong></li>
          </ul>
          <p class="mb-3">如果你的账户总资金是20万元，那么光是交易成本就占到了年收益的11%。换句话说，<strong>你必须年化盈利11%以上才能覆盖交易成本</strong>。如果佣金能降到万1.3，年化可节省约6000元。</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">省钱策略</p>
            <p class="text-sm text-blue-700">1. 降低佣金：开户后主动联系客户经理调佣。2. 减少交易频率：从每月20次降到5次，成本直降75%。3. 善用本站"投资计算器"中的盈亏计算器，下单前先算清楚实际到手收益。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 印花税是单向还是双向收取？</p>
              <p>2. 每月交易20次、每次10万、佣金万2，年化成本大约是多少？</p>
              <p>3. 降低交易成本的三个方法是什么？</p>
            </div>
          </details>
        `
      },
      {
        title: '停牌、复牌与除权除息',
        content: `
          <p class="mb-3">除了日常交易规则，A股还有一些特殊机制会直接影响你的持仓和收益。新手如果对停牌、复牌、除权除息不了解，很容易在操作中吃亏。</p>
          <p class="mb-3"><strong>停牌</strong>是指股票暂停交易。常见原因包括：重大资产重组、发布重大公告、股价异常波动被监管问询、召开股东大会等。停牌时间从1天到数月不等。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>停牌期间的风险</strong></p>
            <p>1. <strong>资金冻结</strong>：停牌期间无法卖出，资金被锁定。如果停牌前重仓，期间遇到大盘大跌只能干瞪眼。</p>
            <p>2. <strong>复牌补跌/补涨</strong>：如果停牌期间大盘大跌，复牌后通常要补跌；反之如果板块大涨，复牌后可能补涨甚至一字涨停。</p>
            <p>3. <strong>重大重组失败</strong>：如果停牌是为了重组，但重组最终失败，复牌后通常连续跌停。2023年某芯片股重组失败复牌后7个跌停，散户损失惨重。</p>
          </div>
          <p class="mb-3"><strong>除权除息（XR/XD/DR）</strong>：上市公司分红或送股后，股价需要相应调整，这个调整过程叫除权除息。</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-3 text-sm">
            <p class="font-medium text-blue-800 mb-1">除权除息计算公式</p>
            <p><strong>除息价</strong> = 股权登记日收盘价 - 每股现金分红</p>
            <p><strong>除权价</strong> = 股权登记日收盘价 ÷ (1 + 每股送股比例)</p>
            <p class="mt-2"><strong>举例</strong>：某股票收盘价20元，公告每10股派5元送3股。除息除权后参考价 = (20 - 0.5) ÷ 1.3 = 15.0元。你的持股数量增加了30%，但单价下降了，总资产不变。</p>
          </div>
          <p class="mb-3"><strong>填权与贴权</strong>：除权后股价重新涨回除权前的价格叫"填权"，说明市场看好；除权后股价继续下跌叫"贴权"，说明市场看淡。高分红、低估值的白马股填权概率较高。</p>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">实操提醒</p>
            <p class="text-sm text-yellow-700">1. 持股不到一个月卖出，分红要缴20%个人所得税；持股1个月到1年缴10%；持股超过1年免税。2. 不要为了"抢权"（股权登记日前买入博分红）而买入，因为除权后价格会下调，短期卖出还要缴税，往往得不偿失。3. 停牌股复牌首日通常波动极大，新手不建议首日参与。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 停牌期间最大的风险是什么？</p>
              <p>2. 除权除息后你的总资产会变吗？</p>
              <p>3. 持股多久分红可以免税？</p>
              <p>4. 什么是填权和贴权？</p>
            </div>
          </details>
        `
      }
    ]
  },
  {
    level: 3, title: '软件操作（3天）', duration: '3天',
    lessons: [
      {
        title: '同花顺APP深度导航',
        content: `
          <p class="mb-3">同花顺是目前A股投资者使用最广泛的行情和交易软件。熟练掌握它，是你看盘效率的基石。打开APP后，底部有五个主标签：</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>首页</strong>：大盘指数、自选股快捷入口、热点资讯。建议把最关心的指数和自选股放在首页快捷区。</p>
            <p><strong>行情</strong>：市场全貌，包括沪深排行、板块涨幅、个股搜索。快捷键61（沪A涨幅）、63（深A涨幅）、80（综合排名）都在这里找到入口。</p>
            <p><strong>自选</strong>：你关注的股票列表。支持多分组管理（如"持仓""观察""短线""长线"），每个分组独立设置。</p>
            <p><strong>交易</strong>：买入、卖出、撤单、查询持仓和资金。必须通过交易密码登录，与行情账号分开。</p>
            <p><strong>资讯</strong>：7×24小时财经新闻、公告、研报。财联社快讯最为及时，重大消息通常秒级推送。</p>
          </div>
          <p class="mb-3"><strong>个股页面解剖</strong>：点击任意股票进入详情页，从上到下依次是：</p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li>顶部：股票名称、代码、当前价格、涨跌幅</li>
            <li>分时图/K线图（F5切换）：显示当日或历史价格走势</li>
            <li>技术指标区：MACD、KDJ、成交量副图</li>
            <li>五档盘口：买1-5和卖1-5的挂单价格和数量</li>
            <li>成交明细：逐笔成交记录，看主力动向</li>
            <li>底部Tab：资金、新闻、公告、F10资料</li>
          </ul>
          <p class="mb-3"><strong>F10资料是基本面分析的入口</strong>，重点看四个模块：</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm">
            <div class="bg-blue-50 p-3 rounded"><p class="font-medium">公司概况</p><p class="text-gray-600">主营业务、行业地位、竞争对手</p></div>
            <div class="bg-green-50 p-3 rounded"><p class="font-medium">财务分析</p><p class="text-gray-600">营收、利润、ROE、现金流</p></div>
            <div class="bg-yellow-50 p-3 rounded"><p class="font-medium">股东研究</p><p class="text-gray-600">机构持仓、北向资金、十大股东</p></div>
            <div class="bg-purple-50 p-3 rounded"><p class="font-medium">最新公告</p><p class="text-gray-600">业绩报告、增减持、重大事项</p></div>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 同花顺底部五个主标签分别是什么？</p>
              <p>2. F10资料中最重要的四个模块是什么？</p>
              <p>3. 五档盘口显示了什么信息？</p>
            </div>
          </details>
        `
      },
      {
        title: '自选股管理与预警',
        content: `
          <p class="mb-3">自选股是你日常看盘的核心工作区。一个混乱的自选股列表会让你错过关键信号。建议按以下逻辑分组：</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>持仓股</strong>：当前持有的股票，重点盯盘，设置价格预警</p>
            <p><strong>观察池</strong>：符合买入条件但尚未建仓的股票，等待回调或突破信号</p>
            <p><strong>短线池</strong>：技术面活跃、成交量放大的题材股，适合快进快出</p>
            <p><strong>长线池</strong>：基本面优秀、估值合理的白马股，适合长期持有</p>
            <p><strong>指数ETF</strong>：沪深300ETF、创业板ETF等，用于判断大盘风向</p>
          </div>
          <p class="mb-3"><strong>预警设置实操</strong>：长按个股 → "预警" → 设置触发条件。常用预警类型：</p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li><strong>价格预警</strong>：突破近期高点或跌破止损位时提醒</li>
            <li><strong>涨跌幅预警</strong>：单日涨跌超过5%或7%时提醒（异动信号）</li>
            <li><strong>换手率预警</strong>：换手率突然放大到平时3倍以上（主力异动）</li>
            <li><strong>成交量预警</strong>：成交量突破近期均量2倍（资金介入）</li>
          </ul>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">高效看盘技巧</p>
            <p class="text-sm text-blue-700">1. 每天早上9:15打开自选股，观察集合竞价异动。2. 设置"涨幅>5%"预警，盘中收到推送立即查看是否放量突破。3. 收盘后浏览自选股当日K线，标注形态和成交量变化。4. 每周清理一次自选股，删除不再关注的、加入新发现的。</p>
          </div>
          <p class="mb-3"><strong> news推送设置</strong>：在"我的"→"推送设置"中，建议开启"自选股重大公告"和"持仓股价格预警"。不要开启全部推送，否则会被信息轰炸。</p>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 自选股建议分为哪几个分组？</p>
              <p>2. 四种常用预警类型是什么？</p>
              <p>3. 为什么不要开启全部推送？</p>
            </div>
          </details>
        `
      },
      {
        title: '下单实操与快捷键',
        content: `
          <p class="mb-3">下单是交易中最关键的一步。一个错误的委托方式，可能导致你无法成交或成交在不利价格。以下是A股的委托类型详解：</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>限价委托</strong>：你指定一个价格，系统只在达到或优于该价格时成交。例：茅台现价1700元，你挂1680元买入，只有当价格跌到1680或以下才会成交。</p>
            <p><strong>市价委托</strong>：不指定价格，以当前最优价格立即成交。优点是确保成交，缺点是价格不确定，尤其在波动大时可能买在高点。</p>
            <p><strong>本方最优</strong>：以买一价（买入时）或卖一价（卖出时）成交，比普通市价更可控。</p>
            <p><strong>对手方最优</strong>：以卖一价买入或以买一价卖出，成交速度快。</p>
          </div>
          <p class="mb-3"><strong>新手建议始终使用限价委托</strong>。市价委托在股价剧烈波动时可能让你以极不划算的价格成交（例如闪崩时市价卖出，可能直接卖到跌停价）。</p>
          <p class="mb-3"><strong>同花顺常用快捷键</strong>（电脑版）：</p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3 text-sm">
            <div class="bg-white border p-2 rounded text-center"><p class="font-medium">F5</p><p class="text-gray-600 text-xs">分时/K线切换</p></div>
            <div class="bg-white border p-2 rounded text-center"><p class="font-medium">F10</p><p class="text-gray-600 text-xs">个股资料</p></div>
            <div class="bg-white border p-2 rounded text-center"><p class="font-medium">Ctrl+F</p><p class="text-gray-600 text-xs">公式管理器</p></div>
            <div class="bg-white border p-2 rounded text-center"><p class="font-medium">61</p><p class="text-gray-600 text-xs">沪A涨幅排名</p></div>
            <div class="bg-white border p-2 rounded text-center"><p class="font-medium">63</p><p class="text-gray-600 text-xs">深A涨幅排名</p></div>
            <div class="bg-white border p-2 rounded text-center"><p class="font-medium">80</p><p class="text-gray-600 text-xs">综合排名</p></div>
            <div class="bg-white border p-2 rounded text-center"><p class="font-medium">81</p><p class="text-gray-600 text-xs">沪A综合排名</p></div>
            <div class="bg-white border p-2 rounded text-center"><p class="font-medium">87</p><p class="text-gray-600 text-xs">创业板排名</p></div>
            <div class="bg-white border p-2 rounded text-center"><p class="font-medium">.400</p><p class="text-gray-600 text-xs">板块热点</p></div>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">下单纪律</p>
            <p class="text-sm text-yellow-700">1. 买入前先确认股票代码，避免因代码相似买错（如600519茅台和600519开头的其他股票）。2. 输入数量时，A股最低买入100股（1手），且必须是100的整数倍。3. 卖出时不受100股限制，可以卖1股。4. 下单后务必在"当日委托"中确认状态。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 限价委托和市价委托的区别是什么？</p>
              <p>2. A股最低买入数量是多少？</p>
              <p>3. 为什么新手建议用限价委托？</p>
            </div>
          </details>
        `
      },
      {
        title: '高级看盘技巧',
        content: `
          <p class="mb-3">当你已经熟悉同花顺的基本操作后，下一步是掌握高级看盘技巧。专业投资者和散户的一大区别，就在于看盘工具的使用效率和深度。</p>
          <p class="mb-3"><strong>多周期同列</strong>：在同一屏幕上同时查看一只股票的不同周期K线（如日线+60分钟线+15分钟线）。这可以帮助你判断大周期趋势和小周期买卖点的关系。操作方法：同花顺电脑版 → 右键 → "多周期同列"。</p>
          <p class="mb-3"><strong>多股同屏（多股同列）</strong>：同时监控4只、9只甚至16只股票的实时走势。适合同时关注板块内多只龙头股，或监控持仓组合的整体表现。快捷键：Ctrl+4（4股同列）、Ctrl+9（9股同列）。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>龙虎榜解读</strong>：每日收盘后，交易所会公布涨跌幅偏离值达±7%、日换手率达20%、日价格振幅达15%的股票的买卖席位。龙虎榜是观察游资和机构动向的重要窗口。</p>
            <p>关键看点：1. 买入席位中是否有"机构专用"（机构买入通常代表中长期看好）。2. 卖出席位中是否出现知名游资（游资出货后次日通常低开）。3. 买入金额是否均匀分布（如果前五买入占比超过50%，说明筹码集中，后续波动大）。</p>
            <p><strong>资金流向</strong>：同花顺的"资金流向"功能可以查看大盘、板块、个股的资金净流入/流出。注意区分"大单流入"（机构行为）和"小单流入"（散户行为）。</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">实战演练</p>
            <p class="text-sm text-blue-700">打开同花顺电脑版，练习以下操作：1. 打开任意股票，按Ctrl+4切换到4股同列。2. 按F5在日K和分时图之间切换。3. 盘后查看今日龙虎榜，找出机构净买入最多的3只股票。4. 查看自选股列表中哪只股票的"大单净流入"最多。</p>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">避坑指南</p>
            <p class="text-sm text-yellow-700">不要盲目相信"资金流向"指标。有些软件的资金流向是估算而非真实成交数据，不同软件统计口径差异很大。资金流向只能作为辅助参考，不能作为买卖依据。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 多周期同列有什么作用？</p>
              <p>2. 龙虎榜中"机构专用"席位买入通常代表什么？</p>
              <p>3. 为什么资金流向不能作为买卖依据？</p>
              <p>4. 多股同屏的快捷键是什么？</p>
            </div>
          </details>
        `
      }
    ]
  },
  {
    level: 4, title: 'K线基础（5天）', duration: '5天',
    lessons: [
      {
        title: 'K线的构成要素',
        content: `
          <p class="mb-3">K线（又称蜡烛图）是日本德川幕府时代米商本间宗久发明的价格记录方式，如今已成为全球金融市场最通用的图表语言。一根K线记录了四个价格：</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>开盘价</strong>：当天第一笔成交的价格（9:25集合竞价确定）</p>
            <p><strong>收盘价</strong>：当天最后一笔成交的价格（15:00确定）</p>
            <p><strong>最高价</strong>：当天出现过最高的成交价格</p>
            <p><strong>最低价</strong>：当天出现过最低的成交价格</p>
          </div>
          <p class="mb-3">K线由<strong>实体</strong>和<strong>影线</strong>两部分组成：</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div class="bg-red-50 p-4 rounded-lg text-center">
              <p class="font-medium text-up mb-2">阳线（红K线）</p>
              <div class="w-8 h-16 bg-red-500 mx-auto mb-2 relative">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-red-500"></div>
                <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-red-500"></div>
              </div>
              <p class="text-xs text-gray-600">收盘价 > 开盘价，代表多方（买方）占优</p>
              <p class="text-xs text-gray-500 mt-1">实体下沿=开盘价，上沿=收盘价</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg text-center">
              <p class="font-medium text-down mb-2">阴线（绿K线）</p>
              <div class="w-8 h-16 bg-green-500 mx-auto mb-2 relative">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-green-500"></div>
                <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-green-500"></div>
              </div>
              <p class="text-xs text-gray-600">收盘价 < 开盘价，代表空方（卖方）占优</p>
              <p class="text-xs text-gray-500 mt-1">实体上沿=开盘价，下沿=收盘价</p>
            </div>
          </div>
          <p class="mb-3"><strong>影线的含义</strong>：上影线表示盘中曾经被拉高但最终回落，说明上方有抛压；下影线表示盘中曾经被打压但最终拉回，说明下方有承接。影线越长，说明盘中争夺越激烈。</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">关键规律</p>
            <p class="text-sm text-blue-700">实体越长，说明多空力量越悬殊（大阳线=强势，大阴线=弱势）。实体越短，说明多空力量越均衡（十字星=变盘信号）。观察K线时，一定要结合<strong>成交量</strong>和<strong>位置</strong>判断——同样的K线形态，出现在底部和顶部的意义完全不同。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 一根K线记录了哪四个价格？</p>
              <p>2. 阳线和阴线的实体分别代表什么？</p>
              <p>3. 长上影线和长下影线分别说明什么？</p>
            </div>
          </details>
        `
      },
      {
        title: '单根K线六种经典形态',
        content: `
          <p class="mb-3">单根K线虽然信息有限，但某些特殊形态往往预示着重要的转折信号。以下是六种最经典的单根K线形态：</p>
          <div class="space-y-3 mb-3">
            <div class="bg-red-50 p-3 rounded-lg">
              <p class="font-medium text-up">1. 大阳线</p>
              <p class="text-sm text-gray-700">实体很长、几乎没有影线的阳线，说明从开盘到收盘多方完全掌控局面。如果出现在底部区域，往往是趋势反转的信号；如果出现在上涨途中，说明趋势延续。</p>
              <p class="text-xs text-gray-500 mt-1">案例：2024年2月6日，上证指数在2635点底部收出一根大阳线，随后开启500点反弹。</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
              <p class="font-medium text-down">2. 大阴线</p>
              <p class="text-sm text-gray-700">实体很长、几乎没有影线的阴线，说明空方完全碾压多方。出现在顶部区域是见顶信号；出现在下跌途中说明恐慌抛售还在继续。</p>
              <p class="text-xs text-gray-500 mt-1">案例：2024年1月22日，某AI概念股在高位放量收出大阴线，随后两周腰斩。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="font-medium">3. 十字星</p>
              <p class="text-sm text-gray-700">开盘价和收盘价几乎相等，实体极小呈十字状。说明多空力量达到暂时平衡，往往是变盘的前兆。高位十字星（"黄昏之星"的一部分）尤其危险。</p>
            </div>
            <div class="bg-red-50 p-3 rounded-lg">
              <p class="font-medium text-up">4. 锤子线</p>
              <p class="text-sm text-gray-700">实体较小（阳线或阴线均可），下影线很长（至少是实体的2倍），上影线很短或没有。出现在下跌末端，说明盘中一度大跌但尾盘被强力拉回，是强烈的见底信号。</p>
              <p class="text-xs text-gray-500 mt-1">关键条件：必须出现在下跌趋势末端，且次日需阳线确认。</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
              <p class="font-medium text-down">5. 倒锤头</p>
              <p class="text-sm text-gray-700">实体较小，上影线很长，下影线很短。出现在下跌末端，说明盘中一度冲高但回落，多方开始试探性进攻。信号强度弱于锤子线，需要次日确认。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="font-medium">6. T字线 / 倒T字线</p>
              <p class="text-sm text-gray-700">T字线：开盘价=收盘价=最高价，只有下影线。说明开盘后被打压但尾盘拉回原位，多方顽强。倒T字线则相反。两者都代表盘中激烈博弈，需要结合位置判断。</p>
            </div>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">核心原则</p>
            <p class="text-sm text-yellow-700">单根K线的信号<strong>必须结合位置和成交量</strong>判断。下跌末端的大阳线比上涨中途的大阳线更可靠；放量的大阴线比缩量的大阴线更危险。永远不要仅凭一根K线就做出交易决策。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 锤子线的关键特征是什么？</p>
              <p>2. 为什么单根K线必须结合位置判断？</p>
              <p>3. 十字星出现在高位和低位分别代表什么？</p>
            </div>
          </details>
        `
      },
      {
        title: 'K线组合形态入门',
        content: `
          <p class="mb-3">两根或三根K线组合在一起，可以传递比单根K线更丰富的信息。以下是新手必须掌握的六种基础组合形态：</p>
          <div class="space-y-3 mb-3">
            <div class="bg-red-50 p-3 rounded-lg">
              <p class="font-medium text-up">看涨吞没</p>
              <p class="text-sm text-gray-700">出现在下跌途中：第一根是阴线，第二根是阳线，且阳线实体完全"吞没"了前一根阴线的实体。说明空方力量耗尽，多方反攻。成功率约60-65%，需要成交量放大配合。</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
              <p class="font-medium text-down">看跌吞没</p>
              <p class="text-sm text-gray-700">出现在上涨途中：第一根是阳线，第二根是阴线，阴线实体完全吞没阳线实体。多方被打压，趋势可能反转。如果出现在高位且成交量放大，信号更可靠。</p>
            </div>
            <div class="bg-red-50 p-3 rounded-lg">
              <p class="font-medium text-up">早晨之星</p>
              <p class="text-sm text-gray-700">三根K线组合：长阴线 → 十字星（或小实体K线）→ 长阳线。第一根确认下跌趋势，第二根表示多空平衡，第三根确认反转。这是非常可靠的底部信号，成功率约65-70%。</p>
              <p class="text-xs text-gray-500 mt-1">经典案例：宁德时代2022年4月底走出早晨之星，随后三个月翻倍。</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
              <p class="font-medium text-down">黄昏之星</p>
              <p class="text-sm text-gray-700">与早晨之星相反：长阳线 → 十字星 → 长阴线。出现在上涨末端，是见顶信号。黄昏之星的成功率通常高于早晨之星，因为"顶部形成快、底部形成慢"。</p>
            </div>
            <div class="bg-red-50 p-3 rounded-lg">
              <p class="font-medium text-up">红三兵</p>
              <p class="text-sm text-gray-700">连续三根逐步抬升的小阳线，每天的收盘价都高于前一天。说明多方稳扎稳打，趋势健康延续。如果第三根阳线成交量明显放大，说明资金加速入场。</p>
            </div>
            <div class="bg-green-50 p-3 rounded-lg">
              <p class="font-medium text-down">三只乌鸦</p>
              <p class="text-sm text-gray-700">连续三根逐步降低的小阴线，每天的收盘价都低于前一天。说明空方控盘，趋势向下。如果出现在高位，通常预示着中期调整的开始。</p>
            </div>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">学习建议</p>
            <p class="text-sm text-blue-700">建议每天复盘时，在自选股中找出1-2只符合上述形态的股票，截图保存并标注。持续观察这些股票未来3-5天的走势，验证形态的有效性。本站"K线分析"页面提供了30种经典形态的交互式图库，建议每天学习3-5种。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 看涨吞没和看跌吞没的区别是什么？</p>
              <p>2. 早晨之星由哪三根K线组成？</p>
              <p>3. 为什么黄昏之星的成功率通常高于早晨之星？</p>
            </div>
          </details>
        `
      },
      {
        title: 'K线周期与级别',
        content: `
          <p class="mb-3">很多新手只看日线，忽略了不同时间周期的配合分析。实际上，日线、周线、月线传递的信息完全不同，多周期共振是高手判断趋势的核心方法。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>日线（日线级别）</strong>：最常用的周期，反映短期趋势。适合短线交易者和波段操作者。日线MACD金叉通常代表1-2周的上涨周期。</p>
            <p><strong>周线（周线级别）</strong>：反映中期趋势，噪音比日线少。周线多头排列说明中期趋势向上，即使日线回调也是低吸机会。职业投资者的核心决策周期通常是周线。</p>
            <p><strong>月线（月线级别）</strong>：反映长期趋势，适合价值投资者。月线级别的底部形态（如W底、圆弧底）一旦确认，往往预示着数月的上涨行情。</p>
            <p><strong>分钟线（5/15/30/60分钟）</strong>：用于日内交易和精确买卖点。60分钟线MACD顶背离通常预示日线级别即将调整。新手不建议过度依赖分钟线，容易陷入频繁交易。</p>
          </div>
          <p class="mb-3"><strong>周期共振原则</strong>：当多个周期同时发出同向信号时，成功概率大幅提升。</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm">
            <div class="bg-red-50 p-3 rounded"><p class="font-medium text-up"> bullish 共振（买入信号）</p><p>月线趋势向上 + 周线MACD金叉 + 日线放量突破</p></div>
            <div class="bg-green-50 p-3 rounded"><p class="font-medium text-down"> bearish 共振（卖出信号）</p><p>月线趋势向下 + 周线MACD死叉 + 日线跌破MA20</p></div>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">实战演练</p>
            <p class="text-sm text-blue-700">打开同花顺，选择一只你关注的股票：1. 按F5切换到周线，判断中期趋势方向。2. 再切换到月线，判断长期趋势方向。3. 回到日线，寻找与周月趋势同向的买入/卖出信号。记录你的发现：如果三个周期方向不一致，应该听谁的？</p>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">核心原则</p>
            <p class="text-sm text-yellow-700">大周期决定小周期，小周期服从大周期。如果月线在下跌，日线出现金叉也不应重仓买入；如果月线在上涨，日线回调到MA20反而是加仓机会。这叫"看大做小"。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 职业投资者的核心决策周期通常是？</p>
              <p>2. 什么是"看大做小"？</p>
              <p>3. 当三个周期方向不一致时，应该听谁的？</p>
              <p>4. 为什么新手不建议过度依赖分钟线？</p>
            </div>
          </details>
        `
      }
    ]
  },
  {
    level: 5, title: '均线系统（5天）', duration: '5天',
    lessons: [
      {
        title: '均线的计算与意义',
        content: `
          <p class="mb-3">均线（Moving Average，MA）是技术分析中最基础、最常用的指标。它通过计算过去N天的收盘价的平均值，来平滑价格波动，从而识别趋势方向。</p>
          <p class="mb-3"><strong>计算公式</strong>：MA5 = （今天收盘价 + 昨天收盘价 + ... + 4天前收盘价）÷ 5</p>
          <p class="mb-3">不同周期的均线代表了不同时间维度的市场平均成本：</p>
          <div class="overflow-x-auto mb-3">
            <table class="w-full text-sm border-collapse">
              <thead><tr class="bg-gray-100"><th class="p-2 text-left">均线</th><th class="p-2 text-left">周期含义</th><th class="p-2 text-left">用途</th></tr></thead>
              <tbody>
                <tr class="border-b"><td class="p-2 font-medium">MA5</td><td class="p-2">一周交易成本</td><td class="p-2">超短线强弱分界</td></tr>
                <tr class="border-b"><td class="p-2 font-medium">MA10</td><td class="p-2">两周交易成本</td><td class="p-2">短线趋势</td></tr>
                <tr class="border-b"><td class="p-2 font-medium">MA20</td><td class="p-2">月线（约一个月）</td><td class="p-2">波段操作生命线</td></tr>
                <tr class="border-b"><td class="p-2 font-medium">MA60</td><td class="p-2">季线（约一季度）</td><td class="p-2">中期趋势分界</td></tr>
                <tr><td class="p-2 font-medium">MA250</td><td class="p-2">年线（约一年）</td><td class="p-2">长期牛熊分界</td></tr>
              </tbody>
            </table>
          </div>
          <p class="mb-3"><strong>均线的核心逻辑</strong>：均线代表了市场参与者在某段时间内的平均持仓成本。当股价高于MA20时，说明近一个月买入的人平均是赚钱的，市场情绪偏乐观；当股价低于MA20时，说明近期买入的人平均被套，市场情绪偏悲观。</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">均线多头排列 vs 空头排列</p>
            <p class="text-sm text-blue-700 mb-2"><strong>多头排列</strong>：MA5 > MA10 > MA20 > MA60，K线在所有均线上方。说明短中长期投资者都在盈利，趋势向上，持股为主。</p>
            <p class="text-sm text-blue-700"><strong>空头排列</strong>：MA5 < MA10 < MA20 < MA60，K线在所有均线下方。说明所有周期投资者都在亏损，趋势向下，空仓观望。</p>
          </div>
          <p class="mb-3">均线也存在滞后性——它是基于历史数据计算的，无法预测未来。因此均线更适合判断趋势方向，而不是精确预测拐点。</p>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. MA20为什么被称为"波段生命线"？</p>
              <p>2. 多头排列和空头排列分别代表什么？</p>
              <p>3. 均线的最大缺点是什么？</p>
            </div>
          </details>
        `
      },
      {
        title: '金叉与死叉的实战信号',
        content: `
          <p class="mb-3">当短期均线上穿长期均线时，称为<strong>金叉</strong>，是买入信号；当短期均线下穿长期均线时，称为<strong>死叉</strong>，是卖出信号。最常用的组合是MA5与MA20的金叉/死叉。</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div class="bg-red-50 p-4 rounded-lg">
              <p class="font-medium text-up mb-2">金叉（买入信号）</p>
              <p class="text-sm text-gray-700">MA5上穿MA20，说明短期趋势转强，短线资金开始流入。如果金叉出现在MA60上方，说明中期趋势也在向好，信号更可靠。</p>
              <p class="text-xs text-gray-500 mt-2">注意：低位金叉比高位金叉更可靠。连续上涨后出现的金叉可能是诱多。</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <p class="font-medium text-down mb-2">死叉（卖出信号）</p>
              <p class="text-sm text-gray-700">MA5下穿MA20，说明短期趋势走弱，短线资金在流出。如果死叉出现在MA60下方，说明中期也在走弱，应考虑减仓。</p>
              <p class="text-xs text-gray-500 mt-2">注意：高位死叉比低位死叉更可靠。下跌途中的死叉可能只是中继。</p>
            </div>
          </div>
          <p class="mb-3"><strong>多周期共振</strong>：当多个周期同时出现金叉信号时，称为"共振"，成功率大幅提升。例如：日线MA5金叉MA20 + 周线MA5金叉MA10 + 成交量放大，这是一个高胜率的中线买入机会。</p>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">常见陷阱：均线粘合后的假突破</p>
            <p class="text-sm text-yellow-700">当MA5、MA10、MA20纠缠在一起时（"均线粘合"），说明多空力量均衡，即将选择方向。很多新手看到金叉就买入，结果买在假突破上。正确做法是：等待金叉后回踩均线确认，且成交量持续放大，再考虑介入。</p>
          </div>
          <p class="mb-3"><strong>实战纪律</strong>：单一金叉/死叉的成功率只有50-55%，必须结合以下条件才能提高胜率：</p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li>成交量是否配合放大（量价齐升）</li>
            <li>是否处于关键支撑/压力位附近</li>
            <li>大盘环境是否支持（大盘处于上升趋势中，个股成功率更高）</li>
            <li>K线形态是否共振（如金叉同时出现看涨吞没）</li>
          </ul>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 金叉和死叉分别是什么信号？</p>
              <p>2. 什么是"多周期共振"？</p>
              <p>3. 为什么均线粘合后的金叉容易是假突破？</p>
            </div>
          </details>
        `
      },
      {
        title: '均线支撑与压力识别',
        content: `
          <p class="mb-3">均线不仅是趋势指标，还是动态的<strong>支撑位</strong>和<strong>压力位</strong>。因为均线代表了某段时间内的平均成本，所以股价回调到均线附近时，往往会遇到买盘支撑。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>MA20支撑</strong>：在上升趋势中，股价每次回调到MA20附近都能止跌回升，说明MA20支撑有效。这通常是波段加仓点。如果跌破MA20且3天内无法收回，说明趋势可能反转，应减仓。</p>
            <p><strong>MA60压力</strong>：在下跌趋势中，股价每次反弹到MA60附近都遇阻回落，说明MA60压力有效。此时不宜追高，应等待突破确认。</p>
            <p><strong>年线（MA250）牛熊分界</strong>：股价在年线上方运行，视为牛市环境，以持股为主；股价在年线下方运行，视为熊市环境，以空仓或轻仓为主。站上年线是中长期转强的标志。</p>
          </div>
          <p class="mb-3"><strong>葛兰碧八大法则</strong>（均线经典理论）：</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm">
            <div class="bg-red-50 p-2 rounded"><p class="font-medium text-up">买点1</p><p>均线从下降转平，股价上穿均线</p></div>
            <div class="bg-red-50 p-2 rounded"><p class="font-medium text-up">买点2</p><p>股价在均线上方，回调不跌破均线</p></div>
            <div class="bg-red-50 p-2 rounded"><p class="font-medium text-up">买点3</p><p>股价跌破均线但均线仍向上，假跌破</p></div>
            <div class="bg-red-50 p-2 rounded"><p class="font-medium text-up">买点4</p><p>股价暴跌远离均线，超跌反弹</p></div>
            <div class="bg-green-50 p-2 rounded"><p class="font-medium text-down">卖点1</p><p>均线从上升转平，股价跌破均线</p></div>
            <div class="bg-green-50 p-2 rounded"><p class="font-medium text-down">卖点2</p><p>股价在均线下方，反弹不突破均线</p></div>
            <div class="bg-green-50 p-2 rounded"><p class="font-medium text-down">卖点3</p><p>股价上穿均线但均线仍向下，假突破</p></div>
            <div class="bg-green-50 p-2 rounded"><p class="font-medium text-down">卖点4</p><p>股价暴涨远离均线，超买回调</p></div>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">实操要点</p>
            <p class="text-sm text-blue-700">均线支撑/压力不是绝对的价格线，而是一个"区域"。股价可能会短暂跌破MA20但当天收回（"回踩确认"），这种情况反而更健康。真正危险的是<strong>放量跌破</strong>且连续3天无法收回——这说明支撑失效，趋势大概率反转。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. MA20在什么情况下被视为支撑？</p>
              <p>2. 年线（MA250）的牛熊分界意义是什么？</p>
              <p>3. 放量跌破支撑且3天无法收回，应该怎么做？</p>
            </div>
          </details>
        `
      },
      {
        title: '均线粘合与均线发散',
        content: `
          <p class="mb-3">均线的排列状态可以告诉我们市场处于什么阶段。最常见的两种状态是<strong>粘合</strong>和<strong>发散</strong>，它们分别代表了蓄势期和趋势期。</p>
          <p class="mb-3"><strong>均线粘合</strong>：当MA5、MA10、MA20、MA60等多条均线纠缠在一起，距离很近甚至交叉，称为均线粘合。这说明多空双方力量均衡，市场正在酝酿方向选择。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>粘合后的突破方向判断</strong>：</p>
            <p>1. <strong>看位置</strong>：低位粘合向上突破概率大，高位粘合向下突破概率大。横盘整理时间越长，突破后力度越大（"横有多长，竖有多高"）。</p>
            <p>2. <strong>看成交量</strong>：粘合末期如果成交量明显放大，且阳线多于阴线，向上突破概率大。</p>
            <p>3. <strong>看MACD</strong>：粘合时如果MACD在零轴附近走平，一旦DIF上穿DEA且红柱放大，配合突破。</p>
          </div>
          <p class="mb-3"><strong>均线发散</strong>：当短期均线和长期均线之间的距离拉大，形成明显的多头排列或空头排列，称为均线发散。发散代表趋势正在进行中。</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-3 text-sm">
            <p class="font-medium text-blue-800 mb-1">乖离率（BIAS）</p>
            <p>乖离率衡量股价与某条均线的偏离程度。当股价远离MA5时，短期回调概率大；当股价远离MA60时，中期回归概率大。</p>
            <p class="mt-2"><strong>粗略判断</strong>：强势股连续上涨后，股价与MA5的乖离率超过10%通常会有1-3天回调；连续下跌后，股价低于MA5超过10%通常会有技术性反弹。</p>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">实战纪律</p>
            <p class="text-sm text-yellow-700">均线粘合时不要急于入场——方向未明时入场等于赌博。正确做法是：等待股价放量突破粘合区上轨，且回踩确认不破，再考虑建仓。粘合区本身也是重要的支撑/压力区域，突破后回踩不破粘合区上沿是最佳买点。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 均线粘合代表什么市场状态？</p>
              <p>2. 判断粘合后突破方向的三个要素是什么？</p>
              <p>3. 为什么均线粘合时不应急于入场？</p>
              <p>4. 乖离率过大时通常会怎样？</p>
            </div>
          </details>
        `
      }
    ]
  },
  {
    level: 6, title: '成交量与量价关系（5天）', duration: '5天',
    lessons: [
      {
        title: '成交量的含义与常见形态',
        content: `
          <p class="mb-3">成交量（Volume）是某段时间内股票成交的总手数或总金额。K线告诉你"价格发生了什么"，成交量告诉你"这个价格变化是否可靠"。<strong>价格是果，成交量是因</strong>——没有成交量配合的价格波动往往是虚假的。</p>
          <p class="mb-3">在K线图下方，成交量通常以柱状图显示：</p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li><strong>红柱</strong>：当天收盘价高于开盘价（阳线），成交量柱为红色</li>
            <li><strong>绿柱</strong>：当天收盘价低于开盘价（阴线），成交量柱为绿色</li>
            <li><strong>均量线</strong>：成交量的移动平均线（通常看5日和10日均量），判断量能是放大还是萎缩</li>
          </ul>
          <p class="mb-3"><strong>成交量的四种经典形态：</strong></p>
          <div class="space-y-2 mb-3 text-sm">
            <div class="bg-gray-50 p-3 rounded">
              <p class="font-medium">1. 放量上涨</p>
              <p>股价上涨，成交量明显大于近期平均水平。说明资金主动买入，趋势健康。如果是突破关键压力位时的放量，可靠性极高。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded">
              <p class="font-medium">2. 缩量上涨</p>
              <p>股价上涨，但成交量缩小。说明买盘不足，上涨动力在减弱，可能是"诱多"。如果出现在高位，需要警惕见顶。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded">
              <p class="font-medium">3. 放量下跌</p>
              <p>股价下跌，成交量放大。说明恐慌盘涌出，资金在出逃。如果是高位放量下跌，通常是主力出货；如果是低位放量下跌，可能是"最后一跌"（洗盘结束）。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded">
              <p class="font-medium">4. 缩量下跌</p>
              <p>股价下跌，但成交量缩小。说明抛压已经枯竭，没有人愿意再卖，可能接近底部。地量见地价，这是中长线布局的信号。</p>
            </div>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">核心口诀</p>
            <p class="text-sm text-blue-700">"量为价先"——成交量总是领先于价格变化。放量是资金的表态，缩量是市场的沉默。学会看成交量，你就比只看K线的散户高了一个维度。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 为什么说"价格是果，成交量是因"？</p>
              <p>2. 放量上涨和缩量上涨分别代表什么？</p>
              <p>3. "地量见地价"是什么意思？</p>
            </div>
          </details>
        `
      },
      {
        title: '量价配合与量价背离',
        content: `
          <p class="mb-3"><strong>量价配合</strong>是指价格走势和成交量走势方向一致，这是健康趋势的标志。而<strong>量价背离</strong>则是指价格走势和成交量走势方向相反，通常是趋势即将反转的预警信号。</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div class="bg-red-50 p-4 rounded-lg">
              <p class="font-medium text-up mb-2">健康的量价配合</p>
              <ul class="text-sm space-y-1">
                <li>上涨时成交量逐步放大</li>
                <li>回调时成交量逐步萎缩</li>
                <li>突破关键位时放出巨量</li>
                <li>整理阶段成交量萎缩至地量</li>
              </ul>
              <p class="text-xs text-gray-500 mt-2">这代表主力资金在有序运作，散户跟风意愿强。</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <p class="font-medium text-down mb-2">危险的量价背离</p>
              <ul class="text-sm space-y-1">
                <li>股价创新高，成交量却缩小</li>
                <li>股价创新低，成交量却缩小</li>
                <li>连续大涨但成交量逐步递减</li>
                <li>下跌途中突然放量但价格不反弹</li>
              </ul>
              <p class="text-xs text-gray-500 mt-2">这代表资金在悄悄撤退或观望，趋势不可持续。</p>
            </div>
          </div>
          <p class="mb-3"><strong>顶背离（最重要的风险信号）：</strong></p>
          <p class="mb-3 text-sm">股价连续创出新高，但成交量却一波比一波小。这说明推动上涨的资金在减少，股价是靠"惯性"在涨，随时可能掉头。顶背离出现后，通常3-10个交易日内会出现调整。</p>
          <p class="mb-3"><strong>底背离（重要的机会信号）：</strong></p>
          <p class="mb-3 text-sm">股价连续创出新低，但成交量却一波比一波小。这说明恐慌盘已经卖完，即使价格还在跌，也没有多少人在卖了。底背离是中长期见底的信号之一。</p>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">案例分析</p>
            <p class="text-sm text-yellow-700">2024年1月，某新能源龙头股价从200元反弹到240元创出阶段新高，但成交量只有前一轮高点的60%。这是典型的顶背离。随后两周股价跌回190元，跌幅21%。如果当时注意到量价背离信号，及时止盈可避免大幅回撤。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 量价配合和量价背离的区别是什么？</p>
              <p>2. 顶背离出现后通常多久会调整？</p>
              <p>3. 为什么底背离不代表立即上涨？</p>
            </div>
          </details>
        `
      },
      {
        title: '放量突破与缩量回调的买点',
        content: `
          <p class="mb-3">在实际交易中，最常见的两个买入信号是<strong>放量突破</strong>和<strong>缩量回调</strong>。掌握这两个信号，你就已经超越了80%的散户。</p>
          <div class="bg-red-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-up mb-2">放量突破买入法</p>
            <p class="text-sm text-gray-700 mb-2">当股价放量突破前期高点、平台整理区或重要均线时，说明主力资金在主动拉升，突破有效。买点可以是：</p>
            <ul class="text-sm space-y-1">
              <li><strong>突破当天</strong>：在股价突破关键位且成交量放大到近期2倍以上时追入</li>
              <li><strong>回踩确认</strong>：突破后等待1-3天回调到突破位附近（但不跌破），再次企稳时买入</li>
            </ul>
            <p class="text-xs text-gray-500 mt-2">回踩确认的买点更安全，但可能错过最强走势。突破当天买入收益高但风险也大。</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-2">缩量回调买入法</p>
            <p class="text-sm text-blue-700 mb-2">在上升趋势中，股价不可能天天涨，必然会回调。如果回调时成交量明显萎缩（缩到前期上涨时成交量的50%以下），说明主力没有出货，只是在洗盘。这种回调就是低吸机会。</p>
            <p class="text-sm text-blue-700">理想买点：股价回调到MA20附近 + 成交量缩至地量 + 出现止跌K线（如锤子线、十字星）。</p>
          </div>
          <p class="mb-3"><strong>突破失败的止损原则</strong>：</p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li>放量突破买入后，如果3天内股价跌回突破位下方，说明是"假突破"，应止损离场</li>
            <li>缩量回调买入后，如果股价跌破MA20且放量，说明趋势可能反转，应减仓</li>
            <li>单笔亏损控制在总资金的2-3%以内</li>
          </ul>
          <div class="bg-gray-50 p-4 rounded-lg mb-3">
            <p class="font-medium mb-2">量价买点的筛选清单</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div class="flex items-start gap-2"><span class="text-green-600">✓</span><span>大盘处于上升趋势或震荡（非单边下跌）</span></div>
              <div class="flex items-start gap-2"><span class="text-green-600">✓</span><span>板块近期有资金流入（板块涨幅排名前20）</span></div>
              <div class="flex items-start gap-2"><span class="text-green-600">✓</span><span>个股基本面没有利空（无业绩暴雷、减持公告）</span></div>
              <div class="flex items-start gap-2"><span class="text-green-600">✓</span><span>成交量配合（突破放量、回调缩量）</span></div>
              <div class="flex items-start gap-2"><span class="text-green-600">✓</span><span>有明确的止损位（如MA20或前期低点）</span></div>
              <div class="flex items-start gap-2"><span class="text-green-600">✓</span><span>仓位控制在单只股票不超过总资金的30%</span></div>
            </div>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 放量突破后的两种买点时机是什么？</p>
              <p>2. 缩量回调到什么位置是比较理想的买点？</p>
              <p>3. 放量突破后如果3天内跌回突破位下方，应该怎么做？</p>
            </div>
          </details>
        `
      },
      {
        title: '主力建仓与出货的量能特征',
        content: `
          <p class="mb-3">成交量是识别主力资金动向的最直接窗口。主力从建仓到出货，通常会经历<strong>吸筹、洗盘、拉升、出货</strong>四个阶段，每个阶段的量能特征都有明显差异。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>1. 吸筹阶段</strong>：主力在低位悄悄买入，不希望引起市场注意。特征是：股价波动小，成交量温和放大但不突兀，常出现"阳线放量、阴线缩量"的健康结构。K线多以小阳线和十字星为主。此阶段持续1-3个月甚至更久。</p>
            <p><strong>2. 洗盘阶段</strong>：吸筹完成后，主力会刻意打压股价，吓出不坚定的散户。特征是：快速下跌但成交量萎缩（说明主力没有出货），常跌破重要均线制造恐慌。洗盘时间通常1-2周，结束后迅速拉回。</p>
            <p><strong>3. 拉升阶段</strong>：主力开始主动拉抬股价。特征是：连续阳线，成交量阶梯式放大，股价突破前期平台。拉升初期量价齐升最健康；拉升末期可能出现"量价背离"（股价新高但成交量未新高），这是见顶预警。</p>
            <p><strong>4. 出货阶段</strong>：主力在高位派发筹码给散户。特征是：成交量异常放大但股价滞涨，K线出现长上影线或高位十字星，利好消息频现但股价不涨。典型的出货形态是"高位放量阴线"和"M头"。</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">实战演练</p>
            <p class="text-sm text-blue-700">在同花顺中找一只近期涨幅超过50%的股票，回顾它过去3个月的K线和成交量：1. 能否找到底部的吸筹区？（小阳线+温和放量）2. 拉升过程中成交量是否持续放大？3. 最近是否出现放量滞涨或高位长上影线？判断它目前处于四阶段的哪个阶段。</p>
          </div>
          <div class="bg-red-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-red-800 mb-1">新手陷阱</p>
            <p class="text-sm text-red-700">不要看到放量上涨就认为是主力建仓——也可能是主力对倒诱多。真正的建仓发生在低位且时间较长（1个月以上），高位放量通常是出货而非建仓。记住：位置比形态更重要。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 吸筹阶段的典型K线特征是什么？</p>
              <p>2. 洗盘阶段成交量的特征是什么？</p>
              <p>3. 拉升末期的量价背离意味着什么？</p>
              <p>4. 出货阶段最常见的K线形态是什么？</p>
            </div>
          </details>
        `
      }
    ]
  },
  {
    level: 7, title: '技术指标（7天）', duration: '7天',
    lessons: [
      {
        title: 'MACD实战详解',
        content: `
          <p class="mb-3">MACD（Moving Average Convergence Divergence）是A股投资者使用最广泛的技术指标之一。它由三部分组成：</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>DIF线（快线）</strong>：MA12 - MA26，反映短期趋势与中期趋势的偏离程度</p>
            <p><strong>DEA线（慢线）</strong>：DIF的9日平滑移动平均，作为DIF的参照基准</p>
            <p><strong>MACD柱（红绿柱）</strong>：DIF - DEA，柱状图在零轴上方为红柱（多头），下方为绿柱（空头）</p>
          </div>
          <p class="mb-3"><strong>基础信号：</strong></p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li><strong>金叉</strong>：DIF上穿DEA，买入信号</li>
            <li><strong>死叉</strong>：DIF下穿DEA，卖出信号</li>
            <li><strong>零轴上方金叉</strong>：强势区金叉，可靠性最高</li>
            <li><strong>零轴下方死叉</strong>：弱势区死叉，应考虑空仓</li>
          </ul>
          <p class="mb-3"><strong>MACD的核心价值：背离</strong></p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div class="bg-green-50 p-4 rounded-lg">
              <p class="font-medium text-down mb-2">顶背离（看跌）</p>
              <p class="text-sm text-gray-700">股价创出新高，但MACD没有创出新高（DIF高点降低）。说明上涨动能减弱，主力在悄悄出货。这是中线卖出的重要信号。</p>
              <p class="text-xs text-gray-500 mt-2">注意：顶背离后不一定立即下跌，可能横盘1-2周再跌。但此时风险收益比已经恶化，不应再追高。</p>
            </div>
            <div class="bg-red-50 p-4 rounded-lg">
              <p class="font-medium text-up mb-2">底背离（看涨）</p>
              <p class="text-sm text-gray-700">股价创出新低，但MACD没有创出新低（DIF低点抬高）。说明下跌动能衰竭，可能有资金在悄悄吸筹。</p>
              <p class="text-xs text-gray-500 mt-2">底背离的确认需要成交量配合和K线形态共振。单独底背离的成功率约55%，加上放量阳线可提升到70%。</p>
            </div>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">MACD的局限性</p>
            <p class="text-sm text-yellow-700">MACD是滞后指标——它基于均线计算，信号总是晚于价格变化。在震荡行情中，MACD会频繁发出假金叉/死叉，导致反复止损。因此MACD最适合<strong>趋势行情</strong>，在横盘震荡时应减少使用或结合布林带判断。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. MACD由哪三部分组成？</p>
              <p>2. 顶背离和底背离分别是什么信号？</p>
              <p>3. MACD在什么行情中容易失效？</p>
            </div>
          </details>
        `
      },
      {
        title: 'KDJ与RSI超买超卖',
        content: `
          <p class="mb-3">KDJ和RSI是判断市场超买超卖状态的震荡指标。它们的核心思想是：当价格上涨太快时，必然会有回调；当价格下跌太多时，必然会有反弹。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>KDJ指标</strong>：由K线、D线、J线三条线组成，取值范围0-100。</p>
            <ul class="list-disc list-inside space-y-1">
              <li>K值 > 80：超买区，短期可能回调</li>
              <li>K值 < 20：超卖区，短期可能反弹</li>
              <li>J值 > 100：极度超买</li>
              <li>J值 < 0：极度超卖</li>
              <li>K线上穿D线：金叉买入信号</li>
              <li>K线下穿D线：死叉卖出信号</li>
            </ul>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>RSI指标</strong>（Relative Strength Index，相对强弱指数）：常用参数为14日，取值0-100。</p>
            <ul class="list-disc list-inside space-y-1">
              <li>RSI > 70：超买，可能回调</li>
              <li>RSI < 30：超卖，可能反弹</li>
              <li>RSI在50上方：多头占优</li>
              <li>RSI在50下方：空头占优</li>
            </ul>
          </div>
          <p class="mb-3"><strong>KDJ与RSI的实战组合：</strong></p>
          <p class="mb-3 text-sm">单一指标的超买超卖信号在<strong>强势趋势中容易失效</strong>。例如大牛市中，KDJ可能长期停留在80以上，如果每次超买都卖出，会错过主升浪。正确的用法是：</p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li><strong>震荡行情</strong>：KDJ超买（>80）卖、超卖（<20）买，效果较好</li>
            <li><strong>趋势行情</strong>：不要逆趋势操作。上升趋势中只利用超卖信号低吸，不利用超买信号卖出；下跌趋势中只利用超买信号高抛，不利用超卖信号抄底</li>
            <li><strong>KDJ + RSI共振</strong>：当KDJ和RSI同时处于超买区，回调概率大幅增加；同时处于超卖区，反弹概率增加</li>
          </ul>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">关键提醒</p>
            <p class="text-sm text-blue-700">超卖不等于立即上涨，超买不等于立即下跌。指标可以在超买/超卖区停留很长时间（尤其是在趋势强烈时）。因此，<strong>不要仅凭超买超卖就逆势操作</strong>，必须等待K线形态确认（如超卖区出现锤子线、看涨吞没）。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. KDJ的超买区和超卖区分别是多少？</p>
              <p>2. 为什么在强势趋势中超买超卖指标容易失效？</p>
              <p>3. KDJ和RSI如何组合使用？</p>
            </div>
          </details>
        `
      },
      {
        title: '布林带与筹码分布',
        content: `
          <p class="mb-3">布林带（Bollinger Bands）由三条线组成：中轨是MA20，上轨是中轨+2倍标准差，下轨是中轨-2倍标准差。它本质上是一个"价格波动区间"，股价有95%的概率运行在这个区间内。</p>
          <p class="mb-3"><strong>布林带的三种经典状态：</strong></p>
          <div class="space-y-2 mb-3 text-sm">
            <div class="bg-gray-50 p-3 rounded">
              <p class="font-medium">1. 开口（波动扩大）</p>
              <p>上轨向上、下轨向下，带宽扩大。说明波动加剧，通常出现在趋势启动或重大消息发布时。开口后股价沿上轨运行表示强势多头，沿下轨运行表示强势空头。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded">
              <p class="font-medium">2. 收口（波动缩小）</p>
              <p>上轨和下轨向中轨靠拢，带宽缩小。说明多空力量趋于平衡，即将选择方向突破。"布林带收口"是波段交易者最关注的信号之一——收口越久，突破后力度越大。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded">
              <p class="font-medium">3. 突破上轨/下轨</p>
              <p>股价突破上轨，说明极度强势，但短期可能超买回调。股价跌破下轨，说明极度弱势，但短期可能超卖反弹。突破本身不是交易信号，需要结合成交量判断。</p>
            </div>
          </div>
          <p class="mb-3"><strong>筹码分布</strong>（Cost Distribution）：筹码分布图显示了不同价位上的持仓量。它回答了"市场大多数人的成本在哪里"这个问题。</p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li><strong>筹码集中</strong>：大部分筹码集中在 narrow 的价格区间，说明主力控盘度高，一旦突破容易走趋势</li>
            <li><strong>筹码分散</strong>：筹码分布宽泛，说明散户众多，股价容易震荡</li>
            <li><strong>低位密集</strong>：筹码在低位集中，是中线建仓信号</li>
            <li><strong>高位密集</strong>：筹码在高位集中，是中线出货信号</li>
          </ul>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">布林带 + 筹码分布组合策略</p>
            <p class="text-sm text-blue-700">当布林带收口 + 筹码在低位密集时，意味着主力资金在低位悄悄吸筹，即将向上突破。这是一个高胜率的中线买点。反之，布林带收口 + 筹码在高位密集，意味着主力在高位派发，应警惕向下破位。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 布林带收口意味着什么？</p>
              <p>2. 筹码低位密集和高位密集分别代表什么？</p>
              <p>3. 布林带突破上轨后是否应该立即卖出？</p>
            </div>
          </details>
        `
      },
      {
        title: '多指标共振实战策略',
        content: `
          <p class="mb-3">单一技术指标的成功率通常只有50-60%，但多个指标同时发出同向信号时，成功率可以提升到70%以上。这就是<strong>指标共振</strong>的核心思想——用多个独立的验证维度过滤掉假信号。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>共振组合1：MACD + KDJ + 均线</strong></p>
            <p>买入条件：日线MACD金叉（DIF上穿DEA）+ KDJ在20以下金叉 + 股价站上MA20。三个条件同时满足时买入，成功率约70%。卖出条件：MACD死叉或股价跌破MA20。</p>
            <p><strong>共振组合2：均线 + 成交量 + K线形态</strong></p>
            <p>买入条件：MA5金叉MA20 + 成交量放大到近期2倍 + 出现看涨吞没或早晨之星。这是趋势+量能+形态的三维共振，适合波段操作。</p>
            <p><strong>共振组合3：布林带 + MACD + RSI</strong></p>
            <p>买入条件：布林带收口后股价突破中轨 + MACD红柱放大 + RSI从30下方回升到50上方。这是震荡转趋势的经典信号。</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3 text-sm">
            <p class="font-medium text-blue-800 mb-1">共振策略的筛选清单</p>
            <p>每次交易前，强制自己回答以下问题，只有当多数答案为"是"时才下单：</p>
            <ul class="list-disc list-inside space-y-1 mt-2">
              <li>大盘是否处于上升趋势或震荡（非单边下跌）？</li>
              <li>个股所在板块近期是否有资金流入？</li>
              <li>至少2个技术指标发出同向信号？</li>
              <li>成交量是否配合（突破放量/回调缩量）？</li>
              <li>是否有明确的止损位？</li>
              <li>单笔仓位是否不超过总资金的30%？</li>
            </ul>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">注意事项</p>
            <p class="text-sm text-yellow-700">共振不是万能药。在极端行情（如2015年股灾、2024年初流动性危机）中，所有技术指标都会失效。共振策略最适合<strong>震荡市和温和趋势市</strong>，在单边暴跌或暴涨市中应降低仓位或空仓观望。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 指标共振的核心思想是什么？</p>
              <p>2. MACD+KDJ+均线的买入条件是什么？</p>
              <p>3. 共振策略在什么市场环境下最容易失效？</p>
              <p>4. 下单前的筛选清单有几项？</p>
            </div>
          </details>
        `
      }
    ]
  },
  {
    level: 8, title: '趋势与形态（7天）', duration: '7天',
    lessons: [
      {
        title: '趋势线的画法与运用',
        content: `
          <p class="mb-3">趋势是技术分析的基石。<strong>趋势是你的朋友</strong>——在上升趋势中做多，在下降趋势中空仓，这是散户最朴素的生存法则。</p>
          <p class="mb-3"><strong>三种趋势：</strong></p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3 text-sm">
            <div class="bg-red-50 p-3 rounded text-center">
              <p class="font-medium text-up">上升趋势</p>
              <p class="text-gray-600 mt-1">高点越来越高，低点也越来越高</p>
              <p class="text-xs text-gray-500 mt-1">策略：持股或回调买入</p>
            </div>
            <div class="bg-green-50 p-3 rounded text-center">
              <p class="font-medium text-down">下降趋势</p>
              <p class="text-gray-600 mt-1">低点越来越低，高点也越来越低</p>
              <p class="text-xs text-gray-500 mt-1">策略：空仓观望</p>
            </div>
            <div class="bg-gray-50 p-3 rounded text-center">
              <p class="font-medium">震荡趋势</p>
              <p class="text-gray-600 mt-1">高点和低点都在一个区间内</p>
              <p class="text-xs text-gray-500 mt-1">策略：高抛低吸或观望</p>
            </div>
          </div>
          <p class="mb-3"><strong>趋势线的画法：</strong></p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li><strong>上升趋势线</strong>：连接两个或两个以上的低点，形成向上的支撑线。股价回调到趋势线附近是买点</li>
            <li><strong>下降趋势线</strong>：连接两个或两个以上的高点，形成向下的压力线。股价反弹到趋势线附近是卖点</li>
            <li><strong>画线原则</strong>：触点越多，趋势线越有效。被测试3次以上的趋势线可靠性很高</li>
          </ul>
          <p class="mb-3"><strong>趋势通道</strong>：在上升趋势线的基础上，再画一条与趋势线平行的线穿过近期高点，就形成了一个上升通道。股价在通道内运行时，通道下沿是买点，上沿是卖点；突破通道上沿意味着加速上涨，跌破通道下沿意味着趋势可能结束。</p>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">重要原则</p>
            <p class="text-sm text-yellow-700">趋势线被突破后，角色会发生转换——原来的支撑线变成压力线，原来的压力线变成支撑线。例如上升趋势线被跌破后，如果股价反弹回测该线却无法站回，说明支撑已变压力，应及时离场。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 上升趋势和下降趋势的高低点特征分别是什么？</p>
              <p>2. 趋势线被突破后会发生什么角色转换？</p>
              <p>3. 趋势通道的上沿和下沿分别是什么含义？</p>
            </div>
          </details>
        `
      },
      {
        title: '经典反转形态',
        content: `
          <p class="mb-3">反转形态是指股价在经历一段趋势后，出现特定价格结构预示着趋势即将逆转。反转形态通常出现在趋势的末端，需要较长时间形成。</p>
          <div class="space-y-3 mb-3">
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="font-medium">头肩顶 / 头肩底</p>
              <p class="text-sm text-gray-700">头肩顶：左肩 → 头部（最高点）→ 右肩，连接两个回调低点的"颈线"被跌破后确认。这是最可靠的顶部形态之一，跌幅通常至少等于头部到颈线的距离。头肩底则是 inverted 形态，颈线被突破后买入。</p>
              <p class="text-xs text-gray-500 mt-1">案例：上证指数2007年6124点头部就是经典头肩顶，颈线跌破后跌至1664点。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="font-medium">双顶（M头）/ 双底（W底）</p>
              <p class="text-sm text-gray-700">股价两次冲击同一高点未果（双顶）或两次测试同一低点不破（双底）。双底比双顶更常见，成功率约60-65%。突破颈线后，理论涨幅/跌幅等于形态高度。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="font-medium">圆弧底 / 圆弧顶</p>
              <p class="text-sm text-gray-700">股价缓慢下跌后又缓慢上涨，形成一个圆弧状。圆弧底代表主力在低位长期吸筹，一旦突破右侧往往是慢牛行情。圆弧顶则是主力在高位缓慢派发。</p>
              <p class="text-xs text-gray-500 mt-1">圆弧底的形成时间通常3-6个月甚至更长，是中线投资者的最佳布局时机。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="font-medium">V型反转</p>
              <p class="text-sm text-gray-700">股价急跌后迅速拉回，形成一个V字。通常由突发利好消息或政策救市引发。V型反转速度快但难以把握，因为底部停留时间极短。新手不建议试图抄底V型反转。</p>
            </div>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">形态交易的要点</p>
            <p class="text-sm text-blue-700">1. 形态必须在趋势末端才有意义，中途出现的类似结构可能是中继形态。2. 突破颈线时必须有成交量配合，无量突破容易失败。3. 突破后通常有"回踩颈线"的动作，回踩不破是加仓点。4. 设置止损：如果突破后又跌回颈线内，说明形态失败，应止损。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 头肩顶的颈线被跌破后，理论跌幅是多少？</p>
              <p>2. 圆弧底为什么适合中线投资者布局？</p>
              <p>3. 为什么新手不建议抄底V型反转？</p>
            </div>
          </details>
        `
      },
      {
        title: '持续整理形态',
        content: `
          <p class="mb-3">持续整理形态（Continuation Patterns）是指股价在趋势中途暂停整理，积蓄能量后沿原趋势方向继续运行。识别整理形态可以帮助你避免在趋势中的正常回调时被洗出局。</p>
          <div class="space-y-3 mb-3">
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="font-medium">旗形整理</p>
              <p class="text-sm text-gray-700">在强势上涨后，股价小幅回调，形成由两条平行线构成的向下倾斜通道（"下降旗形"），像一面倒挂的旗帜。成交量在整理期间萎缩，突破上沿时放量。突破后涨幅通常等于旗杆（整理前的那波涨幅）。</p>
              <p class="text-xs text-gray-500 mt-1">案例：2023年AI板块多只龙头股在主升浪中走出旗形整理，整理后继续翻倍。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="font-medium">楔形整理</p>
              <p class="text-sm text-gray-700">与旗形类似，但两条趋势线是收敛的（不平行）。上升楔形通常出现在顶部，是看跌信号；下降楔形通常出现在底部，是看涨信号。楔形突破后的力度通常大于旗形。</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="font-medium">三角形整理</p>
              <p class="text-sm text-gray-700">分为对称三角形、上升三角形、下降三角形。对称三角形最常用——高点逐渐降低、低点逐渐抬高，形成一个收敛三角形。突破方向通常与之前的趋势一致，但也有约1/3的概率反向突破。</p>
            </div>
          </div>
          <p class="mb-3"><strong>整理形态 vs 反转形态的区别：</strong></p>
          <div class="overflow-x-auto mb-3">
            <table class="w-full text-sm border-collapse">
              <thead><tr class="bg-gray-100"><th class="p-2 text-left">特征</th><th class="p-2 text-left">整理形态</th><th class="p-2 text-left">反转形态</th></tr></thead>
              <tbody>
                <tr class="border-b"><td class="p-2">形成时间</td><td class="p-2">较短（1-4周）</td><td class="p-2">较长（数周至数月）</td></tr>
                <tr class="border-b"><td class="p-2">成交量</td><td class="p-2">整理期萎缩</td><td class="p-2">左半部大，右半部小</td></tr>
                <tr class="border-b"><td class="p-2">位置</td><td class="p-2">趋势中段</td><td class="p-2">趋势末端</td></tr>
                <tr><td class="p-2">突破方向</td><td class="p-2">与原趋势一致</td><td class="p-2">与原趋势相反</td></tr>
              </tbody>
            </table>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">持仓策略</p>
            <p class="text-sm text-yellow-700">当你持有的股票进入整理形态时，如果基本面没有恶化，不建议卖出。整理期间成交量萎缩说明主力没有出货，只是在洗盘。耐心持有，等待突破信号。如果整理向下破位（跌破整理形态下沿），则可能是整理失败变成反转，应及时止损。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 旗形整理的成交量特征是什么？</p>
              <p>2. 整理形态和反转形态在形成时间和位置上有什么区别？</p>
              <p>3. 持有的股票进入整理形态时，应该怎么做？</p>
            </div>
          </details>
        `
      },
      {
        title: '缺口理论与实战应用',
        content: `
          <p class="mb-3"><strong>缺口（Gap）</strong>是指股价在快速变动中，某段价格区间内没有任何成交，在K线图上表现为一段空白区域。缺口是技术分析中极具参考价值的信号，因为它代表了市场情绪的突变。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>1. 普通缺口</strong>：出现在横盘整理中，很快会被回补（股价回到缺口区域）。普通缺口没有特殊意义，不需要特别关注。</p>
            <p><strong>2. 突破缺口</strong>：股价突破重要整理平台或趋势线时形成的缺口。特征是伴随大成交量，且短期内不会被回补。突破缺口是趋势启动的强力信号，突破向上可追，突破向下要跑。</p>
            <p><strong>3. 持续缺口（测量缺口）</strong>：出现在趋势中段，表示趋势正在加速。持续缺口的出现点通常是趋势的中点——从趋势起点到缺口的距离，约等于从缺口到趋势终点的距离。这个特性可以用来估算目标位。</p>
            <p><strong>4. 衰竭缺口</strong>：出现在趋势末端，是主力最后的"冲刺"。特征是成交量很大但股价涨幅有限，缺口出现后2-3天内往往被回补。衰竭缺口是趋势即将反转的预警信号。</p>
          </div>
          <p class="mb-3"><strong>缺口的支撑与压力</strong>：向上突破缺口形成后，缺口上沿变成重要支撑位；向下突破缺口形成后，缺口下沿变成重要压力位。如果缺口被反向回补，说明突破失败，应及时止损。</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">实战演练</p>
            <p class="text-sm text-blue-700">在K线图中找一只近期有过涨停的股票，观察它涨停当天是否留下跳空缺口：1. 缺口出现的位置（低位、中段还是高位？）。2. 缺口出现时的成交量是否放大？3. 缺口出现后3天内是否被回补？根据这些特征判断这是哪种类型的缺口。</p>
          </div>
          <div class="bg-red-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-red-800 mb-1">常见误区</p>
            <p class="text-sm text-red-700">"缺口必补"是A股流传最广的谬论之一。事实上，突破缺口和持续缺口往往数月甚至数年不被回补。只有普通缺口和衰竭缺口才高概率回补。如果你因为"相信缺口必补"而逆势操作，很容易大亏。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 四种缺口分别是什么？</p>
              <p>2. 突破缺口的特征是什么？</p>
              <p>3. 为什么说"缺口必补"是谬论？</p>
              <p>4. 衰竭缺口出现后通常多久会被回补？</p>
            </div>
          </details>
        `
      }
    ]
  },
  {
    level: 9, title: '基本面分析（7天）', duration: '7天',
    lessons: [
      {
        title: '三张报表速读技巧',
        content: `
          <p class="mb-3">上市公司的基本面分析从阅读财务报表开始。三张报表分别回答了三个问题：<strong>利润表</strong>回答"公司赚了多少钱"，<strong>资产负债表</strong>回答"公司有多少家底"，<strong>现金流量表</strong>回答"公司的钱从哪来、到哪去"。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>利润表速读</strong></p>
            <p>关注三个核心指标：1. <strong>营业收入增速</strong>：连续两季度>20%说明高成长，<10%说明增长乏力。2. <strong>毛利率</strong>：越高说明定价权越强（白酒>80%，制造业约20-30%）。3. <strong>净利润率</strong>：净利润/营业收入，反映最终盈利能力。</p>
            <p><strong>资产负债表速读</strong></p>
            <p>关注：1. <strong>流动比率</strong>=流动资产/流动负债，>1.5较安全。2. <strong>资产负债率</strong>=总负债/总资产，<60%较健康（银行地产除外）。3. <strong>应收账款</strong>：如果应收账款增速远超营收增速，说明公司在激进赊销，有坏账风险。</p>
            <p><strong>现金流量表速读</strong></p>
            <p>关注<strong>经营现金流净额</strong>：持续为正且覆盖净利润，说明公司赚的是"真金白银"而非账面利润。如果净利润很高但经营现金流长期为负，这是危险的信号（如大量囤货或应收账款无法收回）。</p>
          </div>
          <p class="mb-3"><strong>ROE（净资产收益率）</strong>：ROE = 净利润 / 净资产，是巴菲特最看重的指标。它衡量的是公司利用股东投入的资本创造了多少回报。</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">ROE分级标准</p>
            <div class="text-sm text-blue-700 space-y-1">
              <p>ROE > 20%：优秀（如茅台、海天味业）</p>
              <p>ROE 15-20%：良好（多数白马股）</p>
              <p>ROE 10-15%：一般</p>
              <p>ROE < 10%：较差，投资价值低</p>
              <p class="mt-2">注意：连续5年ROE>15%的公司通常具有较深的护城河。</p>
            </div>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">新手速读清单</p>
            <p class="text-sm text-yellow-700">每次看财报时，用5分钟回答这5个问题：1. 营收在增长吗？2. 净利润在增长吗？3. 经营现金流为正吗？4. 负债率高吗？5. ROE>15%吗？如果5个问题中有3个以上答案为"否"，这只股票的基本面可能存在问题。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 三张报表分别回答什么问题？</p>
              <p>2. 经营现金流长期为负说明什么风险？</p>
              <p>3. ROE > 20%通常代表什么？</p>
            </div>
          </details>
        `
      },
      {
        title: '估值方法与ROE杜邦分析',
        content: `
          <p class="mb-3">估值是判断"这只股票现在贵不贵"的核心工具。再好的公司，买贵了也赚不到钱。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>PE（市盈率）</strong>= 股价 / 每股收益。PE=20意味着按当前盈利水平，需要20年回本。</p>
            <ul class="list-disc list-inside space-y-1">
              <li>PE < 行业平均：可能被低估（但要排除业绩下滑导致的低PE）</li>
              <li>PE > 行业平均：可能被高估（但如果成长性高，高PE也合理）</li>
              <li>PE为负：公司亏损，无法估值</li>
            </ul>
            <p><strong>PB（市净率）</strong>= 股价 / 每股净资产。适用于银行、地产等重资产行业。PB<1意味着股价低于净资产（"破净"）。</p>
            <p><strong>PEG</strong>= PE / 盈利增长率。PEG<1说明性价比高（增长快但估值不贵），PEG>2说明高估。这是成长股最重要的估值指标。</p>
          </div>
          <p class="mb-3"><strong>ROE杜邦分析</strong>：ROE = 净利率 × 总资产周转率 × 权益乘数。这个公式告诉我们高ROE的来源：</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3 text-sm">
            <div class="bg-red-50 p-3 rounded">
              <p class="font-medium">高净利率型</p>
              <p class="text-gray-600">如茅台（净利率50%+），靠品牌溢价赚钱</p>
            </div>
            <div class="bg-blue-50 p-3 rounded">
              <p class="font-medium">高周转率型</p>
              <p class="text-gray-600">如零售、贸易公司，薄利多销</p>
            </div>
            <div class="bg-yellow-50 p-3 rounded">
              <p class="font-medium">高杠杆型</p>
              <p class="text-gray-600">如银行、地产，靠借钱放大收益</p>
            </div>
          </div>
          <p class="mb-3">高净利率型的公司最健康（靠产品竞争力），高杠杆型的公司风险最大（经济下行时容易爆雷）。</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">实战估值流程</p>
            <p class="text-sm text-blue-700">1. 找到该股票所属行业的平均PE/PB（同花顺F10里有）。2. 比较个股PE与行业平均，判断相对位置。3. 看PEG（如果是成长股）。4. 看历史PE区间（当前PE处于历史高位还是低位）。5. 结合ROE判断估值是否合理（ROE高可以支撑较高PE）。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. PE=20意味着什么？</p>
              <p>2. PEG<1代表什么？</p>
              <p>3. 杜邦分析中，哪种ROE来源最健康？</p>
            </div>
          </details>
        `
      },
      {
        title: '行业轮动与政策敏感板块',
        content: `
          <p class="mb-3">A股市场有明显的<strong>行业轮动</strong>特征。不同经济周期阶段，表现最好的行业也不同。理解行业轮动，可以帮助你提前布局下一个风口。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>产业链逻辑</strong>：以新能源为例——上游是锂矿/硅料/钴矿，中游是电池/组件/设备，下游是整车/充电桩/运营商。</p>
            <ul class="list-disc list-inside space-y-1">
              <li>上游涨价会压缩中游利润（如2021年锂价暴涨，电池厂利润承压）</li>
              <li>中游技术进步会带动下游普及（如电池成本下降推动电动车销量）</li>
              <li>下游需求爆发会反推上游涨价（如电动车销量暴增带动锂矿需求）</li>
            </ul>
          </div>
          <p class="mb-3"><strong>政策敏感板块：</strong>A股很多板块的涨跌与政策高度相关。新手必须了解以下政策影响：</p>
          <div class="space-y-2 mb-3 text-sm">
            <div class="bg-blue-50 p-3 rounded"><p class="font-medium">新能源</p><p>补贴政策退坡会打压板块，双碳目标利好长期发展</p></div>
            <div class="bg-red-50 p-3 rounded"><p class="font-medium">医药</p><p>集采（集中采购）会大幅压缩药价和药企利润，是医药板块最大的利空</p></div>
            <div class="bg-yellow-50 p-3 rounded"><p class="font-medium">房地产</p><p>限购限贷政策打压板块，放松政策（降首付、降利率）利好板块</p></div>
            <div class="bg-purple-50 p-3 rounded"><p class="font-medium">中特估/央企</p><p>国资委推动央企市值管理，利好低估值大央企</p></div>
            <div class="bg-green-50 p-3 rounded"><p class="font-medium">半导体</p><p>国产替代政策和美国制裁是双重驱动力</p></div>
          </div>
          <p class="mb-3"><strong>美林投资时钟在中国市场的应用：</strong></p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 text-sm text-center">
            <div class="bg-red-50 p-2 rounded"><p class="font-medium">复苏期</p><p class="text-xs text-gray-600">金融、地产先行</p></div>
            <div class="bg-orange-50 p-2 rounded"><p class="font-medium">扩张期</p><p class="text-xs text-gray-600">消费、科技领涨</p></div>
            <div class="bg-yellow-50 p-2 rounded"><p class="font-medium">滞胀期</p><p class="text-xs text-gray-600">资源、公用事业抗跌</p></div>
            <div class="bg-gray-50 p-2 rounded"><p class="font-medium">衰退期</p><p class="text-xs text-gray-600">债券、高股息防守</p></div>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">信息渠道</p>
            <p class="text-sm text-blue-700">建议关注财联社电报（最快）、新华社/人民日报（定调）、证监会/发改委官网（政策原文）、券商研报（深度解读）。重大政策发布后，通常有3-5天的主题炒作窗口，但随后会分化，只有真正受益的龙头才能持续。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 新能源产业链上中下游分别是什么？</p>
              <p>2. 医药板块最大的政策利空是什么？</p>
              <p>3. 扩张期应该重点配置哪些板块？</p>
            </div>
          </details>
        `
      },
      {
        title: '宏观经济指标解读',
        content: `
          <p class="mb-3">股价短期由情绪驱动，中期由资金驱动，长期由经济基本面驱动。理解宏观经济指标，可以帮助你判断A股的大方向，避免在逆周期中重仓操作。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>CPI（居民消费价格指数）</strong>：衡量通胀水平。CPI > 3%表示通胀偏高，央行可能加息收紧流动性，对股市不利；CPI < 1%表示通缩风险，企业盈利承压，也对股市不利。CPI在1-2%的温和区间对股市最有利。</p>
            <p><strong>PPI（工业生产者出厂价格指数）</strong>：衡量工业品价格。PPI上升说明上游原材料涨价，利好资源股（有色、煤炭、化工）；PPI下降说明成本降低，利好中下游制造业。PPI与CPI的"剪刀差"是判断产业链利润分配的关键。</p>
            <p><strong>PMI（采购经理人指数）</strong>：衡量制造业景气度。PMI > 50表示扩张，< 50表示收缩。PMI是经济的领先指标，通常提前GDP 1-2个月反映经济走势。PMI连续3个月上升是股市走强的先行信号。</p>
            <p><strong>利率（LPR/MLF）</strong>：降息周期利好股市（资金成本下降、估值提升），加息周期利空股市。2024年以来央行多次降准降息，是A股企稳的重要支撑。</p>
            <p><strong>汇率（人民币兑美元）</strong>：人民币贬值利好出口型企业（家电、纺织、机械），但会导致外资流出A股（北向资金撤离）。升值则相反。汇率大幅波动时，股市通常承压。</p>
            <p><strong>M2（广义货币供应量）</strong>：M2增速代表市场上的钱有多少。M2增速 > 10%说明流动性充裕，利好股市；M2增速 < 8%说明流动性偏紧。注意：M2是滞后指标，通常滞后股市3-6个月。</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">实战演练</p>
            <p class="text-sm text-blue-700">打开财联社APP或同花顺"宏观数据"页面，查看本月公布的CPI、PPI、PMI数据：1. 三个数据分别是多少？处于什么区间？2. 与上个月相比是改善还是恶化？3. 根据这些数据，你认为当前是适合加仓、持股观望还是减仓的宏观环境？</p>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-yellow-800 mb-1">重要提醒</p>
            <p class="text-sm text-yellow-700">宏观经济指标反映的是"大势"，不能用来指导短期交易。即使PMI在50以下，股市也可能因为政策利好而短期反弹。宏观分析适合判断中长期仓位水平（如牛市重仓、熊市轻仓），而不适合择时。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. CPI在什么区间对股市最有利？</p>
              <p>2. PMI大于50代表什么？</p>
              <p>3. 降息周期对股市是利好还是利空？</p>
              <p>4. M2增速是领先指标还是滞后指标？</p>
            </div>
          </details>
        `
      }
    ]
  },
  {
    level: 10, title: '风险管理与交易系统（持续）', duration: '持续',
    lessons: [
      {
        title: '仓位管理与止损止盈',
        content: `
          <p class="mb-3">技术分析教你"什么时候买"，风险管理教你"买多少"和"错了怎么办"。没有风险管理的技术分析，就是一把没有刀鞘的利刃——伤人伤己。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>仓位管理原则</strong></p>
            <ul class="list-disc list-inside space-y-1">
              <li><strong>永远不要满仓</strong>：至少保留20-30%现金，用于应对突发风险或抄底机会</li>
              <li><strong>单只股票不超过总资金的30%</strong>：分散风险，避免黑天鹅一击致命</li>
              <li><strong>分批建仓</strong>：第一次买入计划仓位的50%，确认趋势后加至100%</li>
              <li><strong>金字塔加仓</strong>：上涨过程中加仓，但后续加仓量应小于前一次（越涨越谨慎）</li>
            </ul>
          </div>
          <p class="mb-3"><strong>止损策略：</strong></p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm">
            <div class="bg-green-50 p-3 rounded">
              <p class="font-medium">固定比例止损</p>
              <p class="text-gray-600">买入价下方7-8%设为止损位。简单有效，适合新手。</p>
            </div>
            <div class="bg-green-50 p-3 rounded">
              <p class="font-medium">技术位止损</p>
              <p class="text-gray-600">跌破MA20或前期低点止损。更贴合走势，但可能被"洗"。</p>
            </div>
            <div class="bg-green-50 p-3 rounded">
              <p class="font-medium">时间止损</p>
              <p class="text-gray-600">买入后3-5天未按预期方向运行，无论盈亏都离场。</p>
            </div>
            <div class="bg-green-50 p-3 rounded">
              <p class="font-medium">波动率止损</p>
              <p class="text-gray-600">根据ATR（平均真实波幅）设定，如2倍ATR。</p>
            </div>
          </div>
          <p class="mb-3"><strong>止盈策略：</strong></p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li><strong>固定比例止盈</strong>：盈利15-20%后分批止盈</li>
            <li><strong>移动止盈</strong>：股价跌破MA10或MA20时止盈，让利润奔跑</li>
            <li><strong>目标位止盈</strong>：根据形态高度或前期压力位设定目标价</li>
            <li><strong>分批止盈</strong>：盈利10%卖1/3，盈利20%卖1/3，剩余让利润奔跑</li>
          </ul>
          <div class="bg-red-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-red-800 mb-1">血泪教训</p>
            <p class="text-sm text-red-700">大多数散户的亏损不是因为选股差，而是因为：1. 重仓单只股票；2. 亏损时不止损，越跌越补；3. 盈利时过早止盈，亏损时死扛。改变这三个习惯，你的账户就已经战胜了70%的散户。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 单只股票仓位不应超过总资金的多少？</p>
              <p>2. 固定比例止损通常设在买入价下方多少？</p>
              <p>3. 散户亏损最常见的三个坏习惯是什么？</p>
            </div>
          </details>
        `
      },
      {
        title: '交易心理与情绪控制',
        content: `
          <p class="mb-3">华尔街有句名言："股市中赚钱的方法有很多，但亏钱的方法只有一种——情绪失控。"技术分析和基本面分析可以学，但交易心理需要长期修炼。</p>
          <p class="mb-3"><strong>导致亏损的三种核心情绪：</strong></p>
          <div class="space-y-3 mb-3">
            <div class="bg-red-50 p-4 rounded-lg">
              <p class="font-medium text-red-700">贪婪</p>
              <p class="text-sm text-gray-700">盈利时不肯止盈，妄想"再涨一点"。结果股价回调，盈利变亏损。或者在牛市末期追高买入，接盘在山顶。</p>
              <p class="text-xs text-gray-500 mt-1">对策：设定明确的止盈规则，达到目标位无条件执行。</p>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <p class="font-medium text-green-700">恐惧</p>
              <p class="text-sm text-gray-700">股价一跌就恐慌割肉，卖在地板上。或者看到别人说某股好，自己没研究就跟风买入，买入后一跌就慌。</p>
              <p class="text-xs text-gray-500 mt-1">对策：每笔交易前写好交易计划，盘中只执行计划，不看盈亏。</p>
            </div>
            <div class="bg-yellow-50 p-4 rounded-lg">
              <p class="font-medium text-yellow-700">侥幸心理</p>
              <p class="text-sm text-gray-700">亏损了不止损，心想"再等等，说不定明天就反弹了"。结果越套越深，从小亏变成大亏。或者止损后马上反向操作，试图"翻本"。</p>
              <p class="text-xs text-gray-500 mt-1">对策：接受亏损是交易的一部分。单笔亏损控制在总资金2%以内，错了就认。</p>
            </div>
          </div>
          <p class="mb-3"><strong>交易日记模板</strong>：建议每天收盘后花10分钟填写交易日记，格式如下：</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 text-sm space-y-1">
            <p>日期：____  今日盈亏：____  情绪状态（1-10分）：____</p>
            <p>今日操作：买入/卖出什么？理由是什么？</p>
            <p>哪些是按计划执行的？哪些是冲动交易？</p>
            <p>今天的情绪对决策产生了什么影响？</p>
            <p>明天需要改进什么？</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">心态修炼法则</p>
            <p class="text-sm text-blue-700">1. <strong>降低预期</strong>：年化收益15-20%已经是优秀水平，不要妄想翻倍。2. <strong>接受不完美</strong>：卖飞是常态，止损是成本，不要因为一次错误就否定系统。3. <strong>减少看盘</strong>：频繁看盘会加剧情绪波动，上班族建议每天只看盘3次（开盘、中午、收盘）。4. <strong>连续亏损时停手</strong>：如果连续3笔交易亏损，强制休息一周，避免报复性交易。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 导致亏损的三种核心情绪是什么？</p>
              <p>2. 为什么建议每天写交易日记？</p>
              <p>3. 连续亏损时应该怎么做？</p>
            </div>
          </details>
        `
      },
      {
        title: '构建你的交易系统',
        content: `
          <p class="mb-3">一个完整的交易系统包含五个要素：<strong>选什么</strong>（选股）、<strong>何时买</strong>（买点）、<strong>买多少</strong>（仓位）、<strong>何时卖</strong>（卖点）、<strong>错了怎么办</strong>（止损）。缺少任何一个要素，系统都不完整。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>1. 选股标准（买什么）</strong></p>
            <p>建议新手从以下维度筛选：ROE>15%、营收增速>10%、负债率<60%、PE处于历史30%分位以下、所在行业近期有政策支持。每天收盘后筛选符合条件的股票加入观察池。</p>
            <p><strong>2. 买点规则（何时买）</strong></p>
            <p>例如：股价放量突破MA20 + MACD金叉 + KDJ从超卖区回升。只有当三个条件同时满足时才买入。条件越少，信号越频繁但错误率越高。</p>
            <p><strong>3. 仓位规则（买多少）</strong></p>
            <p>总资金20万，单只股票最多6万（30%）。首次买入3万（50%仓位），确认突破后加仓至6万。</p>
            <p><strong>4. 卖点规则（何时卖）</strong></p>
            <p>止盈：盈利15%卖一半，剩余用MA10跟踪止盈。止损：跌破买入当天最低价或亏损7%止损。</p>
            <p><strong>5. 复盘规则（持续优化）</strong></p>
            <p>每周统计：本周交易次数、胜率、平均盈利、平均亏损、盈亏比。</p>
          </div>
          <p class="mb-3"><strong>系统验证标准：</strong>使用本站模拟盘完成至少20笔交易后，评估以下指标：</p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 text-sm text-center">
            <div class="bg-green-50 p-2 rounded"><p class="font-medium">胜率</p><p class="text-gray-600">>50%</p></div>
            <div class="bg-green-50 p-2 rounded"><p class="font-medium">盈亏比</p><p class="text-gray-600">>1.5</p></div>
            <div class="bg-green-50 p-2 rounded"><p class="font-medium">最大回撤</p><p class="text-gray-600">&lt;15%</p></div>
            <div class="bg-green-50 p-2 rounded"><p class="font-medium">年化收益</p><p class="text-gray-600">>15%</p></div>
          </div>
          <p class="mb-3 text-sm">如果胜率低但盈亏比高，说明你的止损很严格、止盈很果断，这是健康的特征。如果胜率高但盈亏比低，说明你在"赚小钱亏大钱"，长期必亏。</p>
          <div class="bg-blue-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-blue-800 mb-1">最后的话</p>
            <p class="text-sm text-blue-700">股市没有圣杯，任何系统都有失效的时候。你的目标不是找到"必胜公式"，而是建立一套期望值为正的系统，并严格执行它。记住：计划你的交易，交易你的计划。祝你在投资之路上行稳致远。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 完整的交易系统包含哪五个要素？</p>
              <p>2. 健康的交易系统应该满足哪四个指标？</p>
              <p>3. "计划你的交易，交易你的计划"是什么意思？</p>
            </div>
          </details>
        `
      },
      {
        title: '基金组合配置与定投策略',
        content: `
          <p class="mb-3">当你已经掌握了股票交易的精髓，不要忘记基金仍然是资产配置的重要工具。一个成熟的投资者，应该同时运用股票和基金构建"攻防兼备"的投资组合。</p>
          <p class="mb-3"><strong>资产配置金字塔：</strong></p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>第一层（地基）——货币基金</strong></p>
            <p>存放3-6个月的生活备用金，追求绝对安全和高流动性。占投资组合的10-20%。推荐：天弘余额宝、易方达货币A。</p>
            <p><strong>第二层（稳健层）——债券基金</strong></p>
            <p>作为组合的"压舱石"，股市大跌时债券通常上涨，起到对冲作用。占投资组合的20-30%。推荐：易方达稳健收益、招商产业债券。</p>
            <p><strong>第三层（核心层）——宽基指数基金</strong></p>
            <p>沪深300ETF + 中证500ETF 是A股的核心配置，长期持有分享经济增长红利。占投资组合的30-40%。</p>
            <p><strong>第四层（卫星层）——行业主题基金/股票</strong></p>
            <p>在核心配置基础上，用20-30%资金配置看好的行业（如新能源、半导体、消费），追求超额收益。</p>
          </div>
          <p class="mb-3"><strong>核心-卫星策略详解：</strong></p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 text-sm">
            <div class="bg-blue-50 p-3 rounded">
              <p class="font-medium text-blue-800">核心（60-70%）</p>
              <p class="text-gray-600">宽基指数（沪深300+中证500）+ 债券基金。目标是获取市场平均收益，降低波动。</p>
            </div>
            <div class="bg-purple-50 p-3 rounded">
              <p class="font-medium text-purple-800">卫星（30-40%）</p>
              <p class="text-gray-600">行业ETF + 个股。目标是通过主动判断获取超额收益。卫星可以调整，核心长期不动。</p>
            </div>
          </div>
          <p class="mb-3"><strong>定投策略进阶：</strong></p>
          <ul class="list-disc list-inside mb-3 space-y-1 text-sm">
            <li><strong>定期定额</strong>：每月固定日期投入固定金额。最简单，适合完全没时间的上班族。</li>
            <li><strong>定期不定额（智能定投）</strong>：高位少买、低位多买。例如：沪深300PE低于12倍时定投2000元，PE高于18倍时定投500元。</li>
            <li><strong>估值定投法</strong>：只在指数估值处于历史30%分位以下时加倍定投，70%分位以上时停止定投或逐步止盈。</li>
            <li><strong>股债再平衡</strong>：每半年检查一次股债比例，如果股票涨幅过大导致占比超过预设上限，卖出部分股票买入债券，恢复目标比例。</li>
          </ul>
          <div class="bg-green-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-green-800 mb-1">实操示例</p>
            <p class="text-sm text-green-700">假设你有10万元可投资资金，年龄25岁，风险承受能力较高：</p>
            <p class="text-sm text-green-700">- 货币基金：1万（10%，应急备用）</p>
            <p class="text-sm text-green-700">- 债券基金：2万（20%，稳健打底）</p>
            <p class="text-sm text-green-700">- 沪深300ETF：3万（30%，核心配置）</p>
            <p class="text-sm text-green-700">- 中证500ETF：2万（20%，中小盘补充）</p>
            <p class="text-sm text-green-700">- 行业ETF+个股：2万（20%，卫星进攻）</p>
            <p class="text-sm text-green-700 mt-1">每半年再平衡一次，确保各资产比例不偏离目标超过5%。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 资产配置金字塔从下到上分别是哪四层？</p>
              <p>2. 核心-卫星策略中，核心和卫星的目标分别是什么？</p>
              <p>3. 估值定投法的基本原则是什么？</p>
              <p>4. 为什么要定期做股债再平衡？</p>
            </div>
          </details>
        `
      },
      {
        title: '从模拟盘到实盘的心理过渡',
        content: `
          <p class="mb-3">很多新手在模拟盘上战绩辉煌，一上实盘就亏损累累。这不是技术问题，而是心理问题。模拟盘和实盘之间，隔着一条名为"真金白银"的巨大鸿沟。</p>
          <div class="bg-gray-50 p-4 rounded-lg mb-3 space-y-2 text-sm">
            <p><strong>模拟盘与实盘的核心差异</strong>：</p>
            <p>1. <strong>心理压力</strong>：模拟盘亏损无所谓，实盘亏损1000元就心跳加速。这种压力会导致你违背交易计划，该止损时不止损，该持仓时过早止盈。</p>
            <p>2. <strong>资金规模效应</strong>：模拟盘通常给50万虚拟资金，实盘可能只投入5万。但奇怪的是，5万实盘的心理负担往往比50万模拟盘更重——因为那是你辛苦赚来的钱。</p>
            <p>3. <strong>滑点与成交</strong>：模拟盘通常以当前价立即成交，实盘可能因为流动性问题成交在更差的价格，尤其是小盘股和涨停板股票。</p>
            <p>4. <strong>连续盈利后的膨胀</strong>：实盘连续盈利3-5笔后，很多人会自信心爆棚，开始加大仓位、放松选股标准，这正是亏损的开始。华尔街称之为"新手运气诅咒"。</p>
          </div>
          <div class="bg-blue-50 p-4 rounded-lg mb-3 text-sm">
            <p class="font-medium text-blue-800 mb-1">从模拟到实盘的过渡方案</p>
            <p><strong>阶段1：纯模拟盘（1-2个月）</strong>——建立交易系统，验证胜率>50%、盈亏比>1.5。</p>
            <p><strong>阶段2：微实盘（1个月）</strong>——投入不超过5000元，单笔交易不超过1000元。目标是适应"亏钱的心跳"，而非赚钱。</p>
            <p><strong>阶段3：小实盘（3个月）</strong>——投入2-5万元，严格执行交易系统的仓位管理和止损规则。不要追求高收益，追求"不犯大错"。</p>
            <p><strong>阶段4：正常实盘</strong>——当你能在小实盘中连续3个月不违反交易计划时，再逐步加大资金。</p>
          </div>
          <div class="bg-red-50 p-4 rounded-lg mb-3">
            <p class="font-medium text-red-800 mb-1">致命陷阱</p>
            <p class="text-sm text-red-700">永远不要借钱炒股、永远不要配资加杠杆、永远不要用短期内要用的钱（如买房首付、结婚费用）炒股。实盘的第一步不是赚钱，而是确保即使全部亏损，也不会影响你的正常生活。</p>
          </div>
          <details class="bg-gray-50 rounded-lg p-3 mt-3">
            <summary class="font-medium cursor-pointer">自测题</summary>
            <div class="mt-2 text-sm space-y-2">
              <p>1. 模拟盘和实盘最大的区别是什么？</p>
              <p>2. 为什么连续盈利后反而更容易亏损？</p>
              <p>3. 从模拟盘到实盘建议分几个阶段过渡？</p>
              <p>4. 实盘操作的第一原则是什么？</p>
            </div>
          </details>
        `
      }
    ]
  }
];

let learningProgress = {};

function initLearningProgress() {
  const saved = localStorage.getItem('zfinance_learning');
  if (saved) {
    learningProgress = JSON.parse(saved);
    // Migrate old 3-lesson format to 4-lesson format
    learningData.forEach(l => {
      const p = learningProgress[l.level];
      if (p && p.lessons && p.lessons.length < l.lessons.length) {
        while (p.lessons.length < l.lessons.length) p.lessons.push(false);
      }
    });
  } else {
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
