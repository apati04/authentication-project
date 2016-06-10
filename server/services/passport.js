const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strat
const localOptions = { usernameField: 'email'} // by default it will handle username but since we are using email, set usrname to look at email value
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	// verify this username and pw, call done with user if correct
	// otherwise call done with false
	User.findOne({ email: email }, function(err, user) {
		if(err) { return done(err); }
		if(!user) { return done(null, false); }

		// compare pw's - is 'pw' = to user.password?
		user.comparePassword(password, function(err, isMatch){
			if(err) { return done(err); }
			if(!isMatch) { return done(null, false); }

			return done(null, user);
		})
	})
});
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
passport.use(jwtLogin);
passport.use(localLogin);
