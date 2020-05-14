'use strict';

const { Router } = require('express');
const authenticationRouter = Router();
const passport = require('passport');

authenticationRouter.get('/sign-up', (req, res, next) => {
  res.render('authentication/sign-up');
});

authenticationRouter.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/',
    failureRedirect: '/authentication/sign-up'
  })
);

authenticationRouter.get('/sign-in', (req, res, next) => {
  res.render('authentication/sign-in');
});

authenticationRouter.post(
  '/sign-in',
  passport.authenticate('sign-in', {
    successRedirect: '/',
    failureRedirect: '/authentication/sign-in'
  })
);
authenticationRouter.get('/private', (req, res, next) => {
  res.render('authentication/private');
});

authenticationRouter.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

module.exports = authenticationRouter;
