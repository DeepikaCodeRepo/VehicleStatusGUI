import React, {useState, useEffect} from 'react';
import axios from 'axios';
import{Vehicle, Customer} from './types';

const VehicleStatus: React.FC= ()=> {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<string>('');
    const [loading, setloading] = useState<boolean>(true);

    //Fetch all customers and their vehicles
    useEffect(() => {
        axios.get('http://localhost:8080/api/vehicles')
            .then((response) => {
                setCustomers(Object.values(response.data));
                setloading(false);
            })
            .catch((error) => {
                console.error('Error in fetching vehicle data', error);
            });
    }, []);

    const fetchVehiclesByCustomer = (customerId: string) => {
        setloading(true);
        axios.get(`http://localhost:8080/api/vehicles/customer/${customerId}`).then((response) => {
            setVehicles(response.data);
            setloading(false);
        })
            .catch((error) => {
                console.error('Error in fetching vehicles for customer', error);
            });
    };

    const handleCustomerChange =(event: React.ChangeEvent<HTMLSelectElement>) =>{
        const customerId = event.target.value;
        setSelectedCustomer(customerId);
        if(customerId){
            fetchVehiclesByCustomer(customerId)
        }else{
            setVehicles([]); //No filter case
        }
    };

    // @ts-ignore
    return(
        <div>
            <h3>Vehicle connection status</h3>
            <label htmlFor ="customerSelect"> Select Customer: </label>
            <select id ="customerSelect"
                    value ={selectedCustomer}
                    onchange ={handleCustomerChange}
            >
                <option value ="">All Customers</option>
                {customers.map((customer) =>(
                    <option key ={customer.id} value ={customer.id}>
                        {customer.name}
                    </option>
                ))}
            </select>

            {loading ? (
                <p> Loading vehicles...</p>
            ):(
                <table>
                    <thread>
                        <tr>
                            <th>Vehicle ID</th>
                            <th>Registration Number</th>
                            <th>Status</th>
                        </tr>
                    </thread>
                    <tbody>
                    {vehicles.length === 0 ? (
                        <tr>
                            <td> colSpan ={3}{'>'} No vehicles available</td>
                        </tr>
                        ) : (
                            vehicles.map((vehicle) =>(
                        <tr key ={vehicle.id}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.registrationNumber}</td>
                            <td>{vehicle.status}</td>
                        </tr>
                        ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default VehicleStatus;