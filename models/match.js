User'use strict';

var mongoose  = require('mongoose');

var Match;

var matchSchema = mongoose.Schema({
	originalSenderId: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	},
	originalRecieverId: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	},
	status: {type: String, default: 'Proposed', enum: ['Proposed', 'Accepted', 'Declined']},
	// dateProposed: {type: Date, default: Date.now},
	// matchWink: {type: String},
	// senderItemId: {
		// type: mongoose.Schema.Types.ObjectId, ref: 'User'
	// },
	// receiverItemId: {
	// 	type: mongoose.Schema.Types.ObjectId, ref: 'User'
	// },
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

matchSchema.statics.accept = function(id,cb) {
	Match.findById(id, function(err, trade) {
		if (err || !trade) cb(err,null);
		var receiverId = trade.receiverItemId.user;
		var senderId = trade.senderItemId.user;
		trade.senderItemId.user = receiverId;
		trade.senderItemId.save(function (err, item){
			if (err) cb(err,null);
			trade.receiverItemId.user = senderId;
			trade.receiverItemId.save(function (err, item){
				if (err) cb(err,null);
				trade.status = 'Accepted';
				trade.save(function(err, savedTrade){

					Match.update({
												$and:[
																{$or:
																	[
																	{'senderItemId': trade.senderItemId._id},
																	{'senderItemId': trade.receiverItemId._id},
																  {'receiverItemId': trade.senderItemId._id},
																  {'receiverItemId': trade.receiverItemId._id}
													  			]
													  		},
																{'status':'Proposed'}
															]
												},{status:'Offer Expired'}, {multi:true}, function(err, invalidTrades){
							cb(err,invalidTrades);
						});

				});
			});
		});
  }).populate('senderItemId receiverItemId');
}

matchSchema.methods.reject = function(cb){
	this.status = 'Rejected';
	this.save(cb);
}


var Match = mongoose.model('Match', matchSchema);

module.exports = Match;
