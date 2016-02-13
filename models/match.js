'use strict';

var mongoose  = require('mongoose');

var Match;

var matchSchema = mongoose.Schema({
	senderId: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	},
	receiverId: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	},
	status: {type: String, default: 'Proposed', enum: ['Proposed', 'Accepted', 'Declined']},
});

matchSchema.statics.create = function(matchObj, cb) {
	var match = new Match(matchObj);
	match.save(cb);
}

matchSchema.statics.findAll = function(cb) {
	Match.find({}, function(err, matches) {
    	cb(err,matches);
  	});
}

matchSchema.methods.reject = function(cb){
	this.status = 'Rejected';
	this.save(cb);
}


var Match = mongoose.model('Match', matchSchema);

module.exports = Match;
