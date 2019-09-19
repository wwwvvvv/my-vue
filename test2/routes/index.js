var express = require('express');
var multer = require('multer');
var router = express.Router();
var path = require('path');
var User = require('../models/user');
var md5 = require('crypto').createHash('md5');
var settings = require('../settings');
var loginStatus = require('../models/loginStatus');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + `.${file.originalname.split('.')[1]}`);
    }
});

var upload = multer({ storage: storage });
// var upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session.user);
  if (req.session.user) {
      return res.redirect('/personalInfo');
  }
  res.redirect('/login');
});

router.get('/register', loginStatus.checkIsLogout);
router.get('/register', function (req, res, next) {
    res.render('register', {
        title: '注册',
        user: req.session.user
    });
});
// router.post('/register', loginStatus.checkIsLogout);
router.post('/register', upload.single('avatar'), function (req, res, next) {
    if (req.session.user) {
        return res.json({
            success: false,
            err: '您已登录'
        });
    }
    let {
        name,
        age,
        tel,
        email,
        password,
        rePassword
    } = req.body;
    let avatar = req.file ? req.file.filename : '';
    let errMsg = '';
    if (name === '') {
        errMsg = '名字不能为空'
    } else if (age === '') {
        errMsg = '年龄不能为空'
    } else if (tel === '') {
        errMsg = '电话号码不能为空'
    } else if (email === '') {
        errMsg = '邮箱不能为空'
    } else if (password === '') {
        errMsg = '密码不能为空'
    } else if (password !== rePassword) {
        errMsg = '两次输入的密码不一致'
    }else if (avatar === '') {
        errMsg = '头像不能为空'
    }
    if (errMsg) {
        return res.json({success: false, err: errMsg});
    }
    password = md5.update(password).digest('hex');
    var newUser = new User(name, age, tel, email, password, avatar);
    newUser.get({name}, function (err, user) {
        if (err) {
            return res.json({success: false, err});
        }
        if (user) {
            return res.json({success: false, err: '用户已存在!'});
        }
        newUser.save(function (err, user) {
            if (err) {
                return res.json({success: false, err});
            }
            console.log('user', user);
            user.avatar = `${settings.baseUrl}uploads/${avatar}`;
            req.session.user = user;
            res.json({
                success: true,
                data: newUser,
                err: ''
            });
        });
    })
});

router.get('/login', loginStatus.checkIsLogout);
router.get('/login', function (req, res, next) {
   res.render('login', {
       title: '登录',
       user: req.session.user
   })
});
// router.post('/login', loginStatus.checkIsLogout);
router.post('/login', function (req, res, next) {
    if (req.session.user) {
        return res.json({
            success: false,
            err: '您已登录'
        });
    }
    let {
        name,
        password
    } = req.body;
    let errMsg = '';
    if (name === '') {
        errMsg = '请输入姓名'
    } else if (password === '') {
        errMsg = '请输入密码'
    }
    if (errMsg) {
        return res.json({
            success: false,
            err: errMsg
        });
    }
    new User().get({name}, function (err, user) {
        if (err) {
            return res.json({
                success: false,
                err
            });
        }
        console.log('user', user);
        if (!user) {
            return res.json({
                success: false,
                err: '用户不存在!'
            });
        }
        let iptPassword = md5.update(password).digest('hex');
        if (user.password !== iptPassword) {
            return res.json({
                success: false,
                err: '密码错误!'
            });
        }
        user.avatar = `${settings.baseUrl}uploads/${user.avatar}`;
        req.session.user = user;
        res.send({
            success: true,
            msg: '登录成功!'
        });
    })
});

router.get('/personalInfo', loginStatus.checkIsLogin);
router.get('/personalInfo', function (req, res, next) {
    res.render('personalInfo', {
        title: '个人信息',
        user: req.session.user
    });
});

router.get('/personalInfo', loginStatus.checkIsLogin);
router.get('/info', function (req, res, next) {
   res.json({
       success: true,
       data: req.session.user,
       err: ''
   });
});

router.get('/logout', loginStatus.checkIsLogin);
router.get('/logout', function (req, res, next) {
   req.session.user = null;
   res.redirect('/');
});

module.exports = router;
