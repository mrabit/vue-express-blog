var qiniu = require("qiniu")
var request = require('request')
var qiniu_config = require('../config')['qiniu'];

//需要填写你的 Access Key 和 Secret Key
var mac = new qiniu.auth.digest.Mac(qiniu_config.accessKey, qiniu_config.secretKey);
console.log(mac)
    //要上传的空间
var bucket = qiniu_config.bucket

//上传到七牛后保存的文件名
var d = new Date()
    // var key = 'gm-' + d.getTime() + '.jpg'
var key = (Date.parse(new Date()) / 1000) + '.jpg'


var entry = bucket + ":" + key
var encodedEntryURI = qiniu.util.urlsafeBase64Encode(entry)

var pic = new Buffer('https://blog.ssliuq.com/Uploads/Picture/2017-10-04/59d4ad87be2c5.jpg').toString('base64')
var basePic = qiniu.util.base64ToUrlSafe(pic)

var token = qiniu.util.generateAccessToken(mac, 'http://iovip.qbox.me/fetch/' + basePic + '/to/' + encodedEntryURI)
console.log(token)

var options = {
    method: 'POST',
    url: 'http://iovip.qbox.me/fetch/' + basePic + '/to/' + encodedEntryURI,
    headers: {
        authorization: token,
        'content-type': 'application/x-www-form-urlencoded'
    }
}

request(options, function(error, response, body) {
    if (error) throw new Error(error)
    console.log(body)
})