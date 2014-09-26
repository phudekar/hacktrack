'use strict';

angular.module('hacktrackApp')
.controller('IdeaCtrl', function ($scope, Auth, $http, $location, $window,socket,isAuthenticated) {
  $scope.isAuthenticated = isAuthenticated;
  $scope.ideas = [];
  $scope.errors = {};
  $scope.newIdea={};

  $scope.submitIdea = function(form) {
    $scope.submitted = true;

    if(form.$valid) {
      $http.post('/api/ideas', {
        title: $scope.newIdea.title,
        description: $scope.newIdea.description,
        originator: { name: Auth.getCurrentUser().name, email: Auth.getCurrentUser().email}
      });
      $scope.submitted = false;
      $scope.newIdea={};
    }
  };

  $scope.deleteThing = function(idea) {
    $http.delete('/api/ideas/' + idea._id);
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('idea');
  });

  $http.get('/api/ideas').success(function(ideas) {
    $scope.ideas = ideas;
    socket.syncUpdates('idea', $scope.ideas);
  });
});
