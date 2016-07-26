'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  donationsPolicy = require('../policies/donations.server.policy'),
  donations = require(path.resolve('./modules/accounts/server/controllers/donations.server.controller'));


module.exports = function(app) {

  // donations collection routes
  app.route('/api/donations')
    .all(donationsPolicy.isAllowed)
    .get(donations.list)
    .post(donations.create);

  // Single donation routes
  app.route('/api/donations/:donationId')
    .all(donationsPolicy.isAllowed)
    .get(donations.read)
    .put(donations.update)
    .delete(donations.delete);

  // Finish by binding the donation middleware
  app.param('donationId', donations.donationByID);

};