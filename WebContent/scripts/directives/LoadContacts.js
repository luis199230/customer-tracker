//This directive is intended for use on a top level html element. It loads all customer files from the
//server and saves them to the $scope as 'customers' array.

//The customers array is the primary object to keep track of customers in the front end. This helps
//reduce the number of ajax calls. Next time, I would have views/components $watch this array
//and update accordingly. It would also be a good idea to add it to a service for global accessibility,
//however, it is defined on the $scope of <body>, so it is widely accessible.

app.directive('loadContacts', function() {
	return {
		require: 'A',
		controller: function($http,$scope) {
			$http({
				method: 'GET',
				url: '/CustomerTrackerApp/JSONManager'
			}).then(function(response) {
				
				var customersFromDB = JSON.stringify(response.data);	//converts data to JSON

				if (JSON.parse(customersFromDB) !== "false") {
					
					$scope.customers = JSON.parse(customersFromDB);		//parses JSON data into String array
					
				} else {
					
					alert("Start by adding a customer");
					$scope.customers = [];
				};
				
				
			});
			
		}
	};
});