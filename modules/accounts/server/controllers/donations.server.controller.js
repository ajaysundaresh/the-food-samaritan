'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  db = require(path.resolve('./config/lib/sequelize')).models,
  Donation = db.donation;

/**
 * Create a donation
 */
exports.create = function(req, res) {
  Donation.create(req.body).then(function(donation) {
    if (!donation) {
      return res.send('users/signup', {
        errors: 'Could not create the donation'
      });
    } else {
      return res.jsonp(donation);
    }
  }).catch(function(err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current donation
 */
exports.read = function(req, res) {
  res.json(req.donation);
};

/**
 * Update a donation
 */
exports.update = function(req, res) {
  var donation = req.donation;

  donation.updateAttributes({
    name: req.body.name,
    donationType: req.body.donationType,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    faxNumber: req.body.faxNumber,
    emailAddress: req.body.emailAddress
  }).then(function(donation) {
    res.json(donation);
  }).catch(function(err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an donation
 */
exports.delete = function(req, res) {
  var donation = req.donation;

  // Find the donation
  Donation.findById(donation.id).then(function(donation) {
    if (donation) {

      // Delete the donation
      donation.destroy().then(function() {
        return res.json(donation);
      }).catch(function(err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      });

    } else {
      return res.status(400).send({
        message: 'Unable to find the donation'
      });
    }
  }).catch(function(err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  });

};

/**
 * List of Donations
 */
exports.list = function(req, res) {
  Donation.findAll({
    include: [db.user]
  }).then(function(donations) {
    if (!donations) {
      return res.status(404).send({
        message: 'No donations found'
      });
    } else {
      res.json(donations);
    }
  }).catch(function(err) {
    res.jsonp(err);
  });
};

/**
 * Donation middleware
 */
exports.donationByID = function(req, res, next, id) {

  if ((id % 1 === 0) === false) { //check if it's integer
    return res.status(404).send({
      message: 'Donation is invalid'
    });
  }

  Donation.find({
    where: {
      id: id
    },
    include: [{
      model: db.user
    }]
  }).then(function(donation) {
    if (!donation) {
      return res.status(404).send({
        message: 'No donation with that identifier has been found'
      });
    } else {
      req.donation = donation;
      next();
    }
  }).catch(function(err) {
    return next(err);
  });

};