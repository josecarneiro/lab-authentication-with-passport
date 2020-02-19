'use strict';

const { Router } = require('express');
const router = new Router();

const passport = require('passport');

router.get('/sign-in', (req, res, next) => {
  res.render('passport/sign-in');
});

router.post(
  '/sign-in',
  passport.authenticate('sign-in', {
    successRedirect: '/',
    failureRedirect: '/sign-in'
  })
);

router.get('/sign-up', (req, res, next) => {
  res.render('passport/sign-up');
});

router.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/',
    failureRedirect: '/sign-up'
  })
);

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

const ensureLogin = require('connect-ensure-login');

router.get('/private-page', ensureLogin.ensureLoggedIn('/sign-in'), (req, res, next) => {
  const user = req.user;
  res.render('passport/private', {
    user
  });
});

module.exports = router;
