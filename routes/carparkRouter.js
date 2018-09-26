const express = require('express');
const carparkRouter = express.Router();
const Carpark = require('../models/carparkModel');
const mongoose = require('mongoose');
const passport = require('passport');
require('../services/passport');
let ObjectId = require('mongoose').Types.ObjectId;

const requireAuth = passport.authenticate('jwt', { session: false });

carparkRouter.use('addCarpark', (req, res, next) => {
  console.log(Date.now() + ': Adding new carpark!');
  next();
});

carparkRouter.route('/getAllCarparks').get((req, res) => {
  Carpark.find({}, (err, carparks) => {
    if (err) res.status(500).send(err);
    else {
      console.log(carparks);
      res.status(200).send(carparks);
    }
  });
});

carparkRouter.route('/addCarpark').post((req, res) => {
  let newCarpark = new Carpark({
    _id: new ObjectId(),
    name: req.body.name,
    wallet: req.body.wallet,
    address: req.body.address,
    parkingSpaces: req.body.parkingSpaces,
    costHour: req.body.costHour
  });
  newCarpark.save(err => {
    if (err) res.status(404).send(err);
    else {
      console.log(newCarpark);
      res.status(201).send(newCarpark);
    }
  });
});

carparkRouter.get('/:carparkId', (req, res) => {
  Carpark.findOne({ _id: req.params.carparkId }, (err, carpark) => {
    if (err) {
      res.status(204).send(null);
    } else {
      res.status(200).send(carpark);
    }
  });
});

module.exports = carparkRouter;
