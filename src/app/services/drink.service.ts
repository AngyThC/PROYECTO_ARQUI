import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Drink } from '../models/drink';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44385/api/Drink";

  GetDrink(){
    return this.http.get(this.url);
  }


loadTypeMenus() {
  return this.http.get<string[]>("https://localhost:44385/api/Drink/GetTypesOfMenu");
}


  AddDrink(drink:Drink):Observable<Drink>{ 
    return this.http.post<Drink>(this.url,drink);
  }
 
  UpdateDrink(Id:number, drink:Drink):Observable<Drink>{
    return this.http.put<Drink>(this.url+`/${Id}`,drink);
  }

  DeleteDrink(Id:number){
    return this.http.delete(this.url+`/${Id}`)
  }
}
