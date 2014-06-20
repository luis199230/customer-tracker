package filemanager;

import java.io.File;
import java.io.FileFilter;
import java.io.FileWriter;
import java.io.FilenameFilter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.json.JSONException;
import org.json.JSONObject;


//Hodge-podge of functions used in JSONManager and UpdateCustomer for this example code.
//Removed for reuse purposes and to clean up servlet code.
public class JSONUtility {
	
	//absolute path to the directory where '.json files are stored'
//	private static final String databasePath = "/Users/Kevin/Code/CustomerTrackerApp/WebContent/database/";
	private static final String databasePath = "/var/lib/openshift/537e6447500446b92e0001c1/app-deployments/current/repo/src/main/webapp/database/";

	//stores String 'data' as '.json' file in /database
	public static boolean storeCustomer(String data) {
		
		//Note: NEVER attempt to write within a deployed webapp's directories. This is only done for
		//demonstration purposes. Normally, we would write to a directory elsewhere on the system or 
		//in a database.
		
		if (customerExists(data)) {
			return false;
		}
		
		
		String customerEmail = getJSONParameter(data, "email");
		
		try {	
			
			File newFile = new File(databasePath + customerEmail + ".json");
			
			FileWriter fileWriter = new FileWriter(newFile);
			PrintWriter printWriter = new PrintWriter(fileWriter);
			printWriter.println(data);
		
		
			//Don't close FileWriter here because it doesn't give the PrintWriter a chance to 
			//flush. When you close the PrintWriter it tries to flush and swallows the exception.
			printWriter.close();
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		 
		
		return true;
		
	} 
	
	//Gets all data from '.json' files in /database and returns file content as an element of String[].
	//In a real world application we would cache the customers for better performance.
	public static String[] fetchCustomers() {
		
		//filter all files that do not end in '.json' (for example .DS_Store and other hidden files)
		FilenameFilter filterHiddenFiles = new FilenameFilter() {
			public boolean accept(File dir, String name) {
				return name.endsWith(".json");
			}
		};
		
		
		String[] fileNames = new File(databasePath).list(filterHiddenFiles);
		
		//Create a String array where the number of elements equals the number of customers in /database.
		//Each element in the array is a String containing customer JSON data.
		String[] fileContents = new String[fileNames.length];
		for (int i=0 ; i < fileNames.length ; i++) {
			
				try {
					fileContents[i] = new String(Files.readAllBytes(Paths.get(databasePath + fileNames[i])));
				} catch (IOException e) {
					e.printStackTrace();
				}
				
		}
		
		return fileContents;
	}
	
	
	//Checks if data already exists in /database.
	//In a real world application we would cache the customers for better performance.
	public static boolean customerExists(String data) {
		
		String customerEmail = getJSONParameter(data,"email");
		
		String[] customers = fetchCustomers();
		
		String customerEmailDB = null;
		for (String customer : customers) {
			
			//get email parameter for each customer in database
			customerEmailDB = getJSONParameter(customer,"email");
			
			//check if email exists in database files
			if (customerEmail.equals(customerEmailDB)) {
				return true;
			} 
		}
		
		return false;
	}
	
	
	//Converts string to JSONObject, gets desired parameter, then returns the parameter as String.
	//Made this method for nothing, could have just converted string to JSONObject and used opt method.
	public static String getJSONParameter(String data, String param) {
			
			JSONObject json = null;
			String customerParam = null;
			try {
				json = new JSONObject(data);
				
				customerParam = json.getString(param);
				
			} catch (JSONException e) {
				e.printStackTrace();
			}
			return customerParam;
		}
	
	//gets email from string form of JSONObject and deletes it if found
	public static boolean deleteCustomer(String customer) {
		
		
		final String customerEmail = getJSONParameter(customer,"email");
		
		FileFilter fileFilter = new FileFilter() {
			
			@Override
			public boolean accept(File pathname) {

				if (pathname.getName().equals(customerEmail + ".json")) {
					return true;
				} else {
					return false;
				}
			}
			
		};
		
		File[] files = new File(databasePath).listFiles(fileFilter);
		
		
		//Note: this relies on the fact that our customers have unique emails. Checks
		//to make sure there is only one file with requested customer to be deleted
		if (files != null && files.length == 1) {
			files[0].delete();
			return true;
		} else {
			return false;
		}
	}

}
