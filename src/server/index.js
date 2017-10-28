var express = require('express');
var path = require('path');
var app = require('./app');

// 配合vue渲染页面
app.use('/', require('./router/router'));

// 前端页面路由
app.use('/article', require('./router/frontend/articleController'));
app.use('/article_tags', require('./router/frontend/articleTagsController'));
app.use('/bing', require('./router/frontend/bingController'));

// 后台登录
app.use('/admin', require('./router/admin/userController'));

// 后台页面路由
app.use('/admin/article', require('./router/admin/articleController'));
app.use('/admin/tags', require('./router/admin/tagsController'));

// 上传
app.use('/upload', require('./router/uploadController'));

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV == 'development') {
    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var config = require('../../build/webpack.dev.conf');

    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true
        },
    }))

    app.use(webpackHotMiddleware(compiler))
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    // var regexp = /(^\/[^\s]*\.html|^\/admin[\s|\/]$|^\/$)/;

    // if (regexp.test(req.url)) {
    //     res.status(200);
    //     res.render(process.env.NODE_ENV === 'development' ? 'index_dev' : 'index');
    //     return;
    // }
    // res.status(404);
    // res.render('404');
    res.status(200);
    res.render(process.env.NODE_ENV === 'development' ? 'index_dev' : 'index');
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;