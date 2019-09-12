var MongoClient = require('mongodb').MongoClient;
var settins = require('../settings');

class Post {
    constructor(name, title, post) {
        this.name = name;
        this.title = title;
        this.post = post;
    }

    formatTimeStr(time) {
        return time < 10 ? `0${time}` : time;
    }

    save(callback) {
        let nowTime = new Date();
        let time = {
            year: nowTime.getFullYear(),
            month: this.formatTimeStr(nowTime.getMonth() + 1),
            date: this.formatTimeStr(nowTime.getDate()),
            hour: this.formatTimeStr(nowTime.getHours()),
            minute: this.formatTimeStr(nowTime.getMinutes()),
            second: this.formatTimeStr(nowTime.getSeconds())
        };
        time.time = `${time.year}/${time.month}/${time.date} ${time.hour}:${time.minute}:${time.second}`;
        let post = {
            name: this.name,
            title: this.title,
            post: this.post,
            time
        };
        MongoClient.connect(settins.url,(err, client) => {
            if (err) {
                client.close();
                return callback(err);
            }
            var db = client.db(settins.db);
            db.collection('posts', (err, collection) => {
                if (err) {
                    client.close();
                    return callback(err);
                }
                collection.insertOne(post, {safe: true}, (err, post) => {
                    client.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, post);
                });
            });
        });
    }

    get(name, callback) {
        MongoClient.connect(settins.url, (err, client) => {
            if (err) {
                client.close();
                return callback(err);
            }
            let db = client.db(settins.db);
            db.collection('posts', (err, collection) => {
                if (err) {
                    client.close();
                    return callback(err);
                }
                let query = {};
                if (name) {
                    query.name = name;
                }
                collection.find(query).sort({time: -1}).toArray((err, docs) => {
                    client.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, docs);
                });
            });
        });
    }
}

module.exports = Post;