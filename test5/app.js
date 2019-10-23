var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var settings = require('./settings');
var mongoose = require('./config/mongoose');
//全局引入mongoose
// var mongoose = require('./config/mongoose');
// var db = mongoose();
// var multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var storyRouter = require('./routes/story');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave:false,//
    saveUninitialized: true,//
    name: settings.db,
    secret: settings.cookieSecret,
    store: new MongoStore({
        url: 'mongodb://localhost/mtest4'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));
app.use(flash());
// app.use(multer({dest: '/tmp/'}).array('image'));

//设置允许跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://192.168.1.104:8887");//项目上线后改成页面的地址
    // res.header("Access-Control-Allow-Origin", "http://192.168.1.11:8887");//项目上线后改成页面的地址

    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");

    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", 'true');

    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/story', storyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('err', err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
