var express = require('express');
var router = express.Router();
var fs = require('fs')

var multer = require('multer')
const path = require('path');
 var bin = multer({dest:'bin'});




router.get('/file.html', function(req, res,next) {

	 

 res.render('file', {}); 

        

});


router.post('/file.html',bin.single('wenjian'),function(req,res,next){
	console.log(req.body.name);
	var filename = req.file.originalname;
	console.log(req.file);
  	fs.renameSync('./bin/'+req.file.filename,'./bin/'+req.body.name+'/'+filename);
	res.render('file', {});  
});


  module.exports = router;