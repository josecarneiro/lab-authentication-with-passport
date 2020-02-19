'use strict';

const { Router } = require('express');
const passportRouter = new Router();

// Add passport
const passport = require('passport');


//SIGN IN:
passportRouter.get('/sign-in', (req, res, next) => {
  res.render('passport/sign-in');
});

passportRouter.post(
  '/sign-in',
  passport.authenticate('sign-in',{
    successRedirect: '/',
    failureRedirect: '/authentication/sign-in'
  })
);

//SIGN UP
passportRouter.get('/sign-up', (req, res, next) => {
  res.render('passport/sign-up');
});

passportRouter.post(
  '/sign-up',
passport.authenticate('sign-up',{
  successRedirect: '/',
  failureRedirect: '/authentication/sign-up'
  })
);

const ensureLogin = require('connect-ensure-login');

passportRouter.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const user = req.user;
  res.render('passport/private', {
    user
  });
});

module.exports = passportRouter;
