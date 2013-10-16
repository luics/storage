## 综述

storage 是跨终端、跨域的存储组件：

0. 兼容 IE 6+；Chrome、Firefox、Safari
0. 不使用 Flash 方案，完美支持移动浏览器
0. 跨子域、主域的数据存取，且不会改写 document.domain
0. 支持 Object、Array 等复杂对象存取
0. 每天亿级pv的考验，稳定可靠

更多信息

* [Demo](http://gallery.kissyui.com/storage/1.0/demo/index.html)
* [技术方案详解](https://github.com/luics/storage/wiki/Storage)
* 作者：鬼道

## 组件使用

```javascript
KISSY.config({
    packages:[
        {
            name:"gallery",
            path:"http://a.tbcdn.cn/s/kissy/",
            charset:"utf-8"
        }
    ]
});
```

## API

### get/set

```javascript
S.use('gallery/storage/1.0/index', function (S, Storage) {
    
    var storage = new Storage();
    
    storage.set({k: 'key', v: 'value', success: function() {
        storage.get({k: 'key', success: function(data) {
            console.log('获取的值：', data);
        }});
    }});
});
```

0. `k` key
0. `v` value
0. `success` 回调，如遇超时等异常，参数`data`为`undefined`


### remove/clear

```javascript
S.use('gallery/storage/1.0/index', function (S, Storage) {  

    var storage = new Storage();
    
    // 删除数据'key' 
    storage.remove({k: 'key', success: function() {
    }});
    
    // 清空所有字段
    storage.clear({success: function() {
    }});
});
```

### 实例化

```javascript
S.use('gallery/storage/1.0/index', function (S, Storage) {
    
    var storage = new Storage({
        'proxy': 'tmall' 
    });
});
```

所有实例化参数都是可选的：

0. `proxy` 数据存储在代理页所在的域，选择不同的代理页可以让数据存储在不同的域下
    0. `tmall`：
    0. `taobao`：
    0. `common`：
    0. `{proxy-url}`：[proxy 页面](http://a.tbcdn.cn/s/kissy/gallery/storage/1.0/proxy.html) 部署在特定域名下的 URL
0. `onload` 代理页加载成功的回调    
    