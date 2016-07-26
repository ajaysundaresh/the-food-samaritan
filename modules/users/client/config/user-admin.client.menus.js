'use strict';

// Configuring the Accounts module
angular.module('user.admin').run(['Menus',
  function(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });
  }
]);