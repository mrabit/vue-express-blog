// var Upload = require('../model/qiniu');
var express = require('express');
var router = express.Router();

router.get('/upload', function(req, res) {
    require('../model/qiniu');
    res.end("success");
})

module.exports = router;