'use strict';

// Setting up route
angular.module('products').config(['$stateProvider',
  function($stateProvider) {
    // Products state routing

    $stateProvider
      .state('products', {
        abstract: true,
        url: '/products',
        template: '<ui-view/>'
      })
      .state('products.list', {
        url: '',
        templateUrl: 'modules/accounts/client/views/products/list-products.client.view.html'
      })
      .state('products.create', {
        url: '/create',
        templateUrl: 'modules/accounts/client/views/products/create-product.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('products.view', {
        url: '/:productId',
        templateUrl: 'modules/accounts/client/views/products/view-product.client.view.html'
      })
      .state('products.edit', {
        url: '/:productId/edit',
        templateUrl: 'modules/accounts/client/views/products/edit-product.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);