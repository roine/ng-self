define(['angular', 'app'], function(angular, app) {
	'use strict';

	return app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.hashPrefix('!');
		$routeProvider
		.when('/', {
			templateUrl: 'app/partials/homepage.html',
			controller: 'HomeCtrl'
		})
		.when('/view1', {
			templateUrl: 'app/partials/partial1.html',
			controller: 'MyCtrl1'
		})
		.when('/currency', {
			templateUrl: 'app/partials/currency.html',
			controller: 'CurrencyCtrl'
		})
		.otherwise({redirectTo: '/view1'});
	}]);

});