'use strict';

angular.module('hacktrackApp')
.controller('DashboardCtrl', function ($scope, Auth, $http, $location, $window,socket) {
	$scope.isAuthenticated = Auth.isAuthenticated;
	$scope.myideas = [];
	$scope.errors = {};

	$scope.deleteIdea = function(idea) {
		$http.delete('/api/ideas/' + idea._id).success(function() {
			var index = $scope.myideas.indexOf(idea);
			$scope.myideas.splice(index,1);
		});
	}

	$scope.ideaCreated = function(){
		loadMyIdeas();
	}

  	$scope.$on('$destroy', function () {
    	socket.unsyncUpdates('myideas');
  	});

  	function loadMyIdeas(){
		$http.get('/api/ideas/myideas').success(function(ideas) {
			$scope.myideas = ideas;
		});
	}

	loadMyIdeas();

});