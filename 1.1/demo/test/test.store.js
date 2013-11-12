/**
 * 单元测试
 *
 * @author luics (鬼道)
 */

KISSY.use('ua, gallery/storage/1.1/index, gallery/storage/1.1/conf', function(S, UA, Storage, Conf) {
    module('gallery/storage/1.1/index');

    // 强制发送 log
    Conf.SAM_PV = 1;

    var storage = new Storage({
        //proxy: 'http://luics.com/proj/storage/1.1/demo/test/assets/proxy-local.html',
        prefix: 'test/basic'
    });


    storage = new Storage();
    console.log(storage);
//    var storage = new Storage({proxy:'tmall'});
//    var storage = new Storage({proxy:'taobao'});
//    var storage = new Storage({proxy:'common'});
//    var storage = new Storage({proxy: 'http://a.tbcdn.cn/s/kissy/gallery/storage/1.0/proxy.html' });

    var K11 = 'K11';
    var V11 = 'V11';

    test('load', function() {
        ok(typeof storage !== 'undefined');
    });

    function testCase(k, v, exp) {
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

    test("set/get 基本功能", function() {
        testCase(K11, V11);
    });

    test("set/get 数据类型", function() {
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

    test("remove/clear", function() {
        stop();
        storage.remove({k: K11, success: function(data) {
            equal(data, undefined);
            storage.get({k: K11, success: function(data) {
                equal(data, undefined);

                storage.clear({success: function() {
                    storage.get({k: K11, success: function(data) {
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

