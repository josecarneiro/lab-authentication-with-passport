'use strict';

const { Router } = require('express');
const passportRouter = Router();
const passport = require('passport');

// Require user model
passportRouter.get('/sign-in', (req, res, next) => {
	res.render('passport/sign-in');
});

passportRouter.post(
	'/sign-in',
	passport.authenticate('sign-in', {
		successRedirect: '/',
		failureRedirect: '/passport/sign-in'
	})
);

passportRouter.get('/sign-up', (req, res, next) => {
	res.render('passport/sign-up');
});

passportRouter.post(
	'/sign-up',
	passport.authenticate('sign-up', {
		successRedirect: '/',
		failureRedirect: '/passport/sign-up'
	})
);

passportRouter.post('/sign-out', (req, res, next) => {
	req.logout();
	res.redirect('/');
});

// Add bcrypt to encrypt passwords

// Add passport

const ensureLogin = require('connect-ensure-login');

passportRouter.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res, next) => {
	const user = req.user;
	res.render('authentication/private', {
		user
	});
});

module.exports = passportRouter;
