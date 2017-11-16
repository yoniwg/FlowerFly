var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var app = express();
var db = require('./model/database');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());


var index = require('./routes/index');
var rest = require('./routes/rest');
var login = require('./routes/login');
var partials = require('./routes/partials');

const messageSource = require('./i18n/i18n');

// add locals variables for all pages
app.use((req, res, next) => {
    const currentUser = req.session && req.session.passport ? req.session.passport.user : undefined;
    res.locals = {msg: messageSource, currentUser: currentUser};
    next();
});

app.use('/', index);
app.use('/rest', rest);


app.use('/login', login);
app.use('/partials', partials);
app.use('/header-footer', (req,res) => res.render('partials/header-footer'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
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
