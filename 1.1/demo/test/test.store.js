/**
 * 单元测试
 *
 * @author luics (鬼道)
 */

KISSY.use('ua, gallery/storage/1.0/index, gallery/storage/1.1/index, gallery/storage/1.1/conf', function(S, UA, Storage10, Storage, Conf) {
    module('gallery/storage/1.1/index');

    // 强制发送 log
    //Conf.SAM_PV = 1;
    var DEBUG = document.domain.indexOf('luics.com') > -1;
    var proxy = DEBUG
        ? 'http://luics.com/proj/storage/1.1/demo/test/assets/proxy-local.html'
        : '';
    var prefix = 'test/basic';

    var storage11 = new Storage({
        proxy: proxy,
        prefix: prefix
    });

    var K11 = 'K11';
    var V11 = 'V11';

    test('load', function() {
        ok(typeof storage11 !== 'undefined');
    });

    function testCase(k, v, exp, storage) {
        storage = storage || storage11;
        exp = typeof exp === 'undefined' ? v : exp;
        var eq = (typeof exp === 'object' ? deepEqual : equal);

        stop();
        storage.set({k: k, v: v, success: function(data) {
            eq(data, exp);
            storage.get({k: k, success: function(data) {
                eq(data, exp);
                start();
            }});
        }});
    }

    test("set/get basic", function() {
        testCase(K11, V11);
    });

    test("set/get data type", function() {
        var i = 0;
        testCase('kt' + i++, 1);
        testCase('kt' + i++, 0);
        testCase('kt' + i++, -1);
        testCase('kt' + i++, Number.MAX_VALUE);
        testCase('kt' + i++, Number.MIN_VALUE);
        testCase('kt' + i++, true);
        testCase('kt' + i++, false);
        testCase('kt' + i++, '');
        testCase('kt' + i++, '1');
        testCase('kt' + i++, []);
        testCase('kt' + i++, [1]);
        testCase('kt' + i++, [1, 2]);
        testCase('kt' + i++, {});
        testCase('kt' + i++, {a: [1], b: {c: 1}, d: 1});

        // 异常数据

        testCase('kt' + i++, null, '');
        testCase('kt' + i++, undefined, '');
    });

    test("multi instances", function() {
        for (var i = 0; i < 5; ++i) {
            var storage = new Storage({
                proxy: proxy,
                prefix: prefix
            });
            testCase('mik' + i, 'miv' + i, 'miv' + i, storage);
        }
    });

    if (location.href.indexOf('__testExp=1') > -1) {
        test("proxy exception", function() {
            var storage = new Storage({
                proxy: '/wrong-proxy-url-for-test',
                prefix: prefix
            });

            testCase('wrong-proxy', undefined, undefined, storage);
        });
    }

    test("multi versions", function() {
        var i = 0;
        var N = 4;

        var K10 = 'K10';
        var V10 = 'V10';
        var K11 = 'K11';
        var V11 = 'V11';

        stop();
        var storage10 = new Storage10();
        storage10.set({k: K10, v: V10, success: function(data) {
            ++i;
            equal(data, V10);
            storage10.get({k: K10, success: function(data) {
                ++i;
                equal(data, V10);
                i === N && start();
            }});
        }});

        storage11.set({k: K11, v: V11, success: function(data) {
            ++i;
            equal(data, V11);
            storage11.get({k: K11, success: function(data) {
                ++i;
                equal(data, V11);
                i === N && start();
            }});
        }});
    });

    test("remove/clear", function() {
        stop();
        storage11.remove({k: K11, success: function(data) {
            equal(data, undefined);
            storage11.get({k: K11, success: function(data) {
                equal(data, undefined);

                storage11.clear({success: function() {
                    storage11.get({k: K11, success: function(data) {
                        equal(data, undefined);
                        start();
                    }});
                }});

            }});
        }});
    });

    test("set/get 传输上限", function() {
        //TODO 
        expect(0);
    });

    test("对比 localStorage 读写速度", function() {
        //TODO 改进
        expect(0);
    });

});

