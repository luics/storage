/*
combined files : 

gallery/storage/1.0/conf
gallery/storage/1.0/util
gallery/storage/1.0/xd
gallery/storage/1.0/index

*/
/**
 * 工具栏配置文件
 *
 * @author luics (guidao)
 * @date 2013-07-25
 */
//CASE js编码应该utf8
KISSY.add('gallery/storage/1.0/conf',function(S) {

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


/**
 * Util library
 * 工具库
 *
 * @author luics (guidao)
 * @date 2013-07-25
 */

KISSY.add('gallery/storage/1.0/util',function(S, Conf) {

    var Seed = {
        /**
         * 封装 window.console.log 开关控制 log 是否打印
         */
        log: function() {
            if (!Conf.DEBUG_LOG) {
                return;
            }

            // var con = window.console; 赋值有风险？
            // 遇到过 var $ = document.querySelectorAll, 之后$为undefined $()
            // CASE IE 9, 遇到了 apply  undefined 问题
            if (window.console && window.console.log && window.console.log.apply) {
                window.console.log.apply(window.console, arguments);
            }
        },
        /**
         * 字符串格式化
         *
         * Usage：
         *   fm('{0}-{1}', 1, '2') // 结果：1-2
         *   fm('{0}-{1}-{0}', 1, '2') // 结果：1-2-1
         *
         * @returns {string}
         */
        fm: function() {
            if (arguments.length == 0) {
                return '';
            }
            else if (arguments.length == 1) {
                return arguments[0];
            }

            var res = arguments[0], i;
            for (i = 1; i < arguments.length; ++i) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'g');
                res = res.replace(re, arguments[i]);
            }
            // TODO 性能优化版本
            return res;
        }
    };

    var U = Seed;

    /**
     * 黄金令箭埋点
     */
    U.sendLog = function(url) {
        if (!url) {
            return;
        }
        var img = new Image();
        img.src = url;
    };

    // end  
    return U;
}, {requires: [
    './conf'
]});

/**
 * iframe 跨域通信
 * 基于 postMessage + window.name (IE 6、7)
 *
 * 注：这份代码的分割不同于工具栏其他代码，请不要奇怪，是为双十一之后快速迁移做准备
 *
 * @version 2.0
 * @date: 2013-09-11
 * @author: moming 1.0
 * @author: guidao 2.0
 *   0. IE6、7
 *     0. postMessage 封装
 *     0. IE6、7 实现队列机制，防止告诉通信的数据丢失问题
 *   0. 消息
 *     0. 扩展消息格式
 *     0. 传递 JSON 数据
 *     0. 消息校验机制
 *   0. 封装 XD 类，
 *   0. TODO 支持单页多实例，目前看比较困难，需要实现握手，暂无时间实现
 *   
 *   TODO 如何移除 
 */
