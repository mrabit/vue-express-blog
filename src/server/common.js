module.exports = {
    getClientIp: (req) => {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    },
    get_bing_json: (params) => {
        var options = {
            method: 'GET',
            url: 'http://cn.bing.com/HPImageArchive.aspx',
            headers: {
                'Content-type': 'text/html; charset=utf-8'
            },
            qs: params
        }
        return new Promise((resolve, reject) => {
            request(options, (err, response, body) => {
                if (err) reject(err);
                resolve(JSON.parse(body));
            })
        })
    }
}