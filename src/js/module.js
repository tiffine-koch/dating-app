'use strict';

var app = angular.module('someApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/partials/home/home.html', controller: 'homeCtrl' })
    .state('register', { url: '/register', templateUrl: '/partials/register.html', controller: 'registerCtrl' })
    .state('login', { url: '/login', templateUrl: '/partials/login.html', controller: 'loginCtrl' })
    .state('profile', { url: '/profile', templateUrl: '/partials/profile.html', controller: 'profileCtrl' })
    .state('displayAllUsers', { url: '/displayAllUsers', templateUrl: '/partials/displayAllUsers.html', controller: 'displayAllCtrl' })
  $urlRouterProvider.otherwise('/');
});
