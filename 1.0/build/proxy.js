/*
combined files : 

gallery/storage/1.0/xd
gallery/storage/1.0/basic
gallery/storage/1.0/conf
gallery/storage/1.0/util
gallery/storage/1.0/proxy

*/
/**
 * iframe 跨域通信
 * 基于 postMessage + window.name (IE 6、7)
 *
 * 注：这份代码的分割不同于工具栏其他代码，请不要奇怪，是为双十一之后快速迁移做准备
 *
 * @version 2.0
 * @date: 2013-09-11
 * @author: moming 1.0
 * @author luics (鬼道) 2.0
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
 * 由数据代理调用
 *
 * @author luics (鬼道)
 */

;
/**
 * 封装 store.js
 * @see https://github.com/marcuswestin/store.js
 */
KISSY.add('gallery/storage/1.0/basic', function(S, JSON) {
    // 考虑到 ls 和 user data 均失效的情况
    window.JSON = window.JSON || JSON;

    (function(win) {
        var store = {},
            doc = win.document,
            localStorageName = 'localStorage',
            namespace = '__storejs__',
            storage

        store.disabled = false
        store.set = function(key, value) {
        }
        store.get = function(key) {
        }
        store.remove = function(key) {
        }
        store.clear = function() {
        }
        store.transact = function(key, defaultVal, transactionFn) {
            var val = store.get(key)
            if (transactionFn == null) {
                transactionFn = defaultVal
                defaultVal = null
            }
            if (typeof val == 'undefined') {
                val = defaultVal || {}
            }
            transactionFn(val)
            store.set(key, val)
        }
        store.getAll = function() {
        }

        store.serialize = function(value) {
            return JSON.stringify(value)
        }
        store.deserialize = function(value) {
            if (typeof value != 'string') {
                return undefined
            }
            try {
                return JSON.parse(value)
            }
            catch (e) {
                return value || undefined
            }
        }

        // Functions to encapsulate questionable FireFox 3.6.13 behavior
        // when about.config::dom.storage.enabled === false
        // See https://github.com/marcuswestin/store.js/issues#issue/13
        function isLocalStorageNameSupported() {
            try {
                return (localStorageName in win && win[localStorageName])
            }
            catch (err) {
                return false
            }
        }

        if (isLocalStorageNameSupported()) {
            storage = win[localStorageName]
            store.set = function(key, val) {
                if (val === undefined) {
                    return store.remove(key)
                }
                storage.setItem(key, store.serialize(val))
                return val
            }
            store.get = function(key) {
                return store.deserialize(storage.getItem(key))
            }
            store.remove = function(key) {
                storage.removeItem(key)
            }
            store.clear = function() {
                storage.clear()
            }
            store.getAll = function() {
                var ret = {}
                for (var i = 0; i < storage.length; ++i) {
                    var key = storage.key(i)
                    ret[key] = store.get(key)
                }
                return ret
            }
        }
        else if (doc.documentElement.addBehavior) {
            var storageOwner,
                storageContainer
            // Since #userData storage applies only to specific paths, we need to
            // somehow link our data to a specific path.  We choose /favicon.ico
            // as a pretty safe option, since all browsers already make a request to
            // this URL anyway and being a 404 will not hurt us here.  We wrap an
            // iframe pointing to the favicon in an ActiveXObject(htmlfile) object
            // (see: http://msdn.microsoft.com/en-us/library/aa752574(v=VS.85).aspx)
            // since the iframe access rules appear to allow direct access and
            // manipulation of the document element, even for a 404 page.  This
            // document can be used instead of the current document (which would
            // have been limited to the current path) to perform #userData storage.
            try {
                storageContainer = new ActiveXObject('htmlfile')
                storageContainer.open()
                storageContainer.write('<s' + 'cript>document.w=window</s' + 'cript><iframe src="/favicon.ico"></iframe>')
                storageContainer.close()
                storageOwner = storageContainer.w.frames[0].document
                storage = storageOwner.createElement('div')
            } catch (e) {
                // somehow ActiveXObject instantiation failed (perhaps some special
                // security settings or otherwse), fall back to per-path storage
                storage = doc.createElement('div')
                storageOwner = doc.body
            }
            function withIEStorage(storeFunction) {
                return function() {
                    // FIXED why? unshift load 均报过错

                    try {
                        var args = Array.prototype.slice.call(arguments, 0)
                        args.unshift(storage)
                        // See http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
                        // and http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
                        storageOwner.appendChild(storage)
                        storage.addBehavior('#default#userData')
                        storage.load(localStorageName)
                        var result = storeFunction.apply(store, args)
                        storageOwner.removeChild(storage)
                        return result
                    } catch (e) {
                    }
                }
            }

            // In IE7, keys may not contain special chars. See all of https://github.com/marcuswestin/store.js/issues/40
            var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")

            function ieKeyFix(key) {
                return key.replace(forbiddenCharsRegex, '___')
            }

            store.set = withIEStorage(function(storage, key, val) {
                key = ieKeyFix(key)
                if (val === undefined) {
                    return store.remove(key)
                }
                storage.setAttribute(key, store.serialize(val))
                storage.save(localStorageName)
                return val
            })
            store.get = withIEStorage(function(storage, key) {
                key = ieKeyFix(key)
                return store.deserialize(storage.getAttribute(key))
            })
            store.remove = withIEStorage(function(storage, key) {
                key = ieKeyFix(key)
                storage.removeAttribute(key)
                storage.save(localStorageName)
            })
            store.clear = withIEStorage(function(storage) {
                var attributes = storage.XMLDocument.documentElement.attributes
                try {
                    storage.load(localStorageName)
                } catch (e) {
                }
                for (var i = 0, attr; attr = attributes[i]; i++) {
                    storage.removeAttribute(attr.name)
                }
                storage.save(localStorageName)
            })
            store.getAll = withIEStorage(function(storage) {
                var attributes = storage.XMLDocument.documentElement.attributes
                var ret = {}
                for (var i = 0, attr; attr = attributes[i]; ++i) {
                    var key = ieKeyFix(attr.name)
                    ret[attr.name] = store.deserialize(storage.getAttribute(key))
                }
                return ret
            })
        }

        //alert(namespace + '-' + store.get(namespace));
        try {
            store.set(namespace, namespace)
            //alert(namespace + '-' + store.get(namespace));
            if (store.get(namespace) != namespace) {
                store.disabled = true
            }
            store.remove(namespace)
        } catch (e) {
            store.disabled = true
        }
        store.enabled = !store.disabled
        if (typeof module != 'undefined' && module.exports) {
            module.exports = store
        }
        else if (typeof define === 'function' && define.amd) {
            define(store)
        }
        else {
            win.__storejs = store
        }
    })(window);

    return window.__storejs;
}, {
    requires: ['json']
});

