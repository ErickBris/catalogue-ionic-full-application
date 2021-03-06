(function() {
	'use strict';

	angular
		.module('catalogue.favorites', [
			'ionic',
			'LocalStorageModule'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app.favorites', {
					url: '/favorites',
					views: {
						'menuContent': {
							templateUrl: 'scripts/favorites/favorites.html',
							controller: 'FavoritesController as vm',
							resolve: {
								businessInfo: function(favoritesService){
									return favoritesService.getBusiness();
								}
							}
						}
					}
				});
		});
})();
