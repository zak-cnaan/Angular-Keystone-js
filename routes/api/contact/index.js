
var keystone = require('keystone'),
	controller = require('./controller'),
    apiName = 'contact';

module.exports = function (app){
	app.post('/api/' + apiName, keystone.initAPI, controller.contact);
};