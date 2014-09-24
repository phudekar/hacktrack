'use strict';

angular.module('hacktrackApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/submit-idea', {
        templateUrl: 'app/idea/submit-idea.html',
        controller: 'IdeaCtrl'
      })
  });