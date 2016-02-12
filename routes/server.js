'use strict';

var express = require('express');
var router = express.Router();

var Test = require('../models/test');


router.post('/', function(req, res, next) {
  console.log('successful post in server.js');
});

router.get('/', function(req, res) {
  console.log('inside get of server.js');
  res.render('index');
});

module.exports = router;
