(function() {
	'use strict';

	angular
		.module('catalogue.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$scope', '$state', 'productsService'];

	/* @ngInject */
	function ProductsController($scope, $state, productsService) {
		var categoryId = $state.params.categoryId;
		var categoryName = $state.params.categoryName;
		var category = categoryId || categoryName;

		var vm = angular.extend(this, {
			products: [],
			doRefresh: doRefresh,
			showProductDetails: showProductDetails,
			category: categoryName
		});

		(function activate() {
			loadProducts();
		})();

		// ******************************************************

		function loadProducts() {
			return productsService.all(category).then(function(data) {
				vm.products = data;
			});
		}

		function doRefresh() {
			loadProducts().then(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
		}

		function showProductDetails(productId) {
			$state.go('app.product', {
				categoryId: category,
				productId: productId
			});
		}
	}
})();