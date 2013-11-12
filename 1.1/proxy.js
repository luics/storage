/**
 * 由数据代理调用
 *
 * @author luics (鬼道)
 */
KISSY.add('gallery/storage/1.1/proxy', function(S, Event, JSON, XD, Storejs, Conf, U) {
    var Proxy = {};
    var url = location.href;
    Proxy.init = function() {
        var xd = new XD({
            target: parent,
            token: url.indexOf('?') > -1 ? S.unparam(url.substring(url.indexOf('?') + 1))[Conf.XD_TOKEN] : '',
            receive: function(data) {
                var key = (data.p ? data.p + '/' : '/') + (data.k || '');
                var value = data.v || '';
                var method = data.m ? Storejs[data.m] : 0;

                if (method) {
                    var action = {};
                    action[Conf.UID_FROM] = data[Conf.UID_FROM] || 0;
                    action.c = data.c || '';
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