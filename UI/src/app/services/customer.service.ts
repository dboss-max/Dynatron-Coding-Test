import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = 'https://localhost:44351/api/customer';

  constructor(private http: HttpClient) { 

  }

  getCustomers() {
    return this.http.get<Customer[]>(`${this.baseUrl}`);
  }

  getCustomerById(id: number) {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  addCustomer(customer: Customer) {
    return this.http.post<Customer>(`${this.baseUrl}`, customer);
  }

  updateCustomer(customer: Customer) {
    return this.http.patch<Customer>(`${this.baseUrl}`, customer);
  }

  deleteCustomerById(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
