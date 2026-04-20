// Glossary / Terminology Dictionary
const glossaryCategories = ['全部', '基础概念', '交易规则', '技术指标', '基金术语', '风险相关', '财务分析'];
let currentGlossaryCategory = '全部';

const glossaryData = [
  // 基础概念
  { term: 'A股', pinyin: 'agu', category: '基础概念', definition: '人民币普通股票，由中国境内公司发行，供境内机构、组织或个人以人民币认购和交易的普通股股票。', example: '贵州茅台（600519）就是一只A股。' },
  { term: 'B股', pinyin: 'bgu', category: '基础概念', definition: '人民币特种股票，以人民币标明面值，以外币认购和买卖，在上海、深圳证券交易所上市交易。', example: 'B股主要面向境外投资者。' },
  { term: 'H股', pinyin: 'hgu', category: '基础概念', definition: '注册地在内地、上市地在香港的外资股，因香港英文HongKong首字母而得名。', example: '腾讯控股（00700）是H股。' },
  { term: 'T+1', pinyin: 'tjiaoyi', category: '基础概念', definition: '当日买进的股票，要到下一个交易日才能卖出。A股实行T+1交易制度。', example: '周一买入的股票，最早周二才能卖出。' },
  { term: '涨跌停', pinyin: 'zhangdieting', category: '基础概念', definition: '股票价格在一个交易日内上涨或下跌的最大幅度限制。主板一般为±10%，创业板/科创板为±20%。', example: '某股票前收盘价10元，涨停价为11元（10%）。' },
  { term: '市盈率（PE）', pinyin: 'shiyinglv', category: '基础概念', definition: '股票价格除以每股收益的比率，反映投资者为获取1元净利润愿意支付的价格。', example: 'PE为20倍意味着按当前盈利水平，需要20年收回投资成本。' },
  { term: '市净率（PB）', pinyin: 'shijinglv', category: '基础概念', definition: '股票价格除以每股净资产的比率，反映股价相对于账面价值的高低。', example: 'PB小于1可能意味着股价低于公司净资产。' },
  { term: '市值', pinyin: 'shizhi', category: '基础概念', definition: '公司总股本乘以当前股价，代表市场对公司整体价值的评估。', example: '某公司股本10亿股，股价50元，则市值500亿元。' },
  { term: '流通股', pinyin: 'liutonggu', category: '基础概念', definition: '可在二级市场自由买卖的股票数量，与限售股相对。', example: '新股上市后，部分股份有锁定期，不能立即流通。' },
  { term: '换手率', pinyin: 'huanshoulv', category: '基础概念', definition: '一定时间内股票转手买卖的频率，反映股票活跃度。', example: '换手率5%表示当日有5%的流通股发生了交易。' },
  { term: '成交量', pinyin: 'chengjiaoliang', category: '基础概念', definition: '某一时间段内股票成交的总手数（1手=100股）。', example: '成交量放大通常意味着市场关注度提升。' },
  { term: '成交额', pinyin: 'chengjiaoe', category: '基础概念', definition: '某一时间段内股票成交的总金额。', example: '某股当日成交10万手，均价50元，成交额为5亿元。' },
  { term: '每股收益（EPS）', pinyin: 'meigushouyi', category: '基础概念', definition: '税后利润除以总股本，反映普通股股东每持有一股所能享有的企业净利润。', example: 'EPS越高，说明公司盈利能力越强。' },
  { term: '股息率', pinyin: 'guxilv', category: '基础概念', definition: '一年的总派息额与当时市价的比例，反映现金分红回报率。', example: '股价100元，每股分红5元，股息率为5%。' },
  { term: '除权除息', pinyin: 'chuquanquxi', category: '基础概念', definition: '股票发生分红、配股、转增股本后，股价进行相应调整的过程。', example: '10派10元后，股价会从20元调整为19元（假设）。' },
  { term: 'IPO', pinyin: 'ipo', category: '基础概念', definition: '首次公开募股，指公司第一次将股份向公众出售并在证券交易所挂牌交易。', example: '新股IPO申购是投资者参与打新的方式。' },
  { term: '配股', pinyin: 'peigu', category: '基础概念', definition: '上市公司向原股东发行新股、筹集资金的行为，老股东可按持股比例认购。', example: '10配3意味着每持有10股可认购3股新股。' },
  { term: '增发', pinyin: 'zengfa', category: '基础概念', definition: '上市公司再次发行股票筹集资金，分为公开增发和定向增发。', example: '定向增发通常面向特定机构投资者。' },
  { term: '解禁', pinyin: 'jiejin', category: '基础概念', definition: '限售股过了限售承诺期，可以在二级市场自由流通。', example: '大股东持股通常有3年锁定期，期满后解禁。' },
  { term: 'ST股票', pinyin: 'stgupiao', category: '基础概念', definition: '被实施特别处理的股票，通常因为连续亏损或其他财务状况异常。涨跌幅限制为±5%。', example: '*ST表示有退市风险警示。' },
  { term: '科创板', pinyin: 'kechuangban', category: '基础概念', definition: '上海证券交易所设立的独立板块，主要服务科技创新企业，涨跌幅限制±20%。', example: '科创板实行注册制，上市门槛与主板不同。' },
  { term: '创业板', pinyin: 'chuangyeban', category: '基础概念', definition: '深圳证券交易所设立的板块，主要服务成长型创新创业企业，涨跌幅限制±20%。', example: '创业板股票代码以300开头。' },
  { term: '北交所', pinyin: 'beijiaosuo', category: '基础概念', definition: '北京证券交易所，服务创新型中小企业，涨跌幅限制±30%。', example: '北交所股票代码通常以8或4开头。' },

  // 交易规则
  { term: '委托', pinyin: 'weituo', category: '交易规则', definition: '投资者向证券公司下达买卖股票的指令。', example: '投资者通过交易软件提交买入100股的委托。' },
  { term: '成交', pinyin: 'chengjiao', category: '交易规则', definition: '买卖双方以相同价格达成交易，委托被交易所撮合成功。', example: '买入委托价格10元，有人以10元卖出，即成交。' },
  { term: '撤单', pinyin: 'chedan', category: '交易规则', definition: '在委托未成交前，投资者取消该委托的操作。', example: '下单后发现价格不对，可以在成交前撤单。' },
  { term: '市价单', pinyin: 'shijiadan', category: '交易规则', definition: '以当前市场最优价格立即成交的委托，不指定具体价格。', example: '市价买入会以卖一价立即成交。' },
  { term: '限价单', pinyin: 'xianjiadan', category: '交易规则', definition: '指定具体价格的委托，只有当市场价格达到或优于该价格时才成交。', example: '限价10元买入，股价跌到10元或以下才成交。' },
  { term: '开盘价', pinyin: 'kaipanjia', category: '交易规则', definition: '每个交易日开市后第一笔成交的价格。', example: '集合竞价结束后产生开盘价。' },
  { term: '收盘价', pinyin: 'shoupangjia', category: '交易规则', definition: '每个交易日收市前最后一笔成交的价格。', example: '收盘价是计算当日涨跌幅的基准。' },
  { term: '集合竞价', pinyin: 'jihejingjia', category: '交易规则', definition: '开盘前和收盘前一段时间内，接受委托但不立即撮合，最后统一撮合产生开盘价/收盘价。', example: 'A股早盘集合竞价时间为9:15-9:25。' },
  { term: '连续竞价', pinyin: 'lianxujingjia', category: '交易规则', definition: '交易时间内，对有效委托逐笔连续撮合的竞价方式。', example: '9:30-11:30和13:00-15:00为连续竞价时间。' },
  { term: '涨跌幅', pinyin: 'zhangdiefu', category: '交易规则', definition: '股票当前价格相对前一交易日收盘价的变动百分比。', example: '前收盘价100元，现价110元，涨跌幅为+10%。' },
  { term: '多头', pinyin: 'duotou', category: '交易规则', definition: '看涨并买入股票的投资者，期待股价上涨后卖出获利。', example: '买入持有股票就是多头操作。' },
  { term: '空头', pinyin: 'kongtou', category: '交易规则', definition: '看跌并卖出股票的投资者。A股市场普通投资者做空渠道有限。', example: '融券卖出属于空头操作。' },
  { term: '套牢', pinyin: 'taolao', category: '交易规则', definition: '买入股票后股价下跌，投资者不愿割肉卖出而被动持有的状态。', example: '100元买入，跌到80元，不想卖就被套牢了。' },
  { term: '割肉', pinyin: 'gerou', category: '交易规则', definition: '在亏损状态下卖出股票，认赔离场。', example: '股价持续下跌，为避免更大损失选择割肉。' },
  { term: '抄底', pinyin: 'chaodi', category: '交易规则', definition: '在股价跌到相对低位时买入，期待反弹获利。', example: '某股从高点腰斩，投资者认为低估而抄底。' },
  { term: '逃顶', pinyin: 'taoding', category: '交易规则', definition: '在股价涨到相对高位时卖出，锁定利润。', example: '判断市场过热，在高位卖出股票逃顶。' },
  { term: '追高', pinyin: 'zhuigao', category: '交易规则', definition: '在股价已经上涨较多后买入，期待继续上涨。', example: '涨停后次日高开，投资者追高买入。' },
  { term: '杀跌', pinyin: 'shadie', category: '交易规则', definition: '在股价下跌过程中恐慌性卖出。', example: '跌停板打开后，投资者杀跌卖出。' },

  // 技术指标
  { term: 'K线', pinyin: 'kxian', category: '技术指标', definition: '以柱状线条表示一段时间内开盘价、收盘价、最高价和最低价的图表。', example: '阳线表示收盘价高于开盘价，阴线反之。' },
  { term: '均线（MA）', pinyin: 'junxian', category: '技术指标', definition: '一段时间内收盘价的平均值连线，常用5日、10日、20日、60日、120日、250日均线。', example: '股价站上60日均线通常被视为中期趋势转强。' },
  { term: 'MACD', pinyin: 'macd', category: '技术指标', definition: '指数平滑异同移动平均线，由DIF线、DEA线和MACD柱组成，用于判断趋势和买卖时机。', example: 'MACD金叉（DIF上穿DEA）通常被视为买入信号。' },
  { term: 'KDJ', pinyin: 'kdj', category: '技术指标', definition: '随机指标，通过比较收盘价与一定周期内价格波动范围，判断超买超卖状态。', example: 'KDJ值超过80为超买，低于20为超卖。' },
  { term: 'RSI', pinyin: 'rsi', category: '技术指标', definition: '相对强弱指标，衡量一段时间内价格上涨和下跌的幅度比，判断超买超卖。', example: 'RSI超过70通常认为进入超买区域。' },
  { term: '布林带（BOLL）', pinyin: 'bulindai', category: '技术指标', definition: '由中轨（均线）和上下轨（标准差）组成的价格通道，反映价格波动范围。', example: '股价触及布林带上轨可能面临压力。' },
  { term: '成交量（VOL）', pinyin: 'chengjiaoliang', category: '技术指标', definition: '柱状图表示的成交量，通常与K线图配合使用。', example: '放量上涨（价涨量增）通常被认为是健康上涨。' },
  { term: '支撑位', pinyin: 'zhichengwei', category: '技术指标', definition: '股价下跌时可能遇到支撑而反弹的价位，通常是前期低点或密集成交区。', example: '某股多次在20元附近止跌反弹，20元就是支撑位。' },
  { term: '压力位', pinyin: 'yalwei', category: '技术指标', definition: '股价上涨时可能遇到阻力而回落的价位，通常是前期高点或密集成交区。', example: '某股多次冲高30元未果，30元就是压力位。' },
  { term: '金叉', pinyin: 'jincha', category: '技术指标', definition: '短期均线上穿长期均线，通常被视为买入信号。', example: '5日均线上穿20日均线形成金叉。' },
  { term: '死叉', pinyin: 'sicha', category: '技术指标', definition: '短期均线下穿长期均线，通常被视为卖出信号。', example: '5日均线下穿20日均线形成死叉。' },
  { term: '背离', pinyin: 'beili', category: '技术指标', definition: '股价走势与技术指标走势相反的现象，分为顶背离和底背离。', example: '股价创新高但MACD未创新高，形成顶背离。' },
  { term: '趋势线', pinyin: 'qushixian', category: '技术指标', definition: '连接股价波动中的高点或低点画出的直线，用于判断趋势方向。', example: '上升趋势线连接依次抬高的低点。' },
  { term: '形态分析', pinyin: 'xingtaifenxi', category: '技术指标', definition: '通过识别K线组合形成的特定图案（如头肩顶、双底、三角形等）预测走势。', example: '头肩顶形态完成后通常预示着下跌趋势。' },

  // 基金术语
  { term: '净值', pinyin: 'jingzhi', category: '基金术语', definition: '基金总资产减去总负债后的价值除以基金份额总数，反映每份基金的实际价值。', example: '某基金净值1.5元，买入1000份需1500元。' },
  { term: '累计净值', pinyin: 'leijijingzhi', category: '基金术语', definition: '基金净值加上历史分红金额，反映基金成立以来的总收益情况。', example: '累计净值高于净值说明基金有过分红。' },
  { term: '申购', pinyin: 'shengou', category: '基金术语', definition: '投资者在基金成立后购买基金份额的行为。', example: '工作日15:00前申购，按当日净值成交。' },
  { term: '赎回', pinyin: 'shuhui', category: '基金术语', definition: '投资者将持有的基金份额卖回给基金公司，收回资金。', example: '货币基金通常T+1到账，其他基金可能需要更久。' },
  { term: '定投', pinyin: 'dingtou', category: '基金术语', definition: '定期定额投资基金，通过分批买入平摊成本、降低择时风险。', example: '每月1日定投1000元某指数基金。' },
  { term: 'A类份额', pinyin: 'aleifen', category: '基金术语', definition: '前端收费的基金份额，申购时收取申购费，适合长期持有。', example: '计划持有3年以上，选A类更划算。' },
  { term: 'C类份额', pinyin: 'cleifen', category: '基金术语', definition: '不收取申购费，但按日计提销售服务费的基金份额，适合短期持有。', example: '计划持有1年以内，选C类更划算。' },
  { term: 'ETF', pinyin: 'etf', category: '基金术语', definition: '交易型开放式指数基金，可在二级市场像股票一样买卖，同时可申购赎回。', example: '沪深300ETF跟踪沪深300指数表现。' },
  { term: 'LOF', pinyin: 'lof', category: '基金术语', definition: '上市开放式基金，既可在场内像股票一样交易，也可在场外申购赎回。', example: 'LOF的场内交易价格可能与净值存在折溢价。' },
  { term: 'FOF', pinyin: 'fof', category: '基金术语', definition: '基金中的基金，主要投资标的是其他基金份额，实现二次分散。', example: '养老目标基金多为FOF形式。' },
  { term: '基金经理', pinyin: 'jinjinli', category: '基金术语', definition: '负责基金投资决策和日常管理的专业人员，其能力直接影响基金业绩。', example: '选择主动型基金时，基金经理的能力很重要。' },
  { term: '基金规模', pinyin: 'jinjinguimo', category: '基金术语', definition: '基金管理的总资产金额，过大或过小都可能影响运作效率。', example: '主动管理型基金规模通常在10-100亿较合适。' },
  { term: '指数型基金', pinyin: 'zhishuxingjin', category: '基金术语', definition: '以特定指数为跟踪对象，通过购买指数成分股来复制指数表现的基金。', example: '中证500指数基金跟踪中证500指数。' },
  { term: 'QDII基金', pinyin: 'qdiijijin', category: '基金术语', definition: '经批准在境内募集资金，投资于境外证券市场的基金。', example: '纳斯达克100指数基金就是QDII基金。' },
  { term: '货币基金', pinyin: 'huobijijin', category: '基金术语', definition: '投资于短期货币工具（如国债、央行票据、银行存款等）的基金，流动性高、风险低。', example: '余额宝对接的就是货币基金。' },
  { term: '万份收益', pinyin: 'wanfenshouyi', category: '基金术语', definition: '货币基金每万份基金份额当日获得的收益金额。', example: '万份收益0.6元表示每1万份当日收益0.6元。' },
  { term: '7日年化收益率', pinyin: 'qiriannual', category: '基金术语', definition: '货币基金最近7天的平均收益水平进行年化后得到的收益率。', example: '7日年化2%不代表未来一年一定能获得2%收益。' },

  // 风险相关
  { term: '回撤', pinyin: 'huiche', category: '风险相关', definition: '资产净值从前期高点到低点的跌幅，反映投资过程中可能面临的最大亏损。', example: '某基金净值从2元跌到1.5元，回撤为25%。' },
  { term: '最大回撤', pinyin: 'zuidahuiche', category: '风险相关', definition: '在选定周期内，资产净值从高点到低点的最大跌幅，衡量下行风险。', example: '最大回撤30%意味着最糟糕时亏了30%。' },
  { term: '波动率', pinyin: 'bodonglv', category: '风险相关', definition: '资产价格波动的剧烈程度，通常用收益率的标准差来衡量。', example: '波动率越高，短期价格变动越剧烈。' },
  { term: '夏普比率', pinyin: 'xiaopubilv', category: '风险相关', definition: '衡量每承担一单位总风险所获得的超额收益，数值越高风险调整后收益越好。', example: '夏普比率>1通常认为风险调整后收益较好。' },
  { term: '贝塔系数（β）', pinyin: 'beita', category: '风险相关', definition: '衡量个股或基金相对于市场整体波动的敏感程度。β=1表示与市场同步波动。', example: 'β=1.5意味着大盘涨10%，该股票可能涨15%。' },
  { term: '阿尔法收益（α）', pinyin: 'aerfa', category: '风险相关', definition: '超越市场基准的超额收益，反映主动管理能力。', example: '基金经理通过选股创造的超额收益就是α。' },
  { term: '系统性风险', pinyin: 'xitongxingfengxian', category: '风险相关', definition: '影响整个市场的风险，无法通过分散投资消除，如经济危机、政策变化等。', example: '2008年金融危机属于系统性风险。' },
  { term: '非系统性风险', pinyin: 'feitongxingfengxian', category: '风险相关', definition: '仅影响个别公司或行业的风险，可通过分散投资降低，如公司经营不善。', example: '某公司产品质量丑闻导致股价大跌。' },
  { term: '止损', pinyin: 'zhisun', category: '风险相关', definition: '预先设定亏损上限，当股价跌到该价位时自动或手动卖出，控制损失。', example: '10元买入，设9元为止损价，最多亏10%。' },
  { term: '止盈', pinyin: 'zhiying', category: '风险相关', definition: '预先设定盈利目标，当股价涨到该价位时卖出，锁定利润。', example: '10元买入，设15元为止盈价，目标赚50%。' },
  { term: '仓位', pinyin: 'cangwei', category: '风险相关', definition: '投资者实际投资金额占可用资金总额的比例。', example: '满仓指100%资金投入，空仓指0%资金投入。' },
  { term: '分散投资', pinyin: 'fensantouzi', category: '风险相关', definition: '将资金投资于多种不同资产，以降低单一资产波动带来的风险。', example: '同时持有股票、基金、债券，不把鸡蛋放一个篮子里。' },
  { term: '资产配置', pinyin: 'zichanpeizhi', category: '风险相关', definition: '根据投资目标和风险承受能力，将资金分配到不同类别资产（股票、债券、现金等）的比例安排。', example: '年轻投资者通常股票配置比例较高。' },

  // 财务分析
  { term: '资产负债表', pinyin: 'zichanfuzhai', category: '财务分析', definition: '反映企业在某一特定日期财务状况的报表，包含资产、负债和所有者权益。', example: '资产 = 负债 + 所有者权益。' },
  { term: '利润表', pinyin: 'lirunbiao', category: '财务分析', definition: '反映企业在一定会计期间经营成果的报表，展示收入、成本、费用和利润。', example: '净利润 = 营业收入 - 营业成本 - 各项费用。' },
  { term: '现金流量表', pinyin: 'xianjinliu', category: '财务分析', definition: '反映企业在一定期间内现金和现金等价物流入流出的报表。', example: '经营活动现金流持续为正说明主业造血能力强。' },
  { term: '毛利率', pinyin: 'maolilv', category: '财务分析', definition: '（营业收入 - 营业成本）/ 营业收入，反映产品本身的盈利能力。', example: '毛利率越高，说明产品议价能力越强。' },
  { term: '净利率', pinyin: 'jinglilv', category: '财务分析', definition: '净利润 / 营业收入，反映企业最终的盈利水平。', example: '净利率受费用控制能力和税收影响。' },
  { term: 'ROE', pinyin: 'roe', category: '财务分析', definition: '净资产收益率，净利润除以净资产，衡量股东权益的收益水平。', example: 'ROE持续>15%通常被认为是优质公司。' },
  { term: 'ROA', pinyin: 'roa', category: '财务分析', definition: '总资产收益率，净利润除以总资产，衡量企业利用全部资产的获利能力。', example: 'ROA反映资产运用效率。' },
  { term: '负债率', pinyin: 'fuzhailv', category: '财务分析', definition: '总负债 / 总资产，反映企业资产中有多少是通过负债形成的。', example: '负债率过高可能意味着财务风险较大。' },
  { term: '流动比率', pinyin: 'liudongbilv', category: '财务分析', definition: '流动资产 / 流动负债，衡量企业短期偿债能力。', example: '流动比率>2通常认为短期偿债能力较强。' },
  { term: '速动比率', pinyin: 'sudongbilv', category: '财务分析', definition: '（流动资产 - 存货）/ 流动负债，更严格地衡量短期偿债能力。', example: '存货变现能力弱，扣除后更真实反映偿债能力。' },
  { term: '营收增长率', pinyin: 'yingshouzengzhang', category: '财务分析', definition: '本期营业收入相对上期的增长百分比，反映业务扩张速度。', example: '营收连续增长说明公司在扩张。' },
  { term: '净利润增长率', pinyin: 'jinglirunzengzhang', category: '财务分析', definition: '本期净利润相对上期的增长百分比，反映盈利能力提升速度。', example: '净利润增速高于营收增速说明盈利能力在改善。' },

  // 基金术语（补充）
  { term: '认购', pinyin: 'rengou', category: '基金术语', definition: '基金首次发行募集期间购买基金份额的行为，通常费率低于申购。', example: '新基金发行期间通过认购买入，封闭期结束后才能赎回。' },
  { term: '费率', pinyin: 'feilv', category: '基金术语', definition: '投资基金所需支付的各项费用总和，包括申购费、管理费、托管费、赎回费等。', example: 'A类基金申购费1.5%，管理费1%/年，托管费0.2%/年。' },
  { term: '申购费', pinyin: 'shengoufei', category: '基金术语', definition: '购买基金份额时支付的手续费，通常为认购金额的0.1%-1.5%。', example: '申购10万元基金，申购费率0.15%，需支付150元申购费。' },
  { term: '赎回费', pinyin: 'shuhuifei', category: '基金术语', definition: '卖出基金份额时支付的手续费，持有时间越长费率越低，通常持有超过2年免收。', example: '持有不满7天赎回，赎回费率高达1.5%，旨在惩罚短线交易。' },
  { term: '管理费', pinyin: 'guanlifei', category: '基金术语', definition: '基金公司每年按基金资产净值的一定比例收取的报酬，用于支付投研和运营开支。', example: '管理费1%/年意味着每年从基金资产中扣除1%作为报酬。' },
  { term: '托管费', pinyin: 'tuoguanfei', category: '基金术语', definition: '银行作为基金资产托管方收取的费用，保障资金安全。通常为0.1%-0.25%/年。', example: '托管费每日计提，直接从基金净值中扣除。' },
  { term: '销售服务费', pinyin: 'xiaoshoufuwufei', category: '基金术语', definition: 'C类份额基金按日计提的费用，代替申购费，适合短期持有。', example: 'C类基金无申购费，但每年收取0.4%-0.8%的销售服务费。' },
  { term: '基金转换', pinyin: 'jinjinzhuanhuan', category: '基金术语', definition: '在同一基金公司内部，将持有的某只基金份额直接转换为另一只，省去赎回再申购的时间和费用。', example: '将持有的华夏成长混合转换为华夏沪深300ETF联接。' },
  { term: '分红方式', pinyin: 'fenhongfangshi', category: '基金术语', definition: '基金分红的两种形式：现金分红（直接拿到现金）和红利再投资（自动转为基金份额）。', example: '长期投资者建议选择红利再投资，复利效果更好。' },
  { term: '基金评级', pinyin: 'jinjipingji', category: '基金术语', definition: '第三方机构（如晨星、银河证券）对基金历史业绩和风险调整后收益的综合评价，通常分为1-5星。', example: '晨星5星基金代表同类型中风险调整后收益排名前10%。' },
  { term: '风格漂移', pinyin: 'fenggepiaoyi', category: '基金术语', definition: '基金经理偏离基金合同约定的投资风格和投资范围的现象。', example: '某价值型基金在市场热点时大量买入成长股，即风格漂移。' },
  { term: '封闭期', pinyin: 'fengbiqi', category: '基金术语', definition: '新基金成立后的一段时间内（通常3个月），投资者不能申购也不能赎回。', example: '封闭期内基金经理可以不受赎回压力地逐步建仓。' },
  { term: '建仓期', pinyin: 'jianzangqi', category: '基金术语', definition: '新基金成立后3-6个月内，基金经理按照投资策略逐步买入股票/债券的过程。', example: '建仓期内基金仓位可能从0%逐步提升到80%以上。' },
  { term: '重仓股', pinyin: 'zhongcanggu', category: '基金术语', definition: '基金持仓中占资产净值比例最高的几只股票，通常前十大重仓股占基金净值的50%-70%。', example: '查看基金季报可以了解基金经理的最新重仓股变化。' },
  { term: '持仓集中度', pinyin: 'chicangjizhongdu', category: '基金术语', definition: '前十大重仓股占基金净资产的比例，反映基金投资的分散程度。', example: '持仓集中度越高，基金业绩波动越大，但超额收益潜力也越大。' },

  // 交易规则（补充）
  { term: '龙虎榜', pinyin: 'longhufbang', category: '交易规则', definition: '交易所每日公布的涨跌幅/换手率异常股票的交易公开信息，可查看买入/卖出前五席位。', example: '某股涨停后登上龙虎榜，显示机构专用席位大量买入。' },
  { term: '大宗交易', pinyin: 'dazongjiaoyi', category: '交易规则', definition: '单笔交易数量或金额达到规定标准（如A股单笔>=30万股或>=200万元）的场外协议交易。', example: '大股东减持通常通过大宗交易进行，价格可协商折扣。' },
  { term: '停牌', pinyin: 'tingpai', category: '交易规则', definition: '股票因重大事项（如重组、发布重要公告）暂时停止在交易所交易。', example: '某公司筹划重大资产重组，申请停牌以避免股价异常波动。' },
  { term: '复牌', pinyin: 'fupai', category: '交易规则', definition: '停牌股票在重大事项公告或完成后，恢复在交易所正常交易。', example: '重组成功后复牌，股价可能连续涨停或跌停。' },
  { term: '除权', pinyin: 'chuquan', category: '交易规则', definition: '因送转股、配股导致股本增加，股价按比例下调以保持总市值不变。', example: '10送10后，股价从20元调整为10元，持股数量翻倍。' },
  { term: '填权', pinyin: 'tianquan', category: '交易规则', definition: '除权后股价上涨，逐渐回到除权前的价格水平。', example: '某公司除权后业绩超预期，股价迅速填权甚至超过除权前高点。' },
  { term: '贴权', pinyin: 'tiequan', category: '交易规则', definition: '除权后股价继续下跌，未能回到除权前价格。', example: '市场整体低迷，除权后股价持续下跌形成贴权。' },
  { term: '轧空', pinyin: 'zhakong', category: '交易规则', definition: '空头投资者被迫在股价上涨时高价买回股票平仓，进一步推动股价上涨。', example: '某股被大量融券做空，突发利好导致空头被迫轧空回补。' },

  // 基础概念（补充）
  { term: '蓝筹股', pinyin: 'lanchougu', category: '基础概念', definition: '业绩稳定、规模庞大、在行业内具有领导地位的优质公司股票，通常市值大、分红稳定。', example: '工商银行、中国平安、贵州茅台都属于蓝筹股。' },
  { term: '白马股', pinyin: 'baimagu', category: '基础概念', definition: '业绩优良、成长性好、回报率高且具有较高投资价值的股票，是A股中的"优等生"。', example: '茅台、五粮液、恒瑞医药等长期业绩优异的股票被称为白马股。' },
  { term: '概念股', pinyin: 'gainiangu', category: '基础概念', definition: '因某种特定题材/概念（如人工智能、碳中和）受到市场关注，股价脱离基本面上涨的股票。', example: 'ChatGPT热潮中，多只AI概念股短期内翻倍。' },
  { term: '妖股', pinyin: 'yaogu', category: '基础概念', definition: '股价走势异常、大幅偏离基本面、暴涨暴跌的股票，通常由游资炒作驱动。', example: '某股连续10个涨停，与公司基本面完全不符，即为妖股。' },
  { term: '主力', pinyin: 'zhuli', category: '基础概念', definition: '市场中资金实力雄厚、能够影响股价走势的机构投资者或大户。', example: '龙虎榜上的机构专用席位和知名游资营业部即为主力。' },
  { term: '散户', pinyin: 'sanhu', category: '基础概念', definition: '资金量较小、以个人身份参与股市交易的普通投资者，与机构投资者相对。', example: 'A股散户数量超过2亿，但资金占比不到30%。' },
  { term: '游资', pinyin: 'youzi', category: '基础概念', definition: '以短期投机为目的、快进快出的活跃资金，通常偏好小市值题材股的短线操作。', example: '游资常在涨停板附近进出，推动题材股短期暴涨。' },

  // 财务分析（补充）
  { term: 'EBITDA', pinyin: 'ebitda', category: '财务分析', definition: '税息折旧及摊销前利润，衡量企业主营业务的盈利能力，不受资本结构和税收政策影响。', example: 'EBITDA利润率越高，说明企业核心盈利能力越强。' },
  { term: '自由现金流', pinyin: 'ziyouxianjinliu', category: '财务分析', definition: '企业经营活动产生的现金流量扣除维持运营所需的资本支出后，可自由分配给股东和债权人的现金。', example: '自由现金流持续为正且稳定增长的公司通常财务状况健康。' },
  { term: '应收账款', pinyin: 'yingshouzhangkuan', category: '财务分析', definition: '企业已交付商品或提供服务但尚未收回的款项，反映企业的回款能力和下游议价力。', example: '应收账款大幅增长但营收未同步增长，可能意味着回款困难。' },
  { term: '存货周转率', pinyin: 'cunhuozhuanlulv', category: '财务分析', definition: '营业成本除以平均存货，衡量企业存货变现速度和管理效率。', example: '存货周转率越高，说明商品卖得越快，资金占用越少。' },
  { term: '杜邦分析法', pinyin: 'dubangfenxi', category: '财务分析', definition: '将净资产收益率（ROE）分解为销售净利率、资产周转率和权益乘数三个因素的财务分析框架。', example: '通过杜邦分析可以判断ROE提升是来自盈利改善还是杠杆增加。' },

  // 基金术语（补充）
  { term: 'MOM', pinyin: 'mom', category: '基金术语', definition: '管理人的管理人基金，通过筛选和委托多个优秀投资管理人进行投资，实现多元策略配置。', example: 'MOM模式将资金分配给不同的基金经理，各自负责擅长的策略领域。' },
  { term: 'ETF联接基金', pinyin: 'etflijiiejijin', category: '基金术语', definition: '主要投资于目标ETF基金份额的基金，让无法在场内交易ETF的投资者也能间接参与。', example: '某沪深300ETF联接基金90%以上资产投资于对应的ETF。' },
  { term: '增强指数基金', pinyin: 'zengqiangzhishujijin', category: '基金术语', definition: '以跟踪指数为主，同时通过主动选股、量化策略等方式力求获得超越指数的额外收益。', example: '某沪深300增强基金目标是在跟踪误差可控前提下跑赢沪深300指数。' },
  { term: '巨额赎回', pinyin: 'jueshuhui', category: '基金术语', definition: '单个开放日基金净赎回申请超过基金总份额10%的情形，基金管理人有权延期或部分延期办理。', example: '市场大跌时，投资者集中赎回可能导致基金触发巨额赎回条款。' },
  { term: '基金清盘', pinyin: 'jinjinqingpan', category: '基金术语', definition: '基金因规模过小（如连续60日低于5000万元）或合同到期等原因终止运作，将剩余资产变现后分配给投资者。', example: '迷你基金因长期规模不足触发清盘条件，投资者将收到清算款项。' },
  { term: '基金转型', pinyin: 'jinjinzhuanxing', category: '基金术语', definition: '基金在运作过程中因市场环境变化或合同约定，改变投资目标、策略或类型的行为，需经持有人大会表决。', example: '某保本基金因资管新规要求转型为偏债混合基金。' },
  { term: '定开基金', pinyin: 'dingkaijijin', category: '基金术语', definition: '定期开放型基金，在封闭期内不接受申赎，仅在固定的开放期内办理，帮助基金经理减少流动性干扰。', example: '某定开基金每3个月开放一次申赎，其余时间封闭运作。' },
  { term: '持有期基金', pinyin: 'chiyouqijijin', category: '基金术语', definition: '投资者买入后必须持有满一定期限（如6个月、1年）才能赎回的基金，旨在引导长期投资。', example: '持有期基金帮助投资者克制频繁申赎的冲动。' },
  { term: '微笑曲线', pinyin: 'weixiaoquxian', category: '基金术语', definition: '定投理论中的理想走势：市场先下跌再上涨，定投者在低位积累更多份额，最终收益优于一次性投资。', example: '定投过程中经历下跌无需恐慌，微笑曲线正是利用低点多买。' },
  { term: '分级基金', pinyin: 'fenjijijin', category: '基金术语', definition: '将基金份额分为不同风险收益等级的子份额（如稳健级A和进取级B），目前A股市场已逐步清退。', example: '分级B具有杠杆效应，涨跌幅可能大于母基金。' },
  { term: '主动型基金', pinyin: 'zhudongxingjijin', category: '基金术语', definition: '由基金经理主动选股、择时，力求超越业绩比较基准的基金，管理费和换手率通常较高。', example: '偏股混合基金和灵活配置基金多属于主动型基金。' },
  { term: '被动型基金', pinyin: 'beidongxingjijin', category: '基金术语', definition: '以跟踪特定指数为目标的基金，不主动选股，管理费率低，透明度高，如ETF和普通指数基金。', example: '沪深300ETF是典型的被动型基金，完全复制指数成分股。' },
  { term: '前端收费', pinyin: 'qianduanshoufei', category: '基金术语', definition: '基金申购时一次性扣除申购费，持有时间越长越划算，适合长期投资者。', example: '前端申购费1.5%，买入1万元实际确认份额为9850元对应份额。' },
  { term: '后端收费', pinyin: 'houdaanshoufei', category: '基金术语', definition: '基金申购时不收费，赎回时根据持有时间收取申购费，持有时间越长费率越低甚至为零。', example: '某基金后端收费持有满3年后赎回免收申购费。' },
  { term: '红利再投资', pinyin: 'honglizaitouzi', category: '基金术语', definition: '基金分红时将分得的红利自动转换为基金份额继续投资，享受复利效应，通常免收申购费。', example: '选择红利再投资可以让分红资金继续参与市场增长。' },

  // 交易规则（补充）
  { term: '量化交易', pinyin: 'lianghuajiaoyi', category: '交易规则', definition: '利用数学模型和计算机程序自动执行交易决策的投资方式，强调纪律性和系统性。', example: '量化策略可能基于均线突破、均值回归等规则自动买卖。' },
  { term: '程序化交易', pinyin: 'chengxuhuajiaoyi', category: '交易规则', definition: '通过预先编写的计算机程序自动下单的交易方式，是量化交易的实现手段之一。', example: '程序化交易可以在毫秒级别完成行情分析和下单。' },
  { term: '网格交易', pinyin: 'wanggejiaoyi', category: '交易规则', definition: '在设定的价格区间内划分若干网格，价格每跌一格买入、每涨一格卖出，赚取震荡行情中的差价。', example: '某股在10-12元区间设置网格，每0.5元为一格进行低买高卖。' },
  { term: '条件单', pinyin: 'tiaojiandan', category: '交易规则', definition: '投资者预设触发条件和委托指令，当行情满足条件时系统自动提交委托，无需实时盯盘。', example: '设置股价跌破20元时自动卖出1000股的条件单。' },
  { term: '一键打新', pinyin: 'yijiandaxin', category: '交易规则', definition: '交易软件提供的便捷功能，一次性批量申购当日所有可申购的新股/新债，提高操作效率。', example: '每天早上打开APP，点击一键打新即可参与所有新股申购。' },
  { term: '涨停板', pinyin: 'zhangtingban', category: '交易规则', definition: '股票价格达到当日涨幅上限后停止上涨，主板为±10%，创业板/科创板为±20%，北交所为±30%。', example: '利好刺激下，某股开盘即封涨停板，买盘远大于卖盘。' },
  { term: '跌停板', pinyin: 'dietingban', category: '交易规则', definition: '股票价格达到当日跌幅下限后停止下跌，卖出委托远大于买入委托时常见。', example: '利空消息导致某股连续跌停，投资者难以卖出。' },
  { term: '一字板', pinyin: 'yiziban', category: '交易规则', definition: '股票以涨停或跌停价开盘并全天维持，K线呈一字形，说明多空力量极度失衡。', example: '重大重组公告后，某股连续多个一字涨停板。' },

  // 风险相关（补充）
  { term: '黑天鹅事件', pinyin: 'heitiane', category: '风险相关', definition: '极其罕见、难以预测但一旦发生影响巨大的负面事件，如突发战争、重大疫情、金融海啸等。', example: '2020年新冠疫情爆发是典型的黑天鹅事件，全球股市短期内暴跌。' },
  { term: '灰犀牛', pinyin: 'huixiniu', category: '风险相关', definition: '大概率会发生、预警信号明显但被忽视的高风险事件，与黑天鹅的突发性相对。', example: '房地产泡沫、地方债务问题是许多经济学家警告的灰犀牛。' },
  { term: '风险溢价', pinyin: 'fengxianyijia', category: '风险相关', definition: '投资者因承担额外风险而要求的超额回报，高风险资产必须提供更高的预期收益才能吸引投资。', example: '股票的长期收益高于债券，高出的部分就是股权风险溢价。' },
  { term: '流动性风险', pinyin: 'liudongxingfengxian', category: '风险相关', definition: '资产无法在短时间内以合理价格变现的风险，市场恐慌时流动性风险显著上升。', example: '中小盘股在熊市中可能因缺乏买盘而难以卖出。' },
  { term: '道德风险', pinyin: 'daodefengxian', category: '风险相关', definition: '因信息不对称，一方在获得保护后采取更冒险行为而损害另一方利益的风险。', example: '刚性兑付环境下，投资者不关注产品风险，机构倾向于发行高风险产品。' },

  // 近年热点（补充）
  { term: 'REITs', pinyin: 'reits', category: '基础概念', definition: '不动产投资信托基金，通过证券化方式将不动产资产转化为可交易的基金份额，投资者可分享租金和增值收益。', example: '基础设施REITs涵盖高速公路、产业园、仓储物流等资产。' },
  { term: 'ESG投资', pinyin: 'esgtouzi', category: '基础概念', definition: '综合考虑环境（Environmental）、社会（Social）和治理（Governance）因素的投资理念，追求可持续发展。', example: 'ESG评分高的企业通常在长期经营中更具韧性。' },
  { term: '碳中和概念', pinyin: 'tanzhonghe', category: '基础概念', definition: '与实现碳达峰、碳中和目标相关的产业和企业，包括新能源、储能、节能减排、碳捕集等领域。', example: '光伏、风电、新能源汽车是碳中和概念的核心赛道。' },
  { term: '北向资金', pinyin: 'beixiangzijin', category: '基础概念', definition: '通过沪深港通机制从香港流入A股市场的外资，因地理方位（香港在南部）而得名。', example: '北向资金单日净流入超百亿通常被视为外资看好A股的信号。' },
  { term: '南向资金', pinyin: 'nanxiangzijin', category: '基础概念', definition: '通过沪深港通机制从内地流入港股市场的资金，与北向资金方向相反。', example: '内地投资者通过港股通买入腾讯、美团等港股标的属于南向资金。' },
  { term: '互联互通', pinyin: 'hulianhutong', category: '基础概念', definition: '沪港通、深港通等机制的统称，允许内地与香港投资者相互买卖对方市场的股票。', example: '互联互通机制大幅提升了A股市场的国际化程度。' },
  { term: '注册制', pinyin: 'zhucezhi', category: '基础概念', definition: '证券发行制度，企业只要符合信息披露要求即可注册上市，由市场判断投资价值，区别于核准制。', example: '科创板和创业板已实行注册制，主板也于2023年全面实行注册制。' },
  { term: '全面注册制', pinyin: 'quanmianzhucezhi', category: '基础概念', definition: '2023年中国资本市场改革的重要举措，A股所有板块统一实行注册制，简化上市流程，强化信息披露。', example: '全面注册制下，新股发行更加市场化，壳资源价值大幅下降。' },
  { term: '做市商', pinyin: 'zuoshishang', category: '交易规则', definition: '具备做市资格的券商，在市场中同时报出买入和卖出价格，为市场提供流动性，常见于科创板和北交所。', example: '做市商通过买卖价差获利，同时稳定市场交易价格。' },
  { term: '中特估', pinyin: 'zhongtegu', category: '基础概念', definition: '中国特色估值体系的简称，指重新审视和评估央企、国企等传统行业股票的估值逻辑，关注分红和稳健经营。', example: '2023年中特估概念引发市场对低估值国企的重新关注。' },
  { term: '新质生产力', pinyin: 'xinzhi', category: '基础概念', definition: '以科技创新为驱动、摆脱传统增长方式的先进生产力形态，涵盖人工智能、生物医药、新能源、高端装备等领域。', example: '发展新质生产力是近年来产业政策的重要方向。' },
  { term: '专精特新', pinyin: 'zhuanjingtexin', category: '基础概念', definition: '专业化、精细化、特色化、新颖化的简称，指具有核心技术和市场竞争力的中小企业，是政策支持的重点对象。', example: '专精特新小巨人企业在细分领域往往具有全球竞争力。' },

  // 基础概念（补充）
  { term: '熔断机制', pinyin: 'rongduan', category: '基础概念', definition: '当股指跌幅达到预设阈值时暂停交易的制度，旨在给市场冷静期。A股2016年曾短暂实施，后暂停。', example: '美股实行三级熔断机制，分别对应7%、13%和20%的跌幅阈值。' },
  { term: '股权质押', pinyin: 'guquanzhiya', category: '基础概念', definition: '股东将持有的股票作为担保物向金融机构借款的融资方式，质押比例过高存在平仓风险。', example: '大股东高比例质押后，若股价大幅下跌可能面临强制平仓。' },
  { term: '减持', pinyin: 'jianchi', category: '基础概念', definition: '上市公司大股东、董监高等特定股东出售所持有的股票，通常受法律法规的严格限制和披露要求。', example: '大股东计划减持超过1%的股份需要提前公告。' },
  { term: '高送转', pinyin: 'gaosongzhuan', category: '基础概念', definition: '上市公司大比例送红股或转增股本的行为（如10送10），虽增加股数但降低每股价值，实质为数字游戏。', example: '高送转后股价除权降低，但总市值不变，常被市场炒作。' },
  { term: '借壳上市', pinyin: 'jieke', category: '基础概念', definition: '非上市公司通过收购、资产置换等方式取得已上市公司的控股权，从而间接实现上市。', example: '某新能源企业通过借壳ST公司快速登陆A股市场。' },
  { term: '股权激励', pinyin: 'guquanjili', category: '基础概念', definition: '上市公司以股票或期权为工具激励高管和核心员工，使其利益与公司长期发展绑定。', example: '股权激励计划通常设置业绩考核目标，达标后员工方可行权。' },
  { term: '回购', pinyin: 'huigou', category: '基础概念', definition: '上市公司用自有资金从二级市场购回本公司股票，通常用于注销（提升每股价值）或用于员工持股计划。', example: '某公司宣布回购不超过10亿元股份，传递管理层看好公司的信号。' }
];

