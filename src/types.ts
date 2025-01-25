export interface Vehicle{
    vin:string
    registrationNumber: string;
    status:string; //"connected" or "disconnected"
    lastUpdated: number; //timestamp of the last updated status
}

export interface Customer{
    id:string;
    name:string;
    address:string;
    vehicles:Vehicle[];
}