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
KISSY.add(function(S, Event, JSON, Conf, U, XD) {
    if (window.__KS_STORAGE) {
        return window.__KS_STORAGE;
    }

    var defOpt = {

    };
    var guid = 0;
    var instance = 0;

    /**
     * Storage Class
     * @constructor
     * @param {Object} [opt]
     * @param {Object} [opt.proxy]
     * @param {Object} [opt.onload]
     * @param {number} [opt.iframeTimeout]
     * @param {number} [opt.xdTimeout]
     */
    var Storage = function(opt) {
        if (++instance > 1) {
            //throw 'storage is a singleton';
            return;
        }

        var me = this;
        opt = opt || {};
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
        opt.proxy = proxy;

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

    /*var storage = new Storage({
     proxy: Conf.STORAGE_PROXY
     });*/

    window.__KS_STORAGE = Storage;

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