import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44385/api/Role";

  GetRol(){
    return this.http.get(this.url);
  }

  AddRol(role:Role):Observable<Role>{ 
    return this.http.post<Role>(this.url,role);
  }
 
  UpdateRol(Id:number, role:Role):Observable<Role>{
    return this.http.put<Role>(this.url+`/${Id}`,role);
  }

  DeleteRol(Id:number){
    return this.http.delete(this.url+`/${Id}`)
  }
}