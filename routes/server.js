'use strict';

var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var ref = new Firebase('https://dating-appch.firebaseio.com/');
var User = require('../models/user');

// TEST
var Test = require('../models/test');

router.post('/register', function(req, res, next) {
  console.log('inside register in server.js');
  console.log('req.body: ', req.body);
  /* Firebase */
  console.log('before firebase');
  ref.createUser(req.body, function(err, userData) {
    console.log('error in create User is is: ', err);
    console.log('user data', userData);

    if(err) return res.status(400).send(err);

    console.log('firebase works!!!')
    console.log('user data is: ', userData);
    var userObj = {};
    userObj.firebaseId = userData.uid;
    userObj.email = req.body.email;
    userObj.gender = req.body.gender;
    userObj.bio = req.body.bio;
    userObj.username = req.body.username;
    userObj.preference = req.body.preference;
    userObj.ageRange = req.body.ageRange;
    userObj.hobbies = req.body.hobbies;
    userObj.favFood = req.body.favFood;
    userObj.image = req.body.image;

    User.create(userObj, function(err) {
      console.log('err in User.create is: ', err);
      res.send(userObj);
      //res.render('index');
      //res.send();
    });
  });
});

var authMiddleWare = require('../config/auth');

router.post('/savedata', authMiddleWare, function(req, res, next) {
  console.log('in save data in server.js');
  console.log('user id in mongo is: ', req.user._id);

  // User.findByIdUpdate(req.user._id, {$set:{user: req.user._id}}, function(err, userObj) {
  User.findById(req.user._id, function(err, userObj) {

    console.log('req.body: ', req.body);

    //console.log('req.body.data: ', req.body.data);

    //console.log('req.body.data.: ', req.body.data.gender);

    userObj.gender = req.body.gender;
    userObj.bio = req.body.bio;
    userObj.username = req.body.username;
    userObj.preference = req.body.preference;
    userObj.ageRange = req.body.ageRange;
    userObj.hobbies = req.body.hobbies;
    userObj.favFood = req.body.favFood;
    userObj.image = req.body.image;


    console.log('user obj in save is: ', userObj);

    userObj.save(function(err, savedUser){
      console.log('err in save data', err);
    });
    res.send(userObj);
  });
});


router.post('/login', function(req, res, next) {
  console.log('inside login in server.js');
  console.log('login req.body:', req.body);
  ref.authWithPassword(req.body, function(err, authData) {

    if(err) return res.status(400).send(err);
    console.log('auth data in ref.auth is: ', authData);
    console.log('err in ref.auth is: ', err);
    //console.log('user in User.findOne is in find one BEFORE is: ', user);

    console.log('error in find one is: BEFORE', err);
    console.log('user in authData.uid is in find one Before is: ', authData.uid);

    User.findOne({firebaseId: authData.uid}, function(err, userObj) {
      console.log('user in User.findOne is in find one AFTER is: ', userObj);

      var token = userObj.generateToken();
      console.log('error in find one AFTER is: ', err);
      console.log('user in User.findOne is in find one AFTER is: ', userObj);
      // res.data = userObj;
      // res.data('mytoken', token).send();
      res.cookie('mytoken', token).send(userObj);
      // res.send({token: token})
    });
  });
});

router.get('/getdata', authMiddleWare, function(req, res) {
  User.findById(req.user._id, function(err, userObj){
      res.send(userObj);
  });
});
router.get('/getallusers', authMiddleWare, function(req, res) {
  User.find({}, function(err, usersArray){
      res.send(usersArray);
  });
});

router.get('/', function(req, res) {
  console.log('inside get of server.js');

  res.render('index');
});

module.exports = router;
