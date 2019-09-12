var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var Post = require('../models/post');
var lib = require('../models/lib');

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log('query', req.params);
  //   console.log('req.session.user', req.session.user);
    new Post().get(null, function (err, posts) {
        if (err) {
            req.flash('error', err);
            posts = [];
        }
        res.render('index', {
            title: '主页',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            posts
        });
    });
});

router.get('/register', function (req, res, next) {
    res.render('register', {
        title: '注册',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});
router.post('/register', function (req, res, next) {
    let {
        name,
        password,
        repeatPassword,
        email
    } = req.body;
    if (password !== repeatPassword) {
        req.flash('error', '两次输入的密码不一致');
        return res.redirect('/register');
    }
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('hex');
    var newUser = new User({
        name,
        password,
        email
    });
    newUser.get(name, function (err, user) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        if (user) {
            req.flash('error', '用户已存在');
            return res.redirect('/register');
        }
        newUser.save(function (err,user) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/register');
            }
            req.session.user = newUser;
            req.flash('success', '注册成功！');
            res.redirect('/');
        });
    });
});
router.get('/login', lib.checkNotLogin);
router.get('/login', function (req, res, next) {
    res.render('login', {
        title: '登录',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

router.post('/login', lib.checkNotLogin);
router.post('/login', function (req, res, next) {
    let {
        name,
        password
    } = req.body;
    var newUser = new User({name, password});
    newUser.get(name, function (err, user) {
       if (err) {
           req.flash('error', err);
           return res.redirect('/login');
       }
       let truePassword = user.password;
       let md5 = crypto.createHash('md5');
       if (md5.update(password).digest('hex') !== truePassword) {
           req.flash('error', '登录密码错误！');
           return res.redirect('/login');
       }
       req.session.user = user;
       req.flash('success', '登录成功！');
       res.redirect('/');
    });
});

router.get('/post', lib.checkLogin);
router.get('/post', function (req, res, next) {
    res.render('post', {
        title: '发表博文',
        user: req.session.user,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

router.post('/post', lib.checkLogin);
router.post('/post', function (req, res, next) {
    let {
        title,
        post
    } = req.body;
    let name = req.session.user.name;
    new Post(name, title, post).save((err, post) => {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发表成功');
        res.redirect('/');
    });
});

router.get('/logout', lib.checkLogin);
router.get('/logout', function (req, res, next) {
    req.session.user = null;
    req.flash('success', '已退出登录！');
    res.redirect('/');
});

module.exports = router;
