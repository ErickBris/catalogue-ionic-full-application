(function() {
	'use strict';

	angular
		.module('catalogue.common')
		.factory('htmlToPlainText', htmlToPlainText)
		.filter('trimHtml', htmlToPlainText);

	htmlToPlainText.$inject = [];

	/* @ngInject */
	function htmlToPlainText() {
		return function(text) {
			return String(text).replace(/<[^>]+>/gm, '');
		};
	}
})();