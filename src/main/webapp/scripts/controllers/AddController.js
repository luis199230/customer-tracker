app.controller('AddController', function($scope, CustomerFactory) {
	
	$scope.addCustomer = function() {
		
		// Note:
		// - AngularJS transmits data using 'JSON serialization' by default:
		// 		headers: {'Content-Type' : 'application/json'}
		// - To post as 'form encoded', not JSON serialization, use:
		// 		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		
		
		var newCustomer = new Customer(
			$scope.customer.firstName,
			$scope.customer.lastName,
			$scope.customer.email,
			$scope.customer.telephone,
			$scope.customer.street,
			$scope.customer.city,
			$scope.customer.state,
			$scope.customer.zip
		);
	
	
		CustomerFactory.addNewCustomer(newCustomer).then(
				
			function(data) {
				if (data === "true") {
					$scope.customers.push(newCustomer);
					alert("Customer added");
				} else {
					alert("Customer already exists");
				}
			},
			
			function(message) {
				alert(message);
			}
		);

		
	};
	
});


