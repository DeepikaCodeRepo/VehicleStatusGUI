import axios from 'axios'; // axios for making HTTP requests

// Base URL for the API endpoints
const baseURL = 'http://localhost:8080/api';

// Fetch all vehicles or vehicles by customer ID with vehicle status
export const getVehicles = (customerId) => {
    // If a customerId is provided, fetch vehicles related to that customer
    // Otherwise, fetch all vehicles
    const url = customerId ? `${baseURL}/vehicles?customer=${customerId}` : `${baseURL}/vehicles`;

    // GET request URL and return the result
    return axios.get(url);
};

// Fetch all customers from the API
export const getCustomers = () => {
    // Make a GET request to fetch the list of all customers
    return axios.get(`${baseURL}/customers`);
};