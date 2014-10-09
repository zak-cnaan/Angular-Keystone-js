
var keystone = require('keystone');
var secret = keystone.get("cookie secret");
var passport = require('passport');
var jwt = require('jsonwebtoken');



function signToken(id) {
    return jwt.sign({ _id: id }, secret, { expiresInMinutes: 60*5 });
}
module.exports = function (app){
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

    app.post(
        "/auth/login",
        passport.authenticate("local"),
        // Only invoked on success
        // passport automatically sends 401 on failure
        function (req, res) {
            //return res.send({success: true});

            var token = signToken(req.user._id);
            res.json({token: token});
        }
    );

    app.get('/auth/logout', function(req, res){
        req.logout();
        return res.send({success: true});
    });
};