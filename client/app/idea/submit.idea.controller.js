'use strict';

angular.module('hacktrackApp')
.controller('SubmitIdeaCtrl', function ($scope, Auth, $http, $location, $window,socket) {
  $scope.isAuthenticated = Auth.isAuthenticated;
  $scope.errors = {};
  $scope.newIdea={};

  $scope.submitIdea = function(form) {
    $scope.submitted = true;

    if(form.$valid) {
      $http.post('/api/ideas', {
        title: $scope.newIdea.title,
        description: $scope.newIdea.description,
        originator: { name: Auth.getCurrentUser().name, email: Auth.getCurrentUser().email}
      }).success(function(){
        $scope.submitted = false;
        $scope.newIdea={};
        $scope.ideaCreated();
      });
    }
  };
})