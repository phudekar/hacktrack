'use strict';

angular.module('hacktrackApp')
.config(function ($routeProvider) {
	$routeProvider
	.when('/home', {
		templateUrl: 'app/home/home.html',
	})
});

