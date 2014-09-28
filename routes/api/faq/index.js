
var keystone = require('keystone'),
	controller = require('./controller');

module.exports = function (app){
	app.get('/api/faqs', keystone.initAPI, controller.list);
	app.get('/api/faqs/:id', keystone.initAPI, controller.get);
	app.post('/api/faqs', keystone.initAPI, controller.create);
	app.put('/api/faqs/:id', keystone.initAPI, controller.update);
	app.delete('/api/faqs/:id', keystone.initAPI, controller.remove);
};