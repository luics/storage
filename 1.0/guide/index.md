## 综述

storage 是跨域存储组件，具有如下特性：

0. 兼容 IE 6+；Chrome、Firefox、Safari
0. 不使用 Flash 方案，完美支持移动浏览器
0. 跨子域、主域的数据存取，且不会改写 document.domain
0. 支持 Object、Array 等复杂对象存取

技术方案介绍：[https://github.com/luics/storage/wiki/Storage](https://github.com/luics/storage/wiki/Storage)

* 版本：1.0
* 作者：鬼道
* 标签：存储，跨域
* demo：[http://gallery.kissyui.com/storage/1.0/demo/index.html](http://gallery.kissyui.com/storage/1.0/demo/index.html)

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
    
    Storage.set({k: 'key', v: 'value', success: function() {
        Storage.get({k: 'key', success: function(data) {
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
    
    // 删除数据'key' 
    Storage.remove({k: 'key', success: function() {
    }});
    
    // 清空所有字段
    Storage.clear({success: function() {
    }});
});
```