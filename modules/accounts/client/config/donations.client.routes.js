'use strict';

// Setting up route
angular.module('donations').config(['$stateProvider',
  function($stateProvider) {
    // Donations state routing

    $stateProvider
      .state('donations', {
        abstract: true,
        url: '/donations',
        template: '<ui-view/>'
      })
      .state('donations.list', {
        url: '',
        templateUrl: 'modules/accounts/client/views/donations/list-donations.client.view.html'
      })
      .state('donations.create', {
        url: '/create',
        templateUrl: 'modules/accounts/client/views/donations/create-donation.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('donations.view', {
        url: '/:donationId',
        templateUrl: 'modules/accounts/client/views/donations/view-donation.client.view.html'
      })
      .state('donations.edit', {
        url: '/:donationId/edit',
        templateUrl: 'modules/accounts/client/views/donations/edit-donation.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);