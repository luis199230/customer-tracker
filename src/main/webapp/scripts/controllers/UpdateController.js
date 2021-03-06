app.controller('UpdateController', function($scope, CustomerFactory, SelectedCustomerService) {
	
	$scope.selectedCustomer;
	$scope.service = SelectedCustomerService;
	
	
	//angularjs was kinda neat till I got to here, but this is some ninja shit
	$scope.$watch('service.getCustomer()', function(newVal) {
		$scope.selectedCustomer = newVal;
	});
	
	
	$scope.updateCustomer = function() {
		
		if ($scope.selectedCustomer !== undefined && $scope.updatedCustomer !== undefined) {
			
				var newCustomer = new EmptyCustomer(
					$scope.updatedCustomer.firstName,
					$scope.updatedCustomer.lastName,
					$scope.updatedCustomer.email,
					$scope.updatedCustomer.telephone,
					$scope.updatedCustomer.street,
					$scope.updatedCustomer.city,
					$scope.updatedCustomer.state,
					$scope.updatedCustomer.zip
				);
			
		
				CustomerFactory.updateCustomer($scope.selectedCustomer,newCustomer).then(
						
						function(data) {
							
							if (data === "false") 			alert("Failed to update customer");
							else if (data === "duplicate") 	alert("Email is already registered.");
							else {
								
								var mergedCustomer = mergeCustomer($scope.selectedCustomer,newCustomer);
								
								var i = $scope.customers.indexOf($scope.selectedCustomer);
								if (i != -1) {
									
									$scope.customers.splice(i,1);
									$scope.customers.push(mergedCustomer);
									alert("Customer updated");
									
								} else {
									alert("Failed to update customer");
								}
							}
						},
						
						function(message) {
							alert(message);
						}
				);

		} else {
			alert("Please edit at least one field.");
		}
		
	};
	
	
	function mergeCustomer(oldCustomer, newCustomer) {
		
		//not looped in case additional processing is desired
		
		if (newCustomer.firstName == undefined) {
			newCustomer.firstName = oldCustomer.firstName;
		}
		
		if (newCustomer.lastName == undefined) {
			newCustomer.lastName = oldCustomer.lastName;
		}
		
		if (newCustomer.email == undefined) {
			newCustomer.email = oldCustomer.email;
		}
		
		if (newCustomer.telephone == undefined) {
			newCustomer.telephone = oldCustomer.telephone;
		}
		
		//merge address
		if (newCustomer.address.street == undefined) {
			newCustomer.address.street = oldCustomer.address.street;
		}
		
		if (newCustomer.address.city == undefined) {
			newCustomer.address.city = oldCustomer.address.city;
		}
		
		if (newCustomer.address.state == undefined) {
			newCustomer.address.state = oldCustomer.address.state;
		}
		
		if (newCustomer.address.zip == undefined) {
			newCustomer.address.zip = oldCustomer.address.zip;
		}
		
		return newCustomer;
		
	}
	
	
});