'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model
const User = require('../models/user'); 
// Add bcrypt to encrypt passwords
const bcryptjs = require("bcryptjs");
// Add passport
const passport = require("passport");

const ensureLogin = require('connect-ensure-login');

const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;



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
  res.render('passport/signup');
});

passportRouter.post('/signup',
  passport.authenticate('/signup', {
    successRedirect: '/login',
    failureRedirect: '/signup'
  })
);

passportRouter.get('/login', (req, res, next) => {
  res.render('passport/login');
});

passportRouter.post('/login',
  passport.authenticate('/login', {
    successRedirect: '/private-page',
    failureRedirect: '/login'
  })
);

// passportRouter.post('/sign-out', (req, res, next) => {
//   req.logout();
//   res.redirect('/');
// });

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
  '/signup',
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

passport.use(
  '/login',
  new LocalStrategy( (username, password, cb) => {
    let user;
    User.findOne({
      username
    })
      .then(document => {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      })
      .then(passwordMatchesHash => {
        if (passwordMatchesHash) {
          cb(null, user);
        } else {
          cb(new Error('Passwords dont match'));
        }
      })
      .catch(error => {
        cb(error);
      });
  })
);



module.exports = passportRouter;
