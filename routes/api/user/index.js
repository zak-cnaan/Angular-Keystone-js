
var keystone = require('keystone'),
	controller = require('./controller'),
    auth = require('../auth'),
    apiName = 'user';

module.exports = function (app){
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
	app.get('/api/' + apiName, [auth.requireAdmin, keystone.initAPI], controller.list);
    //app.delete('/api/' + apiName + '/:id', [auth.requireAdmin, keystone.initAPI], controller.remove);
    //app.get('/api/' + apiName + '/:id/password', [auth.isAuthenticated(), keystone.initAPI], controller.changePassword);
    app.get('/api/' + apiName + '/:id', [auth.requireUser, keystone.initAPI], controller.get);
	app.post('/api/' + apiName, keystone.initAPI, controller.create);
};
