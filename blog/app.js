var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

//生成一个express实例app
var app = express();

// view engine setup
//设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('views', path.join(__dirname, 'views'));
//设置视图模板引擎为 ejs。
app.set('view engine', 'ejs');

//加载日志中间件
app.use(logger('dev'));
//加载解析json的中间件
app.use(express.json());
//加载解析urlencoded请求体的中间件（eg. form输入表单的提交（enctype为application/x-www-form-urlencoded时)）
app.use(express.urlencoded({ extended: false }));
//加载解析cookie的中间件
app.use(cookieParser());
//设置public文件夹为存放静态文件的目录。
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: settings.cookieSecret, //防止篡改 cookie
    name: settings.db,//cookie 的名字
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30days --- 设定cookie的生存期
    },
    store: new MongoStore({ //将会话信息存储到数据库中，以避免丢失 （req.session 获取当前用户的会话对象）
        // db: settings.db,
        // host: settings.host,
        // port: settings.port
        url: 'mongodb://localhost/blog'
    })
}));

app.use(flash());

//路由控制器：
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler （捕获404错误，并转发到错误处理器。）
app.use(function(req, res, next) {
  next(createError(404)); // 调用next(xx) 会将错误继续传递到下一个中间件处理
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = er
    r.message;
  // 只有在开发环境下，将错误信息渲染到error模板并且显示到浏览器中
  // （开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中。）
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//导出app实例供其他模块调用。
module.exports = app;
