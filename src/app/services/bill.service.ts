import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bill } from '../models/bill';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44385/api/Bill";

  GetBills(){
    return this.http.get(this.url);
  }

  loadTypePays() {
    return this.http.get<string[]>("https://localhost:44385/api/Bill/GetTypePay");
  }

  loadDescriptionOrders() {
    return this.http.get<string[]>("https://localhost:44385/api/Bill/GetDescriptionOrder");
  }

  AddBill(bill:Bill):Observable<Bill>{ 
    return this.http.post<Bill>(this.url,bill);
  }

  UpdateBill(Id:number, bill:Bill):Observable<Bill>{
    return this.http.put<Bill>(this.url+`/${Id}`,bill);
  }

  DeleteBill(Id:number){
    return this.http.delete(this.url+`/${Id}`)
  }
}
