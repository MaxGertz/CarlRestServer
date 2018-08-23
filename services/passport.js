const passport = require('passport');
const User = require('../models/userModel');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const { secret } = require('../config');


// setting local strategy:
const localOptions = { usernameField: 'username' };
const localLogin = new LocalStrategy(localOptions, function (username, password, done) {
	User.findOne({ name: username }, (err, user) => {
		if (err) {
			return done(err);
		}

		console.log('Start localLogin: ' + user);

		if (!user) {
			return done(null, false);
		}

		console.log('User password:', user.password);

		user.comparePasswords(password, user.password, (err, isMatch) => {
			if (err) {
				return done(err);
			}

			if (!isMatch) {
				console.log('Match false');
				return done(null, false);
			}

			console.log('Match true');
			return done(null, user);
		});
	});
});


// setting the jwt strategy:
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
	User.findById(payload.sub)
		.then((user) => {
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		})
		.catch((err) => done(err, false));
});

// tell passport to use defined strategies:

passport.use(jwtLogin);
passport.use(localLogin);
