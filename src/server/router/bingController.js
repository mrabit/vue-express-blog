var express = require('express');
var router = express.Router();
var Bing = require('../model/bing');
var moment = require('moment');
var request = require('request');
var qiniu_model = require('../model/qiniu');
var qiniu_config = require('../config')['qiniu'];


var get_bing_json = (params) => {
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

/***
 * 新增bing图片
 * @param string d (ps:-1:明天,0:今天,1:昨天,2:前天...........)
 * @return mixed
 */
router.get('/add_info', (req, res) => {
    var d = req.query.d || 0;
    var time = moment().subtract(d, 'days').format('YYYY-MM-DD');
    Bing.get_image_by_time(time).then(result => {
        if (result.length > 0) {
            // 数据库已存在当前值,取出;
            res.json(result[0]);
            return Promise.reject({
                notRealPromiseException: true,
            });
        } else {
            return {
                idx: d,
                format: 'js',
                n: '1'
            }
        }
    }, err => {
        res.json(err);
    }).then(get_bing_json).then(bing_data => {
        //url地址
        var urlbase = 'http://s.cn.bing.net' + bing_data.images[0]['urlbase'];
        //简介
        var copyright = bing_data.images[0]['copyright'];
        //1920地址
        var img_url = urlbase + '_1920x1080.jpg';
        //480地址
        var img_url_480 = urlbase + '_480x640.jpg';

        var qiniu = new qiniu_model();
        //需要存入七牛云的数据
        var img_url_arr = [{
                url: img_url,
                key: '1920.' + time + '.jpg'
            },
            {
                url: img_url_480,
                key: '480.' + time + '.jpg'
            }
        ]

        //需要存入数据库的数据
        var params = {
            img_real_url: img_url,
            img_time: time,
            img_title: copyright
        }
        return img_url_arr.reduce((p, next, index) => {
            return p.then(_ => {
                //存入数据到七牛云储存
                return qiniu.fetch_file_by_url(next.url, next.key).then(result => {
                    //图片保存至七牛云存储成功
                    if (!result.error) {
                        if (index == 0) {
                            //1920图片
                            params.img_url = qiniu_config['domain'] + result.key;
                        } else {
                            //480图片
                            params.img_url_480 = qiniu_config['domain'] + result.key;
                        }
                    }
                })
            })
        }, new Promise(resolve => resolve())).then(_ => {
            if (params.img_url == null || params.img_url_480 == null) {
                res.json({
                    code: 500
                })
            } else {
                return params;
            }
        })
    }).then(params => {
        Bing.insert_imgInfo(params).then(result => {
            params['id'] = result.insertId;
            res.json(params);
        }, err => {
            res.json(err);
        })
    }).catch(ex => {
        if (ex.notRealPromiseException) {
            // 一切正常，只是通过 catch 方法来中止 promise chain
            // 也就是中止 promise p2 的执行
            return true;
        }
        // 真正发生异常
        return false;
    });
})

module.exports = router;