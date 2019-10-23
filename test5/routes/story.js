var express = require('express');
var router = express.Router();
var Common = require('../libs/Common');

var newStory = require('../service/story');
var newPerson = require('../service/person');


router.get('/', function (req, res, next) {
    newStory.findOne({title: 'Casino Royale'}, function (data, err) {
        console.log(data);
        // Common.resJson(res, err, data);
    })
});

module.exports = router;

