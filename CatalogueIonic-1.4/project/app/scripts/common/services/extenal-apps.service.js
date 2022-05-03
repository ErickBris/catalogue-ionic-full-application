(function() {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('externalAppsService', externalAppsService);

	externalAppsService.$inject = ['$window'];

	/* @ngInject */
	function externalAppsService($window) {
		var service = {
			openExternalUrl: openExternalUrl,
			openPdf: openPdf,
			openMapsApp: openMapsApp
		};
		return service;

		// ****************************************************************

		function openPdf(url) {
			openExternalUrl(url);
		}

		function openExternalUrl(url) {
			$window.open(url, '_system', 'location=yes');
			return false;
		}

		function openMapsApp(coords) {
			var q;
			if (ionic.Platform.isAndroid()) {
				q = 'geo:' + coords + '?q=' + coords;
			} else {
				q = 'maps://maps.apple.com/?q=' + coords;
			}
			q = q.replace(' ', '');
			$window.location.href = q;
		}
	}
})();
