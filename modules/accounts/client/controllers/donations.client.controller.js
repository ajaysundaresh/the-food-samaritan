'use strict';

// Donations controller
angular.module('donations').controller('DonationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Donations', 
  function ($scope, $stateParams, $location, Authentication, Donations) {
    $scope.authentication = Authentication;

    // Create new Donation
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'donationForm');

        return false;
      }

      // Create new Donation object
      var donation = new Donations({
        description: this.description,
        startDate: this.startDate,
        endDate: this.endDate,
        accountId: this.accountId,
        productId: this.productId,
        count: this.count
      });

      // Redirect after save
      donation.$save(function (response) {
        $location.path('donations/' + response.id);

        // Clear form fields
        $scope.description = '';
        $scope.startDate = Date.now();
        $scope.endDate = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Donation
    $scope.remove = function (donation) {
      if (donation) {

        donation.$remove();
        $location.path('donations');
      } else {
        $scope.donation.$remove(function () {
          $location.path('donations');
        });
      }
    };

    // Update existing Donation
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'donationForm');
        return false;
      }

      var donation = $scope.donation;

      donation.$update(function () {
        $location.path('donations/' + donation.id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Donations
    $scope.find = function () {
      $scope.donations = Donations.query();
    };

    // Find existing Donation
    $scope.findOne = function () {
      $scope.donation = Donations.get({
        donationId: $stateParams.donationId
      });
    };
  }
]);