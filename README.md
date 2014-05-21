Configuration:

This app requires a Servlet container to run; I tested in Tomcat.

You must specify the absolute path to the directory where you want to store the '.json' files.
This simply requires changing databasePath (line 21) in src/com/kking50/customertracker/JSONUtility.java.

	Example absolute path from my system:
		private static final String databasePath = "/Users/Kevin/workspace/CustomerTrackerApp/WebContent/database/";
		
Then everything should be good to go. Please let me know if there are any issues.