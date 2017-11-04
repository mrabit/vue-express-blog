module.exports = {
    db: {
        host: '120.24.72.90',
        // host: 'biabia123456.tpddns.cn',
        user: 'biabia123456',
        password: '519296987',
        database: 'blogs',
        useConnectionPooling: true
    },
    qiniu: {
        accessKey: "A3lOKkCWVLWlCqw5m3uAh5CV4LbyPh539OgHiIXe",
        secretKey: "JNPtAMXh5mo3EMakgm8tOOumjZhk7k7HRHMS_RLI",
        bucket: "mrabit",
        domain: "http://cdn.mrabit.com/"
    },
    redis: {
        host: '120.24.72.90',
        port: 6379,
        auth_pass: '519296987',
        exp: 60 * 60
    },
    domain: 'https://blog.mrabit.com',
    // domain: 'http://192.168.0.100:8088',
}