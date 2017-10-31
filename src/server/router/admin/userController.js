var express = require('express');
var router = express.Router();
var md5 = require('md5');
var jwt = require('jsonwebtoken');
var app = require('../../app');
var User = require('../../model/admin/user');
var redis = require('../../model/redis_db');
var exp = require('../../config')['redis']['exp'];
var common = require('../../common');

router.post('/login', function(req, res) {
    var user = {
        uname: req.body.uname,
        upwd: md5(req.body.upwd)
    }
    User.login(user).then(result => {
        // 登录失败
        if (result.uname != user.uname || result.upwd != user.upwd) {
            return Promise.reject({
                success: false,
                code: 101,
                message: '登录失败,帐号或密码错误.'
            });
        } else {
            // 生成token
            var token = jwt.sign({
                    uname: result.uname,
                    upwd: result.upwd,
                    id: result.id,
                }, app.get('secret'), {
                    expiresIn: exp
                })
                // 设置token到redis
            return redis.set(req.body.uname, token).then(_ => {
                // 设置redis值的过期时间
                return redis.expire(req.body.uname, exp).then(_ => {
                    return {
                        result,
                        token
                    }
                });
            });
        }
    }, err => {
        res.json(err);
    }).then(data => {
        // 更新登录状态时间
        return User.update_login_time_by_id(data.result.id, common.getClientIp(req)).then(status => {
            if (status.changeRows < 1) {
                return Promise.reject({
                    code: 106,
                    success: false,
                    message: '登录信息更新失败.'
                })
            }
            res.json({
                success: true,
                message: '登录成功.',
                token: data.token,
                user: data.result
            })
        })
    }).catch(err => {
        res.json(err)
    })
})

router.post('/logout', function(req, res) {
    var key = req.body.key;
    redis.del(key).then(result => {
        res.json({
            success: true,
            code: 200
        });
    }, err => {
        res.sendStatus(403).json(err);
    })
})

router.get('/profile', (req, res) => {
    User.get_profile_by_id(req.query.id).then(result => {
        res.json({
            success: true,
            code: 200,
            result
        })
    }, err => {
        res.json(err)
    })
})

router.post('/edit_profile', (req, res) => {
    User.edit_profile(req.body).then(result => {
        res.json({
            success: true,
            code: 200,
            result
        });
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