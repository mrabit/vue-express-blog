var express = require('express');
var router = express.Router();
var links = require('../../model/frontend//links');

router.get('/getLinksList', (req, res) => {
  links.getLinksList()
    .then(result => {
      res.json({
        code: 200,
        success: true,
        result
      });
    }, err => {
      res.send(err);
    })
});

module.exports = router;
