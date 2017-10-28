var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var history = require('connect-history-api-fallback');
var app = express();

app.set('secret', 'mrabit');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));
app.use(cookieParser());

// app.use(history({
//     rewrites: [{
//         from: /^(\/[^\s]*\.html|\/$)/,
//         to: '/'
//     }]
// }));

module.exports = app;