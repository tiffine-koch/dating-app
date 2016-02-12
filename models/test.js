'use strict';
// jsjsjsjsjsjs
var mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
  test: String
});

// instance method

var Test = mongoose.model('Test', testSchema);

module.exports = Test;
