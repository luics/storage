/**
 * 工具栏配置文件
 *
 * @author luics (guidao)
 * @date 2013-07-25
 */
//CASE js编码应该utf8
KISSY.add(function(S) {

    /**
     * CASE 不能使用 ks-debug，巨大的坑，多谢 @游侠 提醒
     */
    var DEBUG = location.href.indexOf('mbar-debug=1') > -1;
    var DEBUG_LOG = location.href.indexOf('mbar-debug-log=1') > -1;

    var TB = window.TB;
    var isDaily = TB && TB.globalToolFn && S.isFunction(TB.globalToolFn.isDaily)
        // 有通用吊顶的页面下，且引入了global.js
        ? TB.globalToolFn.isDaily()
        // 保留这个兼容判断，这里的判断可以严格为 endsWith
        : ((location.hostname.indexOf('.net') >= 0) || (location.hostname.indexOf('.com.hk') >= 0));

    var arr = 'http://gm.mmstat.com'; // log.mmstat.com

    /**
     * 需要 Conf 的理由：
     * 1. 全局防止命名冲突
     * 2. 集中管理事件、状态值，便于形成文档，方便多人维护
     */
    var Conf = {
        VER: '1.1.0',
        DEBUG: DEBUG,
        DEBUG_LOG: DEBUG_LOG,
        // 日常环境判断，安全可靠
        IS_DAILY: isDaily,
        // 其他配置
        SKIN: 'mui-mbar-d11',
        TAB_W: 50,
        ZINDEX: 999999,
        SAMPLING: 5 / 1000, // @承泽 已确认
        SAM_PV: 1 / 1000,
        //SAM_PV: 1,
        EASE: 'easeOut',
        BUBBLE_PAD: 5,
        COMMON_DELAY: 100,
        TIMEOUT_TOP: 5 * 1000, // CASE 和 @令申 确认服务器响应极限情况在 1s 以内，这里留有余地
        TIMEOUT_STORAGE: 3 * 1000,
        DEGRADE: -99,
        BUBBLE_HIDE_DELAY: 6 * 1000,
        AVATAR: isDaily
            ? 'http://wsapi.jianghu.daily.taobao.net/avatar/getAvatar.do?userId={0}&width={1}&height={1}&type=ww'
            : 'http://wwc.taobaocdn.com/avatar/getAvatar.do?userId={0}&width={1}&height={1}&type=sns',
        CAT: 'http://img04.taobaocdn.com/tps/i4/T1VaaiFdpdXXXtxVjX.swf',
        AR: arr,
        CK_USED: '_mr',
        NO_IMG: 'http://img01.taobaocdn.com/tps/i1/T1aYCaFaVcXXX6DYsb-100-100.gif',
        //STORAGE_PROXY: 'http://www.tmall.com/go/act/storage-proxy.php',
        STORAGE_PROXY: 'http://g.tbcdn.cn/kissy/gallery/storage/1.0/proxy.html',
        //STORAGE_PROXY: '../tests/assets/iframe.html',
        DOMAIN: isDaily ? '.tmall.net' : '.tmall.com',
        ARR: {
            // 框架
            // S12 代表 第1态->第2态 
            S12: arr + '/tmallbrand.99.1',
            S21: arr + '/tmallbrand.99.2',
            S32: arr + '/tmallbrand.99.9',
            // 个人信息
            PROF_BUB_SHOW: arr + '/tmallbrand.99.19',
            PROF_BUB_CLICK: arr + '/tmallbrand.99.20',
            PROF_BUB_LINK_CLICK: arr + '/tmallbrand.99.21',
            // 资产
            COUPON_AVAILABLE_SHOW: arr + '/tmallbrand.99.7',
            COUPON_AVAILABLE_CLICK: arr + '/tmallbrand.99.10',
            COUPON_7_SHOW: arr + '/tmallbrand.99.13',
            COUPON_1_SHOW: arr + '/tmallbrand.99.14',
            COUPON_7_CLICK: arr + '/tmallbrand.99.15',
            COUPON_1_CLICK: arr + '/tmallbrand.99.16',
            COUPON_FLY_BUB_SHOW: arr + '/tmallbrand.99.26',
            COUPON_FLY_BUB_CLICK: arr + '/tmallbrand.99.27',
            BONUS_FLY_BUB_SHOW: arr + '/tmallbrand.99.28',
            BONUS_FLY_BUB_CLICK: arr + '/tmallbrand.99.29',
            BONUS_AVAILABLE_BUB_SHOW: arr + '/tmallbrand.99.30',
            BONUS_AVAILABLE_BUB_CLICK: arr + '/tmallbrand.99.31',
            // 品牌
            BRAND_FLY_BUB_SHOW: arr + '/tmallbrand.99.23',
            BRAND_FLY_BUB_CLICK: arr + '/tmallbrand.99.24',
            BRAND_FLY_BUB_LINK_CLICK: arr + '/tmallbrand.99.25',
            // 直播
            LIVE_SHOW: arr + '/tmallbrand.99.8',
            LIVE_CLICK: arr + '/tmallbrand.99.11',
            LIVE_BUB_LINK_CLICK: arr + '/tmallbrand.99.22',
            // 足迹
            FOOT_BUBBLE: arr + '/tmallbrand.99.17',  //足迹冒气泡
            FOOT_BUBBLE_CLICK: arr + '/tmallbrand.99.18',  //足迹冒气泡被点击
            FOOT_FLY_BUB_SHOW: arr + '/tmallbrand.99.32',  //钉住后气泡提醒（展现）
            FOOT_FLY_BUB_CLICK: arr + '/tmallbrand.99.33',
            FOOT_PIN_ITEM: arr + '/tmallbrand.99.40',  //钉住
            FOOT_DELETE_ITEM: arr + '/tmallbrand.99.41',  //删除历史记录
            FOOT_CLEAR_HISTORY: arr + '/tmallbrand.99.42',  //清空历史记录
            FOOT_UNPIN_ITEM: arr + '/tmallbrand.99.43',  //解钉

            // 实验
            // 单个数据 < 1000w
            PV: arr + '/tmallbrand.999.1', // 总 pv，采样率 Conf.SAM_PV
            LOGIN1: arr + '/tmallbrand.999.2', // 吊顶接口
            LOGIN2: arr + '/tmallbrand.999.3', // 后端传回
            RETINA: arr + '/tmallbrand.999.4',
            ST_SET: arr + '/tmallbrand.999.5',
            ST_GET: arr + '/tmallbrand.999.6',
            ST_RM: arr + '/tmallbrand.999.7',
            ST_CL: arr + '/tmallbrand.999.8',
            FOOT_MORE_CLICK: arr + '/tmallbrand.999.9',
            EXP1: arr + '/tmallbrand.999.11', // 监控问题区间
            EXP2: arr + '/tmallbrand.999.12',
            EXP3: arr + '/tmallbrand.999.13',
            TIME1s: arr + '/tmallbrand.999.14',
            TIME1m: arr + '/tmallbrand.999.15',
            TIME1h: arr + '/tmallbrand.999.16',
            TIME1d: arr + '/tmallbrand.999.17',
            // @see 暂时没找到合适的检测方法
            // http://oldj.net/article/browser-history-sniffing/
            // http://stackoverflow.com/questions/2909367/can-you-determine-if-chrome-is-in-incognito-mode-via-a-script/2909398#2909398
            INCOGNITO: arr + '/tmallbrand.999.18',
            CLEAR: arr + '/tmallbrand.999.19',
            EXP7: arr + '/tmallbrand.999.20'
        },
        K: {// Key
            // Store
            IFRAME: 'iframe',
            XD: 'xd',
            XD_TIMEOUT: 'xdTimeout',
            IFRAME_TIMEOUT: 'iframeTimeout',
            PROXY: 'proxy',
            CALLBACK_LIST: 'callbackList',
            CACHED_ACTION_LIST: 'cachedActionList',
            PROXY_READY: 'proxyReady'
        }
    };

    return Conf;
});

