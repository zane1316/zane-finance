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
  { term: '净利润增长率', pinyin: 'jinglirunzengzhang', category: '财务分析', definition: '本期净利润相对上期的增长百分比，反映盈利能力提升速度。', example: '净利润增速高于营收增速说明盈利能力在改善。' }
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
