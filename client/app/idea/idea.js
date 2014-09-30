'use strict';

angular.module('hacktrackApp')
.config(function ($routeProvider) {
	$routeProvider
	.when('/idea', {
		templateUrl: 'app/idea/ideas.html',
		controller: 'IdeaCtrl'
	})
});