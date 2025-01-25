import React, { useState, useEffect } from 'react';
import { getVehicles, getCustomers } from '../services/api';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');

    useEffect(() => {
        getCustomers().then(response => setCustomers(response.data));  // Fetch customers
        fetchVehicles();  // Initial fetch of vehicles
        const interval = setInterval(fetchVehicles, 60000);  // Fetch vehicles every minute
        return () => clearInterval(interval);  // Cleanup interval on component unmount
    }, [selectedCustomer]);

    // Fetch vehicles based on selected customer
    const fetchVehicles = () => {
        getVehicles(selectedCustomer).then(response => {
            console.log("Fetched vehicles:", response.data); // Log the response for debugging
            setVehicles(response.data);
        }).catch(error => {
            console.error("Error fetching vehicles:", error);
        });
    };

    return (
        <div className="container">
            <h1>Vehicle Monitoring</h1>
            <div className="filter">
                <label htmlFor="customer-select">Filter by Customer:</label>
                <select
                    id="customer-select"
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                    <option value="">All Customers</option>
                    {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                            {customer.name}
                        </option>
                    ))}
                </select>
            </div>
            <table className="vehicle-table">
                <thead>
                <tr>
                    <th>VIN</th>
                    <th>Reg. Number</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                </tr>
                </thead>
                <tbody>
                {vehicles.map((vehicle) => (
                    <tr key={vehicle.vin}>
                        <td>{vehicle.vin}</td>
                        <td>{vehicle.regNumber}</td>
                        <td>{vehicle.customerName}</td>
                        <td>{vehicle.status}</td>
                        <td>{new Date(vehicle.lastUpdated).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleList;