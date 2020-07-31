'use strict';

const { Router } = require('express');
const router = Router();

const routeguard = require('../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

router.get('/authentication/private', routeguard, (req, res, next) => {
  res.render('authentication/private');
});

module.exports = router;
