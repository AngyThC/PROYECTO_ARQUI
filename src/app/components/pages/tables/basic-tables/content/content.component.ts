import { Component } from '@angular/core';
import { Availability } from 'src/app/models/availability';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent  {
  customer: Customer = new Customer();
  Customers: string[] = [];
  reservation:Reservation = new Reservation();
  datatable:any = [];

  constructor(private reservationservice:ReservationService) { }

  ngOnInit(): void {
    this.onDataTable();
    this.loadClientes();
  }

  
  onDataTable(){
    this.reservationservice.GetReservation().subscribe((res:any)=>{
       this.datatable = res;
    });
  }

  //AddReservation
  AddReservation(reservation: Reservation): void {
    // Verificar fechas duplicadas antes de agregar
    this.reservationservice.checkDuplicateDates(reservation.ReservationDate, this.datatable).subscribe(isDuplicate => {
      if (isDuplicate) {
        alert('No se puede hacer la reservación. Hay más de tres fechas iguales.');
      } else {
        this.reservationservice.AddReservation(reservation).subscribe(res => {
          if (res) {
            alert(`El registro ${reservation.Description} se ha registrado correctamente`);
            this.clear();
            this.onDataTable();
          } else {
            alert('Error de registro');
          }
        });
      }
    });
  }

  //updateReservation
  UpdateReservation(reservation:Reservation):void{
    this.reservationservice.UpdateReservation(reservation.ReservationID, reservation).subscribe(res  =>{
      if(res){
        alert(`El registro ${reservation.ReservationID} se ha modificado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('ERROR')
      }
    });
  }

  //update state
  onChangeState(reservation: Reservation): void {
    reservation.Status = (reservation.Status === 'ACTIVADO') ? 'DESACTIVADO' : 'ACTIVADO';
  
    // Llamada al servicio para actualizar el estado en la base de datos
    this.reservationservice.UpdateReservation(reservation.ReservationID, reservation).subscribe(res => {
      if (res) {
        alert(`El estado del platillo ${reservation.Description} se ha actualizado a ${reservation.Status}`);
        this.clear();
        this.onDataTable();
      } else {
        alert('Error de actualización');
      }
    });
  }

  //seleccionar datos y set
  onSetData(select:any){  
    //igual que en el modelo - igual que en la api
    this.reservation.ReservationID = select.ReservationID;
    this.reservation.Description = select.Description;
    this.reservation.ReservationDate = select.ReservationDate;
    this.reservation.QuantityPersons = select.QuantityPersons;
    this.reservation.CustomerID = select.CustomerID;
    this.reservation.ReservationCost = select.ReservationCost;
    this.reservation.ReservationTime = select.ReservationTime;
    this.reservation.Status = select.Status;
  }

  clear(){
      // igual que en la api
      this.reservation.ReservationID = 0;
      this.reservation.Description = "";
      this.reservation.ReservationDate= new Date();
      this.reservation.QuantityPersons = 0;
      this.reservation.CustomerID = "";
      this.reservation.ReservationCost = 0;
      this.reservation.ReservationTime = "";
      this.reservation.Status = "";
  }
  loadClientes() {
    this.reservationservice.loadCliente().subscribe((res: any) => {
      this.Customers = res.map((item: any) => item.Name_Customer);
    });
  }
}
