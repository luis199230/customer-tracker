app.controller('InfoController', function($scope, CustomerFactory, SelectedCustomerService) {
	
	$scope.selectedCustomer;
	$scope.service = SelectedCustomerService;
	
	
	//angularjs was kinda neat till I got to here, but this is some ninja shit
	$scope.$watch('service.getCustomer()', function(newVal) {
		$scope.selectedCustomer = newVal;
	});
	
	
	$scope.deleteCustomer = function() {
		
		if ($scope.selectedCustomer != undefined) {
			
				CustomerFactory.deleteCustomer($scope.selectedCustomer).then(
						
					function(data) {
						
						if (data === "true") {
							
							//delete selected customer from customers[]
							var i = $scope.customers.indexOf($scope.selectedCustomer);
							if (i != -1) {
								$scope.customers.splice(i,1);
								alert("Customer deleted");
							} else {
								alert("Failed to remove customer");
							}
							
						} else {
							alert("Customer does not exist");
						}
						
					},
					
					function(message) {
						alert(message);
					}
				);
			
		} else {
			
			alert("There is no customer selected");
			
		}
	};
	
	
});