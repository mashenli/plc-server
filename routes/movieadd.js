var express = require('express');
var router = express.Router();
var db = require('../model/db');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
const querystring = require('querystring');





//查询分类
router.post('/admin/fetch/sort', function (req, res, next) {
  let selectString = "select * from product where sort='" + req.body.sort + "'";
  db.query(selectString, function (err, rows) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(rows)
    }
  });
});

//查询所有订单
router.post('/admin/fetch/bill', function (req, res, next) {
  let selectString = "select * from bill";
  if (req.body.phoneNum) {
    selectString = "select * from bill where phoneNum = '" + req.body.phoneNum + "'";
  }
  db.query(selectString, function (err, rows) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(rows)
    }
  });
});
//查询模块
router.get('/admin/fetchClass', function (req, res, next) {
  let selectString = "select * from class"
  db.query(selectString, function (err, rows) {
    if (err) {
      res.send(err);
    }
    else {
      let newData = []
      let newClass = []
      for (let i = 0; i < rows.length; i++) {
        if (newClass.indexOf(rows[i].sort) == -1) {
          newClass.push(rows[i].sort)
        }
      }
      for (let i = 0; i < newClass.length; i++) {
        let item = {}
        item.sort = newClass[i]
        item.allClass = []
        newData.push(item)
      }
      rows.forEach((item, index, array) => {
        for (let i = 0; i < newData.length; i++) {
          if (item.sort == newData[i].sort) {
            newData[i].allClass.push(item.classId)
          }
        }
      })
      res.send(newData)
    }
  });

});
//添加产品
router.post('/admin/addProduct', function (req, res) {
  let insertString = "insert into product(classId,modular,productId,sort,`describe`,price) values('" + req.body.classId + "','" + req.body.modular + "','" + req.body.productId + "','" + req.body.sort + "','" + req.body.describe + "','" + req.body.price + "')";
  let selectString = "select * from product where productId='" + req.body.productId + "'";
  // code: 0:插入成功   1：err   2:已存在
  let json = { code: 0 }
  db.query(selectString, function (err, rows) {
    if (err) {
      json = { code: 1 }
      res.send(json);
    }
    else {
      if (rows.length != 0) {
        json = { code: 2 }
        res.send(json);
      }
      else {
        db.query(insertString, function (err, rows) {
          if (err) {
            json = { code: 1 }
            res.send(json);
          } else {
            res.send(json)
          }
        });
      }
    }
  });
});
//修改产品
router.post('/admin/modifyProduct', function (req, res) {
  let selectString = "UPDATE product SET modular = '" + req.body.modular + "',`describe` ='" + req.body.describe + "' WHERE productId ='" + req.body.productId + "'";
  // // code: 0:修改成功   1：err   2:修改失败
  let json = { code: 0 }
  db.query(selectString, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      res.send(json)
    }
  });
});
//修改订单
router.post('/admin/modifyBill', function (req, res) {
  let selectString = ''
  if (req.body.address && !req.body.state) {
    selectString = "UPDATE bill SET address = '" + req.body.address + "'WHERE billId = '" + req.body.billId + "'";
  }
  else if (!req.body.address && req.body.state) {
    // selectString = "UPDATE bill SET state = '" + req.body.state + "'WHERE billId = '" + req.body.billId + "'";
    selectString = "UPDATE bill SET  `state` = '" + req.body.state + "' WHERE billId = '" + req.body.billId + "'";

  }
  else {
    selectString = "UPDATE bill SET address = '" + req.body.address + "' , `state` = '" + req.body.state + "' WHERE billId = '" + req.body.billId + "'";
  }
  // // code: 0:修改成功   1：err   2:修改失败
  let json = { code: 0 }
  db.query(selectString, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      res.send(json)
    }
  });
});
//添加模块
router.post('/admin/addClass', function (req, res) {
  let selectString = "select * from class where classId='" + req.body.classId + "' and sort='" + req.body.sort + "'";
  let insertString = "insert into class(classId,sort) values('" + req.body.classId + "','" + req.body.sort + "')";
  // // code: 0:添加成功   1：err   2:模块存在
  let json = { code: 0 }
  db.query(selectString, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      if (rows.length > 0) {
        json = { code: 2 }
        res.send(json)
      }
      else {
        db.query(insertString, function (err, rows) {
          if (err) {
            res.send(err);
          } else {
            res.send(json)
          }
        });
      }
    }
  });
});
//删除产品
router.post('/admin/deleteProduct', function (req, res) {
  let selectString = "DELETE FROM product WHERE productId ='" + req.body.productId + "'";
  // // code: 0:删除成功   1：err   2:删除失败
  let json = { code: 0 }
  db.query(selectString, function (err, rows) {
    if (err) {
      console.log(err)
      res.send(err);
    } else {
      console.log("111")
      res.send(json)
    }
  });
});
//添加管理员
router.post('/admin/addAdmin', function (req, res) {
  let selectString = "select * from admin where phoneNum='" + req.body.phoneNum + "'";
  let insertString = "insert into admin(phoneNum,name,password) values('" + req.body.phoneNum + "','" + req.body.name + "','" + req.body.phoneNum + "')";
  // // code: 0:添加成功   1：err   2:模块存在
  let json = { code: 0 }
  db.query(selectString, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      if (rows.length > 0) {
        json = { code: 2 }
        res.send(json)
      }
      else {
        db.query(insertString, function (err, rows) {
          if (err) {
            res.send(err);
          } else {
            res.send(json)
          }
        });
      }
    }
  });
});
//删除管理员
router.post('/admin/deleteAdmin', function (req, res) {
  let selectString = "DELETE FROM admin WHERE phoneNum ='" + req.body.phoneNum + "'";
  // // code: 0:删除成功   1：err
  let json = { code: 0 }
  db.query(selectString, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      res.send(json)
    }
  });
});
//查看管理员
router.get('/admin/fetch/admin', function (req, res) {
  let selectString = "select * from admin";
  // // code: 0:添加成功   1：err   2:模块存在
  let json = { code: 0 }
  db.query(selectString, function (err, rows) {
    if (err) {
      res.send(err);
    } else {
      let data = rows
      data.forEach((item, index) => {
        delete item.password
      })
      res.send(data);
    }
  });
});
//查询产品
router.post('/fetch/product', function (req, res, next) {
  let selectString = ''
  if (req.body.class && req.body.sort) {
    selectString = "select * from product where sort='" + req.body.sort + "' and classId = '" + req.body.class + "'";
  }
  else {
    selectString = "select * from product where sort='" + req.body.sort + "'";
  }
  db.query(selectString, function (err, rows) {
    if (err) {
      res.send(err);
    }
    else {
      res.send(rows)
    }
  });
});







module.exports = router;