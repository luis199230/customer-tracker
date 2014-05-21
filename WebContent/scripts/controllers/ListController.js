app.controller('ListController', function($scope, $http, SelectedCustomerService) {
	
	$scope.selectedCustomer;
	$scope.service = SelectedCustomerService;
	
	
	//angularjs was kinda neat till I got to here, but this is some ninja shit
	$scope.$watch('service.getCustomer()', function(newVal) {
		$scope.selectedCustomer = newVal;
	});
	
	
	$scope.deleteCustomer = function() {
		
		if ($scope.selectedCustomer != undefined) {
			
				$http({
					
					method: 'DELETE',
					url: '/CustomerTrackerApp/JSONManager', 
					data: $scope.selectedCustomer,
					
				}).then(function(response) {
					
					if (JSON.parse(response.data) === true) {
						
						var i = $scope.customers.indexOf($scope.selectedCustomer);
						if (i != -1) {
							$scope.customers.splice(i,1);
						}
						
						alert("Customer deleted");
						
					} else {
						
						alert("Customer does not exist");
						
					}
					
				});
			
		} else {
			
			alert("There is no customer selected");
			
		}
	};
	
	
});