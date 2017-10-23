var qiniu_model = require('../model/qiniu');
var express = require('express');
var router = express.Router();

router.get('/upload', function(req, res) {
    var qiniu = new qiniu_model();
    qiniu.fetch_file_by_url("https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png").then(result => {
        res.json(result);
    })
})

module.exports = router;