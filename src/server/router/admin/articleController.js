var Article = require('../../model/admin/article');
var express = require('express');
var router = express.Router();

router.get('/get_lists/:page/:length', function (req, res) {
    var params = {
        startime: req.query.startime || null,
        endtime: req.query.endtime || null,
        title: req.query.title || null,
        page: parseInt(req.params.page) || 1,
        length: parseInt(req.params.length) || 10
    }
    Article.get_article_lists(params).then(aaData => {
        return Article.get_article_count(params).then(count => {
            return {
                count: count,
                article_lists: aaData
            }
        })
    }, err => {
        res.end(err);
    }).then(result => {
        res.json(result);
    });
})

module.exports = router;