var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'person'},
    title: String,
    fans: [{type: Schema.Types.ObjectId, ref: 'person'}]
});

var modelName = 'story';
var storyModel = mongoose.model(modelName, storySchema);
module.exports = storyModel;