function initGlossary() {
  renderGlossaryTabs();
  renderGlossaryCards();
}

function renderGlossaryTabs() {
  const container = document.getElementById('glossary-tabs');
  if (!container) return;
  container.innerHTML = glossaryCategories.map(cat => {
    const active = cat === currentGlossaryCategory ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:text-primary hover:border-primary border border-gray-200';
    return `<button onclick="switchGlossaryCategory('${cat}')" class="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${active}">${cat}</button>`;
  }).join('');
}

function switchGlossaryCategory(cat) {
  currentGlossaryCategory = cat;
  renderGlossaryTabs();
  renderGlossaryCards();
}

function getFilteredTerms() {
  const query = (document.getElementById('glossary-search')?.value || '').trim().toLowerCase();
  let list = glossaryData;
  if (currentGlossaryCategory !== '全部') {
    list = list.filter(t => t.category === currentGlossaryCategory);
  }
  if (query) {
    list = list.filter(t =>
      t.term.toLowerCase().includes(query) ||
      t.pinyin.toLowerCase().includes(query) ||
      t.definition.toLowerCase().includes(query)
    );
  }
  return list;
}

function renderGlossaryCards() {
  const container = document.getElementById('glossary-cards');
  if (!container) return;
  const terms = getFilteredTerms();
  if (terms.length === 0) {
    container.innerHTML = `<div class="col-span-full text-center py-12 text-gray-400"><p class="text-lg mb-2">未找到匹配的术语</p><p class="text-sm">请尝试其他关键词、拼音首字母或分类</p></div>`;
    return;
  }
  container.innerHTML = terms.map((t, i) => `
    <div class="card-gradient p-5 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 stagger-card" style="animation-delay:${(i%8)*0.05}s">
      <div class="flex items-start justify-between mb-2">
        <h4 class="font-bold text-gray-800 text-lg">${t.term}</h4>
        <span class="px-2 py-0.5 rounded-lg text-xs font-medium ${getGlossaryBadgeClass(t.category)}">${t.category}</span>
      </div>
      <p class="text-sm text-gray-600 leading-relaxed mb-3">${t.definition}</p>
      <div class="bg-blue-50/50 rounded-xl p-3 border border-blue-100/50">
        <p class="text-xs text-blue-600 font-medium mb-1">示例</p>
        <p class="text-sm text-gray-700">${t.example}</p>
      </div>
    </div>
  `).join('');
}

function getGlossaryBadgeClass(cat) {
  const map = {
    '基础概念': 'bg-blue-50 text-blue-600',
    '交易规则': 'bg-amber-50 text-amber-600',
    '技术指标': 'bg-purple-50 text-purple-600',
    '基金术语': 'bg-emerald-50 text-emerald-600',
    '风险相关': 'bg-red-50 text-red-600',
    '财务分析': 'bg-cyan-50 text-cyan-600'
  };
  return map[cat] || 'bg-gray-50 text-gray-600';
}

function doGlossarySearch() {
  renderGlossaryCards();
}
