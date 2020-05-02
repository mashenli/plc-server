var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring = require('querystring');


router.post('/login', function (req, res, next) {



  // res.render('login', {});
  let queryString = "select * from user where phoneNum='" + req.body.userName + "'";
  db.query(queryString, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      if (rows.length == 0) {
        res.send({ 'code': 0 });
      } else if (rows[0].password == req.body.passWord) {
        code = 1
        let json = {}
        json.data = rows[0]
        json.code = code
        res.send(json)
      } else {
        code = 2
        res.send({ 'code': 2 });
      }
    }
  })


});



router.post('/admin/login', function (req, res, next) {
  console.log("登录接口");
  console.log(req.body)
  //  0:不存在  1：登录成功   2：密码错误
  let queryString = "select * from admin where name='" + req.body.userName + "'";
  db.query(queryString, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      if (rows.length == 0) {
        res.send({ 'code': 0 });
      } else if (rows[0].password == req.body.password) {
        code = 1
        let type = rows[0].identify
        let json = {}
        json.type = type
        json.code = code
        res.send(json)
      } else {
        code = 2
        res.send({ 'code': 2 });
      }
    }
  })

});
module.exports = router;