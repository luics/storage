KISSY.use('gallery/storage/1.1/basic', function(S, Store) {
    module('gallery/storage/1.1/basic');

    test('load', function() {
        ok(typeof Store !== 'undefined');
    });

    test("enabled", function() {
        equal(Store.enabled, true); // ie6?
    });

    test("set/get", function() {
        Store.set('a', 1);
        equal(Store.get('a'), 1);
        Store.set('a', '1');
        equal(Store.get('a'), 1);
//        Store.set('a', null);
//        equal(Store.get('a'), null);
        Store.set('a', {a: 1});
        deepEqual(Store.get('a'), {a: 1});
        Store.set('a', [1, 2]);
        deepEqual(Store.get('a'), [1, 2]);
        Store.set('a', null);
        deepEqual(Store.get('a'), null);
    });

    test("clear", function() {
        Store.set('a', 1);
        Store.clear();
        equal(Store.get('a'), undefined);
    });
});


// TODO 考虑到 ls 和 user data 均失效的情况
