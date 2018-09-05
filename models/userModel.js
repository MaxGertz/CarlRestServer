const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

// Schema for the user collection
// licensePlate is an array to enable the use of multiple license plates for
// a user
const userModel = new Schema({
	name: { type: String, unique: true },
	password: String,
	licensePlate: [String],
});

// hashing the password with bcrypt before adding & saving a new user in the db
userModel.pre('save', function(next) {

	const user = this;

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) {
				return next(err);
			}
			user.password = hash

			next();
		});
	});
});

// method to compare password during the login progress
// compares the hash of the password and the by the user entered password
userModel.methods.comparePasswords = (password, corpassword, callback) => {
	bcrypt.compare(password, corpassword, (err, isMatch) => {
		if (err) {
			return callback(err);
		}

		callback(null, isMatch);
	});
};

module.exports = mongoose.model('User', userModel);