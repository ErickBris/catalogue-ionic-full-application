(function() {
	'use strict';

	angular
		.module('catalogue.menu', [
			'ionic'
		])
		.config(function($stateProvider) {
			$stateProvider
				.state('app', {
					url: '/app',
					abstract: true,
					templateUrl: 'scripts/menu/menu.html',
					controller: 'MenuController as vm',
					resolve: {
						categories: function(menuService) {
							return menuService.getCategoriesMenuItem();
						}
					}
				});
		});
})();