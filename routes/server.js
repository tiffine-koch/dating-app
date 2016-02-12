'use strict';

var express = require('express');
var router = express.Router();
var Test = require('../models/test');

router.post('/register', function(req, res, next) {
  console.log('inside register in server.js');
  console.log('req.body: ', req.body);
  res.render('index');
});

router.post('/login', function(req, res, next) {
  console.log('inside login in server.js');
  console.log('req.body: ', req.body);
  res.render('index');
});

router.get('/', function(req, res) {
  console.log('inside get of server.js');
  res.render('index');
});

module.exports = router;
