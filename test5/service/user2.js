const userModel = require('../models/User');
const BaseService = require('./BaseService');

class UserService extends BaseService {
    constructor () {
        super(userModel);
    }

    insert (data) {
        return this.insertOne(data);
    }

    get (condition) {
        return this.findOne(condition);
    }
}

module.exports = new UserService();