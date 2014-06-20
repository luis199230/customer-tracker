app.service('SelectedCustomerService', function() {
	
	this.storedCustomer = null;
	
	return {
		
		setCustomer: function(customer) {
			this.storedCustomer = customer;
		},
		
		getCustomer: function() {
			return this.storedCustomer;
		}
		
	};
	
});