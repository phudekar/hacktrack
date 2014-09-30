'use strict';

angular.module('hacktrackApp')
.controller('IdeaCtrl', function ($scope, Auth, $http, $location, $window,socket) {
  $scope.isAuthenticated = Auth.isAuthenticated;
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
      }).success(function(){
        $scope.submitted = false;
        $scope.newIdea={};
        $scope.ideaCreated();
      });
    }
  };

  $scope.ideaCreated = function(){
    // nothing to do here
  }

  $scope.likeIdea = function(idea){
    $http.post('/api/ideas/like/'+idea._id).success(function(){
      
    });
  };

  $scope.$on('$destroy', function () {
    socket.unsyncUpdates('ideas');
  });

  $http.get('/api/ideas').success(function(ideas) {
    $scope.ideas = ideas;
    socket.syncUpdates('ideas', $scope.ideas);
  });
});
