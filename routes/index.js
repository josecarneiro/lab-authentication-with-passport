'use strict';

const { Router } = require('express');
const router = Router();

const User = require('./../models/user');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then(user => {
      res.render('passport/user', { user });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
