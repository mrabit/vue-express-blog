var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    if (process.env.NODE_ENV == 'development') {
        res.render('index_dev', { title: 'Express' });
        return;
    }
    res.render('index', { title: 'Express' });

});

module.exports = router;