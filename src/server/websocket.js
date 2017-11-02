var websocket = require('ws');
var common = require('./common');

var wss;
module.exports = {
    // 在/bin/www文件内初始化websocket
    init: (server) => {
        wss = new websocket.Server({
            server
        });
        wss.on('connection', (ws, req) => {
            console.log(common.getClientIp(req));
            ws.ip = common.getClientIp(req);
            ws.on('message', (msg) => {
                ws.token = msg;
            })
        })
    },
    // 广播消息 ws客户端token校验,非当前token直接踢下线
    broadcast: (ip, token) => {
        wss.clients.forEach(client => {
            if (client.token != token)
                client.send(JSON.stringify({
                    code: 107,
                    message: '您已被' + ip + '挤下线'
                }));
        })
    }
}