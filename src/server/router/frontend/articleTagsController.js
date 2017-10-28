var ArticleTags = require('../../model/frontend/articleTags');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    ArticleTags.get_tags().then(result => {
        res.json(result);
    }, err => {
        res.send(err);
    })
})

module.exports = router;