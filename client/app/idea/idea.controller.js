'use strict';

angular.module('hacktrackApp')
.controller('IdeaCtrl', function ($scope, Auth, $http, $location, $window,socket) {
  $scope.isAuthenticated = Auth.isAuthenticated;
  $scope.ideas = [];

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
