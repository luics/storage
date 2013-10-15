KISSY.use('ua, gallery/storage/1.0/index', function(S, UA, Storage) {
    module('gallery/storage/1.0/index');

    var K11 = 'K11';
    var V11 = 'V11';

    test('load', function() {
        ok(typeof Storage !== 'undefined');
    });

    function testCase(k, v, exp) {
        exp = typeof exp === 'undefined' ? v : exp;
        var eq = (typeof exp === 'object' ? deepEqual : equal);

        stop();
        Storage.set({k: k, v: v, success: function(data) {
            eq(data, exp);
            Storage.get({k: k, success: function(data) {
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
        Storage.remove({k: K11, success: function(data) {
            equal(data, undefined);
            Storage.get({k: K11, success: function(data) {
                equal(data, undefined);

                Storage.clear({success: function() {
                    Storage.get({k: K11, success: function(data) {
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

