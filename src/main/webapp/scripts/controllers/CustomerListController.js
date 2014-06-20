app.controller('CustomerListController', function($scope, SelectedCustomerService) {
	
	$scope.displayCustomer = function(customer) {
		
		var selectedCustomerService = SelectedCustomerService;
		selectedCustomerService.setCustomer(customer);
		
	};
	
});