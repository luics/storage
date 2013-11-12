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
    'json',
    './conf',
    './util'
]});
	