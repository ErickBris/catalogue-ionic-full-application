(function () {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('dataManager', dataManager);

	dataManager.$inject = [];

	/* @ngInject */
	function dataManager() {
		var dataService;
		var dataAdapter;

		var service = {
			init: init,
			getCategories: getCategories,
			getProducts: getProducts,
			getProduct: getProduct,
			getFeaturedCategories: getFeaturedCategories,
			getFeaturedProducts: getFeaturedProducts,
			getFeaturedProduct: getFeaturedProduct,
			getBusiness: getBusiness
		};

		return service;

		function init(service, adapter) {
			dataService = service;
			dataAdapter = adapter;
		}

		function getBusiness() {
			return dataService.getBusiness().then(function(business) {
				return dataAdapter.adaptBusiness(business);
			});
		}

		function getCategories() {
			return dataService.getCategories().then(function(categories) {
				return dataAdapter.adaptCategories(categories);
			});
		}

		function getFeaturedCategories() {
			return dataService.getFeaturedCategories().then(function(categories) {
				return dataAdapter.adaptCategories(categories);
			});
		}

		function getProducts(categoryGuid) {
			return dataService.getProducts(categoryGuid).then(function(products) {
				return dataAdapter.adaptProducts(products);
			});
		}

		function getFeaturedProducts() {
			return dataService.getFeaturedProducts().then(function(products) {
				return dataAdapter.adaptProducts(products);
			});
		}

		function getProduct(categoryGuid, productGuid) {
			return dataService.getProduct(categoryGuid, productGuid).then(function(product) {
				return dataAdapter.adaptProduct(product);
			});
		}

		function getFeaturedProduct(productGuid) {
			return dataService.getFeaturedProduct(productGuid).then(function(product) {
				return dataAdapter.adaptProduct(product);
			});
		}
	}
})();