KISSY.add('gallery/storage/1.0/xd', function(S, Event, JSON) {
    var guid = 0;
    var UID_FROM = '__ga_xd_from';
    var UID_TO = '__ga_xd_to';

    var RECEIVE = 'receive';
    var TARGET = 'target';
    var TIMEOUT = 'timeout';
    var IFRAME_TIMEOUT = 'iframeTimeout';
    var INV_ON_MESSAGE = 10;
    var INV_SEND = 10;
    var TMO_SEND = 3000;

    var win = window;
    var postMessage = win.postMessage;
    var timeoutList = {};
    var xdList = [];

    function init() {
        if (postMessage) {
            Event.on(win, 'message', messageHandler);
        }
        else {
            IE.onMessage(messageHandler);
        }
    }

    /**
     * IE 6、7 下封装类 postMessage 行为
     * window.name 监听方式
     */
    var IE = {
        /**
         * Unique Id
         */
        uid: 0,
        /**
         * Head Id 当前已处理到的 Id
         */
        hid: -1,
        /**
         * 发送消息队列
         * 过高频率消耗性能，过低频率出现覆盖的情况上升，后续考虑队列机制彻底解决该问题
         */
        q: [],
        /**
         * 发送消息队列定时器
         */
        tm: 0,
        /**
         * 发送跨域消息
         * @param {Object} target iframe.contentWindow|parent
         * @param {String} jsonStr
         * @param {String} origin TODO 暂未实现
         */
        postMessage: function(target, jsonStr, origin) {
            var uid = ++IE.uid;
            var q = IE.q;
            var item = {
                name: (+new Date) + '' + uid + '^' + document.domain + '&' + jsonStr,
                uid: uid,
                target: target
            };
            q.push(item);

            //alert('XD.IE.postMessage' + '||' + document.domain + '||q.length=' + q.length + '||hid=' + IE.hid + '||uid=' + uid + '||tm=' + IE.tm);

            if (!IE.tm) {
                IE.tm = setInterval(function() {
                    var q = IE.q;
                    //alert('XD.IE.postMessage inv1' + '||' + document.domain + '||q.length=' + q.length + '||hid=' + IE.hid + '||uid=' + (q.length > 0 ? q[0].uid : -1) + '||tm=' + IE.tm);

                    if (q.length === 0 || q[0].uid <= IE.hid) {
                        return;
                    }

                    var item = q[0];
                    //alert('XD.IE.postMessage inv2' + '||' + document.domain + '||q.length=' + q.length + '||hid=' + IE.hid + '||uid=' + uid + '||tm=' + IE.tm);

                    IE.hid = item.uid;
                    item.target.name = item.name;
                }, INV_SEND);
            }
        },
        /**
         * window.name 监听方式
         * @param {Function} handler
         */
        onMessage: function(handler) {

            var lastName = '';
            var reName = /^(\d+?)\^(.+?)&(.*?)$/;

            function onNameChanged() {
                var name = win.name; //=window.name
                //如果和上次不一样，则获取新数据

                if (name !== lastName) {
                    // 出队列，

                    IE.q.shift();
                    //alert('onNameChanged||' + document.domain + '||' + name);

                    lastName = name;
                    var ms = reName.exec(name);
                    if (!ms) {
                        return;
                    }
                    //alert(ms.length + '|' + name);

                    /**
                     * 模拟 postMessage event 参数
                     */
                    var ev = {
                        origin: ms[2],
                        data: ms[3]
                    };
                    handler && handler(ev);
                }
            }

            setInterval(onNameChanged, INV_ON_MESSAGE);
        }
    };

    /**
     * 消息监听函数
     * @param {Object} ev 监听到的数据对象
     */
    function messageHandler(ev) {
        var data = {};

        try {
            data = JSON.parse(ev.data);
        }
        catch (e) {
            // 不满足格式的数据不考虑继续

            return;
        }

        // TODO 安全考虑 if(ev.origin == 'http://www.tmall.com'){}

        // 消息格式校验 + 多 xd 实例共存

        if (!(UID_FROM in data) || !(UID_TO in data)) {
            return;
        }
        //alert('messageHandler||' + document.domain + '||' + ev.data + '||');

        var uid = data[UID_TO];
        if (uid) {
            var timer = timeoutList[uid];
            // timer 被消费掉，说明已经超时了

            clearTimeout(timer);
            timeoutList[uid] = 0;
            if (!timer) {
                return;
            }
        }

        S.each(xdList, function(xd) {
            xd.get(RECEIVE)(data);
        });
    }

    init();

    /**
     * Cross Domain
     * @constructor
     * @param {Object} opt
     * @param {Object} opt.target 发送消息的对象 iframe.contentWindow|parent
     * @param {Function} opt.receive 接收跨域消息
     * @param {boolean} [opt.timeout] iframe 加载超时，之后回调将直接做 faked 响应
     */
    var xdInstance = 0;

    function XD(opt) {
        var me = this;
        if (++xdInstance > 1) {
            throw 'XD is singleton';
        }

        me._opt = opt;
        me.init();
    }

    S.augment(XD, {
        init: function() {
            var me = this;
            xdList.push(me);
        },
        /**
         * 发送跨域消息
         * @param {Object} action
         * @param {String} [origin]
         */
        send: function(action, origin) {
            if (!S.isObject(action)) {
                return;
            }

            var me = this;
            var target = me.get(TARGET);
            var timeout = me.get(TIMEOUT) || TMO_SEND;
            var uid = ++guid;

            origin = origin || '*';

            // 首次消息可能为空
            
            action[UID_TO] = action[UID_FROM] || 0;
            action[UID_FROM] = uid;
            var jsonStr = JSON.stringify(action);
            //alert('send||' + document.domain + '||' + jsonStr + '||');

            function fakedResponse() {
                var ev = {};
                ev.origin = '*';
                var data = {};
                data.c = action.c || '';
                data[UID_FROM] = 0;
                data[UID_TO] = 0;
                ev.data = JSON.stringify(data);
                //alert('fakedResponse, send||' + document.domain + '||' + JSON.stringify(ev) + '||');

                messageHandler(ev);
            }

            timeoutList[uid] = setTimeout(function() {
                timeoutList[uid] = 0;
                fakedResponse();
            }, timeout);

            if (me.get(IFRAME_TIMEOUT)) {
                // 支持iframe 级别的超时

                fakedResponse();
            }
            else {
                if (postMessage) {
                    // @see http://dev.w3.org/html5/postmsg/#dom-window-postmessage

                    target.postMessage(jsonStr, origin);
                }
                else {
                    IE.postMessage(target, jsonStr, origin);
                }

            }
        },
        get: function(k) {
            return this._opt[k];
        },
        set: function(k, v) {
            this._opt[k] = v;
        }
    });

    return XD;
}, {requires: [
    'event',
    'json'
]});
	
