const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// set options for jwt strat
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret,
};

// create jwt strat
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// check if user id in payload exist in db
	// if true, call 'done'
	// else, call done without user object
	User.findById(payload.sub, function(err, user){
		if (err) { return done(err, false); }
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	})
})

// tell passport to use this strat
passport.use(jwtLogin)
