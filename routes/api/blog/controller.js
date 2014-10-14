var async = require('async'),
	keystone = require('keystone');

var Model = keystone.list('Post').model;

/**
 * List Posts
 */
exports.list = function(req, res) {
	Model
        .where('state', 'published')
        .sort('-publishedDate')
        .populate('author categories')
        .exec(function(err, items){
		
		if (err) return res.apiError('database error', err);

            res.apiResponse(items);


	});
};
exports.catlist = function(req, res) {
    keystone.list('PostCategory').model.find().sort('name').exec(function (err, results) {

        if (err) return res.apiError('database error', err);
        res.apiResponse(results);
    });
};

exports.cat = function(req, res) {
    Model
        .where('categories').in([req.params.cat])
        .where('state', 'published')
        .sort('-publishedDate')
        .populate('author categories')
        .exec(function(err, items){

            if (err) return res.apiError('database error', err);

            res.apiResponse(items);

        });
};

/**
 * Get Post by ID
 */
exports.get = function(req, res) {
	Model.findById(req.params.id)
        .populate('author categories')
        .exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse(item);
		
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
		
		res.apiResponse(item);
		
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
			
			res.apiResponse(item);
			
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
