const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    _id: {type: mongoose.Schema.ObjectId, ref:'User'},
    name: {type: String, unique: true},
    password: String,
    licensePlate: [String],
}, {collection: 'User'});

module.exports = mongoose.model('User', userModel);
