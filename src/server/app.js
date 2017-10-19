var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var history = require('connect-history-api-fallback');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// app.use(history({
//     rewrites: [{
//         from: /^(\/[^\s]*\.html|\/$)/,
//         to: '/'
//     }]
// }));

app.use('/', require('./router/router'));
app.use('/article', require('./router/articleController'));
app.use('/article_tags', require('./router/articleTagsController'));

app.use('/admin/article', require('./router/admin/articleController'));

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
    var regexp = /(^\/[^\s]*\.html|^\/$)/;

    if (regexp.test(req.url)) {
        res.status(200);
        res.render(process.env.NODE_ENV === 'development' ? 'index_dev' : 'index');
        return;
    }
    res.status(404);
    res.render('404');
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