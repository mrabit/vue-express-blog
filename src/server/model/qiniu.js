var qiniu = require("qiniu");
var request = require('request');
var qiniu_config = require('../config')['qiniu'];
var url = require('url');



var qiniu_model = function () {
    //需要填写你的 Access Key 和 Secret Key
    console.log(qiniu_config);
    this.mac = new qiniu.auth.digest.Mac(qiniu_config.accessKey, qiniu_config.secretKey);
    //要上传的空间
    this.bucket = qiniu_config.bucket;
}

module.exports = qiniu_model;

qiniu_model.prototype.fetch_file_by_url = function (filePath, fileName) {
    //上传到七牛后保存的文件名
    if (!fileName) {
        var reg = /.*\/(.*)/;
        fileName = filePath.replace(reg,"$1");
        // fileName = (Date.parse(new Date()) / 1000) + '.jpg';
    }

    var entry = this.bucket + ":" + fileName;
    var encodedEntryURI = qiniu.util.urlsafeBase64Encode(entry);

    var pic = new Buffer(filePath).toString('base64')
    var basePic = qiniu.util.base64ToUrlSafe(pic)

    var url = 'http://iovip.qbox.me/fetch/' + basePic + '/to/' + encodedEntryURI;

    var token = qiniu.util.generateAccessToken(this.mac, url);

    var options = {
        method: 'POST',
        url: url,
        headers: {
            authorization: token,
            'content-type': 'application/x-www-form-urlencoded'
        }
    }
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error) reject(error);
            resolve(body);
        })
    })
}