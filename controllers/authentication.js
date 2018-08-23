const jwt = require('jwt-simple');
const User = require('../models/userModel');
const { secret } = require('../config');
let ObjectId = require('mongoose').Types.ObjectId;


function tokenForUser(user) {
	const timestamp = new Date().getTime();

	return jwt.encode({ sub: user._id, iat: timestamp }, secret);
}

exports.signin = (req, res) => {
	res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	if (!username || !password) {
		return res.status(422).send({ error: 'Email and password must be provided' });
	}

	User.findOne({ name: username }, (err, existingUser) => {
		if (err) {
			return next(err);
		}

		if (existingUser) {
			return res.status(422).send({ error: 'Username is already used!' });
		}

		const user = new User({
			//id: new ObjectId,
			name: username,
			password: password
		});

		user.save((err) => {
			if (err) {
				return next(err);
			}

			res.json({ token: tokenForUser(user) });
		});
	});
};