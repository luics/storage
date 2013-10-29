KISSY.use('ua, gallery/storage/1.1/index, mui/mallbar/store', function(S, UA, Storage, MuiStorage) {
    // 引入 MuiStorage，是为了验证与 Storage 不冲突
    module('gallery/storage/1.1/index');

    var storage = new Storage();
    var K11 = 'K11';
    var V11 = 'V11';
    var K12 = 'K12';
    var V12 = 'V12';

    test('load', function() {
        ok(typeof storage !== 'undefined');
    });

    test("set/get 基本功能", function() {
        var i = 0;

        stop();
        storage.set({k: K11, v: V11, success: function(data) {
            ++i;
            equal(data, V11);
            storage.get({k: K11, success: function(data) {
                ++i;
                equal(data, V11);
                i === 4 && start();
            }});
        }});

        MuiStorage.set({k: K12, v: V12, success: function(data) {
            ++i;
            equal(data, V12);
            MuiStorage.get({k: K12, success: function(data) {
                ++i;
                equal(data, V12);
                i === 4 && start();
            }});
        }});
    });
});

