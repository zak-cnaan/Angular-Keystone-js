
var keystone = require('keystone');
var passport = require('passport');

module.exports = function (app){
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

    app.post(
        "/auth/login",
        passport.authenticate("local"),
        // Only invoked on success
        // passport automatically sends 401 on failure
        function (req, res) {
            return res.send({success: true});
        }
    );
    app.get('/auth/logout', function(req, res){
        req.logout();
        return res.send({success: true});
    });
};