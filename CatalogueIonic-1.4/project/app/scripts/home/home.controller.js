(function() {
	'use strict';

	angular
		.module('catalogue.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['$state', 'homeService', '$ionicSlideBoxDelegate'];

	/* @ngInject */
	function HomeController($state, homeService, $ionicSlideBoxDelegate) {
		var vm = angular.extend(this, {
			categories: [],
			products: [],
			showProducts: showProducts,
			showProductDetails: showProductDetails,
			storeName: ''
		});

		(function activate() {
			homeService.getFeaturedCategories().then(function(result) {
				vm.categories = result;
			});
			homeService.getFeaturedProducts().then(function(result) {
				vm.products = result;
				$ionicSlideBoxDelegate.update();
			});
			homeService.getBusiness().then(function(result) {
				vm.storeName = result.storeName;
			});
		})();

		// ******************************************************

		function showProductDetails(product) {
			$state.go('app.featured-product', {
				productId: product.guid
			});
		}

		function showProducts(category) {
			$state.go('app.products', {
				categoryId: category.guid,
				categoryName: category.title
			});
		}
	}
})();
