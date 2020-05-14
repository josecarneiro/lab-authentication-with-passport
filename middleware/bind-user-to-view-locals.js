'use strict';

module.exports = (req, res, next) => {
  console.log('im running');
  res.locals.user = req.user;
  next();
};
