
var keystone = require('keystone'),
	controller = require('./controller'),
    apiName = 'thumb';

module.exports = function (app){
	app.get('/api/' + apiName, keystone.initAPI, controller.list);
};