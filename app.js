'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
const passport = require('passport');
const passUserToTemplate = require('./middleware/pass-user-to-template')
const indexRouter = require('./routes/index');
const passportRouter = require('./routes/passport');
const cookieParser = require("cookie-parser")

const app = express();

// Setup view engine
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
  sassMiddleware({
    src: join(__dirname, 'public'),
    dest: join(__dirname, 'public'),
    outputStyle: process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
    force: process.env.NODE_ENV === 'development',
    sourceMap: false
  })
);
app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(join(__dirname, 'public')));

const mongoose = require('mongoose');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo(expressSession);
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave:true,
    saveUninitialized: false,
    cookie:{
      maxAge: 60*60*24*15,
      secure: process.env.NODE_ENV !=='development',
      sameSite: true,
      httpOnly: true
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);


require('./configure-passport');


app.use(passport.initialize());
app.use(passport.session());

app.use(passUserToTemplate);

/*
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
*/

app.use('/', indexRouter);
app.use('/', passportRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
