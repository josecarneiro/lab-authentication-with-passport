'use strict';

const { Router } = require('express');
const router = Router();

//importing routeGuard
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Appiyou!' });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('authentication/private');
});

module.exports = router;
