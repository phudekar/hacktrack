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
    var updateImage = function(idea){
     return function(data){
      idea.originator.image = data.image;
      idea.originator.link = data.link;
    }
  }
  for (var i in ideas) {
    var idea = ideas[i]
    $http.get('/api/users/image/' +  $scope.ideas[i].originator.email)
    .success(updateImage(idea));
  };
  socket.syncUpdates('ideas', $scope.ideas,function(event,idea){
    $http.get('/api/users/image/' +  idea.originator.email)
    .success(updateImage(idea));
  });
});
});
