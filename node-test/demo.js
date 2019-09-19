var fs = require('fs');
var util = require('util');
var path = require('path');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');


// var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: '/tmp/'}).array('image'));
app.use(cookieParser());

//设置模板引擎
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname , 'views'));

app.get('/process_get', function (req, res) {
   // console.log(req.query);
   var response = {
       "first_name" : req.query.first_name,
       "last_name" : req.query.last_name
   };
   res.json(response);
   // res.end();
});

app.post('/process_post', function (req, res) {
   // console.log(req.body);
   var response = {
       "first_name" : req.body.first_name,
       "last_name" : req.body.last_name
   };
   res.json(response);
   // res.end();
});

app.post('/file_upload',function (req, res) {
    // console.log('req.files', req.files);
    var file = req.files[0];
    var des_file = __dirname + file.destination + file.originalname;
    fs.readFile(file.path, function (err, data) {
       if (err) {
           console.log(err);
           res.end(err);
           return;
       }
       // console.log('read')
        fs.writeFile(des_file, data, function (err) {
            if(err) {
                console.log(err);
                res.end(err);
                return;
            }
            var response = {
                message: 'File uploaded successfully.',
                filename: file.originalname
            };
            res.json(response);
        });
    });
});

app.get('/', function (req, res) {
    // console.log('主页 get 请求');
    // // console.log('__filename ---->', __filename);
    // // console.log('__dirname  ---->', __dirname);
    // // console.log('express.static(\'public\')',express.static('public'));
    // console.log('cookie', util.inspect(req.cookie));
    // res.sendFile( __dirname + "/index.html")
    console.log(path.resolve('/foo','/bar','baz'));
    res.render('index', {
        message: 'Hello Ejs!'
    })
});

app.post('/', function (req,res) {
    console.log('主页 post 请求');
    res.send('Hello Post!');
});

app.get('/list_user', function (req, res) {
    console.log("/list_user GET请求");
    res.send('用户列表页面');
});

app.get('/ab*cd',function (req,res) {
    console.log("/ab*cd GET请求");
    res.send('正则匹配');
});

var server = app.listen(8080, 'localhost' ,function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log("应用实例，访问地址为 http://%s:%s", host, port);
});