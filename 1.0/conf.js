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
        DEBUG: DEBUG,
        DEBUG_LOG: DEBUG_LOG,
        // 日常环境判断，安全可靠
        IS_DAILY: isDaily,
        // 其他配置
        SAM_PV: 1 / 1000,
        //SAM_PV: 1,
        COMMON_DELAY: 100,
        TIMEOUT_STORAGE: 3 * 1000,
        AR: arr,
        //STORAGE_PROXY: 'http://www.tmall.com/go/act/storage-proxy.php',
        STORAGE_PROXY: 'http://g.tbcdn.cn/kissy/gallery/storage/1.0/proxy.html',
        //STORAGE_PROXY: '../tests/assets/iframe.html',
        DOMAIN: isDaily ? '.tmall.net' : '.tmall.com',
        ARR: {
            ST_SET: arr + '/tmallbrand.999.5',
            ST_GET: arr + '/tmallbrand.999.6',
            ST_RM: arr + '/tmallbrand.999.7',
            ST_CL: arr + '/tmallbrand.999.8'
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

