const express = require('express');
const ticketRouter = express.Router();
const Ticket = require('../models/ticketModel');
const mongoose = require('mongoose');
const passport = require('passport');
require('../services/passport');
let ObjectId = require('mongoose').Types.ObjectId;

const requireAuth = passport.authenticate('jwt', { session: false });

ticketRouter.use('/addTicket', (req, res, next) => {
	console.log('Adding new ticket! Time: ' + Date.now());
	next()
});

ticketRouter.use('/getAllTickets', (req, res, next) => {
	console.log('Returning all tickets! Time ' + Date.now());
	next()
});

ticketRouter.use('/closeTicket', (req, res, next) => {
	console.log('Closing ticket! Time ' + Date.now());
	next()
});

ticketRouter.use('/openTickets', (req, res, next) => {
	console.log('Sending open tickets! Time ' + Date.now());
	next();
})

// TODO: Add requireAuth!
ticketRouter.route('/addNewTicket')
	.post((req, res) => {
		let newTicket = new Ticket({
			_id: new ObjectId,
			userId: req.body.userId,
			carparkId: req.body.carparkId,
			contractAddress: req.body.contractAddress,
			licensePlate: req.body.licensePlate,
			startTime: req.body.startTime,
			endTime: '',
			finished: false
		});
		newTicket.save((err) => {
			if (err)
				res.status(400).send(err);
			else {
				console.log(newTicket);
				res.status(201).send(newTicket)
			}
		});
	});

// IDEA: search by contractAddress -> Address is unique!
// TODO: Add requireAuth!
ticketRouter.route('/closeTicket')
	.put((req, res) => {
		Ticket.findOne({ _id: req.body._id }, (err, ticket) => {
			if (err || ticket == null || ticket.finished == true)
				res.status(404).send(err);
			else {
				console.log('Old ticket: ' + ticket);
				ticket.endTime = Date.now();
				ticket.finished = true;
				ticket.save();
				console.log('Updated: ' + ticket);
				res.status(200).send(ticket)
			}
		})
	});

// Return all open tickets for user(_id) -> used in overview!
ticketRouter.get('/openTickets', requireAuth, function(req, res) {
	Ticket.find({ userId: req.user._id, finished: false }, (err, ticket) => {
		if (err)
			res.status(204).send(null);
		else {
			console.log(ticket);
			res.status(200).send(ticket);
		}
	});
});

module.exports = ticketRouter;