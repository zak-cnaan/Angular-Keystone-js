var keystone = require('keystone'),
    Types = keystone.Field.Types;


var Model = new keystone.List('Thumb', {
    map: { name: 'title' },
    autokey: { path: 'slug', from: 'title', unique: true }
});

Model.add({
    title: { type: String, required: true },
    image: {
        type: Types.LocalFile,
        dest: 'systemfiles',
        prefix: '/systemfiles/' }
});

Model.register();
