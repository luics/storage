/**
 * two-package-simple
 * @author: daxingplay<daxingplay@gmail.com>
 * @date: 12-9-27
 * @requires: kissy 1.2+
 */
KISSY.add(function (S) {
    var D = S.DOM,
        E = S.Event,
        LOG_PRE = '[two-package-simple] ';

    return {
        init:function () {
            S.log('将两个包的文件打包在一起');
        }
    }
}, {
    requires: [
        './mods/mod1',
        'package2/mods/mod1'
    ]
});