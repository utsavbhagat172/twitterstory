app.controller('UserController', UserController);

function UserController(userService) {
	var vm = this;

	vm.user = {};
	vm.getMe = function(){
		userService.getMe().then(function(data){
			vm.user = data;
		}, function(err){
			console.log("Error: ", err);
		});
	}();

	vm.allUsers = [];
	vm.getMe = function(){
		userService.getAllUsers().then(function(data){
			vm.allUsers = data;
		}, function(err){
			console.log("Error: ", err);
		});
	}();

	vm.logout = function(){
		console.log("Logout");
		userService.logout();
	};
};