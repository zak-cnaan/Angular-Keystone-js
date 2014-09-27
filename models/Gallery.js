var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Gallery Model
 * =============
 */

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Gallery.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	photo: {
	type: Types.LocalFile,
	dest: 'public/uploads',
	prefix: '/uploads/'
},
	heroImage: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages }
});

Gallery.register();
