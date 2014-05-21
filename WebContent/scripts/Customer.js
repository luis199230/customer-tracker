//Customer constructor function
var Customer = function(firstName, lastName, email, telephone, street, city, state, zip) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.telephone = telephone || "";
	
	this.address = {};
	this.address.street = street || "";
	this.address.city = city || "";
	this.address.state = state || "";
	this.address.zip = zip || "";
};

var EmptyCustomer = function(firstName, lastName, email, telephone, street, city, state, zip) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.email = email;
	this.telephone = telephone;
	
	this.address = {
		street: street,
		city: city,
		state: state,
		zip: zip
	};
};