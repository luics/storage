KISSY.use('gallery/storage/1.1/xd', function(S, XD) {
    module('gallery/storage/1.1/xd');

    test('load', function() {
        ok(typeof XD !== 'undefined');
    });

    var xd;
    var k1 = 'k1';

    test("simple", function() {
        stop();
        setTimeout(function() {
            var target = document.getElementById('J_Proxy').contentWindow;

            xd = new XD({
                target: target,
                receive: function(data) {
                    console.log(data);
                    equal(data.v, k1 + 'v');
                    start();
                }
            });
            xd.send({k: k1});

        }, 100);
    });

    test("timeout", function() {
        stop();
        setTimeout(function() {
            xd.set('timeout', true);
            xd.set('receive', function(data) {
                equal(data.v, undefined);
                start();
            });
            xd.send({k: k1});
        }, 500);
    });

    test("max length", function() {
        // TODO 传输上限
        expect(0);
    });
});

