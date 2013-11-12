KISSY.use('gallery/storage/1.1/util', function(S, U) {
    module('gallery/storage/1.1/util');

    test('load', function() {
        ok(typeof U !== 'undefined');
    });

    test("getRndStr", function() {
        equal(U.getRndStr(), '');
        equal(U.getRndStr(null), '');
        equal(U.getRndStr(0), '');
        var r = U.getRndStr(32);
        U.log(r);
        equal(r.length, 32);

        for (var i = 0; i < 100; ++i) {
            var len = Math.floor(Math.random() * 1000);
            equal(U.getRndStr(len).length, len);
        }
    });
});