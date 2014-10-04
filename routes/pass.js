
var keystone = require('keystone');
var passport = require("passport");
var User = keystone.list("User");
var LocalStrategy = require("passport-local").Strategy;

passport.serializeUser(function (user, cb) {
    cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
    User.model.findById(id, function (er, user) {
        cb(er, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.model.findOne({ email: email }).exec(function(err, user) {
            if (user) {
                user._.password.compare(password, function(err, isMatch) {
                    if (!err && isMatch) {
                        return done(null, user);
                    }
                    else {
                        return done(err);
                    }
                });
            } else {
                return done(null, false, {
                    'errors': {
                        'email': { type: 'Email is not registered.' }
                    }
                });
            }
        });

    }
));