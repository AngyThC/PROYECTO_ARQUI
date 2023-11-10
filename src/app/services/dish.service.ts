import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dish } from '../models/dish';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44385/api/Dish";

  GetDish(){
    return this.http.get(this.url);
  }

  loadTypeMenus() {
    return this.http.get<string[]>("https://localhost:44385/api/Dish/GetTypesOfMenu");
  }

  AddDish(dish:Dish):Observable<Dish>{ 
    return this.http.post<Dish>(this.url,dish);
  }

  UpdateDish(Id:number, dish:Dish):Observable<Dish>{
    return this.http.put<Dish>(this.url+`/${Id}`,dish);
  }

  DeleteDish(Id:number){
    return this.http.delete(this.url+`/${Id}`)
  }
}
