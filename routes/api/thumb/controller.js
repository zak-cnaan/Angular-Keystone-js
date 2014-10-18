var async = require('async'),
	keystone = require('keystone');

var Model = keystone.list('Thumb').model;

exports.list = function(req, res) {
	Model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse(items);
		
	});
};
