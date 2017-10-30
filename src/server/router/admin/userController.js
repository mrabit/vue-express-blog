var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var app = require('../../app');
var User = require('../../model/admin/user');
var redis = require('../../model/redis_db');
var exp = require('../../config')['redis']['exp'];

router.post('/login', function(req, res) {
    var user = {
        uname: req.body.uname,
        upwd: md5(req.body.upwd)
    }
    User.login(user).then(result => {
        if (result.uname != user.uname || result.upwd != user.upwd) {
            res.json({
                success: false,
                code: 101,
                message: '登录失败,帐号或密码错误.'
            })
        } else {
            var token = jwt.sign({
                uname: result.uname,
                upwd: result.upwd,
                id: result.id,
            }, app.get('secret'), {
                expiresIn: exp
            })
            redis.set(req.body.uname, token).then(_ => {
                return redis.expire(req.body.uname, exp)
            }).then(_ => {
                res.json({
                    success: true,
                    message: '登录成功.',
                    token: token,
                    user: result
                })
            }).catch(err => {
                res.json({
                    success: false,
                    err
                })
            });
        }
    }, err => {
        res.json(err);
    })
})

router.post('/check_token', function(req, res) {
    res.json({
        success: true,
        code: 200
    })
})

module.exports = router;