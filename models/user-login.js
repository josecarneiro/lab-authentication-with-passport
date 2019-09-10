'use strict';
const bcrypt = require('bcryptjs');

const userLogin = function(username, passwordHash) {
  const Model = this;
  let compareUser;

  return Model.findOne({ username })
    .then(user => {
      if (!user) {
        throw new Error('USER_NOT_FOUND');
      } else {
        compareUser = user;
        return bcrypt.compare(passwordHash, user.passwordHash);
      }
    })
    .then(matches => {
      if (!matches) {
        throw new Error('PASSWORDS_DO_NOT_MATCH');
      } else {
        return Promise.resolve(compareUser);
      }
    })
    .catch(error => {
      console.log(`Error signing up user: ${error}`);
      return Promise.reject(error);
    });
};

module.exports = userLogin;