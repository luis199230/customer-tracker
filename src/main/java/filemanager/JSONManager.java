package filemanager;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/JSONManager")
public class JSONManager extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	
    public JSONManager() { super(); }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		
		String[] customers = JSONUtility.fetchCustomers();
		
		
		if (customers != null && customers.length > 0) {
			
			out.print("[");
			
			for (int i = 0; i < customers.length; i++) {
				out.print(customers[i]);
				
				if (i < customers.length-1) {
					out.print(",");
				}
			}
			
			out.print("]");
			
		} else {
			out.print("false");
		}
		
		
		out.close();
		
	}
	
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//In a real world application we would do some input validation and validate the source
		//to detect malicious input.
		
		//I rarely use doDelete, but I thought this was an appropriate time. Normally we would use 
		//another doPost() here, particularly if removing data from a database.
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		
		
		//get data from request into String
		InputStreamReader isr = new InputStreamReader(request.getInputStream());
		BufferedReader in = new BufferedReader(isr);
		String line = in.readLine();
		
		
		if (JSONUtility.deleteCustomer(line) == true) {
			out.print("true");
		} else {
			out.print("false");;
		}
		
		
		out.close();
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		

		//get data from request into String
		InputStreamReader isr = new InputStreamReader(request.getInputStream());
		BufferedReader in = new BufferedReader(isr);
		String line = in.readLine();
			

		//check if customer exists and store in database if it doesn't
		if(JSONUtility.storeCustomer(line)) {
			out.print("true");
		} else {
			out.print("false");
		}
		
		
		//close streams
		out.close();

	}

	
	
}
