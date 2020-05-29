var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');

/*后台系统登录界面*/
router.post('/login',require("./login"));

/*经理页面*/

router.post('/admin/login',require("./login")); //管理员登录接口
router.post('/admin/fetch/sort',require("./movieadd"));  //查询模块下产品
router.post('/admin/fetch/bill',require("./movieadd"));  //查询所有订单
router.post('/admin/addProduct',require("./movieadd"));  //添加产品
router.get('/admin/fetchClass',require("./movieadd"));//查询产品分类及模块
router.post('/admin/modifyProduct',require("./movieadd"));//修改产品
router.post('/admin/modifyBill',require("./movieadd"));//修改订单
router.post('/modify/userInfo',require("./movieadd"));//修改用户信息
router.post('/modify/password',require("./movieadd"));//修改用户密码
router.post('/admin/deleteProduct',require("./movieadd"));//删除产品
router.post('/admin/addAdmin',require("./movieadd"));//添加管理员
router.post('/admin/deleteAdmin',require("./movieadd"));//删除管理员
router.get('/admin/fetch/admin',require("./movieadd"));//查看管理员
router.post('/admin/addClass',require("./movieadd"));//添加模块
router.post('/fetch/product',require("./movieadd"));//查询产品
router.post('/buyProduct',require("./movieadd"));//用户购买
router.post('/admin/fetch/year',require("./movieadd"));//查看管理员

module.exports = router;
