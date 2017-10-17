var Article = require('../model/article');
var express = require('express');
var router = express.Router();


router.get('/get_details/:id', function(req, res) {
    var id = req.params.id;
    Article.get_article_by_id(id).then((result) => {
        res.json(result);
    }, (err) => {
        res.end(err);
    });
})

router.get('/get_lists/:start/:length', function(req, res) {
    var params = {
        start: parseInt(req.params.start) || 0,
        length: parseInt(req.params.length) || 5
    }
    Article.get_article_lists(params).then(result => {
        res.json(result);
    }, err => {
        res.end(err);
    })
});

module.exports = router;