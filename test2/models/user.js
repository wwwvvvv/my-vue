var mongoose = require('mongoose');
var UserModel = mongoose.model('UserModel');

class User {
    constructor(name = '', age = '', tel = '', email = '', password = '', avatar = '') {
        this.user = new UserModel({
            name,
            age,
            tel,
            email,
            password,
            avatar
        });
    }

    save(callback) {
        console.log('save', this.user);
        let user = this.user;
        user.save((err, doc) => {
            console.log('err',err);
            if (err) {
                callback(err);
                return;
            }
            console.log('saveDoc', doc);
            callback(null, doc);
        });
    }

    get(params = {}, callback) {
        // let user = this.user;
        UserModel.findOne(params, (err, doc) => {
            if (err) {
                callback(err);
                return false;
            }
            console.log('findDoc：', doc);
            callback(null, doc);
        });
    }
}

module.exports = User;