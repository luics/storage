//cmd:tap
KISSY.config({
    "modules": {"kissy": {
        "path": "kissy-min.js"
    },
        "seed": {
            "path": "seed-min.js"
        },
        "mui/feedback": {
            "requires": [
                "dom",
                "event"
            ],
            "path": "mui/feedback/1.0.0/feedback.js"
        },
        "mui/backtop": {
            "requires": [
                "dom",
                "event"
            ],
            "path": "mui/backtop/1.0.0/backtop.js"
        },
        "mui/brandbar/brandbar.css": {
            "path": "mui/brandbar/1.0.0/brandbar.css"
        },
        "mui/brandbar": {
            "requires": [
                "dom",
                "event"
            ],
            "path": "mui/brandbar/1.0.0/brandbar.js"
        },
        "mui/brandbar/fly": {
            "requires": [
                "dom"
            ],
            "path": "mui/brandbar/1.0.0/fly.js"
        },
        "mui/wishlist": {
            "path": "mui/wishlist/1.0.0/wishlist.js"
        },
        "mui/tbuser": {
            "path": "mui/tbuser/1.0.0/tbuser.js"
        },
        "mui/zeroclipboard": {
            "path": "mui/zeroclipboard/1.0.0/zeroclipboard.js"
        },
        "mui/bottombar": {
            "path": "mui/bottombar/1.0.0/bottombar.js"
        },
        "mui/showbig/showbig.css": {
            "path": "mui/showbig/1.0.0/showbig.css"
        },
        "mui/showbig": {
            "path": "mui/showbig/1.0.0/showbig.js"
        },
        "mui/tobetmaller": {
            "path": "mui/tobetmaller/1.0.0/tobetmaller.js"
        },
        "mui/form/form.css": {
            "path": "mui/form/1.0.0/form.css"
        },
        "mui/store": {
            "requires": [
                "core"
            ],
            "path": "mui/store/1.0.0/store.js"
        },
        "mui/selectall": {
            "path": "mui/selectall/1.0.1/selectall.js"
        },
        "mui/minilogin": {
            "requires": [
                "mui/overlay/overlay.css"
            ],
            "path": "mui/minilogin/1.0.1/minilogin.js"
        },
        "mui/msg/msg.css": {
            "path": "mui/msg/1.0.0/msg.css"
        },
        "mui/qrcode/encode": {
            "path": "mui/qrcode/1.0.1/encode.js"
        },
        "mui/qrcode": {
            "requires": [
                "mui/qrcode/encode"
            ],
            "path": "mui/qrcode/1.0.1/index.js"
        },
        "mui/global": {
            "requires": [
                "mui/global/global.css"
            ],
            "path": "mui/global/1.0.5/global.js"
        },
        "mui/global/global.css": {
            "requires": [],
            "path": "mui/global/1.0.5/global.css"
        },
        "mui/global/tml": {
            "requires": [],
            "path": "mui/global/1.0.5/tml.js"
        },
        "mui/header": {
            "requires": [
                "mui/header/header.css"
            ],
            "path": "mui/header/1.0.4/header.js"
        },
        "mui/header/header.css": {
            "requires": [],
            "path": "mui/header/1.0.4/header.css"
        },
        "mui/header/responsive": {
            "requires": [
                "mui/header/responsive.css"
            ],
            "path": "mui/header/1.0.4/responsive.js"
        },
        "mui/header/responsive.css": {
            "requires": [],
            "path": "mui/header/1.0.4/responsive.css"
        },
        "mui/searchBar/tmallSearch": {
            "requires": [
                "suggest"
            ],
            "path": "mui/searchbar/1.0.1/tmall-search.js"
        },
        "mui/container/container.css": {
            "path": "mui/container/1.0.1/container.css"
        },
        "mui/hover/hover.css": {
            "path": "mui/hover/1.0.0/hover.css"
        },
        "mui/label/label.css": {
            "path": "mui/label/1.0.0/label.css"
        },
        "mui/loading/loading.css": {
            "path": "mui/loading/1.0.0/loading.css"
        },
        "mui/more/more.css": {
            "path": "mui/more/1.0.0/more.css"
        },
        "mui/price/price.css": {
            "path": "mui/price/1.0.0/price.css"
        },
        "mui/slide/slide.css": {
            "path": "mui/slide/1.0.0/slide.css"
        },
        "mui/step/step.css": {
            "path": "mui/step/1.0.0/step.css"
        },
        "mui/overlay/alert": {
            "requires": [
                "mui/overlay/dialog"
            ],
            "path": "mui/overlay/1.0.3/alert.js"
        },
        "mui/overlay/confirm": {
            "requires": [
                "mui/overlay/dialog"
            ],
            "path": "mui/overlay/1.0.3/confirm.js"
        },
        "mui/overlay/dialog": {
            "requires": [
                "overlay",
                "mui/overlay/overlay.css"
            ],
            "path": "mui/overlay/1.0.3/dialog.js"
        },
        "mui/overlay/overlay.css": {
            "path": "mui/overlay/1.0.3/overlay.css"
        },
        "mui/overlay": {
            "requires": [
                "mui/overlay/dialog",
                "mui/overlay/confirm",
                "mui/overlay/alert",
                "mui/overlay/prompt"
            ],
            "path": "mui/overlay/1.0.3/overlay.js"
        },
        "mui/overlay/prompt": {
            "requires": [
                "mui/overlay/dialog"
            ],
            "path": "mui/overlay/1.0.3/prompt.js"
        },
        "mui/overlay/tip/index.css": {
            "path": "mui/overlay/1.0.3/tip/index.css"
        },
        "mui/overlay/tip": {
            "requires": [
                "overlay",
                "mui/overlay/tip/index.css"
            ],
            "path": "mui/overlay/1.0.3/tip/index.js"
        },
        "mui/placeholder": {
            "requires": [
                "dom",
                "event"
            ],
            "path": "mui/placeholder/1.0.1/placeholder.js"
        },
        "mui/select": {
            "requires": [
                "mui/select/select",
                "mui/select/multiple",
                "mui/select/search"
            ],
            "path": "mui/select/1.0.1/index.js"
        },
        "mui/select/multiple": {
            "requires": [
                "mui/select/select"
            ],
            "path": "mui/select/1.0.1/multiple.js"
        },
        "mui/select/search": {
            "requires": [
                "mui/select/select"
            ],
            "path": "mui/select/1.0.1/search.js"
        },
        "mui/select/select.css": {
            "path": "mui/select/1.0.1/select.css"
        },
        "mui/select/select": {
            "requires": [
                "mui/store",
                "xtemplate",
                "core",
                "mui/select/select.css"
            ],
            "path": "mui/select/1.0.1/select.js"
        },
        "mui/uahelper": {
            "requires": [
                "event"
            ],
            "path": "mui/uahelper/1.0.0/uahelper.js"
        },
        "mui/button/btn-back.css": {
            "path": "mui/button/1.0.3/btn-back.css"
        },
        "mui/button/btn-buy.css": {
            "path": "mui/button/1.0.3/btn-buy.css"
        },
        "mui/button/btn-cart.css": {
            "path": "mui/button/1.0.3/btn-cart.css"
        },
        "mui/button/btn.css": {
            "path": "mui/button/1.0.3/btn.css"
        },
        "mui/button/btn-search.css": {
            "path": "mui/button/1.0.3/btn-search.css"
        },
        "mui/pagination": {
            "requires": [
                "template",
                "gallery/pagination/1.1/index"
            ],
            "path": "mui/pagination/1.0.8/pagination.js"
        },
        "mui/pagination/themes/back_big": {
            "path": "mui/pagination/1.0.8/themes/back_big.js"
        },
        "mui/pagination/themes/back_middle": {
            "path": "mui/pagination/1.0.8/themes/back_middle.js"
        },
        "mui/pagination/themes/back_min": {
            "path": "mui/pagination/1.0.8/themes/back_min.js"
        },
        "mui/pagination/themes/default.css": {
            "path": "mui/pagination/1.0.8/themes/default.css"
        },
        "mui/pagination/themes/default": {
            "path": "mui/pagination/1.0.8/themes/default.js"
        },
        "mui/pagination/themes/front.css": {
            "path": "mui/pagination/1.0.8/themes/front.css"
        },
        "mui/pagination/themes/front_big": {
            "path": "mui/pagination/1.0.8/themes/front_big.js"
        },
        "mui/address": {
            "requires": [
                "mui/address/tdist"
            ],
            "path": "mui/address/1.0.2/address.js"
        },
        "mui/address/datasec": {
            "requires": [],
            "path": "mui/address/1.0.2/datasec.js"
        },
        "mui/address/datatwo": {
            "requires": [],
            "path": "mui/address/1.0.2/datatwo.js"
        },
        "mui/address/data": {
            "requires": [],
            "path": "mui/address/1.0.2/data.js"
        },
        "mui/address/sec.css": {
            "path": "mui/address/1.0.2/sec.css"
        },
        "mui/address/sec": {
            "path": "mui/address/1.0.2/sec.js"
        },
        "mui/address/sup.css": {
            "path": "mui/address/1.0.2/sup.css"
        },
        "mui/address/sup": {
            "requires": [
                "event",
                "dom",
                "base",
                "template",
                "mui/address/sup.css"
            ],
            "path": "mui/address/1.0.2/sup.js"
        },
        "mui/address/tdist": {
            "path": "mui/address/1.0.2/tdist.js"
        },
        "mui/minicart": {
            "requires": [
                "dom",
                "event",
                "anim"
            ],
            "path": "mui/minicart/1.0.3/minicart.js"
        },
        "mui/minicart/fly": {
            "requires": [
                "dom",
                "anim"
            ],
            "path": "mui/minicart/1.0.3/fly.js"
        },
        "mui/minicart/model": {
            "requires": [
                "ajax",
                "base",
                "json"
            ],
            "path": "mui/minicart/1.0.3/model.js"
        },
        "mui/calendar/base": {
            "requires": [
                "core"
            ],
            "path": "mui/calendar/1.0.1/base.js"
        },
        "mui/calendar/calendar.css": {
            "path": "mui/calendar/1.0.1/calendar.css"
        },
        "mui/calendar": {
            "requires": [
                "calendar",
                "mui/calendar/base",
                "calendar/assets/dpl.css",
                "mui/calendar/calendar.css"
            ],
            "path": "mui/calendar/1.0.1/calendar.js"
        },
        "mui/calendar/jointcalendar": {
            "requires": [
                "mui/calendar/base",
                "mui/calendar"
            ],
            "path": "mui/calendar/1.0.1/jointcalendar.js"
        },
        "mui/trees/base": {
            "requires": [
                "mui/trees/store",
                "xtemplate",
                "core"
            ],
            "path": "mui/trees/1.0.5/base.js"
        },
        "mui/trees/city": {
            "requires": [
                "mui/trees/select"
            ],
            "path": "mui/trees/1.0.5/city.js"
        },
        "mui/trees": {
            "requires": [
                "mui/trees/store",
                "mui/trees/base",
                "mui/trees/tree",
                "mui/trees/viewstore",
                "mui/trees/view",
                "mui/trees/list",
                "mui/trees/select",
                "mui/trees/city",
                "mui/trees/searchselect"
            ],
            "path": "mui/trees/1.0.5/index.js"
        },
        "mui/trees/list.css": {
            "path": "mui/trees/1.0.5/list.css"
        },
        "mui/trees/list": {
            "requires": [
                "mui/trees/view",
                "mui/trees/list.css"
            ],
            "path": "mui/trees/1.0.5/list.js"
        },
        "mui/trees/searchselect.css": {
            "path": "mui/trees/1.0.5/searchselect.css"
        },
        "mui/trees/searchselect": {
            "requires": [
                "mui/trees/view",
                "mui/select/search",
                "mui/trees/searchselect.css"
            ],
            "path": "mui/trees/1.0.5/searchselect.js"
        },
        "mui/trees/select": {
            "requires": [
                "mui/trees/view"
            ],
            "path": "mui/trees/1.0.5/select.js"
        },
        "mui/trees/store": {
            "requires": [
                "core"
            ],
            "path": "mui/trees/1.0.5/store.js"
        },
        "mui/trees/tree.css": {
            "path": "mui/trees/1.0.5/tree.css"
        },
        "mui/trees/tree": {
            "requires": [
                "tree",
                "mui/trees/base",
                "mui/trees/tree.css"
            ],
            "path": "mui/trees/1.0.5/tree.js"
        },
        "mui/trees/view": {
            "requires": [
                "mui/trees/base",
                "mui/trees/viewstore"
            ],
            "path": "mui/trees/1.0.5/view.js"
        },
        "mui/trees/viewstore": {
            "requires": [
                "mui/trees/store"
            ],
            "path": "mui/trees/1.0.5/viewstore.js"
        },
        "mui/ipixel": {
            "requires": [
                "mui/ipixel"
            ],
            "path": "mui/fireworks/1.0.0/firemaker.js"
        },
        "mui/fireworks": {
            "path": "mui/fireworks/1.0.0/fireworks.js"
        },
        "mui/searchBar/cateSearch": {
            "requires": [
                "base",
                "node",
                "event",
                "dom"
            ],
            "path": "mui/searchbar/1.0.1/cate-search.js"
        },
        "mui/searchBar/quickSearch": {
            "requires": [
                "base",
                "node"
            ],
            "path": "mui/searchbar/1.0.1/quick-search.js"
        },
        "mui/searchBar": {
            "requires": [
                "tbc/search-suggest/1.0.5/",
                "tbc/search-suggest/1.0.5/plugin/history",
                "mui/searchBar/cateSearch",
                "tbc/search-suggest/1.0.5/new_suggest.css",
                "ajax"
            ],
            "path": "mui/searchbar/1.0.1/search-bar.js"
        },
        "mui/seed": {
            "path": "mui/seed/1.1.4/seed.js"
        },
        "mui/share/model": {
            "path": "share/1.0.1\\src\\model.js"
        },
        "mui/share": {
            "requires": [
                "mui/share/model",
                "mui/overlay",
                "mui/minilogin",
                "template",
                "mui/zeroclipboard",
                "mui/overlay/overlay.css",
                "mui/share/share.css"
            ],
            "path": "share/1.0.1\\src\\share.js"
        },
        "mui/share\\src\\share.css": {
            "path": "share/1.0.1\\src\\share.css"
        },
        "mui/mallbar/conf": {
            "path": "mui/mallbar/1.1.0/conf.js"
        },
        "mui/mallbar/item": {
            "requires": [
                "base",
                "event",
                "node",
                "anim",
                "mui/minilogin",
                "mui/mallbar/conf",
                "mui/mallbar/util",
                "mui/mallbar/store"
            ],
            "path": "mui/mallbar/1.1.0/mallbar-item.js"
        },
        "mui/mallbar/mallbar-skin.css": {
            "path": "mui/mallbar/1.1.0/mallbar-skin.css"
        },
        "mui/mallbar/mallbar-tab.css": {
            "path": "mui/mallbar/1.1.0/mallbar-tab.css"
        },
        "mui/mallbar": {
            "requires": [
                "base",
                "event",
                "node",
                "anim",
                "ua",
                "swf",
                "dom",
                "mui/mallbar/mallbar.css",
                "mui/mallbar/mallbar-tab.css",
                "mui/mallbar/conf",
                "mui/mallbar/util",
                "mui/mallbar/model",
                "mui/mallbar/item",
                "mui/mallbar/store",
                "mui/mallbar/plugin/prof",
                "mui/mallbar/plugin/asset",
                "mui/mallbar/plugin/brand",
                "mui/mallbar/plugin/live",
                "mui/mallbar/plugin/foot"
            ],
            "path": "mui/mallbar/1.1.0/mallbar.js"
        },
        "mui/mallbar/model": {
            "requires": [
                "base",
                "cookie",
                "mui/mallbar/conf",
                "mui/mallbar/util",
                "mui/mallbar/store"
            ],
            "path": "mui/mallbar/1.1.0/model.js"
        },
        "mui/mallbar/mallbar.css": {
            "path": "mui/mallbar/1.1.0/mallbar.css"
        },
        "mui/mallbar/plugin-asset.css": {
            "path": "mui/mallbar/1.1.0/plugin-asset.css"
        },
        "mui/mallbar/plugin/asset": {
            "requires": [
                "base",
                "node",
                "event",
                "mui/mallbar/conf",
                "mui/mallbar/util",
                "xtemplate",
                "mui/mallbar/store"
            ],
            "path": "mui/mallbar/1.1.0/plugin-asset.js"
        },
        "mui/mallbar/plugin-brand.css": {
            "path": "mui/mallbar/1.1.0/plugin-brand.css"
        },
        "mui/mallbar/plugin/brand": {
            "requires": [
                "base",
                "datalazyload",
                "xtemplate",
                "mui/mallbar/conf",
                "mui/mallbar/util",
                "mui/mallbar/store"
            ],
            "path": "mui/mallbar/1.1.0/plugin-brand.js"
        },
        "mui/mallbar/plugin/example": {
            "requires": [
                "base",
                "node",
                "event",
                "mui/mallbar/conf",
                "mui/mallbar/util"
            ],
            "path": "mui/mallbar/1.1.0/plugin-example.js"
        },
        "mui/mallbar/plugin-foot.css": {
            "path": "mui/mallbar/1.1.0/plugin-foot.css"
        },
        "mui/mallbar/plugin/foot": {
            "requires": [
                "base",
                "node",
                "ajax",
                "event",
                "anim",
                "ua",
                "mui/mallbar/conf",
                "mui/mallbar/util",
                "mui/mallbar/store"
            ],
            "path": "mui/mallbar/1.1.0/plugin-foot.js"
        },
        "mui/mallbar/plugin-live.css": {
            "path": "mui/mallbar/1.1.0/plugin-live.css"
        },
        "mui/mallbar/plugin/live": {
            "requires": [
                "base",
                "node",
                "event",
                "xtemplate",
                "ua",
                "mui/mallbar/conf",
                "mui/mallbar/util",
                "mui/mallbar/store"
            ],
            "path": "mui/mallbar/1.1.0/plugin-live.js"
        },
        "mui/mallbar/plugin-prof.css": {
            "path": "mui/mallbar/1.1.0/plugin-prof.css"
        },
        "mui/mallbar/plugin/prof": {
            "requires": [
                "base",
                "node",
                "event",
                "mui/mallbar/conf",
                "mui/mallbar/util",
                "mui/mallbar/store"
            ],
            "path": "mui/mallbar/1.1.0/plugin-prof.js"
        },
        "mui/mallbar/store/basic": {
            "requires": [
                "json"
            ],
            "path": "mui/mallbar/1.1.0/store-basic.js"
        },
        "mui/mallbar/store": {
            "requires": [
                "event",
                "json",
                "mui/mallbar/conf",
                "mui/mallbar/util",
                "mui/mallbar/xd"
            ],
            "path": "mui/mallbar/1.1.0/store.js"
        },
        "mui/mallbar/store/proxy": {
            "requires": [
                "event",
                "json",
                "mui/mallbar/xd",
                "mui/mallbar/store/basic"
            ],
            "path": "mui/mallbar/1.1.0/store-proxy.js"
        },
        "mui/mallbar/util": {
            "requires": [
                "cookie",
                "ajax",
                "event",
                "dom",
                "ua",
                "mui/mallbar/conf",
                "mui/minilogin"
            ],
            "path": "mui/mallbar/1.1.0/util.js"
        },
        "mui/mallbar/xd": {
            "requires": [
                "event",
                "json"
            ],
            "path": "mui/mallbar/1.1.0/xd.js"
        }
    },
    "packages": {
        "mui": {
            "path": "http://g.tbcdn.cn/mui/",
            "ignorePackageNameInUri": true,
            "debug": true
        }
    }
});