'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
}, {
  timestamps: true
});


const signUpStatic = require('./user-sign-up-static');
const loginStatic = require('./user-login-static');

userSchema.statics.signUp = signUpStatic;
userSchema.statics.login = loginStatic;

const User = mongoose.model('User', userSchema);

module.exports = User;
