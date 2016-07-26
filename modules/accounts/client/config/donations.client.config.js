'use strict';

// Configuring the Donations module
angular.module('donations').run(['Menus',
  function(Menus) {
    // Add the donations dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Donations',
      state: 'donations',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'donations', {
      title: 'List Donations',
      state: 'donations.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'donations', {
      title: 'Create Donations',
      state: 'donations.create',
      roles: ['user']
    });
  }
]);