import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44385/api/Customer";

  GetCustomer(){
    return this.http.get(this.url);
  }

  AddCustomer(customer:Customer):Observable<Customer>{ 
    return this.http.post<Customer>(this.url,customer);
  }
 
  UpdateCustomer(Id:number, customer:Customer):Observable<Customer>{
    return this.http.put<Customer>(this.url+`/${Id}`,customer);
  }

  DeleteCustomer(Id:number){
    return this.http.delete(this.url+`/${Id}`)
  }
}