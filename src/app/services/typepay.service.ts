import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypePay } from '../models/typepay';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TypepayService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44385/api/TypePay";

  GetTypePay(){
    return this.http.get(this.url);
  }

  AddTypePay(typepay:TypePay):Observable<TypePay>{
    return this.http.post<TypePay>(this.url,typepay);
  }

  UpdateTypePay(Id:number, typepay:TypePay):Observable<TypePay>{
    return this.http.put<TypePay>(this.url+`/${Id}`,typepay);
  }

  DeleteTypePay(Id:number){
    return this.http.delete(this.url+`/${Id}`)
  }
}
