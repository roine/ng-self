define(['angular'], function (angular) {
	'use strict';
	
	angular.module('brume.services', [])
	.value('version', '0.1')
	.service('jonCurrencies', function Currencies($q, $http) {

		function convert(from, to){
			var delay = $q.defer();
			var url = 'http://rate-exchange.appspot.com/currency?from='+from+'&to='+to+'&callback=JSON_CALLBACK';
			$http.jsonp(url)
			.success(function(data, status, headers, config){
				if(data.err){
					delay.reject(data.err);
					return;
				}
				delay.resolve(data);
			})
			.error(function(data, status, headers, config){
				delay.reject('An error occured with the API');
			});

			return delay.promise;
		}

		// get all the currencies from a local json
		function get(){
			var delay = $q.defer();
			$http.get('app/static/currencies.json', {cache: true})
			.success(function(data, status, headers, config){
				delay.resolve(data);
			})
			.error(function(data, status, headers, config){
				delay.reject(data);
			});
			return delay.promise;
		}

		return {
			get:get,
			convert:convert
		};
	});
});