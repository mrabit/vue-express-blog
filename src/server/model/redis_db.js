var redis = require('redis');
var db_config = require('../config').redis;
var redisClient = redis.createClient(db_config.port, db_config.host);

redisClient.on('error', function (err) {
    console.log('Error ' + err);
});

redisClient.on('connect', function () {
    console.log('Redis is ready');
});

module.exports = {
    redisClient: redisClient,
    // 当前键是否存在
    exists: (key) => {
        return new Promise((resolve, reject) => {
            redisClient.exists(key, (err, result) => {
                if (err) reject(err);
                resolve(!!result);
            })
        })
    },
    // 设置(更新)过期时间
    expire: (key, time = 60) => {
        return new Promise((resolve, reject) => {
            redisClient.expire(key, time, (err, result) => {
                if (err) reject(err);
                resolve(!!result);
            })
        })
    },
    // 验证是否与数据库中token一致
    validator: (key, token) => {
        return new Promise((resolve, reject) => {
            redisClient.get(key, (err, result) => {
                if (err) reject(err);
                resolve(token == result);
            })
        })
    }
}