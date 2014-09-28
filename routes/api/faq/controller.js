var async = require('async'),
	keystone = require('keystone');

var Model = keystone.list('Faq').model;

/**
 * List Posts
 */
exports.list = function(req, res) {
	Model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			posts: items
		});
		
	});
};

/**
 * Get Post by ID
 */
exports.get = function(req, res) {
	Model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			post: item
		});
		
	});
};


/**
 * Create a Post
 */
exports.create = function(req, res) {
	
	var item = new Model(),
		data = (req.method == 'POST') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			post: item
		});
		
	});
};

/**
 * Get Post by ID
 */
exports.update = function(req, res) {
	Model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'POST') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				post: item
			});
			
		});
		
	});
};

/**
 * Delete Post by ID
 */
exports.remove = function(req, res) {
	Model.findById(req.params.id).exec(function (err, item) {
		
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
