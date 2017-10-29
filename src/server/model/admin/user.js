var query = require('../db');

var User = function () {

}

User.login = (params) => {
    var sql = "select * from tp_user where uname = ? and upwd = ?";
    return new Promise((resolve, reject) => {
        query(sql, [params.uname, params.upwd], (err, result) => {
            if (err) reject(err);
            resolve(result.length > 0 ? result[0] : {});
        })
    })
}

module.exports = User;