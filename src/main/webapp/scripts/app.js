//	<{tag} data-ng-app="{name}">
//	module({name},...);
var app = angular.module('customerTracker',['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', { 
			templateUrl: 'views/BlankView.html' 
		})
		.when('/infoCustomer', { 
			controller: 'InfoController',
			templateUrl: 'views/InfoView.html' 
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