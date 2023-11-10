import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Availability } from '../models/availability';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44385/api/Availability";

  GetAvailability(){
    return this.http.get(this.url);
  }

  AddAvailability(availability:Availability):Observable<Availability>{ 
    return this.http.post<Availability>(this.url,availability);
  }
 
  UpdateAvailability(Id:number, availability:Availability):Observable<Availability>{
    return this.http.put<Availability>(this.url+`/${Id}`,availability);
  }

  DeleteAvailability(Id:number){
    return this.http.delete(this.url+`/${Id}`)
  }
}
