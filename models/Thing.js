var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Thing = new keystone.List('Thing', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Thing.add({
	title: { type: String, required: true },
	info: { type: String, required: false },
	image: {
		type: Types.LocalFile,
		dest: 'public/uploads',
		prefix: '/uploads/' },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

Thing.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Thing.register();
