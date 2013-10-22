define(['angular', 'services'], function (angular) {
	'use strict';

	return angular.module('brume.controllers', ['brume.services'])

		.controller('HomeCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/homectrl'], function(homectrl) {
				$injector.invoke(homectrl, this, {'$scope': $scope});
			});
		}])
		// Sample controller where service is being used
		.controller('MyCtrl1', ['$scope', 'version', function ($scope, version) {
			$scope.scopedAppVersion = version;
		}])
		// More involved example where controller is required from an external file
		.controller('CurrencyCtrl', ['$scope', '$injector', function($scope, $injector) {
			require(['controllers/currencyctrl'], function(currencyctrl) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(currencyctrl, this, {'$scope': $scope});
			});
		}]);
});