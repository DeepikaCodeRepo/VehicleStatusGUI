import React, { useState, useEffect } from 'react'; // Import React and hooks
import { getVehicles, getCustomers } from '../services/api'; // Import API services

const VehicleList = () => {
    // State variables to store vehicles, customers, and the selected customer ID
    const [vehicles, setVehicles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(''); // Initially no customer selected

    useEffect(() => {
        // Fetch the list of customers from the API
        getCustomers().then(response => setCustomers(response.data)); // Update customers state with the API response
        fetchVehicles(); // Fetch vehicles based on selected customer
        const interval = setInterval(fetchVehicles, 60000); // Set up an interval to fetch vehicles every 60 seconds
        return () => clearInterval(interval); // Cleanup the interval when the component unmounts or re-renders
    }, [selectedCustomer]); // Re-run the effect when the selectedCustomer state changes

    // Function to fetch vehicles based on selected customer ID
    const fetchVehicles = () => {
        // Call the getVehicles function and pass the selected customer ID
        getVehicles(selectedCustomer).then(response => {
            console.log("Fetched vehicles:", response.data); // Log the vehicles data for debugging
            setVehicles(response.data); // Update vehicles state with the fetched data
        }).catch(error => {
            console.error("Error fetching vehicles:", error); // Log any errors if the API call fails
        });
    };

    return (
        <div className="container my-4">
            {/* Header of the page */}
            <h1 className="text-center mb-4, text-white">Customer Vehicle Connection</h1>

            {/* Filter section for selecting a customer */}
            <div className="mb-4 text-center">
                <label htmlFor="customer-select" className="form-label">Filter by Customer:</label>
                <select
                    id="customer-select" // Select element ID for filtering by customer
                    className="form-select w-auto" // Bootstrap classes for styling
                    value={selectedCustomer} // Bind the value of the select element to selectedCustomer state
                    onChange={(e) => setSelectedCustomer(e.target.value)} // Update selectedCustomer when the user selects a customer
                >
                    <option value="">All Customers</option> {/* Option to show all customers */}
                    {/* Render a list of customer options */}
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name} {/* Display the customer's name */}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table to display vehicle information */}
            <table className="table table-bordered table-striped">
                <thead>
                <tr>
                    {/* Table headers */}
                    <th>VIN</th>
                    <th>Reg. Number</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                </tr>
                </thead>
                <tbody>
                {/* Render the list of vehicles */}
                {vehicles.map((vehicle) => (
                    <tr key={vehicle.vin}> {/* Key to uniquely identify each row */}
                        <td>{vehicle.vin}</td> {/* Vehicle VIN */}
                        <td>{vehicle.regNumber}</td> {/* Vehicle registration number */}
                        <td>{vehicle.customerName}</td> {/* Customer's name */}
                        <td className={vehicle.status === "CONNECTED" ? "text-success" : "text-danger"}>
                            {/* Apply class for color: green for "CONNECTED" and red for "DISCONNECTED" */}
                            {vehicle.status}
                        </td>
                        <td>{new Date(vehicle.lastUpdated).toLocaleString()}</td> {/* Format last updated date */}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleList; // Export the VehicleList component