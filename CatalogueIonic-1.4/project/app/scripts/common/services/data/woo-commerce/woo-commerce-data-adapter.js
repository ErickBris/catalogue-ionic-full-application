(function () {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('wooCommerceDataAdapter', wooCommerceDataAdapter);

	wooCommerceDataAdapter.$inject = ['_'];

	/* @ngInject */
	function wooCommerceDataAdapter(_) {

		var iconsDictionary = {
			'20': 'icon ion-tshirt',
			'21': 'icon ion-male',
			'22': 'icon ion-music-note',
			'23': 'icon ion-aperture',
			'24': 'icon ion-ipod',
			'25': 'icon ion-tshirt',
			'26': 'icon ion-headphone',
			'default': 'ion-android-folder',
			};


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
			return _.map(categories, function(category) {
				return {
					title: category.name,
					desc: category.description,
					thumb: category.image,
					url: category.slug,
					icon: iconForCategory(category.id)
				};
			});
		}

		function adaptProducts(products) {
			return _.map(products, function(product) {
				return adaptProduct(product)
			});
		}

		function adaptProduct(product) {
			if (product.tags.length > 0) {
				console.log(product.tags);
			}
			return {
				id: product.id,
				guid: product.id,
				thumb: product.images[0].src,
				title: product.title,
				body: product.description,
				tags: product.tags,
				pdf : null,
				url : product.permalink,
				price : '$' + product.price,
				pictures: _.map(product.images, function(image) {
					return image.src;
				})
			};
		}

		function iconForCategory(id){
			var key = id.toString();

			return iconsDictionary[key] || iconsDictionary['default']
		}

	} // adapter

})();
