'use strict';


const bcrypt = require('bcrypt');

module.exports = function(username, password) {
    // const password = req.body.password;
    const Model = this;
    let auxiliaryUser;
    return Model.findOne({username})
        .then(user => {
            if (!user) {
                throw new Error("User Not Found");
            }
            else {
                auxiliaryUser = user;
                return bcrypt.compare(password, user.password);
            }
        })
        .then(matches => {
            if (!matches) {
                throw new Error("User does not match");
            }
            else {
               return Promise.resolve(auxiliaryUser);
            }
        })
        .catch(error =>{
            console.log('Error signing in', error);
            return Promise.reject(error);
        });
};



