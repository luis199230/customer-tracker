app.factory('CustomerFactory', function($http, $q) {
	
	//return public methods
	return {
		addNewCustomer: addNewCustomer,
		deleteCustomer: deleteCustomer,
		updateCustomer: updateCustomer
	};
	
	
	
	function addNewCustomer(customer) {
		
		var deferred = $q.defer();
		
		
		$http({
			method: 'POST',
			url: '/JSONManager', 
			data: customer
		}).success(function(data) {
			deferred.resolve(data);		//data is a String "true" or "false"
		}).error(function() {
			deferred.reject("AJAX error adding customer");
		});

		
		return deferred.promise;
	}
	
	
	
	
	
	
	
	function deleteCustomer(customer) {
		
		var deferred = $q.defer();
		
		
		$http({
			method: 'DELETE',
			url: '/JSONManager', 
			data: customer
		}).success(function(data) {
			deferred.resolve(data);		//data is a String "true" or "false"
		}).error(function() {
			deferred.reject("AJAX error deleting customer");
		});

		
		return deferred.promise;
	}
	
	
	
	
	
	function updateCustomer(oldCustomer,newCustomer) {
		
		var deferred = $q.defer();
		
		
		$http({
			method: 'POST',
			url: '/UpdateCustomer', 
			data: {
				oldCustomer: oldCustomer, 
				newCustomer: newCustomer
			}
		}).success(function(data) {
			deferred.resolve(data);		//data is a String "true" or "false"
		}).error(function() {
			deferred.reject("AJAX error updating customer");
		});

		
		return deferred.promise;
	}
	
});