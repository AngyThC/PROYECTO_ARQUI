import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/app/models/reservation';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http:HttpClient) { }

  url:string = "https://localhost:44385/api/Reservacion";

  loadCliente() {
    return this.http.get<string[]>("https://localhost:44385/api/Order/GetCustomName");
  }
  
  GetReservation(){
    return this.http.get(this.url);
  }

  AddReservation(reservation:Reservation):Observable<Reservation>{ 
    return this.http.post<Reservation>(this.url,reservation);
  }
 
  UpdateReservation(Id:number, reservation:Reservation):Observable<Reservation>{
    return this.http.put<Reservation>(this.url+`/${Id}`,reservation);
  }

  DeleteReservation(Id:number){
    return this.http.delete(this.url+`/${Id}`)
  }

  checkDuplicateDates(newReservationDate: Date, datatable: Reservation[]): Observable<boolean> {
    const duplicateDatesCount = datatable.filter(item => item.ReservationDate.toString() === newReservationDate.toString()).length;
    return new Observable(observer => {
      observer.next(duplicateDatesCount >= 2);  // Cambiado a 2
      observer.complete();
    });
  }
}
