'use strict';

angular.module('hacktrackApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $window) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/idea'
    },
    {
      'title': 'Dashboard',
      'link': '/dashboard'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });