'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const userLogin = require('./user-login');
const userSignup = require('./user-signup');

userSchema.statics = userSchema.statics || {};
userSchema.statics.userLogin = userLogin;
userSchema.statics.userSignup = userSignup;

const User = mongoose.model('User', userSchema);

module.exports = User;
