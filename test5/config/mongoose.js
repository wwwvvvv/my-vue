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
db.on('open', function () {
// db.on('connected', function () {
    console.log('connect:', config.mongodb);
});
db.once('disconnected', function () {
    console.log('Mongoose connection disconnected.');
});
//
// class Mongo {
//     constructor(dbName, schema) {
//         let Schema = new mongoose.Schema(schema);
//         this.Model = mongoose.model(dbName, Schema);
//         console.log('dbName:', dbName, 'ready!');
//     }
//
//     save(data) {
//         console.log('data', data);
//         return new Promise((resolve, reject) => {
//             let Model = this.Model;
//             let newEntity = new Model(data);
//             console.log('newEntity', newEntity);
//             newEntity.save((err, entity, other) => {
//                 if (err) {
//                     console.log('err', err);
//                     reject(err);
//                     return false;
//                 }
//                 console.log('entity', entity);
//                 resolve(entity);
//             });
//         });
//     }
//
//     findOne(condition) {
//         return new Promise((resolve, reject) => {
//             let Model = this.Model;
//             Model.findOne(condition,function (err,doc) {
//                 if (err) {
//                     reject(err);
//                     return false;
//                 }
//                 resolve(doc);
//             });
//         })
//     }
// }
//
// module.exports = Mongo;





















