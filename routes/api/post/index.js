
var keystone = require('keystone'),
	controller = require('./controller'),
	apiName = 'post';

module.exports = function (app){
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
	app.get('/api/' + apiName, keystone.initAPI, controller.list);
	app.get('/api/' + apiName + '/:id', keystone.initAPI, controller.get);
	app.post('/api/' + apiName, keystone.initAPI, controller.create);
	app.put('/api/' + apiName + '/:id', keystone.initAPI, controller.update);
	app.delete('/api/' + apiName + '/:id', keystone.initAPI, controller.remove);
};