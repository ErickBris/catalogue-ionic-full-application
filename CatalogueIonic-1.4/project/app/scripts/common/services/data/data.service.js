(function() {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('dataService', dataService);

	dataService.$inject = ['ENV', '$injector'];

	/* @ngInject */
	function dataService(ENV, $injector) {
		var service;
		var adapter;

		switch(ENV.dataProvider) {
			case 'LOCAL':
				service = $injector.get('localDataService');
				adapter = $injector.get('localDataAdapter');
				break;
			case 'REMOTE':
				service = $injector.get('remoteDataService');
				adapter = $injector.get('remoteDataAdapter');
				break;
			case 'WOO_COMMERCE':
				service = $injector.get('wooCommerceDataService');
				adapter = $injector.get('wooCommerceDataAdapter');
				break;
			default:
				throw new Error('Data provider is not valid');	
		}

		var dataManager = $injector.get('dataManager');
		dataManager.init(service, adapter);
		return dataManager;
	}
})();
