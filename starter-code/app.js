'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const passportRouter = require('./routes/passport');
const User = require('./models/user');

const app = express();

const session = require("express-session");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => {
      cb(null, user);
    })
    .catch(error => {
      cb(error);
    });
});

passport.use(
  'signup',
  new LocalStrategy( (username, password, cb) => {
    bcryptjs
      .hash(password, 10)
      .then(hash => {
        return User.create({
          username,
          passwordHash: hash
        });
      })
      .then(user => {
        cb(null, user);
      })
      .catch(error => {
        // ...
        cb(error);
      });
  })
);

// passport.use(
//   'sign-in',
//   new LocalStrategy({ usernameField: 'email' }, (email, password, cb) => {
//     let user;
//     User.findOne({
//       email
//     })
//       .then(document => {
//         user = document;
//         return bcryptjs.compare(password, user.passwordHash);
//       })
//       .then(passwordMatchesHash => {
//         if (passwordMatchesHash) {
//           cb(null, user);
//         } else {
//           cb(new Error('Passwords dont match'));
//         }
//       })
//       .catch(error => {
//         cb(error);
//       });
//   })
// );


app.use(passport.initialize());
app.use(passport.session());

// Setup view engine
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: join(__dirname, 'public'),
    dest: join(__dirname, 'public'),
    outputStyle:
      process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
    sourceMap: false
  })
);
app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(join(__dirname, 'public')));

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
