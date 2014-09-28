var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Model = new keystone.List('Faq', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Model.add({
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

Model.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Model.register();
