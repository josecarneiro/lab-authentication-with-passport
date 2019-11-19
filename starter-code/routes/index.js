'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/passport/private', (req, res, next) => {
  res.render('./passport/private');
});

router.get('/signin', (req, res, next) => {
  res.render('./passport/login');
});

module.exports = router;
