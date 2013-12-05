/*
combined files : 

gallery/storage/1.1/conf
gallery/storage/1.1/util
gallery/storage/1.1/xd
gallery/storage/1.1/index

*/
/**
 * 工具栏配置文件
 *
 * @author luics (鬼道)
 * @date 2013-07-25
 */
//CASE js编码应该utf8
KISSY.add('gallery/storage/1.1/conf', function() {
    /**
     * CASE 不能使用 ks-debug，巨大的坑，多谢 @游侠 提醒
     */
    var DEBUG = location.href.indexOf('if-debug=1') > -1;
    var DEBUG_LOG = location.href.indexOf('if-debug-log=1') > -1;
    var arr = 'http://gm.mmstat.com'; // log.mmstat.com
    var MINER = 'http://log.mmstat.com/ued.1.1.2?type=9&_gm:id=storage&v=1.1';

    /**
     * 需要 Conf 的理由：
     * 1. 全局防止命名冲突
     * 2. 集中管理事件、状态值，便于形成文档，方便多人维护
     */
    var Conf = {
        DEBUG: DEBUG,
        DEBUG_LOG: DEBUG_LOG,
        // 其他配置
        SAM_PV: 1 / 1000,
        TIMEOUT_STORAGE: 3 * 1000,
        PROXY: 'http://www.tmall.com/go/act/stp-tm.php',
        PROXY_TMALL: 'http://www.tmall.com/go/act/stp-tm.php',
        PROXY_TAOBAO: 'http://www.taobao.com/go/act/stp-tb.php',
        // 用于标识 xd 实例
        XD_TOKEN: '__ga_xd_token',
        // UIDs 保存本次通信双方的 id
        UID_FROM: '__ga_xd_from11', // 区别于1.0，避免干扰到1.0
        UID_TO: '__ga_xd_to11',
        M: {
            G: MINER + '&t=g',
            P: MINER + '&t=p'
        },
        ARR: {// 黄金令箭埋点
            ST_SET: arr + '/tmallbrand.999.5',
            ST_GET: arr + '/tmallbrand.999.6',
            ST_RM: arr + '/tmallbrand.999.7',
            ST_CL: arr + '/tmallbrand.999.8'
        },
        K: {// Key
            // param
            ONLOAD: 'onload',
            PROXY: 'proxy',
            PREFIX: 'prefix',
            XD_TIMEOUT: 'xdTimeout',
            IFRAME_TIMEOUT: 'iframeTimeout',
            // other
            IFRAME: 'iframe',
            TOKEN: 'token',
            XD: 'xd',
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
 * @author luics (鬼道)
 * @date 2013-07-25
 */

KISSY.add('gallery/storage/1.1/util', function(S, Conf) {

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
        U.send(U.fm(Conf.M.G, encodeURIComponent(location.href)));
        U.send(url);
    };

    /**
     * 黄金令箭埋点
     * @param {string} url
     */
    U.send = function(url) {
        if (!url) {
            return;
        }
        var id = "__st_" + (+new Date) + Math.random();
        var img = new Image();
        window[id] = img;
        img.src = U.fm('{0}{1}r{2}=1', url, (url.indexOf('?') > -1 ? '&' : '?'), +new Date);
        img.onload = function() {
            window[id] = null;
        }
    };

    var RND = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    /**
     * 获取随机字符串
     * @param {number} length 串长度
     */
    U.getRndStr = function(length) {
        var rnd = [];
        var len = RND.length, r;
        for (var i = 0; i < length; ++i) {
            r = RND.charAt(Math.floor(Math.random() * len));
            rnd.push(r);
        }
        return rnd.join('');
    };

    // end  
    return U;
}, {requires: [
    './conf'
]});

/**
 * iframe 跨域通信 for storage
 * 基于 postMessage + window.name (IE 6、7)
 * @author moming (墨冥) 1.0
 * @author luics (鬼道) 2.0
 * @version 2.0
 * @date 2013-09-11
 * 
 *   0. IE6、7
 *     0. postMessage 封装
 *     0. IE6、7 实现队列机制，防止告诉通信的数据丢失问题
 *   0. 消息
 *     0. 扩展消息格式
 *     0. 传递 JSON 数据
 *     0. 消息校验机制
 *   0. 封装 XD 类，
 *   0. 支持多实例, 通过双方一致 token 实现
 *      * 是否考虑握手交换 token？暂时无需求
 *
 */
KISSY.add('gallery/storage/1.1/xd', function(S, Event, JSON, Conf, U) {
    var guid = 0;

    var RECEIVE = 'receive';
    var TOKEN = 'token';
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
            if (win.addEventListener) {
                addEventListener('message', messageHandler, false);
            }
            else if (win.attachEvent) {//ie8
                attachEvent('onmessage', messageHandler);
            }

            // BUG https://github.com/kissyteam/kissy/issues/515
            // Event.on(win, 'message', messageHandler);
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

            //U.log('XD.IE.postMessage' + '||' + document.domain + '||q.length=' + q.length + '||hid=' + IE.hid + '||uid=' + uid + '||tm=' + IE.tm);

            if (!IE.tm) {
                IE.tm = setInterval(function() {
                    var q = IE.q;
                    if (q.length === 0 || q[0].uid <= IE.hid) {
                        return;
                    }

                    var item = q[0];
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

                    lastName = name;
                    var ms = reName.exec(name);
                    if (!ms) {
                        return;
                    }

                    /**
                     * 模拟 postMessage event 参数
                     * @type {Object}
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
        //U.log(document.domain, 'messageHandler', ev.data, ev);

        var data = {};
        try {
            data = JSON.parse(ev.data);
        }
        catch (e) {
            return;
        }

        // TODO 安全考虑 if(ev.origin == 'http://www.tmall.com'){}

        var token = data[Conf.XD_TOKEN];
        S.each(xdList, function(xd) {
            //支持多实例共存，消息格式校验

            if (token === xd.get(TOKEN)
                && (Conf.UID_FROM in data)
                && (Conf.UID_TO in data)
                ) {
                var uid = data[Conf.UID_TO];
                if (uid) {
                    var timer = timeoutList[uid];
                    // timer 被消费掉，说明已经超时了，此时不需要再回调

                    clearTimeout(timer);
                    timeoutList[uid] = 0;
                    if (!timer) {
                        return;
                    }
                }

                xd.get(RECEIVE)(data);
            }
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
    function XD(opt) {
        var me = this;
        me._opt = opt;
        xdList.push(me);
    }

    S.augment(XD, {
        /**
         * 发送跨域消息
         * @param {Object} action
         * @param {String} [origin]
         * @param {boolean} [noResponse] 避免无需响应时产生多余的 timeout
         */
        send: function(action, origin, noResponse) {
            if (!S.isObject(action)) {
                return;
            }

            var me = this;
            var target = me.get(TARGET);
            var timeout = me.get(TIMEOUT) || TMO_SEND;
            var uid = ++guid;

            origin = origin || '*';

            // 首次消息可能为空

            action[Conf.XD_TOKEN] = me.get(TOKEN);
            action[Conf.UID_TO] = action[Conf.UID_FROM] || 0;
            action[Conf.UID_FROM] = uid;
            var jsonStr = JSON.stringify(action);

            function fakedResponse() {
                var ev = {};
                ev.origin = '*';
                var data = {};
                data.c = action.c || '';
                data[Conf.XD_TOKEN] = action[Conf.XD_TOKEN] || '';
                data[Conf.UID_FROM] = 0;
                data[Conf.UID_TO] = 0;
                ev.data = JSON.stringify(data);
                messageHandler(ev);
            }

            if (!noResponse) {
                timeoutList[uid] = setTimeout(function() {
                    //U.log(document.domain, 'timeout', uid);
                    timeoutList[uid] = 0;
                    fakedResponse();
                }, timeout);
            }

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
    'json',
    './conf',
    './util'
]});
	
/**
 * 通用数据存储方案
 *
 * @author luics (鬼道)
 *
 * CASE 超时做的处理不同于 KISSY.IO，异常情况下同样触发 success，data 为 undefined
 * TODO 使用 appcache 提升 proxy 加载性能，考虑升级等
 *
 * @see 整体方案设计 http://work.tmall.net/projects/tbar/wiki/Storage
 * @see postMessage https://developer.mozilla.org/en-US/docs/Web/API/window.postMessage
 * @see js onload http://www.planabc.net/2008/10/31/javascript_ready_onload/
 */
KISSY.add('gallery/storage/1.1/index', function(S, Event, JSON, Conf, U, XD) {
    if (window.__KS_STORAGE11) {
        return window.__KS_STORAGE11;
    }

    var defOpt = {};
    var guid = 0;

    /**
     * Storage Class
     * @constructor
     * @param {Object} [opt]
     * @param {Object} [opt.proxy] 代理页，`common`|`tmall`|`taobao`|`{自定义地址}`
     * @param {Object} [opt.onload] 代理页加载成功时的回调
     * @param {Object} [opt.prefix] 数据存储 key 的前缀
     * @param {number} [opt.iframeTimeout]
     * @param {number} [opt.xdTimeout]
     */
    var Storage = function(opt) {
        var me = this;
        opt = opt || {};
        opt.token = +new Date + U.getRndStr(8);
        var proxy = opt.proxy || Conf.PROXY;
        switch (proxy) {
            case 'tmall':
                proxy = Conf.PROXY_TMALL;
                break;
            case 'taobao':
                proxy = Conf.PROXY_TAOBAO;
                break;
            case 'common':
                proxy = Conf.PROXY;
                break;
        }
        proxy = U.fm('{0}{1}{2}={3}', proxy, proxy.indexOf('?') > -1 ? '&' : '?', Conf.XD_TOKEN, opt.token);
        opt.proxy = proxy;
        opt.prefix = opt.prefix || '';

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
            // 非常神奇，为何 ie 6-10，chrome firefox safari 都 ok?

            style.display = "none";
            var iframeTimer = -1;

            function initXd(iframeTimeout) {
                me.setConf(Conf.K.PROXY_READY, true);

                var xd = new XD({
                    target: iframe.contentWindow,
                    token: me.getConf(Conf.K.TOKEN),
                    iframeTimeout: iframeTimeout,
                    timeout: me.getConf(Conf.K.XD_TIMEOUT),
                    receive: function(data) {
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

                var onloadCb = me.getConf(Conf.K.ONLOAD);
                onloadCb && onloadCb();
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
                }, 600);
            }

            // @see iframe onload http://www.planabc.net/2009/09/22/iframe_onload/
            // TODO src 赋值为什么不在绑定事件之后？

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
            var prefix = me.getConf(Conf.K.PREFIX);

            action.p = prefix;
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

    /*var storage = new Storage({
     proxy: Conf.STORAGE_PROXY
     });*/

    window.__KS_STORAGE11 = Storage;

    return Storage;
}, {
    requires: [
        'event',
        'json',
        './conf',
        './util',
        './xd'
    ]
});
