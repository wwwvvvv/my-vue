var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{type: Schema.Types.ObjectId, ref: 'story'}]
});

var modelName = 'person';
var personModel = mongoose.model(modelName, personSchema);
module.exports = personModel;