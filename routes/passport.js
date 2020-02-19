'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model
const User = require('./../models/user');
// Add bcrypt to encrypt passwords
const bcryptjs = require('bcryptjs');
const bcryptSalt = 10;
// Add passport
const passport = require('passport');

const ensureLogin = require('connect-ensure-login');

passportRouter.get('/sign-up', (req, res, next) => {
  res.render('passport/sign-up');
});

passportRouter.post('/sign-up', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === '' || password === '') {
    res.render('passport/sign-up', { message: 'Indicate username and password' });
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render('passport/sign-up', { message: 'The username already exists' });
        return;
      }

      const salt = bcryptjs.genSaltSync(bcryptSalt);
      const hashPass = bcryptjs.hashSync(password, salt);

      const newUser = new User({
        username,
        passwordHashAndSalt: hashPass
      });

      newUser.save(err => {
        if (err) {
          res.render('passport/sign-up', { message: 'Something went wrong' });
        } else {
          res.redirect('/');
        }
      });
    })
    .catch(error => {
      next(error);
    });
});

passportRouter.get('/sign-in', (req, res, next) => {
  res.render('passport/sign-in');
});

passportRouter.post(
  '/sign-in',
  passport.authenticate('sign-in', {
    successRedirect: '/',
    failureRedirect: 'passport/sign-in',
    failureFlash: true,
    passReqToCallback: true
  })
);

passportRouter.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render('passport/private', {
    user
  });
});

passportRouter.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = passportRouter;
