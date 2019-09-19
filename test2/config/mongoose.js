var mongoose = require('mongoose');
var config = require('./config');

module.exports = function () {
    var db = mongoose.connect(config.mongodb);

    var connection = mongoose.connection;
    connection.on('error', function () {
        console .log('mongodb 连接错误!')
    })
    require('../models/user.server.model');
    return db;
}