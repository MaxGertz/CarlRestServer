const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema used in the db for the carparks
const carparkModel = new Schema({
	_id: { type: mongoose.Schema.ObjectId, ref: 'Carpark' },
	name: String,
	wallet: { type: String, unique: true },
	address: {
		street: String,
		number: String,
		zipCode: String,
		city: String,
		country: String,
	},
	parkingSpaces: Number,
	costHour: Number
}, { collection: 'Carparks' });

module.exports = mongoose.model('Carpark', carparkModel);
