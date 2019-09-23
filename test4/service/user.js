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
    save(data) {
        console.log('execute-here')
        return UserService.getInstance().save(data);
    }

    get(condition) {
        return UserService.getInstance().findOne(condition);
    }
}


module.exports = User;


