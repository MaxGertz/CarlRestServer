const express = require('express');
const carparkRouter = express.Router();
const Carpark = require('../models/carparkModel');
const mongoose = require('mongoose');
let ObjectId = require('mongoose').Types.ObjectId;


carparkRouter.use('/getAllCarparks', (req, res, next) => {
	console.log(Date.now() + ': Returning all carparks!');
	next();
});

carparkRouter.use('addCarpark', (req, res, next) => {
	console.log(Date.now() + ': Adding new carpark!');
	next();
});

carparkRouter.route('/getAllCarparks')
	.get((req, res) => {
		Carpark.find({}, (err, carparks) => {
			if (err)
				res.status(500).send(err);
			else {
				console.log(carparks);
				res.status(200).send(carparks);
			}
		});
	});

carparkRouter.route('/addCarpark')
	.post((req, res) => {
		let newCarpark = new Carpark({
			_id: new ObjectId,
			name: req.body.name,
			wallet: req.body.wallet,
			address: req.body.address,
			parkingSpaces: req.body.parkingSpaces
		});
		newCarpark.save((err) => {
			if (err)
				res.status(404).send(err)
			else {
				console.log(newCarpark);
				res.status(201).send(newCarpark);
			}
		});
	});

module.exports = carparkRouter;