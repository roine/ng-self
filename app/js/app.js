define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	'angularAnimate'
	], function (angular, filters, services, directives, controllers) {
		'use strict';

		return angular.module('brume', [
			'ngRoute',
			'ngAnimate',
			'brume.controllers',
			'brume.filters',
			'brume.services',
			'brume.directives'
		]);
});
