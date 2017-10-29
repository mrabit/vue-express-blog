var axios = require('axios');
var WebStorageCache = require('web-storage-cache');
import {
    Message
} from 'element-ui'

var wsCache = new WebStorageCache();

axios.interceptors.request.use(config => {
    // 获取本地储存token,加入请求header
    config.headers['x-access-token'] = (wsCache.get('token') || {}).token;
    // 更新token时间
    wsCache.touch('token', 60 * 5);
    return config
}, err => {
    return Promise.reject(err);
})

axios.interceptors.response.use(config => {
    return config
}, err => {
    var func = _ => {};
    // 错误原因是登录过期,删除本地token,设置错误信息回调为跳转登录页
    if (err.response.data.status == "NOTLOGIN") {
        wsCache.delete('token');
        func = _ => {
            window.location.href = '/admin/login.html';
        }
    }
    // 当前不为登录页,提示错误信息
    if (window.location.pathname != "/admin/login.html") {
        Message({
            message: err.response.data.message,
            type: 'error',
            onClose: func
        });
    }
    return Promise.reject(err);
})

export default axios;