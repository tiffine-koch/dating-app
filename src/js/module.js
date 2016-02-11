'use strict';

var app = angular.module('someApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', { url: '/', templateUrl: '/partials/home/home.html', controller: 'homeCtrl' })

  $urlRouterProvider.otherwise('/');
});
