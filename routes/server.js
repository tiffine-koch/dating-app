'use strict';

var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var ref = new Firebase('https://dating-appch.firebaseio.com/');
// TEST
var Test = require('../models/test');


router.post('/register', function(req, res, next) {
  console.log('inside register in server.js');
  console.log('req.body: ', req.body);
  // ref.createUser(req.body, function(err, userData) {
  //   if(err) return res.status(400).send(err);
  //
  //
  //   User.create(userData, function(err) {
  //     res.send();
  //   });
  // });
  // res.render('index');
});


// router.post('/login', function(req, res, next) {
//   console.log('inside login in server.js');
//   console.log('req.body: ', req.body);
//   // res.render('index');
// });
//
// router.get('/', function(req, res) {
//   console.log('inside get of server.js');
//   // res.render('index');
// });

module.exports = router;
