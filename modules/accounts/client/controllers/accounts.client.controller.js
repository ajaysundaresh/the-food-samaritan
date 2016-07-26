'use strict';

// Accounts controller
angular.module('accounts').controller('AccountsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Accounts',
  function($scope, $stateParams, $location, Authentication, Accounts) {
    $scope.authentication = Authentication;

    // Create new Account
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'accountForm');

        return false;
      }

      // Create new Account object
      var account = new Accounts({
        name: this.name,
        accountType: this.accountType,
        address: this.address,
        phoneNumber: this.phoneNumber,
        faxNumber: this.faxNumber,
        emailAddress: this.emailAddress
      });

      // Redirect after save
      account.$save(function(response) {
        $location.path('accounts/' + response.id);

        // Clear form fields
        $scope.name = '';
        $scope.address = '';
        $scope.phoneNumber = '';
        $scope.faxNumber = '';
        $scope.emailAddress = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Account
    $scope.remove = function(account) {
      if (account) {

        account.$remove();
        $location.path('accounts');
      } else {
        $scope.account.$remove(function() {
          $location.path('accounts');
        });
      }
    };

    // Update existing Account
    $scope.update = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'accountForm');
        return false;
      }

      var account = $scope.account;

      account.$update(function() {
        $location.path('accounts/' + account.id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Accounts
    $scope.find = function() {
      $scope.accounts = Accounts.query();
    };

    // Find existing Account
    $scope.findOne = function() {
      $scope.account = Accounts.get({
        accountId: $stateParams.accountId
      });
    };
  }
]);