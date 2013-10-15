/**
 * mod5
 * @author: ×ÏÓ¢£¨daxingplay£©<daxingplay@gmail.com>
 * @date: 12-9-28
 * @requires: kissy 1.2+
 */
KISSY.add(function (S) {
    var D = S.DOM,
        E = S.Event,
        LOG_PRE = '[mod5] ';

    return {
        init:function () {
            S.log(LOG_PRE + 'this depends on main init file? how disgusting.');
        }
    }
}, {
    requires: [
        '../circular-requires'
    ]
});