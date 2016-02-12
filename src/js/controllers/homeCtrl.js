'use strict';

var app = angular.module('someApp', ['ui.router']);
console.log('working');

var testString = 'hey';
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/partials/home/home.html', controller: 'homeCtrl' })
    .state('register', { url: '/register', templateUrl: '/partials/register.html', controller: 'registerCtrl' })
    .state('login', { url: '/login', templateUrl: '/partials/login.html', controller: 'loginCtrl' })
  $urlRouterProvider.otherwise('/');
});

app.controller('homeCtrl', function($scope, Users) {
  console.log('homeCtrl');
  /* TESTING
  Users.getTest(testString)
  .then(function(res) {
    console.log('success homeCtrl');
    // debugger;
    // $scope.selection = res.data;
    // Test.testString;
  }, function(err) {
    console.log('err:', err);
  })
  */
});

app.controller('registerCtrl', function($scope, Users) {
  $scope.registerUser = function(){
    if($scope.user.password !== $scope.user.passwordConfirm) {
      $scope.passwordReg = '';
      return alert('Passwords must match.');
    }
    Users.register($scope.user)
    .then(function(res){
      console.log('registration succeeded');
    });
  }
});

app.controller('loginCtrl', function($scope, Users) {
  $scope.loginUser = function(){
    Users.login($scope.user)
    .then(function(res){
      console.log('login succeeded');
    });
  }
});

app.service('Users', function($http) {
  /* TESTING */
  this.getTest = function(testString) {
    return $http.get('/');
  };
  /* Register user */
  this.register = function(userObject) {
    return $http.post('/register', {email: userObject.email, password: userObject.password});
  };
  /* Login user */
  this.login = function(userObject) {
    return $http.post('/login', {email: userObject.email, password: userObject.password});
  }
});


  /*
  Users.getTest(testString)
  .then(function(res) {
    console.log('success homeCtrl');
    // debugger;
    // $scope.selection = res.data;
    // Test.testString;
  }, function(err) {
    console.log('err:', err);
  })
  */
//});
/*
app.controller('loginCtrl', function($scope, Users) {
  console.log('loginCtrl');
  Users.getTest(testString)
  .then(function(res) {
    console.log('success homeCtrl');
    // debugger;
    // $scope.selection = res.data;
    // Test.testString;
  }, function(err) {
    console.log('err:', err);
  })
});
*/

  /*


  $.post('/users/register', {email: email, password: password, name: name})
  .success(function(data) {
    console.log(data);
    location.href = '/login';
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('err:', err);
  });




*/
