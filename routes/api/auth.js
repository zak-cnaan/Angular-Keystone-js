

var _ = require('underscore'),
    keystone = require('keystone');


exports.isAuthenticated = function(req, res, next) {

    if (!req.user) {
        //req.flash('error', 'Please sign in to access this page.');
        //res.redirect('/keystone/signin');
        res.send(401);
    } else {
        next();
    }

};

exports.requireUser = function(req, res, next) {

    if (!req.user) {
        //req.flash('error', 'Please sign in to access this page.');
        //res.redirect('/keystone/signin');
        res.send(401);
    }
    else if (req.user._id != req.params.id) {
        //req.flash('error', 'Please sign in to access this page.');
        //res.redirect('/keystone/signin');
        res.send(401);
    } else {
        next();
    }

};

exports.requireAdmin = function(req, res, next) {

    if (!req.user) {
        //req.flash('error', 'Please sign in to access this page.');
        //res.redirect('/keystone/signin');
        res.send(401);
    }
    else if (!req.user.isAdmin) {
        //req.flash('error', 'Please sign in to access this page.');
        //res.redirect('/keystone/signin');
        res.send(401);
    } else {
        next();
    }

};
