// External Resources Library (100+ links)
const resourceCategories = [
  {
    title: '监管机构',
    links: [
      { name: '中国证监会', url: 'http://www.csrc.gov.cn' },
      { name: '国家金融监督管理总局', url: 'http://www.cbirc.gov.cn' },
      { name: '中国人民银行', url: 'http://www.pbc.gov.cn' },
      { name: '国家外汇管理局', url: 'http://www.safe.gov.cn' },
      { name: '中国证券业协会', url: 'http://www.sac.net.cn' }
    ]
  },
  {
    title: '交易所',
    links: [
      { name: '上海证券交易所', url: 'http://www.sse.com.cn' },
      { name: '深圳证券交易所', url: 'http://www.szse.cn' },
      { name: '北京证券交易所', url: 'https://www.bse.cn' },
      { name: '香港交易所', url: 'https://www.hkex.com.hk' },
      { name: '中国金融期货交易所', url: 'http://www.cffex.com.cn' }
    ]
  },
  {
    title: '券商官网',
    links: [
      { name: '中信证券', url: 'https://www.cs.ecitic.com' },
      { name: '华泰证券', url: 'https://www.htsc.com.cn' },
      { name: '国泰君安', url: 'https://www.gtja.com' },
      { name: '招商证券', url: 'https://www.cmschina.com' },
      { name: '申万宏源', url: 'https://www.swhysc.com' },
      { name: '海通证券', url: 'https://www.htsec.com' },
      { name: '广发证券', url: 'https://www.gf.com.cn' },
      { name: '银河证券', url: 'https://www.chinastock.com.cn' },
      { name: '中信建投', url: 'https://www.csc108.com' },
      { name: '中金公司', url: 'https://www.cicc.com' },
      { name: '东方财富证券', url: 'https://www.eastmoney.com' },
      { name: '平安证券', url: 'https://stock.pingan.com' },
      { name: '兴业证券', url: 'https://www.xyzq.com.cn' },
      { name: '光大证券', url: 'https://www.ebscn.com' },
      { name: '安信证券', url: 'http://www.essence.com.cn' },
      { name: '国信证券', url: 'https://www.guosen.com.cn' },
      { name: '东方证券', url: 'https://www.dfzq.com.cn' },
      { name: '浙商证券', url: 'https://www.stocke.com.cn' },
      { name: '长江证券', url: 'https://www.95579.com' },
      { name: '方正证券', url: 'https://www.foundersc.com' }
    ]
  },
  {
    title: '财经资讯',
    links: [
      { name: '财联社', url: 'https://www.cls.cn' },
      { name: '华尔街见闻', url: 'https://wallstreetcn.com' },
      { name: '雪球', url: 'https://xueqiu.com' },
      { name: '东方财富网', url: 'https://www.eastmoney.com' },
      { name: '新浪财经', url: 'https://finance.sina.com.cn' },
      { name: '腾讯财经', url: 'https://finance.qq.com' },
      { name: '网易财经', url: 'https://money.163.com' },
      { name: '和讯网', url: 'https://www.hexun.com' },
      { name: '证券时报网', url: 'https://www.stcn.com' },
      { name: '经济观察网', url: 'https://www.eeo.com.cn' },
      { name: '第一财经', url: 'https://www.yicai.com' },
      { name: '界面新闻', url: 'https://www.jiemian.com' },
      { name: '澎湃新闻财经', url: 'https://www.thepaper.cn' },
      { name: 'FT中文网', url: 'https://www.ftchinese.com' },
      { name: 'Bloomberg中文', url: 'https://www.bloomberg.cn' },
      { name: '路透中文网', url: 'https://cn.reuters.com' },
      { name: '财新网', url: 'https://www.caixin.com' },
      { name: '21世纪经济报道', url: 'https://www.21jingji.com' },
      { name: '每日经济新闻', url: 'https://www.nbd.com.cn' },
      { name: '智通财经', url: 'https://www.zhitongcaijing.com' }
    ]
  },
  {
    title: '数据与工具',
    links: [
      { name: '同花顺', url: 'https://basic.10jqka.com.cn' },
      { name: '通达信', url: 'https://www.tdx.com.cn' },
      { name: 'Wind金融终端', url: 'https://www.wind.com.cn' },
      { name: '理杏仁', url: 'https://www.lixinger.com' },
      { name: '乌龟量化', url: 'https://wglh.com' },
      { name: 'Tushare', url: 'https://tushare.pro' },
      { name: 'AKShare', url: 'https://www.akshare.xyz' },
      { name: '集思录', url: 'https://www.jisilu.cn' },
      { name: '巨潮资讯网', url: 'http://www.cninfo.com.cn' },
      { name: '中证指数', url: 'https://www.csindex.com.cn' },
      { name: '中国结算', url: 'http://www.chinaclear.cn' },
      { name: '问财选股', url: 'https://www.iwencai.com' },
      { name: '爱问财', url: 'https://www.iwencai.com' },
      { name: '英为财情', url: 'https://cn.investing.com' },
      { name: 'Investing.com', url: 'https://cn.investing.com' },
      { name: 'TradingView', url: 'https://cn.tradingview.com' },
      { name: '东方财富研报中心', url: 'https://data.eastmoney.com/report' },
      { name: '萝卜投研', url: 'https://robo.datayes.com' },
      { name: '慧博投研', url: 'http://www.hibor.com.cn' },
      { name: 'RiceQuant', url: 'https://www.ricequant.com' },
      { name: '聚宽JoinQuant', url: 'https://www.joinquant.com' },
      { name: '优矿Uqer', url: 'https://uqer.io' },
      { name: '米筐Ricequant', url: 'https://www.ricequant.com' },
      { name: 'BigQuant', url: 'https://bigquant.com' },
      { name: '宽邦科技', url: 'https://www.kuanbangtech.com' },
      { name: 'CHOICE金融终端', url: 'https://choice.eastmoney.com' },
      { name: '雪球组合', url: 'https://xueqiu.com' },
      { name: '乐咕乐股', url: 'https://www.legulegu.com' },
      { name: '果仁网', url: 'https://guorn.com' },
      { name: '且慢估值', url: 'https://www.qieman.com/idx-eval' }
    ]
  },
  {
    title: '基金平台',
    links: [
      { name: '天天基金网', url: 'https://fund.eastmoney.com' },
      { name: '蚂蚁财富', url: 'https://www.antfortune.com' },
      { name: '且慢', url: 'https://www.qieman.com' },
      { name: '蛋卷基金', url: 'https://danjuanfunds.com' },
      { name: '盈米基金', url: 'https://www.yingmi.cn' },
      { name: '好买基金', url: 'https://www.howbuy.com' },
      { name: '晨星网', url: 'https://www.morningstar.cn' },
      { name: '中证指数', url: 'https://www.csindex.com.cn' },
      { name: '韭圈儿', url: 'https://www.jiucaishuo.com' },
      { name: '基金豆', url: 'https://www.jijindou.com' },
      { name: '支付宝理财', url: 'https://www.alipay.com' },
      { name: '招商银行App', url: 'https://www.cmbchina.com' },
      { name: '南方基金', url: 'https://www.nffund.com' },
      { name: '易方达基金', url: 'https://www.efunds.com.cn' },
      { name: '华夏基金', url: 'https://www.chinaamc.com' },
      { name: '广发基金', url: 'https://www.gffunds.com.cn' },
      { name: '富国基金', url: 'https://www.fullgoal.com.cn' },
      { name: '嘉实基金', url: 'https://www.jsfund.cn' }
    ]
  },
  {
    title: '投研社区',
    links: [
      { name: '雪球', url: 'https://xueqiu.com' },
      { name: '集思录', url: 'https://www.jisilu.cn' },
      { name: '韭圈儿', url: 'https://www.jiucaishuo.com' },
      { name: '陶县', url: 'https://www.taoguba.com.cn' },
      { name: '经管之家', url: 'https://bbs.pinggu.org' },
      { name: '人大经济论坛', url: 'https://bbs.pinggu.org' },
      { name: '知乎财经', url: 'https://www.zhihu.com/topic/19550228' },
      { name: '微博股票', url: 'https://finance.weibo.com' },
      { name: '今日头条财经', url: 'https://www.toutiao.com' },
      { name: '格隆汇', url: 'https://www.gelonghui.com' },
      { name: '汇通网', url: 'https://www.fx678.com' },
      { name: '花旗银行研究', url: 'https://www.citibank.com.cn' },
      { name: '摩根士丹利研究', url: 'https://www.morganstanleychina.com' },
      { name: '高盛中国', url: 'https://www.goldmansachs.com' },
      { name: '桥水中国', url: 'https://www.bridgewater.cn' }
    ]
  },
  {
    title: '学习资源',
    links: [
      { name: '中国证券业协会培训', url: 'https://px.sac.net.cn' },
      { name: '上交所投教', url: 'http://edu.sse.com.cn' },
      { name: '深交所投教', url: 'http://investor.szse.cn' },
      { name: '资本市场学院', url: 'http://www.ccmi.edu.cn' },
      { name: '网易云课堂', url: 'https://study.163.com' },
      { name: '腾讯课堂', url: 'https://ke.qq.com' },
      { name: 'B站财经', url: 'https://www.bilibili.com' },
      { name: 'Coursera金融课', url: 'https://www.coursera.org' },
      { name: '可汗学院', url: 'https://zh.khanacademy.org' },
      { name: 'Investopedia中文版', url: 'https://www.investopedia.com' },
      { name: 'MBA智库', url: 'https://wiki.mbalib.com' },
      { name: '智库百科', url: 'https://wiki.mbalib.com' },
      { name: '世界经理人', url: 'http://www.ceconline.com' },
      { name: '哈佛商业评论中文', url: 'https://www.hbrchina.org' },
      { name: '财新通', url: 'https://www.caixin.com' }
    ]
  },
  {
    title: '上市公司',
    links: [
      { name: '巨潮资讯网', url: 'http://www.cninfo.com.cn' },
      { name: '上交所公告', url: 'http://www.sse.com.cn/disclosure/listedinfo/announcement' },
      { name: '深交所公告', url: 'http://www.szse.cn/disclosure/listed/notice' },
      { name: '北交所公告', url: 'https://www.bse.cn/disclosure/disciplinary_ann.html' },
      { name: '披露易(港股)', url: 'https://www.hkexnews.hk' },
      { name: '荣大二郎神', url: 'https://www.rongdashen.com' },
      { name: '见微数据', url: 'https://www.jianweidata.com' },
      { name: '企查查', url: 'https://www.qcc.com' },
      { name: '天眼查', url: 'https://www.tianyancha.com' },
      { name: '国家企业信用信息公示', url: 'http://www.gsxt.gov.cn' }
    ]
  },
  {
    title: '宏观经济',
    links: [
      { name: '国家统计局', url: 'http://www.stats.gov.cn' },
      { name: '中国人民银行数据', url: 'http://www.pbc.gov.cn/diaochatongjisi' },
      { name: '财政部', url: 'http://www.mof.gov.cn' },
      { name: '海关总署', url: 'http://www.customs.gov.cn' },
      { name: '世界银行中国', url: 'https://data.worldbank.org/country/CN' },
      { name: 'IMF数据', url: 'https://data.imf.org' },
      { name: 'OECD数据', url: 'https://data.oecd.org' },
      { name: 'CEIC中国数据库', url: 'https://www.ceicdata.com/zh-hans' },
      { name: '万得宏观', url: 'https://www.wind.com.cn' },
      { name: '生意社', url: 'https://www.100ppi.com' }
    ]
  },
  {
    title: '期货与衍生品',
    links: [
      { name: '上海期货交易所', url: 'http://www.shfe.com.cn' },
      { name: '大连商品交易所', url: 'http://www.dce.com.cn' },
      { name: '郑州商品交易所', url: 'http://www.czce.com.cn' },
      { name: '广州期货交易所', url: 'http://www.gfex.com.cn' },
      { name: '中国金融期货交易所', url: 'http://www.cffex.com.cn' },
      { name: '上海能源交易所', url: 'http://www.ine.cn' },
      { name: '期货保证金监控中心', url: 'http://www.cfmmc.com' },
      { name: '文华财经', url: 'https://www.wenhua.com.cn' },
      { name: '博易大师', url: 'https://www.boyinews.com' },
      { name: '期权世界', url: 'https://www.optionworld.com.cn' }
    ]
  },
  {
    title: '债券与固收',
    links: [
      { name: '中国债券信息网', url: 'https://www.chinabond.com.cn' },
      { name: '上海清算所', url: 'http://www.shclearing.com' },
      { name: '银行间市场交易商协会', url: 'http://www.nafmii.org.cn' },
      { name: '国债收益率曲线', url: 'https://yield.chinabond.com.cn' },
      { name: '企业预警通', url: 'https://www.qyyjt.com' },
      { name: 'DM查债通', url: 'https://www.dmzhai.com' },
      { name: '招商固收研究', url: 'https://www.cmschina.com/research' },
      { name: '中金固收', url: 'https://www.cicc.com/research' }
    ]
  },
  {
    title: '国际财经',
    links: [
      { name: 'Bloomberg', url: 'https://www.bloomberg.com' },
      { name: 'Reuters', url: 'https://www.reuters.com' },
      { name: 'CNBC', url: 'https://www.cnbc.com' },
      { name: 'Financial Times', url: 'https://www.ft.com' },
      { name: 'MarketWatch', url: 'https://www.marketwatch.com' },
      { name: 'Yahoo Finance', url: 'https://finance.yahoo.com' },
      { name: 'Seeking Alpha', url: 'https://seekingalpha.com' },
      { name: 'The Economist', url: 'https://www.economist.com' },
      { name: '华尔街日报', url: 'https://cn.wsj.com' },
      { name: '美股之家', url: 'https://www.usstock.com' }
    ]
  }
];

