var qiniu_model = require('../model/qiniu');
var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/fetch_file', function(req, res) {
    var qiniu = new qiniu_model();
    qiniu.fetch_file_by_url(req.query.url).then(result => {
        res.json(result);
    })
})

router.post('/base64', function(req, res) {

    var qiniu = new qiniu_model();
    qiniu.upload_img_by_base64(req.query.base64_string.replace(' ', '+'))
        .then(result => {
            res.json(typeof result == "string" ? JSON.parse(result) : result);
        }, err => {
            res.json(err);
        })

})

module.exports = router;