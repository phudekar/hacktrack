'use strict';

angular.module('hacktrackApp')
.config(function ($routeProvider) {
	$routeProvider
	.when('/dashboard', {
		templateUrl: 'app/dashboard/dashboard.html',
		controller: 'DashboardCtrl'
	})
});