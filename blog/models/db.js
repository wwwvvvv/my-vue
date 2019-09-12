var settings = require('../settings');
var mongodb = require('mongodb');
var {
    Db,
    Connection,
    Server
} = mongodb;
var MongoClient = mongodb.MongoClient;
// module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});
module.exports = new MongoClient(new Server(settings.host, settings.port));