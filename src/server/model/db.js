var mysql = require('mysql');
var Connection = require('mysql/lib/Connection');
var db_config = require('../config').db;

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

var connection = mysql.createConnection(db_config);

connection.connect();

module.exports = connection;