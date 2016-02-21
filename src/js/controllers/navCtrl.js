var app = angular.module('someApp');

app.controller('navCtrl', function($scope, $state, Users) {
  $scope.logout = function() {
    Users.logout()
    .then(function() {
      $state.go('home');
    });
  };
});
