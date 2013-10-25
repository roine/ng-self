define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.hashPrefix('!');
		$routeProvider
		.when('/', {
			templateUrl: 'app/partials/homepage.html',
			controller: 'HomeCtrl',
			index: 1
		})
		.when('/view1', {
			templateUrl: 'app/partials/partial1.html',
			controller: 'MyCtrl1',
			index: 2
		})
		.when('/currency/from/:from/to/:to', {
			templateUrl: 'app/partials/currency.html',
			controller: 'CurrencyCtrl',
			index: 2
		})
		.when('/currency/:val/:from/to/:to', {
			templateUrl: 'app/partials/currency.html',
			controller: 'CurrencyCtrl',
			index: 3
		})
		.otherwise({redirectTo: '/'});
	}]);

});