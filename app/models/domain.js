var mongoose = require('mongoose');

var DomainSchema = mongoose.Schema({
		name	: {type: String},
		count	: {type:Number}
});

module.exports = mongoose.model('Domain', DomainSchema);