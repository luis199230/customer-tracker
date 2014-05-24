Background
----------

This was a test project for a prospective employer. The test was:

"Using AngularJS please create a single page web application that allows a user to Create, List, Update and Delete customers.  A customer is made of up the following attributes: Name, Email, Telephone, Address (Street, City, State, Zip). The web application should use .json files as the storage mechanism for each customer record."

I completed the task in about 6 days including learning AngularJS, Twitter Bootstrap, and the org.json Java library for the first time. It is meant primarily as sample code for future prospective employers.

View Customer Contact Data
--------------------------
![alt tag](http://i1282.photobucket.com/albums/a532/kking50/CustomerTrackerList_zps15e40496.png)

Easily Filter Customers
-----------------------
![alt tag](http://i1282.photobucket.com/albums/a532/kking50/CustomerTrackerFilter_zps2aec09ae.png)

Add and Delete on the Fly
-------------------------
![alt tag](http://i1282.photobucket.com/albums/a532/kking50/CustomerTrackerAdd_zps216fafea.png)

Update Information Dynamically
------------------------------
![alt tag](http://i1282.photobucket.com/albums/a532/kking50/CustomerTrackerUpdate_zps6666b100.png)

Responsive & Mobile Design
--------------------------
![alt tag](http://i1282.photobucket.com/albums/a532/kking50/CustomerTrackerResponsiveTop_zpsda324915.png)
![alt tag](http://i1282.photobucket.com/albums/a532/kking50/CustomerTrackerResponsiveBottom_zpsd929e539.png)

Configuration
-------------

A Servlet container to run this app; I tested with Tomcat 7.

You must specify the absolute path to the directory where you want to store the '.json' files.
This simply requires changing databasePath (line 21) in src/com/kking50/customertracker/JSONUtility.java.

	Example absolute path from my system:
		private static final String databasePath = "/Users/Kevin/workspace/CustomerTrackerApp/WebContent/database/";
		
Then everything should be good to go. Please let me know if there are any issues.
