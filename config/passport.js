var TwitterStrategy  = require('passport-twitter').Strategy;

var User       = require('../app/models/user');

var configAuth = require('./auth');

module.exports = function(passport) {


	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new TwitterStrategy({

		consumerKey     : configAuth.twitterAuth.consumerKey,
		consumerSecret  : configAuth.twitterAuth.consumerSecret,
		callbackURL     : configAuth.twitterAuth.callbackURL,
		passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

	},
	function(req, token, tokenSecret, profile, done) {

		process.nextTick(function() {

			// check if the user is already logged in
			if (!req.user) {
				// user is not logged in, check if user exists
				User.findOne({ 'twitterID' : profile.id }, function(err, user) {
					if (err)
						return done(err);

					if (user) {

						if (!user.token) {
							user.token       = token;
							user.username    = profile.username;
							user.displayName = profile.displayName;

							user.save(function(err) {
								if (err)
									return done(err);

								return done(null, user);
							});
						}
						return done(null, user); // user found return that user
					} else {
						// no user ----> create user
						var newUser         = new User();

						newUser.twitterID   = profile.id;
						newUser.token       = token;
						newUser.username    = profile.username;
						newUser.displayName = profile.displayName;

						newUser.save(function(err) {
							if (err)
								return done(err);

							return done(null, newUser);
						});
					}
				});

			} 
			else {
				// user is logged in
				var user         = req.user;
				user.twitterID   = profile.id;
				user.token       = token;
				user.username    = profile.username;
				user.displayName = profile.displayName;

				user.save(function(err) {
					if (err)
						return done(err);

					return done(null, user);
				});
			}

		});

	}));

};