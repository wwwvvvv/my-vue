var MongoClient = require('mongodb').MongoClient;
var settings = require('../settings');

class User {
    constructor(name, age, tel, email, password, avatar) {
        this.name = name;
        this.age = age;
        this.tel = tel;
        this.email = email;
        this.password = password;
        this.avatar = avatar;
    }

    save(callback) {
        var params = {
            name: this.name,
            age: this.age,
            tel: this.tel,
            email: this.email,
            password: this.password,
            avatar: this.avatar
        };
        MongoClient.connect(settings.url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
            if (err) {
                client.close();
                return callback(err);
            }
            var db = client.db(settings.db);
            db.collection('users', (err, collection) => {
                if (err) {
                    client.close();
                    return callback(err);
                }
                collection.insertOne(params, {safe: true}, (err, user) => {
                    client.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, user);
                });
            });
        });
    }

    get(params = {}, callback) {
        console.log('err', 'here')
        MongoClient.connect(settings.url, {useNewUrlParser: true, useUnifiedTopology: true},(err, client) => {
            console.log('err', err);
            console.log('execute here');
            if (err) {
                client.close();
                return callback(err);
            }
            var db = client.db(settings.db);
            db.collection('users', (err, collection) => {
                if (err) {
                    client.close();
                    return callback(err);
                }
                let query = {};
                if (params.name) {
                    query.name = params.name;
                } else {
                    query.tel = params.tel;
                }
                collection.findOne(query, {safe: true}, (err, user) => {
                    client.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, user);
                });
            });
        });
    }
}

module.exports = User;