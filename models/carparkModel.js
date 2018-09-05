const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
	costHour: String
}, { collection: 'Carparks' });

module.exports = mongoose.model('Carpark', carparkModel);
