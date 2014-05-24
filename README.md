View Customer Contact Data
--------------------------
![alt tag](http://i1282.photobucket.com/albums/a532/kking50/CustomerTrackerList_zps15e40496.png)

Update Information Dynamically
------------------------------
![alt tag](http://i1282.photobucket.com/albums/a532/kking50/CustomerTrackerUpdate_zps6666b100.png)

Add and Delete on the Fly
-------------------------
![alt tag](http://i1282.photobucket.com/albums/a532/kking50/CustomerTrackerAdd_zps216fafea.png)

Configuration
-------------

This app requires a Servlet container to run; I tested with Tomcat 7.

You must specify the absolute path to the directory where you want to store the '.json' files.
This simply requires changing databasePath (line 21) in src/com/kking50/customertracker/JSONUtility.java.

	Example absolute path from my system:
		private static final String databasePath = "/Users/Kevin/workspace/CustomerTrackerApp/WebContent/database/";
		
Then everything should be good to go. Please let me know if there are any issues.
