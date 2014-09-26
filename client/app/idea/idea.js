'use strict';

angular.module('hacktrackApp')
.config(function ($routeProvider) {
	$routeProvider
	.when('/submit-idea', {
		templateUrl: 'app/idea/submit-idea.html',
		controller: 'IdeaCtrl',
		resolve: {
			isAuthenticated: function($q, Auth) {
				console.log('trying to resolve');
				var deferred = $q.defer();
				var currentUser = Auth.getCurrentUser();

				if(currentUser.hasOwnProperty('$promise')) {
					currentUser.$promise.then(function(data) {
						deferred.resolve({authenticated:true});

					}).catch(function() {
						deferred.reject({authenticated:false});
					});
				} else if(currentUser.hasOwnProperty('role')) {
					deferred.resolve({authenticated:true});
				} else {
					deferred.reject({authenticated:false});
				}

				return deferred.promise;
			}
		}
	})
});