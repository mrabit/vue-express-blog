var mysql = require('./db');
var util = require('util');

var Article = function(params) {
    this.id = params.id;
}

/*** 通过id查找指定文章
 * @param int   id  指定文章id
 * @return promise  返回需要的数据
 */
Article.get_article_by_id = function(id) {
    var sql = 'SELECT ta.id,title,reprint_url,is_html,content,tu.uname,\
        FROM_UNIXTIME( create_time, \'%Y-%m-%d %H:%i:%s\' ) as create_time,\
        FROM_UNIXTIME( create_time, \'%m月%d,%Y\' ) as release_time,\
        FROM_UNIXTIME( modify_time, \'%Y-%m-%d %H:%i:%s\' ) as modify_time from tp_article as ta\
        LEFT JOIN tp_user as tu on tu.id = ta.create_user_id';
    if (id) {
        sql += " where ta.id = ?";
    }
    return new Promise((resolve, reject) => {
        mysql.query(sql, id, function(err, result) {
            if (err) reject(err.message);
            resolve({
                article: result,
                id: id
            });
        }, false)
    }).then(this.get_article_adjoin_by_id);
}

/*** 获取相邻的文章id
 * @param array id                  当前文章的id
 * @param array article             当前文章的内容
 * @return array {article, adjoin}  获取到的Array数据
 */
Article.get_article_adjoin_by_id = function(params) {
    var sql = "SELECT * FROM ( SELECT `id`,`title` FROM `tp_article` WHERE `id` < ? AND `private` <> 1 ORDER BY id desc LIMIT 1   )\
     t1 UNION ALL SELECT * FROM ( SELECT `id`,`title` FROM `tp_article` WHERE `id` > ? AND `private` <> 1 ORDER BY id LIMIT 1   ) t2";
    return new Promise((resolve, reject) => {
        mysql.query(sql, [params.id, params.id], function(err, result) {
            if (err) reject(err.message);
            //只有一条数据
            if (result.length == 1) {
                var article_id = result[0]['id'];
                if (params.id > article_id) {
                    //上条数据,在其末尾添加空数组
                    result.push(null);
                } else {
                    //下条数据,在其开头添加空数组
                    result.unshift(null);
                }
            }
            resolve({
                article: params.article,
                adjoin: result
            });
        }, true);
    })
}

/*** 获取文章列表
 * @param array $params   参数:start 开始位置  length 长度
 * @return mixed    获取到的Array数据
 */
Article.get_article_lists = function(params) {
    var sql = "SELECT a.id,`title`,`reprint_url`,`content`,u.uname,FROM_UNIXTIME( create_time,'%Y-%m-%d %H:%i:%s' )\
      as create_time,FROM_UNIXTIME( create_time,'%m月%d,%Y' ) as release_time FROM `tp_article` as\
       a left join tp_user as u on create_user_id = u.id  WHERE `private` <> '1' ORDER BY create_time\
        desc LIMIT ?,?";
    return new Promise((resolve, reject) => {
        mysql.query(sql, [params.start, params.length], function(err, result) {
            if (err) reject(err.message)
            resolve(result);
        }, true);
    })
}



module.exports = Article;