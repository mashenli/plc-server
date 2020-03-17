---
title: 使用express设置cookie
date: 2018-07-24 11:23:14
tags: node.js
thumbnail: "http://p6894qyp6.bkt.clouddn.com/69767582_p1_master1200.jpg"
---

# 什么是cookie

cookie是客户端请求服务器时，客户端向服务器发送的一些信息，多配合session配合用于用户验证。

cookie可以在浏览器中查看（chrome浏览器开发者工具）：

![][cookie]


# 为什么需要cookie

http协议是无状态的，不能记录客户端与服务器之间的连接信息，如果我们需要保存用户的登录状态，那么就需要在客户端向服务器发送一个验证，表示该用户已登录，这时就需要cookie出场了
。

cookie是又时限的，有一个属性maxAge可以设置cookie的存储时间，超过时间后cookie会被删除，默认的是浏览器关闭时清除cookie。cookie一般用于用户的自动登录，记住密码等，将账户信息保存在cookie中，登录时cookie被传送到服务器完成自动登录。


# express如何设置cookie

## 所需模块
```
var express=require("express");
var cookieParase = require('cookie-parser');
var bodyParser = require('body-parser');
```
需要的模块使用npm install + 模块名即可安装

## 设置的主要参数

* name: 类型为String

* value: 类型为String和Object，如果是Object会在cookie.serialize()之前自动调用JSON.stringify对其进行处理

* Option: 类型为对象，可使用的属性如下

* domain：cookie在什么域名下有效，类型为String,。默认为网站域名

* expires: cookie过期时间，类型为Date。如果没有设置或者设置为0，那么该cookie只在这个这个session有效，即关闭浏览器后，这个cookie会被浏览器删除。

* httpOnly: 只能被web server访问，类型Boolean,禁止客户端JavaScript的访问，禁止后不能使用document.cookie。

* maxAge: 实现expires的功能，设置cookie过期的时间，类型为String，指明从现在开始，多少毫秒以后，cookie到期。

* path: cookie在什么路径下有效，默认为’/’，类型为String

* secure：只能被HTTPS使用，类型Boolean，默认为false

* signed:使用签名，类型Boolean，默认为false。express会使用req.secret来完成签名，需要cookie-parser配合使用

## 如何使用

* 设置cookie

  如：res.cookie('id',1,{ expires: new Date(Date.now() + 100), httpOnly: true });

> res.cookie(name, value [, options]);

> name 是 cookie 名，value 是 cookie 值，可以是 json 对象或字符串。

* 获取cookie

 req.cookies.key(获取名称为key的cookie的值)    或   req.cookies

* 删除cookie

  res.clearCookie(name [, options]);


> name 是 cookie 名，options 与创建 cookie 时所传一致

## cookie的跨域设置

一牵扯到后台一定少不了跨域，cookie的设置有时也要牵扯到跨域设置。

* 在服务器设置：

```
app.use(cors({
      origin: '*',
　    credentials: true
}));
```
对应客户端的 xhrFields.withCredentials: true 参数，服务器端通过在响应 header 中设置 Access-Control-Allow-Credentials = true 来运行客户端携带证书式访问。通过对 Credentials 参数的设置，就可以保持跨域 Ajax 时的 Cookie。这里需要注意的是：

服务器端 Access-Control-Allow-Credentials = true时，参数Access-Control-Allow-Origin 的值不能为 '*' 。

* 如果客户端AJAX请求需要发送cookie，则在AJAX中设置：

```
xhrFields: { withCredentials: true},
crossDomain: true,
```

# 小结

我们大致就完成了跨域的cookie设置，cookie的设置十分关键，应该还要加上加密等措施，之后再介绍。

封面画师：[Nahaki]

[cookie]:http://p6894qyp6.bkt.clouddn.com/cookie-1.png
[Nahaki]:https://www.pixiv.net/member.php?id=9685977
