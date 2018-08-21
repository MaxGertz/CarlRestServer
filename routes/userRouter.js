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

//TODO create all UserRoutes

userRouter.route('/authUser/:username')
	.get((req, res) => {
		console.log(req.params.username);
		User.find({ name: req.params.username }, (err, user) => {
			if (err)
				res.status(404).send(err);
			else {
				console.log(user);

				// TODO: password check and response to client
				res.status(200).send(user);
			}
		});
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

userRouter.route('/addUser')
	.post((req, res) => {
		console.log(req.body.licensePlate);
		console.log('Body:' + req.body);
		let newUser = new User({
			_id: new ObjectId,
			name: req.body.name,
			password: req.body.password,
			licensePlate: req.body.licensePlate
		});
		newUser.save(function(err) {
			if (err)
				res.status(400).send(err);
			else {
				console.log('User: ' + newUser);
				res.status(201).send(newUser);
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