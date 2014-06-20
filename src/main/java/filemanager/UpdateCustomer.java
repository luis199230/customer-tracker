package filemanager;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;


@WebServlet("/UpdateCustomer")
public class UpdateCustomer extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
       
    
    public UpdateCustomer() { super(); }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		
		InputStreamReader isr = new InputStreamReader(request.getInputStream());
		BufferedReader in = new BufferedReader(isr);
		String line = in.readLine();
		
		
		JSONObject json = null;
		JSONObject oldCustomerJSON = null;
		JSONObject newCustomerJSON = null;
		
		try {
			
			json = new JSONObject(line);
			
			oldCustomerJSON = json.getJSONObject("oldCustomer");
			newCustomerJSON = json.getJSONObject("newCustomer");
						
			
			
			//Add old customer value to new customer if new customer value is null.
			//These were not looped through in case additional processing is desired.
			if (newCustomerJSON.opt("firstName") == null) {
				newCustomerJSON.put("firstName", oldCustomerJSON.opt("firstName"));
			}
			
			if (newCustomerJSON.opt("lastName") == null) {
				newCustomerJSON.put("lastName", oldCustomerJSON.opt("lastName"));
			}
			
			if (newCustomerJSON.opt("email") == null) {
				newCustomerJSON.put("email", oldCustomerJSON.opt("email"));
			} else {
				
				//check if there is a customer in the database with the new email
				if (JSONUtility.customerExists(newCustomerJSON.toString())) {
					out.print("duplicate");
					return;
				}
			}
			
			if (newCustomerJSON.opt("telephone") == null) {
				newCustomerJSON.put("telephone", oldCustomerJSON.opt("telephone"));
			}
			
			
			//handle address information
			JSONObject oldAddress = oldCustomerJSON.getJSONObject("address");
			JSONObject newAddress = newCustomerJSON.getJSONObject("address");
			
			if (newAddress.opt("street") == null) {
				newAddress.put("street", oldAddress.opt("street"));
			}
			
			if (newAddress.opt("city") == null) {
				newAddress.put("city", oldAddress.opt("city"));
			}
			
			if (newAddress.opt("state") == null) {
				newAddress.put("state", oldAddress.opt("state"));
			}
			
			if (newAddress.opt("zip") == null) {
				newAddress.put("zip", oldAddress.opt("zip"));
			}
			
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		
		
		//delete old json file and add new one
		if (JSONUtility.deleteCustomer(oldCustomerJSON.toString()) 
		 && JSONUtility.storeCustomer(newCustomerJSON.toString())) {
			
			out.print("true");
			
		} else {
			
			out.print("false");
			
		}
		
		
	}
	

}
