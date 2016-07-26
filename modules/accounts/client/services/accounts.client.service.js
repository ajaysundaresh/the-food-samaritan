'use strict';

//Accounts service used for communicating with the accounts REST endpoints
angular.module('accounts').factory('Accounts', ['$resource',
  function($resource) {
    return $resource('api/accounts/:accountId', {
      accountId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);