/**
 * 工具栏配置文件
 *
 * @author luics (鬼道)
 * @date 2013-07-25
 */
//CASE js编码应该utf8
KISSY.add('gallery/storage/1.0/conf', function(S) {

    /**
     * CASE 不能使用 ks-debug，巨大的坑，多谢 @游侠 提醒
     */
    var DEBUG = location.href.indexOf('if-debug=1') > -1;
    var DEBUG_LOG = location.href.indexOf('if-debug-log=1') > -1;
    var arr = 'http://gm.mmstat.com'; // log.mmstat.com
    var MINER = 'http://log.mmstat.com/ued.1.1.2?type=9&_gm:id=storage&v=1.0';

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
        PROXY: 'http://www.tmall.com/go/act/stp-ga-1_0.php',
        PROXY_TMALL: 'http://www.tmall.com/go/act/stp-ga-1_0.php',
        PROXY_TAOBAO: 'http://www.tmall.com/go/act/stp-ga-1_0.php',
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
            // Store
            IFRAME: 'iframe',
            ONLOAD: 'onload',
            XD: 'xd',
            TOKEN: 'token',
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
 * @author luics (鬼道)
 * @date 2013-07-25
 */

KISSY.add('gallery/storage/1.0/util', function(S, Conf) {

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

    // end  
    return U;
}, {requires: [
    './conf'
]});

/**
 * 由数据代理调用
 *
 * @author luics (鬼道)
 */
KISSY.add('gallery/storage/1.0/proxy', function(S, Event, JSON, XD, Storejs, Conf, U) {
    var UID_FROM = '__ga_xd_from';
    var UID_TO = '__ga_xd_to';
    var Proxy = {};
    Proxy.init = function() {
        var xd = new XD({
            target: parent,
            receive: function(data) {
                var key = (data.p ? data.p + '/' : '/') + (data.k || '');
                var value = data.v || '';
                var method = data.m ? Storejs[data.m] : 0;


                if (method) {
                    var action = {};
                    action.c = data.c || '';
                    action[UID_FROM] = data[UID_FROM] || 0;
                    action.v = method(key, value);

                    xd.send(action);
                }
            }
        });

        Math.random() < Conf.SAM_PV && U.send(U.fm(Conf.M.P, encodeURIComponent(location.href)));
    };

    return Proxy;
}, {
    requires: [
        'event',
        'json',
        './xd',
        './basic',
        './conf',
        './util'
    ]
});
