(function () {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('remoteDataAdapter', remoteDataAdapter);

	remoteDataAdapter.$inject = [];

	/* @ngInject */
	function remoteDataAdapter() {
		var service = {
			adaptBusiness: adaptBusiness,
			adaptCategories: adaptCategories,
			adaptProducts: adaptProducts,
			adaptProduct: adaptProduct
		};
		return service;

		function adaptBusiness(business) {
			return business;
		}
		
		function adaptCategories(categories) {
			return categories;
		}
		
		function adaptProducts(products) {
			return products;
		}
		
		function adaptProduct(product) {
			return product;
		}
	}
})();
