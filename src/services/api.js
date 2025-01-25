import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

// Fetch all vehicles or by customer ID
export const getVehicles = (customerId) => {
    const url = customerId ? `${baseURL}/vehicles?customer=${customerId}` : `${baseURL}/vehicles`;
    return axios.get(url);
};

// Fetch all customers
export const getCustomers = () => {
    return axios.get(`${baseURL}/customers`);
};