var jwt = require('jsonwebtoken');
var md5 = require('md5');
var app = require('../app');

module.exports = function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        //验证token是否失效
        new Promise((resolve, reject) => {
                jwt.verify(token, app.get('secret'), function(err, decoded) {
                    if (err) {
                        reject({
                            code: 102,
                            message: 'token无效,暂时无法访问该页面.',
                        });
                    }
                    resolve(decoded);
                })
            }).then(decoded => {
                //验证是否与当前token一致
                return redis.validator(decoded.uname, token).then(result => {
                    if (!result) {
                        return Promise.reject({
                            code: 103,
                            message: '登录状态失效,请重新登录.'
                        });
                    }
                    return decoded;
                })
            }).then(decoded => {
                //更新当前字段过期时间
                return redis.expire(decoded.uname).then(flag => {
                    if (flag) {
                        req.decoded = decoded
                        next()
                    } else {
                        return Promise.reject({
                            code: 104,
                            message: '登录状态失效,请重新登录.'
                        });
                    }
                })
            }).catch(ex => {
                err_page(res, ex);
            })
            // 防止控制台报错
            .catch()
    } else {
        // 接收token不存在
        err_page(res, {
            code: 105,
            message: 'token数据不存在,暂时无法访问该页面.'
        });
    }
}