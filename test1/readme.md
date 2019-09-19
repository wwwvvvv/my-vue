#主要功能

* 注册
* 登录
* 展示个人信息
* 从mongodb数据库存取个人信息

#主要用到的模块

* mongodb (连接数据库)
* multer (处理上传的头像)
* express-session
* crypto (对密码进行加密)
* connect-flash (将一些提示信息放到flash中)
* connect-mongo (session储存插件)
(connect-mongo会在配置的database下创建一个
sessions的数据表(没有这个数据表的情况下).
<br>
eg.
<br>
app.use(session({
    secret: 'hello mongo',// cookie签名
    cookie: {maxAge: 1800000},
    rolling:true,
    saveUninitialized:true,
    resave: false,
    store:new MongoStore({
        url: 'mongodb://localhost:27017/mtest' //在这个database下创建一个session表
    }) // 替换掉默认的储存
}));
)


#启动
superisor ./bin/www (可以不用每次修改,都重启服务)
或者 
node ./bin/www