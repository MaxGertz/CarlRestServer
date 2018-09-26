const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema used in the db for the carparks
// starttime is the blocktime from the smartContract
const ticketModel = new Schema(
  {
    userId: String,
    carparkId: String,
    licensePlate: String,
    contractAddress: { type: String, unique: true },
    startTime: Number,
    endTime: Number,
    finished: Boolean
  },
  { collection: 'Tickets' }
);

module.exports = mongoose.model('Tickets', ticketModel);
