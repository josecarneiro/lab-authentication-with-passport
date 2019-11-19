'use strict';

const { Router } = require('express');
const passportRouter = Router();

// Require user model
const User = require('./../models/user');

// Add bcrypt to encrypt passwords
const bcryptjs = require('bcryptjs');

// Add passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passportRouter.get('/sign-up', (req,res,next) =>{
  res.render('./passport/signup');
});

passport.use(
  'sign-up',
  new LocalStrategy((username, password, callback) => {
    bcryptjs
    .hash(password,10)
    .then(hash =>{
      return User.create({
        username,
        passwordHash: hash
      })
    .then(user =>{
      console.log(user);
      callback(null,user);
    })
    .catch(error =>{
      callback(error);
    });
  });
})
);

passportRouter.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/private-page',
    failureRedirect: '/sign-up'
  })
);

passportRouter.get('/sign-in', (req,res,next) =>{
  res.render('./passport/signin');
});

passport.use(
  'sign-in',
  new LocalStrategy((username, password, callback) =>{
    let user;
    User.findOne({username})
    .then((doc) =>{
      user = doc;
      return bcryptjs.compare(password, user.passwordHash);
    })
    .then(isLoggedIn =>{
      if (isLoggedIn) {
        callback(null,user);
      } else {
        callback(new Error('Passwords dont match'));
      }
    })
    .catch(error =>{
      callback(error);
    });
  })
);


passportRouter.post(
  '/sign-in',
  passport.authenticate('sign-in', {
    successRedirect: '/private-page',
    failureRedirect: '/sign-in'
  })
);


const ensureLogin = require('connect-ensure-login');

passportRouter.get(
  '/private-page',
  ensureLogin.ensureLoggedIn('/sign-in'),
  (req, res, next) => {
    const user = req.user;
    res.render('passport/private', {
      user
    });
  }
);

module.exports = passportRouter;
