var mysql = require('../db');

var Article = function () {

}

Article.get_article_lists = function (params) {
    params['start'] = (params.page - 1) * params.length;
    var sql = "SELECT a.id,`title`,`is_html`,`reprint_url`,`private`,u.uname,\
    FROM_UNIXTIME( create_time,'%Y-%m-%d %H:%i:%S' ) as release_time FROM `tp_article` as a \
    left join tp_user as u on create_user_id = u.id";
    var map = [];
    if (params.title) {
        map.push("`title` LIKE '%" + params.title + "%'");
    }
    if (params.startime && params.endtime) {
        map.push("( `create_time` >= " + params.startime + " AND `create_time` <= " + params.endtime + "  )");
    }
    var map_str = "";
    for (var i in map) {
        map_str += (map[i] + " AND ");
    }
    if(map.length){
        sql += " WHERE ";
    }
    map_str = map_str.substring(0, map_str.length - (" AND ").length);
    sql += (map_str + " ORDER BY create_time desc LIMIT ?,?");
    
    return new Promise((resolve, reject) => {
        mysql.query(sql, [params.start, params.length], function (err, result) {
            if(err) reject(err.message);
            resolve(result);
        })
    })
}

Article.get_article_count = function(params) {
    var sql = 'SELECT count(*) as count from tp_article';
    var map = [];
    if (params.title) {
        map.push("`title` LIKE '%" + params.title + "%'");
    }
    if (params.startime && params.endtime) {
        map.push("( `create_time` >= " + params.startime + " AND `create_time` <= " + params.endtime + "  )");
    }
    var map_str = "";
    for (var i in map) {
        map_str += (map[i] + " AND ");
    }
    if(map.length){
        sql += " WHERE ";
    }
    sql += (map_str.substring(0, map_str.length - (" AND ").length));
    return new Promise((resolve, reject) => {
        mysql.query(sql, (err, result) => {
            if (err) reject(err.message);
            resolve(result[0]['count']);
        }, false)
    })
}

module.exports = Article;