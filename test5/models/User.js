const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    age: String,
    tel: String,
    email: String,
    password: String,
    avatar: String
});
// model 是构造document的class,
const me = mongoose.model('user', userSchema);
module.exports = me;
