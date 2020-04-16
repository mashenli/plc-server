var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring=require('querystring');
/* GET home page. */
/*电影主页*/
router.get('/', function(req, res, next) {
  
       
        db.query('SELECT * FROM movies', function(err, rows){
      		if (err) {
          			res.send("读取失败");
         	 }else {
    				var data1 = [];
      				data1 = rows;
    				res.render('index', {name:req.session.username,test:'登录',data:"#myModal",data1}); 
    				
      		}
        });

});



router.post('/', function(req, res, next) {
    // console.log(req.body.data);
    var queryString= "delete from seat where seatid='" + req.body.data +"'";
    db.query(queryString, function(err, rows){
          if (err) {
                res.send("读取失败");
                res.json({error:2});
           }else {
           console.log("成功");
             res.json({success:1});
          }
        });
       
   

});








/*选座页面 */
router.get('/posts/:moviename/:key/:item',require("./posts"));
router.post('/posts/:moviename/:key/:item',require("./posts"));
/*电影信息页面 */







router.get('/movie/:id',require("./movie"));
router.post('/movie/:id',require("./movie"));
/*后台系统登录界面*/
router.post('/login',require("./login"));

/*经理页面*/

router.get('/bossindex',require("./bossindex"));
router.post('/bossindex',require("./bossindex"));

router.get('/bossindex/useradd',require("./bossadd"));
router.post('/bossindex/useradd',require("./bossadd"));

router.get('/bossindex/userlist',require("./userlist"));
router.post('/bossindex/userlist',require("./userlist"));

router.get('/adindex',require("./adindex"));
router.post('/adindex',require("./adindex"));



router.get('/adindex/movielist',require("./movielist"));
router.post('/adindex/movielist',require("./movielist"));


router.get('/adindex/movieadd',require("./movieadd"));
router.post('/adindex/movieadd',require("./movieadd"));

router.post('/admin/login',require("./login")); //管理员登录接口
router.post('/admin/fetch/sort',require("./movieadd"));  //查询模块下产品
router.post('/admin/addProduct',require("./movieadd"));  //添加产品
router.get('/admin/fetchClass',require("./movieadd"));//查询产品分类及模块
router.post('/admin/modifyProduct',require("./movieadd"));//修改产品
router.post('/admin/deleteProduct',require("./movieadd"));//删除产品
router.post('/admin/addAdmin',require("./movieadd"));//添加管理员
router.post('/admin/deleteAdmin',require("./movieadd"));//删除管理员
router.get('/admin/fetch/admin',require("./movieadd"));//查看管理员
router.post('/admin/addClass',require("./movieadd"));//添加模块



router.get('/user',require("./user"));
// router.post('/login',require("./user"));


router.post('/users',require("./users"));
router.get('/users',require("./users"));


router.get('/bossindex/bill',require("./bossadd"));
router.post('/bossindex/bill',require("./bossadd"));


router.get('/file.html',require("./file"));
router.post('/file.html',require("./file"));



router.get('/filename.html',require('./md'));


router.post('/filename',require('./md'));
 


module.exports = router;
