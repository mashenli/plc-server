 var express = require('express');
 var router = express.Router();
 var fs = require('fs');
var marked = require( "marked" );



router.get('/filename.html', function(req, res) {
	var path="./bin/1/使用express设置cookie.md";
	fs.readFile(path, function(err, data){
		if(err){
            console.log("文件不存在！");
            console.log(err);
            res.send("文件不存在！");
        }else{
        	  console.log(data);
            htmlStr = marked(data.toString());
            console.log(htmlStr);
           res.render('md',{htmlStr});
        }
	});
});


router.post('/filename', function(req, res) {
	var path="./bin/1/使用express设置cookie.md";
	fs.readFile(path, function(err, data){
		if(err){
            console.log("文件不存在！");
            console.log(err);
            res.send("文件不存在！");
        }else{
        	  console.log(data);
            htmlStr = marked(data.toString());
            console.log(htmlStr);
            res.json(htmlStr) ;
        } 

	});

	
});



        module.exports = router;