//	<{tag} data-ng-app="{name}">
//	module({name},...);
var app = angular.module('customerTracker',['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', { 
			controller: 'ListController',
			templateUrl: 'views/ListView.html' 
		})
		.when('/addCustomer', { 
			controller: 'AddController',
			templateUrl: 'views/AddView.html' 
		})
		.when('/updateCustomer', { 
			controller: 'UpdateController',
			templateUrl: 'views/UpdateView.html' 
		})
		.otherwise({ 
			redirectTo: '/' 
		});
});