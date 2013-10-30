/**
 * Util library
 * 工具库
 *
 * @author luics (鬼道)
 * @date 2013-07-25
 */

KISSY.add('gallery/storage/1.1/util', function(S, Conf) {

    var Seed = {
        /**
         * 封装 window.console.log 开关控制 log 是否打印
         */
        log: function() {
            if (!Conf.DEBUG_LOG) {
                return;
            }

            // var con = window.console; 赋值有风险？
            // 遇到过 var $ = document.querySelectorAll, 之后$为undefined $()
            // CASE IE 9, 遇到了 apply  undefined 问题
            if (window.console && window.console.log && window.console.log.apply) {
                window.console.log.apply(window.console, arguments);
            }
        },
        /**
         * 字符串格式化
         *
         * Usage：
         *   fm('{0}-{1}', 1, '2') // 结果：1-2
         *   fm('{0}-{1}-{0}', 1, '2') // 结果：1-2-1
         *
         * @returns {string}
         */
        fm: function() {
            if (arguments.length == 0) {
                return '';
            }
            else if (arguments.length == 1) {
                return arguments[0];
            }

            var res = arguments[0], i;
            for (i = 1; i < arguments.length; ++i) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'g');
                res = res.replace(re, arguments[i]);
            }
            // TODO 性能优化版本
            return res;
        }
    };

    var U = Seed;

    /**
     * 黄金令箭埋点
     */
    U.sendLog = function(url) {
        U.send(U.fm(Conf.M.G, encodeURIComponent(location.href)));
        U.send(url);
    };

    /**
     * 黄金令箭埋点
     */
    U.send = function(url) {
        if (!url) {
            return;
        }
        var id = "__st_" + (+new Date) + Math.random();
        var img = new Image();
        window[id] = img;
        img.src = U.fm('{0}{1}r{2}=1', url, (url.indexOf('?') > -1 ? '&' : '?'), +new Date);
        img.onload = function() {
            window[id] = null;
        }
    };

    // end  
    return U;
}, {requires: [
    './conf'
]});
