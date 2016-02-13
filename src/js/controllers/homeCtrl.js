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
    .state('displayAllUsers', { url: '/displayAllUsers', templateUrl: '/partials/displayAllUsers.html', controller: 'displayAllCtrl' })
  $urlRouterProvider.otherwise('/');
});

app.controller('homeCtrl', function($scope, Users) {
  console.log('homeCtrl');
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
  Users.getData().then(function(res){
    $scope.user = res.data;
  });

  $scope.saveUserData = function() {
    Users.saveData($scope.user).then(function(res){
    });
  };
  var matchedUser = Users.getMatchedUser();
  if(matchedUser){
    $scope.matchedUser  = matchedUser;
    console.log('$scope.MatchedUser:', $scope.matchedUser);
  }
});

//allUsers controller
app.controller('displayAllCtrl', function($scope, $state, Users) {
  console.log('inside displayAllCtrl');
  Users.getAllUsers()
    .then(function(res){
        console.log('res', res.data);
        $scope.usersArray = res.data;
  });
    $scope.sendMatchRequest = function(user, index) {
       console.log('inside function');
       console.log('user', user);
       console.log('index', index);

       Users.createMatch(user)
        .then(function(res) {
          console.log('inside function');
          console.log('res is: ', res.data);
          if(res.data == 'success'){
            Users.createMatchedUser(user);
          }
        });
    };
});

app.service('Users', function($http) {
  var matchedUser;
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

  this.saveData = function(userObj) {
    console.log('inside save data', userObj);
    return $http.post('/savedata', userObj);
  }
  this.getAllUsers = function() {
    console.log('inside get data, getting all users');
    return $http.get('/getallusers');
  }
  this.createMatch = function(userObj) {
    console.log('inside createMatch', userObj);
    return $http.post('/creatematch', userObj);
  }
  this.createMatchedUser = function(userObj) {
    matchedUser = userObj;
    return matchedUser;
  }
  this.getMatchedUser = function(){
    return matchedUser;
  }
});
