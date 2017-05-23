var path = require('path');
var User = require('./models/user');
var configAuth = require('../config/auth');
var Twit = require('twit');

var T = new Twit({
	consumer_key:         configAuth.twitterAuth.consumerKey,
	consumer_secret:      configAuth.twitterAuth.consumerSecret,
	access_token:         configAuth.twitterAuth.accessToken,
	access_token_secret:  configAuth.twitterAuth.accessTokenSecret
});

module.exports = function(app, passport) {


	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/profile', isLoggedIn, function (req, res) {
		res.sendFile(path.resolve(__dirname + '/../public/index.html'));
	});

	app.get('/api/getMe',isLoggedIn, function(req, res){
		return res.json(req.user);
	});

	app.get('/api/logout', isLoggedIn, function(req, res){
		req.logout();
		return res.json("logged out");
	});

	app.get('/api/getUserTimeline', function(req, res){
		T.get('https://api.twitter.com/1.1/statuses/home_timeline.json', { user_id: req.query.user_id }, function(err, data, response) {
			pushTweets(data, req.query.user_id, function(user){
				User.findOne({'userId': user.userId}, function(err, currrentUser){
					currentUser = user;
					currentUser.save(function(newUser){
						if(err){
							console.log("Error: ", err);
						}
						else{
							console.log(newUser);
						}
					});
				})
				return res.json(user);
			});
		});
	});

	app.get('/api/allUsers', function(req, res){
		User.find({}, function(err, users){
			if(err){
				return res.send(err);
			}
			else{
				return res.json(users);
			}
		});
	});


	app.get('/auth/twitter', passport.authenticate('twitter'));

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
};

// function pushtweets
function pushTweets(tweets, userId, callback) {

	var count = 0;

	var re1 = new RegExp('twitter.com\/(.*?)\/');
	var re2 = new RegExp('\/\/(.*)');

	User.findOne({'userId': userId}, function(err, user){
		if(err){
			console.log("User not found !", err);
			res.send(err);
		}
		else{
			for(var i = 0; i < tweets.length; i++) {
				if(tweets[i].entities.urls.length > 0){

					var newTweet = {'tweet_text':  tweets[i].text, 'owner_name': tweets[i].user.name, 'owner_screen_name': tweets[i].user.screen_name};

					if(!user.count){
						user.count = 1;
					};
					if(!user.tweets){
						user.tweets = {};
					};
					if(tweets[i].id in user.tweets){
						user.count = user.count - 1;
					};
					user.tweets[tweets[i].id] = newTweet;
					user.count = user.count + 1;
				};

				if(++count == tweets.length){
					return callback(user);
				};
			}

		};
	});
};

function getDomains(tweets, callback){
	var domains = {};
	var re1 = new RegExp('twitter.com\/(.*?)\/');
	var re2 = new RegExp('\/\/(.*)');
	var count = 0;
	for(var i = 0; i < tweets.length; i++){
		var domain = re1.exec(tweets[i].entities.urls[0].expanded_url);
		console.log("Url: ", tweets[i].entities.urls[0].expanded_url);
		if(!domain){
			domain = re2.exec(tweets[i].entities.urls[0].expanded_url)[1];
			if(domain in domains){
				domains[domain] = domains[domain] + 1;
			}else{
				domains[domain] = 1;
			}
		}
		else{
			domain = domain[1];
			domain = re2.exec(tweets[i].entities.urls[0].expanded_url)[1];
			if(domain in domains){
				domains[domain] = domains[domain] + 1;
			}else{
				domains[domain] = 1;
			}
		};
		if(++count == tweets.length){
			callback(domains);
		};
	};
};