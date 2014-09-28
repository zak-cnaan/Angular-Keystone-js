var async = require('async'),
	keystone = require('keystone');

var Thing = keystone.list('Thing');

/**
 * List Posts
 */
exports.list = function(req, res) {
	Thing.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse(items);
		
	});
};

/**
 * Get Post by ID
 */
exports.get = function(req, res) {
	Thing.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			thing: item
		});
		
	});
};


/**
 * Create a Post
 */
exports.create = function(req, res) {
	
	var item = new Thing.model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			thing: item
		});
		
	});
};

/**
 * Get Post by ID
 */
exports.update = function(req, res) {
	Thing.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				thing: item
			});
			
		});
		
	});
};

/**
 * Delete Post by ID
 */
exports.remove = function(req, res) {
	Thing.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.apiResponse({
				success: true
			});
		});
		
	});
};
