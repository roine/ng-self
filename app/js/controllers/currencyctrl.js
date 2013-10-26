define([], function() {
	'use strict';
	
	return ['$scope', '$http', '$routeParams', '$location', '$route', 'jonCurrencies', function($scope, $http, $routeParams, $location, $route, jonCurrencies) {

        var cache = {},
        currencies,
        result,
        lastRoute;

        // Do not reload the controller when editing the URL
        lastRoute = $route.current;
        $scope.$on('$locationChangeSuccess', function(event) {
            if($route.current.$$route.controller === 'CurrencyCtrl'){
                $route.current = lastRoute;
            }
        });

		
        // convert the value to the new currency
		function calculate(){
            try{
                cache.result = $scope.$eval(currencies.val) * currencies.rate || cache.result;
                currencies.result = cache.result;
            }
            catch(e){
                result = cache.result;            
            }
        }

        // load the new exchange rate and update the URL
        function changeCurrency(){
            getExchange();
            $location.path(updateUrl($location.path()));
        }

        // update the URL
        function updateUrl(url){
            var newUrl = url.split('/');
            newUrl[newUrl.length-1] = currencies.to;
            newUrl[newUrl.length-3] = currencies.from;
            return newUrl.join('/');
        }

        // get the exchange rate
        function getExchange(){
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
        }

		currencies = $routeParams;

        // make sure val is a Number
        currencies.val = +currencies.val || 1;


		// Load the currencies
		jonCurrencies.get()
		.then(function(data){
			currencies.all = data;
		}, function(error){
			console.log(error);
		});
        
		

        $scope.currencies = currencies;
        $scope.result = result;

        $scope.switch = function(){
            var third;

            // inverse currency rate
            currencies.rate = 1 / currencies.rate;

            // swap currencies
            third = currencies.to;
            currencies.to = currencies.from;
            currencies.from = third;

            $location.path(updateUrl($location.path()));
            $scope.currencies = currencies;
        };


        $scope.$watch('currencies.val', calculate);
        $scope.$watch('currencies.to + currencies.from', changeCurrency);
		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
	}];
});