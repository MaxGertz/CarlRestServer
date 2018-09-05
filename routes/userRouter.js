const express = require('express');
const userRouter = express.Router();
const User = require('../models/userModel');
let ObjectId = require('mongoose').Types.ObjectId;



userRouter.route('/find/:uId')
	.get((req, res) => {
		User.findOne({ _id: req.params.uId }, (err, user) => {
			if (err)
				res.status(404).send(null);
			else {
				res.status(200).send(user);
			}
		});
	});

// TODO find your by licensePlate and send user back to client, check user with multiple licensePlates. Still working?
userRouter.route('/userByPlate/:pID')
	.get((req, res) => {
		User.find({ licensePlate: req.params.pID }, (err, user) => {
			if (err)
				res.status(204).send(err)
			else {
				res.status(200).send(user);
			}
		})
	});


module.exports = userRouter;
