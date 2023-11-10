import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TypeMenu } from '../models/typemenu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeMenuService {
 
  constructor(private http:HttpClient) { }

  //local host del tipo menu con nombre de la tabla
  
  url:string = "https://localhost:44385/api/TypeMenu";

  getTypeMenu(){
    return this.http.get(this.url);
  }

  AddTypeMenu(typemenu:TypeMenu):Observable<TypeMenu>{ 
    return this.http.post<TypeMenu>(this.url,typemenu);
  }
 
   UpdateTypeMenu(Id:number, typemenu:TypeMenu):Observable<TypeMenu>{
    return this.http.put<TypeMenu>(this.url+`/${Id}`,typemenu);
  }

  DeleteTypeMenu(Id:number){
    return this.http.delete(this.url+`/${Id}`)
  }
}
