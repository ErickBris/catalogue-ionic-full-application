(function () {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('wooCommerceDataService', wooCommerceDataService);

	wooCommerceDataService.$inject = ['$http', '$q', '_', 'ENV'];

	/* @ngInject */
	function wooCommerceDataService($http, $q, _, ENV) {
		var categoriesUrl = ENV.data.apiUrl + 'products/categories';
		var featuredProductsUrl = ENV.data.apiUrl + 'products?filter[featured]=true'; // FILTER DOESN'T WORK
		var productsUrl = ENV.data.apiUrl + 'products';
		var businessUrl = ENV.data.apiUrl + 'products/categories';
		var categories = [];
		var featuredProducts;
		var products = {};

		var service = {
			getCategories: getCategories,
			getProducts: getProducts,
			getProduct: getProduct,
			getFeaturedCategories: getFeaturedCategories,
			getFeaturedProducts: getFeaturedProducts,
			getFeaturedProduct: getFeaturedProduct,
			getBusiness: getBusiness
		};

		return service;

		function getBusiness(){
			return $q.when({
				"storeName": "Home Decoration",
				"address": "50 Market Street, San Francisco, California 94103, United States",
				"desc": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
				"phoneNumber": "+306973216110",
				"email": "skounis@gmail.com",
				"officeLocation": "37.7736854,-122.421034",
				"facebookPage": "https://www.facebook.com/ionicframework",
				"instagramPage": "https://instagram.com/phonegap/",
				"twitterPage": "https://twitter.com/titemplates/",
				"pinterestPage": "https://www.pinterest.com/",
				"map": {
					"origin": {
						"latitude" : 37.407,
						"longitude" : -122.1
					},
					"zoomLevel": 15,
					"annotations" : [{
						"title" : "Molestie et wisi.",
						"latitude" : 37.407,
						"longitude" : -122.1
					}, {
						"title" : "Ullamcorper eros.",
						"latitude" : 37.41,
						"longitude" : -122.1
					}]
				}
			});
		}

		function getCategories() {
			if (categories && categories.length > 0) {
				return $q.when(categories);
			}

			return $http.get(categoriesUrl, {
				headers: getAuthHeaders()
			}).then(function(response) {
				categories = response.data.product_categories;
				return categories;
			});
		}

		function getFeaturedCategories() {
			return getCategories().then(function(categories) {
				//return _.filter(categories, 'featured', true);
				return categories;
			});
		}

		function getProducts(category) {
			var url = productsUrl + '?filter[category]=' + category;
			return $http.get(url, {
				headers: getAuthHeaders()
			}).then(function(response) {
				return response.data.products;
			});
		}

		function getFeaturedProducts() {
			if (featuredProducts) {
				return $q.when(featuredProducts);
			}

			return $http.get(featuredProductsUrl, {
				headers: getAuthHeaders()
			}).then(function(response) {
				featuredProducts = response.data.products;
				return featuredProducts;
			});
		}

		function getProduct(category, productId) {
			var url = productsUrl + '/' + productId;
			return $http.get(url, {
				headers: getAuthHeaders()
			}).then(function(response) {
				return response.data.product;
			});
		}

		function getFeaturedProduct(productId) {
			var product = _.find(featuredProducts, function(product) {
				return product.id == productId;
			});
			return $q.when(product);
		}

		function getAuthHeaders() {
			var authHeader = ENV.data.wooCommerceConsumerKey + ':' + ENV.data.wooCommerceConsumerSecret;
			var hash = btoa(authHeader);
			var header = {
				'Authorization': 'Basic ' + hash
			};
			return header;
		}
	}
})();
