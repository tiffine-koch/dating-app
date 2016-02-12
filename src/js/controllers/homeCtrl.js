'use strict';

var app = angular.module('someApp', ['ui.router']);
console.log('working');

var testString = 'hey';
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/partials/home/home.html', controller: 'homeCtrl' })

  $urlRouterProvider.otherwise('/');
});

app.controller('homeCtrl', function($scope, Test) {
  console.log('homeCtrl');
  Test.getTest(testString)
  .then(function(res) {
    console.log('success homeCtrl');
    // debugger;
    // $scope.selection = res.data;
    // Test.testString;
  }, function(err) {
    console.log('err:', err);
  })
});

app.service('Test', function($http) {
  console.log('in app.service');

  this.getTest = function(testString) {
    return $http.get('/');
    // console.log(this.getTest);
    console.log('success');
  }
});
