import { Injectable } from '@angular/core';
import { Customer } from '../models/customer';
import { APiRoutes } from 'src/apiRoutes';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  async onCustomerSubmit(customer : Customer) : Promise<void>{
    if (customer) {
      try {
        await axios.post(APiRoutes.addCustomer , customer)
      } catch (error) {
        console.error("Error while adding customer:", error);
      }
    }
    else console.log("Empty Value")
  }

  async getAllCustomers() : Promise<Customer[]> {
    return (await axios.get(APiRoutes.getAllCustomers)).data
  }

  async deleteCustomer( id : number) {
    try {
      axios.delete(APiRoutes.deleteCustomer(id))
    } catch (error) {
      console.error("Error while deleting a customer:", error);
    }
  }
  
}
