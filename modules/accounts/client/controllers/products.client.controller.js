'use strict';

// Products controller
angular.module('products').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products', 
  function ($scope, $stateParams, $location, Authentication, Products) {
    $scope.authentication = Authentication;

    // Create new Product
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'productForm');

        return false;
      }

      // Create new Product object
      var product = new Products({
        name: this.name,
        productType: this.productType,
        unit: this.unit
      });

      // Redirect after save
      product.$save(function (response) {
        $location.path('products/' + response.id);

        // Clear form fields
        $scope.name = '';
        $scope.productType = '';
        $scope.unit = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Product
    $scope.remove = function (product) {
      if (product) {

        product.$remove();
        $location.path('products');
      } else {
        $scope.product.$remove(function () {
          $location.path('products');
        });
      }
    };

    // Update existing Product
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'productForm');
        return false;
      }

      var product = $scope.product;

      product.$update(function () {
        $location.path('products/' + product.id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Products
    $scope.find = function () {
      $scope.products = Products.query();
    };

    // Find existing Product
    $scope.findOne = function () {
      $scope.product = Products.get({
        productId: $stateParams.productId
      });
    };
  }
]);