function renderResources() {
  const container = document.getElementById('resources-grid');
  if (!container) return;
  container.innerHTML = resourceCategories.map(cat => `
    <div class="bg-white rounded-xl shadow border border-border p-4">
      <h3 class="font-bold mb-3 flex items-center gap-2">
        <span class="w-1.5 h-5 bg-primary rounded-full"></span>${cat.title}
      </h3>
      <div class="space-y-2">
        ${cat.links.map(link => `
          <a href="${link.url}" target="_blank" class="resource-link flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 text-sm group"
             data-url="${link.url}"
          >
            <span class="text-gray-700 group-hover:text-primary">${link.name}</span>
            <span class="status-dot w-2 h-2 rounded-full bg-gray-300"></span>
          </a>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Manual link check button (previously auto-fired 20+ HEAD requests on load)
  const checkBtn = document.createElement('button');
  checkBtn.className = 'mb-6 px-4 py-2 text-sm btn-gradient text-white rounded-xl shadow hover:shadow-lg transition';
  checkBtn.textContent = '检查链接可用性';
  checkBtn.addEventListener('click', () => {
    checkBtn.disabled = true;
    checkBtn.textContent = '检查中...';
    document.querySelectorAll('.resource-link').forEach(a => {
      checkLinkStatus(a.getAttribute('data-url'), a.querySelector('.status-dot'));
    });
    setTimeout(() => {
      checkBtn.disabled = false;
      checkBtn.textContent = '检查链接可用性';
    }, 3000);
  });
  container.prepend(checkBtn);
}

function checkLinkStatus(url, dot) {
  // Use fetch HEAD with no-cors as a best-effort signal; most sites will either succeed or timeout.
  // We mark as green if fetch doesn't immediately error, otherwise gray (unknown) rather than red,
  // because CORS often blocks the check itself.
  fetch(url, { method: 'HEAD', mode: 'no-cors', cache: 'no-store' })
    .then(() => {
      dot.classList.remove('bg-gray-300');
      dot.classList.add('bg-green-500');
      dot.title = '链接可访问';
    })
    .catch(() => {
      dot.classList.remove('bg-gray-300');
      dot.classList.add('bg-amber-400');
      dot.title = '状态未知（可能受跨域限制）';
    });
}
