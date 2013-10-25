define([], function() {
	'use strict';
	
	return ['$scope', '$http',function($scope, $http) {
		// You can access the scope of the controller from here

		var tools = [{
			url: '#!/currency/from/USD/to/EUR',
			klass: 'currency',
			text: 'Currency'
		},{
			url: '#!/weather',
			klass: 'weather',
			text: 'Weather'
		},{
			url: '#!/movie',
			klass: 'movie',
			text: 'Movie'
		},{
			url: '!#/other',
			klass: 'other',
			text: 'Other'
		}];

		$scope.tools = tools;

		// because this has happened asynchroneusly we've missed
		// Angular's initial call to $apply after the controller has been loaded
		// hence we need to explicityly call it at the end of our Controller constructor
		$scope.$apply();
	}];
});