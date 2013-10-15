/**
 * circular-requires
 * @author: ×ÏÓ¢£¨daxingplay£©<daxingplay@gmail.com>
 * @date: 12-9-28
 * @requires: kissy 1.2+
 */
KISSY.add(function (S) {
    var D = S.DOM,
        E = S.Event,
        LOG_PRE = '[circular-requires] ';

    return {
        init:function () {
            S.log('depends on mod3.');
        }
    }
}, {
    requires: [
        './mods/mod3',
        './mods/mod4',
        './mods/mod5'
    ]
});