const Mongo = require('../config/mongoose');
let cache = {};
let dbName = 'dbName';
class UserService extends Mongo{
    constructor (){
        let _schema = {
            name: String,
            age: String,
            tel: String,
            email: String,
            password: String,
            avatar: String,
            time: {
                type: Number,
                default: Date.now()
            }
        };
        super(dbName, _schema);
    }

    static getInstance () {
        let service;
        if (cache.hasOwnProperty(dbName)) {
            service = cache[dbName]
        } else {
            service = new UserService();
            cache[dbName] = service;
        }
        return service;
    }
}

class User {
    save(data, cb) {
        UserService.getInstance().save(data, cb);
    }

    get(condition, cb) {
        UserService.getInstance().findOne(condition, cb);
    }
}


module.exports = User;


