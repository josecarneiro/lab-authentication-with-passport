'use strict';

const { Router } = require('express');
const passportRouter = Router();
const bcrypt=require('bcrypt');
const User = require('./../models/user');
const passport=require('passport');

// Require user model

// Add bcrypt to encrypt passwords

// Add passport 

const ensureLogin = require("connect-ensure-login");

passportRouter.get('/signup', (req, res, next) => {
  res.render('passport/signup.hbs')
 });

 passportRouter.post('/signup', (req, res, next) => {
    const username=req.body.username;
    const password=req.body.password;
 
  bcrypt.hash(password,10)
    .then(hash=>{
      return User.create({
        username,
        passwordHash: hash
      });
    })
    .then(user=>{
      req.session.user={
        _id: user._id
      };
      res.redirect('passport/login.hbs');
    })
    .catch(error=>{
      console.log('There was an error in the sign up process.', error);
    });
 });



passportRouter.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("passport/private", { user: req.user });
});



module.exports = passportRouter;
