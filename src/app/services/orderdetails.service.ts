import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrderDetails } from '../models/orderdetail';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44385/api/OrderDetails";

  GetDetails(){
    return this.http.get(this.url);
  }

  AddDetails(orderdetails:OrderDetails):Observable<OrderDetails>{ 
    return this.http.post<OrderDetails>(this.url,orderdetails);
  }
 
  UpdateDetails(Id:number, orderdetails:OrderDetails):Observable<OrderDetails>{
    return this.http.put<OrderDetails>(this.url+`/${Id}`,orderdetails);
  }

  DeleteDetails(Id:number){
    return this.http.delete(this.url+`/${Id}`)
  }
}