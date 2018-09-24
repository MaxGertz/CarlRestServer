const express = require('express');
const ticketRouter = express.Router();
const Ticket = require('../models/ticketModel');
const mongoose = require('mongoose');
const passport = require('passport');
require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });


// TODO: Add requireAuth!
ticketRouter.route('/addNewTicket')
	.post((req, res) => {
		console.log(req.body);
		let newTicket = new Ticket({
			userId: req.body.userId,
			carparkId: req.body.carparkId,
			contractAddress: req.body.contractAddress,
			licensePlate: req.body.licensePlate,
			startTime: req.body.startTime,
			endTime: '',
			finished: false
		});
		newTicket.save((err) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(201).send(newTicket)
			}
		});
	});

ticketRouter.route('/closeTicket')
	.put((req, res) => {
		Ticket.findOne({ _id: req.body._id }, (err, ticket) => {
			if (err || ticket == null || ticket.finished == true)
				res.status(404).send(err);
			else {
				ticket.endTime = req.body.endTime;
				ticket.finished = true;
				ticket.save();
				res.status(200).send(ticket)
			}
		})
	});

ticketRouter.get('/byCA/:address', (req, res) => {
	Ticket.findOne({ contractAddress: req.params.address }, (err, ticket) => {
		if (err) {
			res.status(204).send(err.message);
		} else {
			res.status(200).send(ticket);
		}
	});
});

// Return all open tickets for user(_id) -> used in overview!
ticketRouter.get('/openTickets', requireAuth, (req, res) => {
	Ticket.find({ userId: req.user._id, finished: false }, (err, ticket) => {
		if (err) {
			res.status(204).send(null);
		} else {
			res.status(200).send(ticket);
		}
	});
});

module.exports = ticketRouter;