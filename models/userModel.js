const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userModel = new Schema({
	//id: { type: mongoose.Schema.ObjectId, ref: 'User' },
	name: { type: String, unique: true },
	password: String,
	licensePlate: [String],
});


userModel.pre('save', function (next) {

	const user = this;

	bcrypt.genSalt(10, (err, salt) => {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) {
				return next(err);
			}
			console.log(hash);
			user.password = hash

			next();
		});
	});
});

userModel.methods.comparePasswords = (password, corpassword, callback) => {
	console.log('Called compare!: ' + password,	 corpassword);
	bcrypt.compare(password, corpassword, (err, isMatch) => {
		if (err) {
			return callback(err);
		}

		callback(null, isMatch);
	});
};



module.exports = mongoose.model('User', userModel);
