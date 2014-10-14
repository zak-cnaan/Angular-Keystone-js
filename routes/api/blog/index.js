
var keystone = require('keystone'),
	controller = require('./controller'),
	apiName = 'blog';

module.exports = function (app){
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
	app.get('/api/' + apiName, keystone.initAPI, controller.list);
	app.get('/api/' + apiName + '/post/:id', keystone.initAPI, controller.get);
	app.get('/api/' + apiName + '/:cat', keystone.initAPI, controller.cat);
};