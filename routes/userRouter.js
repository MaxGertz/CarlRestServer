const express = require('express');
const userRouter = express.Router();
const User = require('../models/userModel');
let ObjectId = require('mongoose').Types.ObjectId;


userRouter.use('/authUser', (req, res, next) => {
	console.log('Auth User! Time: ' + Date.now());
	next()
});
userRouter.use('/addUser', (req, res, next) => {
	console.log('Add User! Time: ' + Date.now());
	next()
});

userRouter.use('/findUser', (req, res, next) => {
	console.log('Find User! Time: ' + Date.now());
	next();
});

userRouter.route('/findUser/:uId')
	.get((req, res) => {
		User.find({ _id: req.params.uId }, (err, user) => {
			if (err)
				res.status(404).send(err);
			else {
				console.log(user);
				res.status(200).send(user);
			}
		});
	});

//TODO find your by licensePlate and send user back to client, check user with multiple licensePlates. Still working?
userRouter.route('/userByPlate/:pID')
	.get((req, res) => {
		User.find({ licensePlate: req.params.pID }, (err, user) => {
			console.log(req.params.pID);
			if (err)
				res.status(404).send(err)
			else {
				res.status(200).send(user);
			}
		})
	});


module.exports = userRouter;
