var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({

		twitterID    : {type: String},
		token        : {type: String},
		displayName  : {type: String},
		username     : {type: String},
		count        : {type: Number},
		tweets       : {}

});

module.exports = mongoose.model('User', UserSchema);