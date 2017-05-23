app.controller('ErrorController', ErrorController);

function ErrorController($scope, $window) {
	$scope.backtoHome() = function(){
		$window.location.reload();
	};
};