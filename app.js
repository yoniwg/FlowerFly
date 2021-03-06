const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const formData = require("express-form-data");
const multipartyOptions = {
    autoFiles: true
};



const app = express();
const db = require('./model/database');

// view engine setup
app.set('view engine', 'html');

// allow access control
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Credentials','true');
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Auth-Token,Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('supernova'));
// parse a data with connect-multiparty.
app.use(formData.parse(multipartyOptions));
// clear all empty files (size == 0)
app.use(formData.format());
// change file objects to node stream.Readable
app.use(formData.stream());
// union body and files
app.use(formData.union());
// app.use(express.static(path.join(__dirname, 'angular-ui/dist')));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true, cookie : {
    expires: false
}}));
app.use(passport.initialize());
app.use(passport.session());

const login = require('./routes/login');
const rest2 = require('./routes/rest2');
// const index = require('./routes/index');
// var rest_x = require('./routes/rest_x');
// const partials = require('./routes/partials');

// const messageSource = require('./i18n/i18n');

// add locals variables for all pages
// app.use((req, res, next) => {
//     const currentUser = req.session && req.session.passport ? req.session.passport.user : undefined;
//     res.locals = {msg: messageSource, currentUser: currentUser};
//     next();
// });

// app.use('/rest', rest_x);
app.use('/login', login);
app.use('/rest2', rest2);

/*
app.use('/', index);
app.use('/rest', rest);


app.use('/login', login);
app.use('/partials', partials);
app.use('/header-footer', (req,res) => res.render('partials/header-footer'));
*/

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
  res.json("error: " + err.message);
  // res.render('error');
});

module.exports = app;
