'use strict';

var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var ref = new Firebase('https://dating-appch.firebaseio.com/');
var User = require('../models/user');
var Match = require('../models/match');

router.post('/register', function(req, res, next) {
  ref.createUser(req.body, function(err, userData) {

    if(err) return res.status(400).send(err);

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
      res.send(userObj);
    });
  });
});

var authMiddleWare = require('../config/auth');

router.post('/savedata', authMiddleWare, function(req, res, next) {
  User.findById(req.user._id, function(err, userObj) {

    console.log('req.body: ', req.body);
    userObj.gender = req.body.gender;
    userObj.bio = req.body.bio;
    userObj.username = req.body.username;
    userObj.preference = req.body.preference;
    userObj.ageRange = req.body.ageRange;
    userObj.hobbies = req.body.hobbies;
    userObj.favFood = req.body.favFood;
    userObj.image = req.body.image;

    userObj.save(function(err, savedUser){
      console.log('err in save data', err);
    });
    res.send(userObj);
  });
});

router.post('/logout', function(req, res) {
  res.clearCookie('mytoken').send();
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
      res.cookie('mytoken', token).send(userObj);
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

router.post('/creatematch', authMiddleWare, function(req, res) {
  Match.find({receiverId: req.user._id}, function(err, matches) {
    if(matches.length === 0) {
      var match = {
        senderId: req.user._id,
        receiverId: req.body._id,
        status: 'Proposed'
      };
      console.log('req.body', req.body);

      Match.create(match, function(err, match) {
        console.log('match', match);
        // res.status(err ? 400 : 200).send(err || match);
        res.status(err ? 400 : 200).send(err || 'fail');
      });
    } else {
      console.log('matches', matches);
      for(var i = 0; i < matches.length; i++) {
        console.log('inside for loop');
        if(matches[i].senderId == req.body._id) {
          console.log('hey now');
          Match.update({_id: matches[i]._id}, {status: 'Accepted'}, function(err, data) {
            console.log('err-matches', err);
            console.log('data-matches', data);
            //res.status(err ? 400 : 200).send(err || data);
            res.status(err ? 400 : 200).send(err || 'success');
          });
          console.log('matches', matches);
        }
      }
    }
    console.log('err', err);
  });
});

router.put('/accept/:id', function(req, res, next) {
  Match.accept(req.params.id, function(err, match) {
    res.status(err ? 400 : 200).send(err || match);
  });
});

router.get('/', function(req, res) {
  console.log('inside get of server.js');

  res.render('index');
});

module.exports = router;
