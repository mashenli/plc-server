var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring = require('querystring');


router.get('/login', function (req, res, next) {



  res.render('login', {});



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
        res.send({'code':0});
      } else if (rows[0].password == req.body.password) {
        code = 1
        let type = rows[0].identify
        let json = {}
        json.type = type
        json.code = code
        res.send(json)
      } else {
        code = 2
        res.send({'code':2});
      }
    }
  })

});
module.exports = router;