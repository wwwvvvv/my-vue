// var mongodb = require('./db');
// var MongoClient = require("./db");
var MongoClient = require("mongodb").MongoClient;
var settings = require('../settings');

class User {
    constructor(user) {
        this.name = user.name;
        this.password = user.password;
        this.email = user.email;
    }

    save(cb) {
        var user = {
            name: this.name,
            password: this.password,
            email: this.email
        };
        MongoClient.connect(settings.url,function (err, client) { //打开数据库
            if (err) {
                return cb(err);
            }
            //读取 users 集合
            var db = client.db(settings.db);
            db.collection('users', (err, collection) => {
                if (err) {
                    client.close();
                    return cb(err);
                }
                //将用户数据插入 users 集合
                collection.insertOne(user, {safe: true}, function (err, user) {
                    client.close();
                    if (err) {
                        return cb(err);
                    }
                    cb(null, user[0]); //成功， err为null，并返回存储后的用户文档
                });
            });
        });
    }

    // 读取用户信息
    get(name, cb) {
        MongoClient.connect(settings.url,(err, client) => {
            if (err) {
                return cb(err);
            }
            var db = client.db(settings.db);
            console.log("is ok");
            db.collection('users', (err, collection) => {
                if(err) {
                    client.close();
                    return cb(err);
                }
                collection.findOne({
                    name
                },(err, user) => {
                    console.log('user', user);
                    client.close();
                    if (err) {
                        return cb(err);
                    }
                    cb(null, user); //成功！ 返回查询的用户信息
                });
            });
        });
    }

}

module.exports = User;