app.factory('tweetsService', tweetsService);

function tweetsService($http) {

	tweetsService = {};
	tweetsService.tweets = [];

	tweetsService.getTweets = function(userId){
		return $http({
		method: 'GET',
		url: '/api/getUserTimeline',
		params: {user_id: userId}
	}).then(function(response) {
			return response.data;
		});
	};

	return tweetsService;
};
