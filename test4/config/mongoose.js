var mongoose = require('mongoose');
var Promise = require('bluebird');
var config = require('./config');

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(config.mongodb, options);
mongoose.Promise = Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.on('open', function () {
db.on('connected', function () {
    console.log('connect:', config.mongodb);
});
db.once('disconnected', function () {
    console.log('Mongoose connection disconnected.');
});

class Mongo {
    constructor(dbName, schema) {
        let Schema = new mongoose.Schema(schema);
        this.Model = mongoose.model(dbName, Schema);
        console.log('dbName:', dbName, 'ready!');
    }

    save(data, cb) {
        console.log('data', data);
        let Model = this.Model;
        let newEntity = new Model(data);
        newEntity.save((err, entity, other) => {
            cb(err, entity);
        });
    }

    findOne(condition, cb) {
        let Model = this.Model;
        Model.findOne(condition,cb);
    }
}

module.exports = Mongo;





