/**
 * 通用数据存储方案
 * CASE 超时做的处理不同于 KISSY.IO，异常情况下同样触发 success，data 为 undefined
 * TODO 使用 appcache 提升 proxy 加载性能，考虑升级等
 *
 * @see 整体方案设计 http://work.tmall.net/projects/tbar/wiki/Storage
 * @see postMessage https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage
 * @see js onload http://www.planabc.net/2008/10/31/javascript_ready_onload/
 */
KISSY.add('gallery/storage/1.0/index',function(S, Event, JSON, Conf, U, XD) {
    var defOpt = {};
    var guid = 0;

    /**
     * Storage Class
     * @constructor
     * @param {Object} opt
     * @param {Object} opt.proxy
     * @param {number} [opt.iframeTimeout]
     * @param {number} [opt.xdTimeout]
     */
    var Storage = function(opt) {
        var me = this;
        me._opt = S.merge(defOpt, opt);
        me.init();
    };

    S.augment(Storage, {
        init: function() {
            var me = this;
            me.setConf(Conf.K.CALLBACK_LIST, {});
            me.setConf(Conf.K.CACHED_ACTION_LIST, []);
            me.setConf(Conf.K.PROXY_READY, false);

            var iframe = document.createElement('iframe');
            var style = iframe.style;
            // 非常神奇，为何 ie 6-10，chrome firefox safari 都 ok

            style.display = "none";
            //style.position = "absolute";
            //style.visibility = "hidden";
            //style.width = "1px";
            //style.height = "1px";
            //style.left = "-1000px";
            //me.setConf(Conf.K.IFRAME, iframe);
            var iframeTimer = -1;

            function initXd(iframeTimeout) {
                me.setConf(Conf.K.PROXY_READY, true);

                var xd = new XD({
                    target: iframe.contentWindow,
                    iframeTimeout: iframeTimeout,
                    timeout: me.getConf(Conf.K.XD_TIMEOUT),
                    receive: function(data) {
                        //U.log('host', JSON.stringify(data));

                        var callbackList = me.getConf(Conf.K.CALLBACK_LIST);
                        var callback = callbackList[data.c];
                        if (callback) {
                            callback(data.v);
                            // 移除已执行的回调

                            try {
                                delete callbackList[data.c];
                            } catch (e) {
                            }
                        }
                    }
                });
                me.setConf(Conf.K.XD, xd);

                var cachedActionList = me.getConf(Conf.K.CACHED_ACTION_LIST);
                //U.log('proxy iframe onload', cachedActionList);

                S.each(cachedActionList, function(action) {
                    xd.send(action, '*');
                });
                me.setConf(Conf.K.CACHED_ACTION_LIST, []);
            }

            iframeTimer = setTimeout(function() {
                iframeTimer = 0;
                initXd(true);
            }, me.getConf(Conf.K.IFRAME_TIMEOUT) || Conf.TIMEOUT_STORAGE);

            function onload(ev) {
                U.log('storage proxy loaded');
                // TODO 预留的时间供 KISSY.use，不够可靠，还是得通过 onhashchange 处理

                clearTimeout(iframeTimer);
                if (!iframeTimer) {
                    return;
                }

                setTimeout(function() {
                    initXd(false);
                }, 100);
            }

            // @see iframe onload http://www.planabc.net/2009/09/22/iframe_onload/

            iframe.src = me.getConf(Conf.K.PROXY);
            if (iframe.attachEvent) {
                iframe.attachEvent('onload', onload);
            }
            else {
                iframe.onload = onload;
            }
            document.body.appendChild(iframe);
        },
        /**
         * 向数据代理发送消息
         * @private
         * @param {Object} action
         * @param {Object} [action.m] method
         * @param {Object} [action.k] key
         * @param {Object} [action.v] value
         * @param {Function} [action.success] success callback
         * @param {Function} [action.error] error callback
         */
        send: function(action) {
            //U.log('store send', JSON.stringify(action));

            var me = this;
            var callbackList = me.getConf(Conf.K.CALLBACK_LIST);
            var cachedActionList = me.getConf(Conf.K.CACHED_ACTION_LIST);
            var proxyReady = me.getConf(Conf.K.PROXY_READY);

            action.p = 'mui/mallbar';
            if (S.isFunction(action.success)) {
                var token = 'token' + (++guid);
                action.c = token;
                callbackList[token] = action.success;
                try {
                    delete action.success;
                } catch (e) {
                }
            }

            if (!proxyReady) {
                cachedActionList.push(action);
                return;
            }

            var xd = me.getConf(Conf.K.XD);
            xd && xd.send(action);
        },
        /**
         * @param {Object} opt
         * @param {String} opt.k
         * @param {Function} opt.callback
         */
        get: function(opt) {
            opt = opt || {};
            opt.m = 'get';
            this.send(opt);
            Math.random() < Conf.SAM_PV && U.sendLog(Conf.ARR.ST_GET);
        },
        /**
         * @param {Object} opt
         * @param {String} opt.k
         * @param {String} opt.v
         * @param {Function} [opt.callback]
         */
        set: function(opt) {
            opt = opt || {};
            opt.m = 'set';
            this.send(opt);
            Math.random() < Conf.SAM_PV && U.sendLog(Conf.ARR.ST_SET);
        },
        /**
         * @param {Object} opt
         * @param {String} opt.k
         * @param {Function} [opt.callback]
         */
        remove: function(opt) {
            opt = opt || {};
            opt.m = 'remove';
            this.send(opt);
            Math.random() < Conf.SAM_PV && U.sendLog(Conf.ARR.ST_RM);
        },
        /**
         * @param {Object} [opt]
         * @param {Function} [opt.callback]
         */
        clear: function(opt) {
            opt = opt || {};
            opt.m = 'clear';
            this.send(opt);
            Math.random() < Conf.SAM_PV && U.sendLog(Conf.ARR.ST_CL);
        },
        getConf: function(k) {
            return this._opt[k];
        },
        setConf: function(k, v) {
            this._opt[k] = v;
        }
    });

    return new Storage({
        proxy: Conf.STORAGE_PROXY
    });

    // CASE 这么写，不方便生成文档 
    /*S.each(['get', 'set', 'remove', 'clear'], function(method) {
     methods[method] = function(opt) {};
     });*/
}, {
    requires: [
        'event',
        'json',
        './conf',
        './util',
        './xd'
    ]
});
