/**
 * init for package 2. This package is UTF-8 encoded.
 * @author: daxingplay<daxingplay@gmail.com>
 * @date: 12-9-26
 * @requires: kissy 1.2+
 */
KISSY.add(function (S) {
    var D = S.DOM,
        E = S.Event,
        LOG_PRE = '[init] ';

    return {
        init:function () {
            S.log('这个文件是UTF-8编码的。This file is UTF-8 encoded.');
        }
    }
}, {
    'requires': [
        './mods/mod1',
        './mods/mod2'
    ]
});