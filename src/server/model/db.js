var mysql = require('mysql');
var Connection = require('mysql/lib/Connection');

Connection.prototype.query = function query(sql, values, cb, isConsole) {
    var query = Connection.createQuery(sql, values, cb);
    query._connection = this;
    
    if (typeof cb !== "function") {
        isConsole = cb;
    }

    if (!(typeof sql === 'object' && 'typeCast' in sql)) {
        query.typeCast = this.config.typeCast;
    }

    if (query.sql) {
        query.sql = this.format(query.sql, query.values);
        isConsole && console.log(query.sql);
    }

    this._implyConnect();

    return this._protocol._enqueue(query);
};


var connection = mysql.createConnection({
    // host: '120.24.72.90',
    host: '192.168.0.200',
    user: 'biabia123456',
    password: '519296987',
    database: 'blogs',
    useConnectionPooling: true
});

connection.connect();

module.exports = connection;