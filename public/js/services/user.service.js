app.factory('userService', userService);

function userService($http, $window) {

	userService = {};
	userService.user = null;

	userService.getMe = function(){
		return $http({
		method: 'GET',
		url: '/api/getMe'
	}).then(function(response) {
			userService.user = response.data;
			return response.data;
		});
	};

	userService.getAllUsers = function(){
		return $http({
			method: 'GET',
			url: '/api/allUsers'
		}).then(function(response){
			return response.data;
		});
	};

	userService.logout = function(){
		return $http({
			method: 'GET',
			url: '/api/logout'
		}).then(function(response){
			userService.user = null;
			$window.location.reload();
		});
	}

	return userService;
};