'use strict';

const { Router } = require('express');
const passportRouter = Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// require('./../passportcfg');

// Require user model

// Add bcrypt to encrypt passwords

// Add passport

const ensureLogin = require('connect-ensure-login');

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

passportRouter.get(
  '/private-page',
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const user = req.user;
    res.render('passport/private', {
      user
    });
  }
);
passportRouter.get('/signup', (req, res, next) => {
  res.render('./passport/signup');
});

passport.use(
  'signup',
  new LocalStrategy(
    { username: 'username' },
    (username, password, callback) => {
      bcrypt
        .hash(password, 10)
        .then(hash => {
          return User.create({
            username,
            passwordHash: hash
          });
        })
        .then(user => {
          callback(null, user);
        })
        .catch(error => {
          // ...
          callback(error);
        });
    }
  )
);

passport.use(
  'signin',
  new LocalStrategy(
    { username: 'username' },
    (username, password, callback) => {
      let user;
      User.findOne({
        username
      })
        .then(document => {
          user = document;

          return bcrypt.compare(password, user.passwordHash);
        })
        .then(passwordMatchesHash => {
          if (passwordMatchesHash) {
            callback(null, user);
          } else {
            callback(new Error('Passwords dont match'));
          }
        })
        .catch(error => {
          callback(error);
        });
    }
  )
);
let userId;
passportRouter.post('/signin', passport.authenticate('signin'), (req, res) => {
  userId = req.user._id;
  res.redirect('/');
});

passportRouter.post('/signup', passport.authenticate('signup'), (req, res) => {
  userId = req.user._id;
  res.redirect('/');
});

passportRouter.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

// passportRouter.post(
//   '/signup',
//   passport.authenticate('signup', {
//     successRedirect: '/passport/private',
//     failureRedirect: '/signup'
//   })
// );

// passportRouter.post('/login', passport.authenticate('local'), function(
//   req,
//   res
// ) {
//   // If this function gets called, authentication was successful.
//   // `req.user` contains the authenticated user.
//   res.redirect('/users/' + req.user.username);
// });

// passportRouter.post('/signup', (req, res, next) => {
//   bcrypt
//     .hash(req.body.password, 10)
//     .then(hash => {
//       User.create({ username: req.body.username, passwordHash: hash });
//       res.redirect('/');
//     })
//     .catch(error => {
//       next(error);
//     });
// });

module.exports = passportRouter;
