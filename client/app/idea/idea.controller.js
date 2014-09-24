'use strict';

angular.module('hacktrackApp')
.controller('IdeaCtrl', function ($scope, Auth, $location, $window) {
  $scope.ideas = [];
  $scope.errors = {};
  $scope.idea={};

  $scope.submitIdea = function(form) {
    $scope.submitted = true;

    if(form.$valid) {
      $scope.ideas.push({
        title: $scope.idea.title,
        description: $scope.idea.description
      });
      $scope.submitted = false;
      $scope.idea={};
    }
  };
});
