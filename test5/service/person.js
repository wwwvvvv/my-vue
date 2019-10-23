var personModel = require('../models/Person');
var mongoose = require('mongoose');
var BaseService = require('./BaseService');

class PersonService extends BaseService {
    constructor() {
        super(personModel);
    }
}

module.exports = new PersonService();