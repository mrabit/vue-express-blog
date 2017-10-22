var Tags = require('../../model/admin/tags');
var express = require('express');
var router = express.Router();

router.get('/get_all_tags', function (req, res) {
    Tags.get_all_tags().then(result => {
        res.json(result);
    }, err => {
        res.end(err);
    })
})

module.exports = router;