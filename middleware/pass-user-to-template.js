'use strict';

module.exports = (req, res, next) => {
  console.log(req.user)
  res.locals.user = req.user;
  console.log(res.locals.user)
  next();
};