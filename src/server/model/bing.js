var mysql = require('./db');

var Bing = function() {

}

module.exports = Bing;

Bing.add_img = function(params) {

}

Bing.get_image_by_time = function(time) {
    var sql = "select * from tp_bing where img_time = ?";
    return new Promise((resolve, reject) => {
        mysql.query(sql, time, function(err, result) {
            if (err) reject(err.message);
            resolve(result);
        });
    })
}

Bing.insert_imgInfo = function(params) {
    var map = [
        params.img_real_url,
        params.img_url_480,
        params.img_url,
        params.img_time,
        params.img_title
    ];
    var sql = "INSERT INTO `tp_bing` (`img_real_url`,`img_url_480`,`img_url`,`img_time`,`img_title`)\
    VALUES (?,?,?,?,?)";
    return new Promise((resolve, reject) => {
        mysql.query(sql, map, (err, result) => {
            if (err) reject(err.message);
            resolve(result);
        })
    })
}