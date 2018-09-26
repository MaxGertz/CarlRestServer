const express = require('express');
const userRouter = express.Router();
const User = require('../models/userModel');
let ObjectId = require('mongoose').Types.ObjectId;

userRouter.route('/find/:uId').get((req, res) => {
  User.findOne({ _id: req.params.uId }, (err, user) => {
    if (err) res.status(404).send(null);
    else {
      res.status(200).send(user);
    }
  });
});

userRouter.route('/userByPlate/:pID').get((req, res) => {
  User.find({ licensePlate: req.params.pID }, (err, user) => {
    if (err) res.status(204).send(err);
    else {
      res.status(200).send(user);
    }
  });
});

userRouter.route('/addLicensePlate').put((req, res) => {
  User.findByIdAndUpdate(
    req.body._id,
    { $push: { licensePlate: req.body.licensePlate } },
    (err, user) => {
      if (err) {
        res.status(204).send(err);
      } else {
        res.status(200).send(user);
      }
    }
  );
});

module.exports = userRouter;
