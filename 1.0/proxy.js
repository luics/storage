/**
 * 由数据代理调用
 * @author guidao
 */
KISSY.add('gallery/storage/1.0/proxy', function(S, Event, JSON, XD, Storejs) {
    var UID_FROM = '__xd_from';
    var UID_TO = '__xd_to';
    var Proxy = {};
    Proxy.init = function() {
        var xd = new XD({
            target: parent,
            receive: function(data) {
                //alert('proxy||' + typeof data + '||' + JSON.stringify(data));

                var key = (data.p ? data.p + '/' : '/') + (data.k || '');
                var value = data.v || '';
                var method = data.m ? Storejs[data.m] : 0;


                if (method) {
                    var action = {};
                    action.c = data.c || '';
                    action[UID_FROM] = data[UID_FROM] || 0;
                    action.v = method(key, value);
                    //alert('proxy' + '||' + key + '||' + value + '||' + JSON.stringify(result) + '||' + method);

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