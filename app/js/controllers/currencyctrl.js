define([], function() {
	'use strict';
	
	return ['$scope', '$http', '$routeParams', 'jonCurrencies', function($scope, $http, $routeParams, jonCurrencies) {

        // cache my values and return it if the normal result is wrong
		var cache = {},
        currencies,
        result;
		
		function calculate(){
            try{
                cache.result = $scope.$eval(currencies.val) * currencies.rate || cache.result;
                currencies.result = cache.result;
            }
            catch(e){
                result = cache.result;            
            }
        }

		currencies = $routeParams;


		// Load the currencies
		jonCurrencies.get()
		.then(function(data){
			currencies.all = data;
		}, function(error){
			console.log(error);
		});

		
		jonCurrencies
        .convert(currencies.from, currencies.to)
        .then(function(data){
			currencies.rate = data.rate;
			cache.result = currencies.val * data.rate || cache.result;
			currencies.result = cache.result;
        }, function(error){
            // jonAlert.add({type: 'error', msg: error});
            result = cache.result || 1;
        });

        $scope.currencies = currencies;
        $scope.result = result;

        $scope.$watch('currencies.val', calculate);
		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
	}];
});