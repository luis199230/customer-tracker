app.controller('AddController', function($scope, $http) {
	
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
	
	
		$http({
			
			method: 'POST',
			url: '/CustomerTrackerApp/JSONManager', 
			data: newCustomer							//converts to JSON automatically
			
		}).then(function(response) {
			
			//Note: could swap these conditional statements with $http().success() and additional
			//callbacks depending on how we want to handle the back-end exceptions.
			
			if (JSON.parse(response.data) === true) {
				
				$scope.customers.push(newCustomer);
				alert("Customer added");
				
			} else {
				
				alert("Customer already exists");
				
			}
		});

		
	};
	
});


