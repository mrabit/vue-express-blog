var query = require('../db');

var User = _ => {}

User.login = (params) => {
    var sql = "select * from tp_user where uname = ? and upwd = ?";
    return new Promise((resolve, reject) => {
        query(sql, [params.uname, params.upwd], (err, result) => {
            if (err) reject(err);
            resolve(result.length > 0 ? result[0] : {});
        })
    })
}

User.get_profile_by_id = (id = 1) => {
    var sql = "select id, uname, blog_name, weibo, github, twitter, user_header_img, last_login_ip, last_login_time from tp_user where id = ?";
    return new Promise((resolve, reject) => {
        query(sql, id, (err, result) => {
            if (err) reject(err);
            resolve(result.length > 0 ? result[0] : {});
        })
    })
}

User.edit_profile = (params) => {
    var sql = "update tp_user set uname=?,blog_name=?,weibo=?,github=?,twitter=?,user_header_img=? where id=?";
    var map = [
        params.uname,
        params.blog_name,
        params.weibo,
        params.github,
        params.twitter,
        params.user_header_img,
        params.id
    ]
    return new Promise((resolve, reject) => {
        query(sql, map, function(err, result) {
            if (err) reject(err.message);
            resolve(result);
        });
    })
}

User.update_login_time_by_id = (id, ip) => {
    var sql = 'update tp_user set last_login_ip=?, last_login_time=? where id=?';
    var map = [
        ip,
        Date.parse(new Date()) / 1000,
        id
    ]
    return new Promise((resolve, reject) => {
        query(sql, map, (err, result) => {
            if (err) reject(err);
            resolve(result);
        }, true);
    })
}

module.exports = User;