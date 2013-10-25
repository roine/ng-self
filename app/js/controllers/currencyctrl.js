define([], function() {
	'use strict';
	
	return ['$scope', '$http', '$routeParams', 'jonCurrencies', function($scope, $http, $routeParams, jonCurrencies) {
		
		// Load the currencies
		jonCurrencies.get()
		.then(function(data){
			$scope.currencies = data;
			$scope.currency = $routeParams;
		}, function(error){
			console.log(error);
		});

		$scope.switch = function(){

		};
		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
	}];
});