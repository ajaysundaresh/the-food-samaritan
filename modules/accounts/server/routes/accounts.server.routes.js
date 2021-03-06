'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  accountsPolicy = require('../policies/accounts.server.policy'),
  accounts = require(path.resolve('./modules/accounts/server/controllers/accounts.server.controller'));


module.exports = function(app) {

  // accounts collection routes
  app.route('/api/accounts')
    .all(accountsPolicy.isAllowed)
    .get(accounts.list)
    .post(accounts.create);

  // Single account routes
  app.route('/api/accounts/:accountId')
    .all(accountsPolicy.isAllowed)
    .get(accounts.read)
    .put(accounts.update)
    .delete(accounts.delete);

  // Finish by binding the account middleware
  app.param('accountId', accounts.accountByID);

};