# Customer Vehicle Connection GUI(React App)
This is the frontend for the Customer Vehicle Connection Monitoring application. It allows users to view vehicle connection status and filter them by customer. The frontend dynamically fetches data from the backend (Spring Boot with MySQL) and displays it in a table format. In every single minute vehicle status get updated with vehicle's latest connection value.

# Core Features
Dynamic Data Fetching: Data is fetched from the backend via API calls to the /api/vehicles endpoint.
Customer Filtering: Users can filter vehicles by customer using a dropdown.
Real-Time Updates: The vehicle status is periodically updated (every minute) to reflect the latest information.
Responsive Table: Vehicle information is displayed in a table with VIN, registration number, customer name, and connection status.

# Source files
* src/
* ├── components/               # Contains React components
* │   └── VehicleList.jsx       # Component to display vehicle data
* ├── services/                 # Contains API service functions
* │   └── api.js                # API functions for fetching vehicles
* ├── App.jsx                   # Main application component
* └── index.css                 # Basic styles (used bootstrap and custom styles)
* api.js (Services)`            # Key features 

This file contains functions for interacting with the backend API.
getVehicles Function: This function checks if a customerId is provided. If it is, it fetches vehicles for that specific customer; otherwise, it fetches all vehicles.

getCustomers Function: This function makes a simple GET request to fetch all customers.

VehicleList.jsx (Component): The main component that displays the vehicles.

State Management: Uses React hooks to manage the list of vehicles, the selected customerId, and the loading state.

API Calls: Based on the selected customer, it fetches data from the API service.

Dropdown for Filtering: Allows users to filter vehicles by selecting a customer from the dropdown.

Dynamic Table: Displays the vehicle data in a table with VIN, registration number, customer name, and connection status (color-coded based on status).

App.jsx (Main App Component):
Contains the root structure of the app.
Renders the VehicleList component to display the vehicle data.
Process Flow

Initial State: On initial load, the VehicleList component fetches all vehicles from the backend if no customer filter is selected.

Customer Filter: When a user selects a customer from the dropdown:
The customerId state is updated. The component re-fetches the vehicle data based on the selected customer and update vehicle status

Data Display: Once data is fetched, it is displayed in a table format with vehicle details.

## How to Run
Start Backend: Ensure your Spring Boot backend is running with MySQL connected.

mvn spring-boot:run

Start Frontend: npm start

Open Application: Visit http://localhost:3000 to access the application in your browser.

# Tested data
![customer vehicle data display.png](public/customer%20vehicle%20data%20display.png)
![vehicle status updated.png](public/vehicle%20status%20updated.png)
![Customer filtered data.png](public/Customer%20filtered%20data.png)

