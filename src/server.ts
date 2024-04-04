/*---------- Modules ----------*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');

require("dotenv").config();
require('../config/database');
require('../config/passport');


/*---------- Routers ----------*/
const indexRouter = require('./routes/index');
const leaderboardRouter = require('./routes/leaderboard');


/*---------- Express App ----------*/
const app = express();


/*---------- Middlware ----------*/
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// OAuth session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

// Passport session
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req: any, res: any, next: any) {
  res.locals.user = req.user;
  next();
});


/*---------- Routes ----------*/
app.use('/', indexRouter);
app.use('/leaderboard', leaderboardRouter);


/*---------- Error Handling ----------*/
// catch 404 and forward to error handler
app.use(function(req: any, res: any, next: any) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: any, res: any, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


/*---------- App Export ----------*/
module.exports = app;
