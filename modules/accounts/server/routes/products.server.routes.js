'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  productsPolicy = require('../policies/products.server.policy'),
  products = require(path.resolve('./modules/accounts/server/controllers/products.server.controller'));


module.exports = function(app) {

  // products collection routes
  app.route('/api/products')
    .all(productsPolicy.isAllowed)
    .get(products.list)
    .post(products.create);


  // Single product routes
  app.route('/api/products/:productId')
    .all(productsPolicy.isAllowed)
    .get(products.read)
    .put(products.update)
    .delete(products.delete);

  // Finish by binding the product middleware
  app.param('productId', products.productByID);

};