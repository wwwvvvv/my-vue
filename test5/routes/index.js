var express = require('express');
var multer = require('multer');
var router = express.Router();
var path = require('path');
// var User = require('../service/user');
var newUser = require('../service/user2');
var crypto = require('crypto');
var settings = require('../settings');
var loginStatus = require('../models/loginStatus');
const Common = require('../libs/Common');
const VD = require('../libs/VD');
var newPerson = require('../service/person');
var newStory = require('../service/story');
var mongoose = require('mongoose');
var utf8 = require('utf8');
var request = require('request');



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

router.get('/register',loginStatus.checkIsLogout, function (req, res, next) {
    res.render('register', {
        title: '注册',
        user: req.session.user
    });
});
// router.post('/register', );
router.post('/register', loginStatus.checkIsLogout, upload.single('avatar'), async function (req, res, next) {
    let avatar = req.file ? req.file.filename : '';
    req.body.avatar = avatar;
    let err = VD.validateParams(req.body,{
        name: '',
        age: '',
        tel: '',
        email: '',
        password: ['required', 'checkPassword'],
        rePassword: '',
        avatar:''
    });
    if (err) {
        return Common.resJson(res, err);
    }
    let {
        name,
        age,
        tel,
        email,
        password
    } = req.body;
    let getUser = await newUser.get({name}).catch(err=> {
        return Common.resJson(res, err);
    });
    // console.log('getUser', getUser);
    if (getUser) {
        return Common.resJson(res, '用户已存在!');
    }
    password = Common.cryptoPassword(password);
    let user = await newUser.insert({name, age, tel, email, password, avatar}).catch(err => {
        return Common.resJson(res, err);
    });
    // console.log('saveUser', user);
    user.avatar = `${settings.baseUrl}uploads/${avatar}`;
    req.session.user = user;
    Common.resJson(res, null, user);
});

router.post('/notify', function (req, res, next) {
    console.log('notify--body', req.body);
    Common.resJson(res, null,'','');
});

router.post('/getBizToken', function (req, res, next) {
    //
    // console.log(req.method);
    let url = 'https://openapi.faceid.com/lite/v1/get_biz_token';
    let method = req.method.toUpperCase();
    let options = {
        headers: {"Connection": "close"},
        url,
        method,
        json: true,
        body: req.body
    };

    function callback(error, response, data) {
        // console.log('response', response);
        // console.log('data', data);
        if (!error && response.statusCode === 200 && !data.error) {
            console.log('---接口数据---', data);
            return Common.resJson(res, null, data, 'success');
        }
        Common.resJson(res, error || data.error, data , 'fail');
    }

    request(options, callback);
});

router.post('/getResult', function (req, res, next) {
    let options = {
        method: 'get',
        url: 'https://openapi.faceid.com/lite/v1/get_result',
        qs: {
            sign: req.body.sign,
            'sign_version': req.body['sign_version'],
            'biz_token': req.body['biz_token']
        }
    };
    request(options, function (error, response, data) {
        if (!error && response.statusCode === 200 && !data.error) {
            data = JSON.parse(data);
            return Common.resJson(res, null, data, 'success');
        }
        Common.resJson(res, error || data.error, data , 'fail');
    });
});

router.post('/getBizSign', function (req, res, next) {
    let apiKey = 'gShVjsoQ0d6BSdSyK7o6PClS_9rIT5EQ';
    let apiSecret = 'vJSnk6Gnlqh9rIb6UVptiSNrvlvkr5kK';

    let validDuration = 100;
    let currentTime = Date.now();
    let expireTime = validDuration + currentTime;
    let random = get10RandomNums();
    function get10RandomNums() {
        let randomNums = [];
        for(let i = 0; i < 10; i++) {
            randomNums.push(parseInt(Math.random() * 10));
        }
        return randomNums.join('');
    }
    let raw = `a=${apiKey}&b=${expireTime}&c=${currentTime}&d=${random}`;
    let signTmp = crypto.createHmac('sha1', apiSecret).update(raw).digest();
    let sign = Buffer.concat([signTmp, new Buffer(raw)]).toString('base64');
    Common.resJson(res, null, sign, 'success');
});


router.get('/login',loginStatus.checkIsLogout, function (req, res, next) {
   res.render('login', {
       title: '登录',
       user: req.session.user
   })
});
// router.post('/login', loginStatus.checkIsLogout);
router.post('/login', async function (req, res, next) {
    if (req.session.user) {
        return Common.resJson(res, '您已登录');
    }
    let {
        name,
        password
    } = req.body;
    let err = VD.validateParams(req.body, {
        name: '',
        password: ''
    });
    if (err) {
        return Common.resJson(res, err);
    }
    let user = await newUser.get({name}).catch(err => {
        return Common.resJson(res, err);
    });
    if (!user) {
        return Common.resJson(res, '用户不存在!');
    }

    let iptPassword = Common.cryptoPassword(password);
    if (user.password !== iptPassword) {
        return Common.resJson(res, '密码错误!');
    }
    user.avatar = `${settings.baseUrl}uploads/${user.avatar}`;
    req.session.user = user;
    Common.resJson(res, null, user, '登录成功!');
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

router.get('/test', async function (req, res, next) {
   // let ret =  await newUser.find({});
   // console.log('ret', ret);
    let author = {
        _id: new mongoose.Types.ObjectId(),
        name: 'test',
        age: 20
    };

    let story = {
        title: 'Casino Royale',
        author: author._id
    };

    let ret = await newPerson.insertOne(author).catch(err => {
        console.log('person insert err', err);
    });

    let ret2 = await newStory.insertOne(story).catch(err => {
        console.log('story insert err', err);
    });

    console.log('ret', ret);
    console.log('ret2', ret2);
});

module.exports = router;
