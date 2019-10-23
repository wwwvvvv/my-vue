var mongoose = require('mongoose');
var BaseService = require('./BaseService');
var storyModel = require('../models/Story');

class StoryService extends BaseService {
    constructor() {
        super(storyModel);
    }

    findOne(query, cb) {
        this.Model.findOne(query)
            .populate({path: 'author', select: 'name age'})
            .exec((err, story) => {
                console.log('story', story);
                cb(err, story);
            });
    }


}

var newStory = new StoryService();
module.exports = newStory;
