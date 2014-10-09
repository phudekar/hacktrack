'use strict';

angular.module('hacktrackApp')
.controller('DashboardCtrl', function ($scope, Auth, $http, $location, $window,socket) {
	$scope.isAuthenticated = Auth.isAuthenticated;
	$scope.myideas = [];
	$scope.errors = {};
	$scope.editedIdeas = [];

	$scope.deleteIdea = function(idea) {
		$http.delete('/api/ideas/' + idea._id).success(function() {
			var index = $scope.myideas.indexOf(idea);
			$scope.myideas.splice(index,1);
		});
	}

	$scope.isEditing = function(id){
		return $scope.editedIdeas[id] != undefined;
	}

	$scope.editIdea = function(idea) {
		$scope.editedIdeas[idea._id] = idea;
	}

	$scope.updateIdea = function(id) {
		var idea = $scope.editedIdeas[id];
		$scope.editedIdeas[id] = undefined;

		$http.put('/api/ideas/' + id, idea).success(function(){
			$scope.editedIdeas[id] = undefined;
			loadMyIdeas();
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