import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44385/api/Order";

  GetOrder(){
    return this.http.get(this.url);
  }

  loadCliente() {
    return this.http.get<string[]>("https://localhost:44385/api/Order/GetCustomName");
  }

  loadDrinks() {
    return this.http.get<string[]>("https://localhost:44385/api/OrderDetails/GetDrinkName");
  }

  loadDishes() {
    return this.http.get<string[]>("https://localhost:44385/api/Order/GetDishName");
  }


  AddOrder(order:Order):Observable<Order>{ 
    return this.http.post<Order>(this.url,order);
  }
 
  Updateorder(Id:number, order:Order):Observable<Order>{
    return this.http.put<Order>(this.url+`/${Id}`,order);
  }

  DeleteOrder(Id:number){
    return this.http.delete(this.url+`/${Id}`)
  }
}
