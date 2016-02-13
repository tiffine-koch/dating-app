'use strict';

var app = angular.module('someApp', ['ui.router']);
console.log('working');

var testString = 'hey';
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/partials/home/home.html', controller: 'homeCtrl' })
    .state('register', { url: '/register', templateUrl: '/partials/register.html', controller: 'registerCtrl' })
    .state('login', { url: '/login', templateUrl: '/partials/login.html', controller: 'loginCtrl' })
    .state('profile', { url: '/profile', templateUrl: '/partials/profile.html', controller: 'profileCtrl' })
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
      //window.location.href = '/partials/login.html';

    });
  }
});

app.controller('loginCtrl', function($scope, $state, $location, Users) {
  console.log('inside loginCtrl');
  $scope.loginUser = function(){
    console.log('inside login ctrl');
    Users.login($scope.user)
    .then(function(res){

      // console.console.log('userObj', userObj);
      console.log('login succeeded');
      console.log(res);
      // $state.go('./partials/profile');
      $location.path('/profile');
      console.log('page sent to profile');
      // $location.path('/profile');
      //href to $state profile after .then
    });
  }
});
app.controller('profileCtrl', function($scope, $state, Users) {
  console.log('inside profileCtrl');

  // Get new info and pre-populate:
  //Users.getUserData = function(){
    console.log('inside get user data');
    Users.getData().then(function(res){
      console.log('res in get user data is: ', res.data);
      $scope.user = res.data;
      console.log('scope.user 1 is: ', $scope.user);
      debugger;
    });
  //};

  $scope.saveUserData = function() {
    console.log('inside save function');
    console.log('$scope.user.username', $scope.user.username);
    console.log('$scope.user', $scope.user);
    debugger;
    console.log('$scope.user.bio', $scope.user.bio);
    console.log('$scope.user.gender', $scope.user.gender);
    Users.saveData($scope.user).then(function(res){
      debugger;
      console.log('$scope.user 2', $scope.user);
    });
  };
  // $scope.loginUser = function(){
  //   console.log('inside login ctrl');
  //   Users.login($scobio
  //   .then(function(res){
  //
  //     // console.console.log('userObj', userObj);
  //     console.log('login succeeded');
  //     console.log(res);
  //     $state.go('/profile');
  //     //href to $state profile after .then
  //   });
  // }
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

  this.getData = function() {
    console.log('inside get data');
    return $http.get('/getdata');
  }

  this.saveData = function(userObj){
    console.log('inside save data', userObj);
    return $http.post('/savedata', userObj);
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
