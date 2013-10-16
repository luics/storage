/**
 * 由数据代理调用
 * 
 * @author luics (鬼道)
 */
KISSY.add('gallery/storage/1.0/proxy', function(S, Event, JSON, XD, Storejs) {
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
    };

    return Proxy;
}, {
    requires: [
        'event',
        'json',
        './xd',
        './basic'
    ]
});