'use strict';

//Donations service used for communicating with the donations REST endpoints
angular.module('donations').factory('Donations', ['$resource',
  function($resource) {
    return $resource('api/donations/:donationId', {
      donationId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);