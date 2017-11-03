var query = require('../db');

module.exports = {
    checkAuth(OPEN_ID){
        var sql = 'select * from tp_wx where OPEN_ID = ?';
        return new Promise((resolve, reject) => {
            connection.query(sql, OPEN_ID, (err, result) => {
                if (err) reject(err);
                resolve(result);
            })
        })
    }
}