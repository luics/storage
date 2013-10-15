/**
 * build-with-kissy
 * @author: daxingplay<daxingplay@gmail.com>
 * @date: 12-9-27
 * @requires: kissy 1.2+
 */
KISSY.add(function (S) {
    var D = S.DOM,
        E = S.Event,
        LOG_PRE = '[build-with-kissy] ';

    return {
        init:function () {
            S.log('this file will have kissy modules.');
        }
    }
}, {
    requires: [
        'dom',
        'event',
        './mods/mod1'
    ]
});