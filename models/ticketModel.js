const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketModel = new Schema({
    _id: {type: mongoose.Schema.ObjectId, ref:'Ticket'},
    userId: String,
    carparkId: String,
    licensePlate: String,
		contractAddress: {type: String, unique: true},
    startTime: Date,
    endTime: Date,
    finished: Boolean
}, {collection: 'Tickets'});

module.exports = mongoose.model('Tickets', ticketModel);
