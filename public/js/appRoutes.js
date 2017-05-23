angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

	.when('/profile', {
		templateUrl: 'views/profile.html'
	})

	.otherwise({
		templateUrl : "views/error.html",
		controller: "ErrorController"
	});

	$locationProvider.html5Mode(true);

}]);