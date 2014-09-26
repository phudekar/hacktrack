'use strict';

angular.module('hacktrackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ui.bootstrap'
  ])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
  $httpProvider.interceptors.push('authInterceptor');
})

.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location,$window) {
  return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $window.location.href ='/auth/google';
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

.run(function ($rootScope, $location, Auth,$window,$route, $q) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeError', function (event, current, previous, reason) {
      var redirectTo = "/";
      if(current) 
        {
          redirectTo = current.$$route.originalPath;
        }
        
      if(reason && !reason.authenticated){
        $window.location.href = '/auth/google?success_url=' + redirectTo;
     }
   })
  });
