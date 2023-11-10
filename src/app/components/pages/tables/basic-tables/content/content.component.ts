import { Component } from '@angular/core';
import { Availability } from 'src/app/models/availability';
import { AvailabilityService } from 'src/app/services/availability.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent  {

  availability:Availability = new Availability();
  datatable:any = [];

  constructor(private availabilityservice:AvailabilityService) { }

  ngOnInit(): void {
    this.onDataTable();
  }

  
  onDataTable(){
    this.availabilityservice.GetAvailability().subscribe((res:any)=>{
       this.datatable = res;
    });
  }

  //AddAvailability
  AddAvailability(availability:Availability):void{
    console.log(availability)
    this.availabilityservice.AddAvailability(availability).subscribe(res=> {
      if(res){
        alert(`El registro ${availability.AvailibityID} se ha registrado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('Error de registro')
      }
    });
  }

  //updateAvailability
  UpdateAvailability(availability:Availability):void{
    this.availabilityservice.UpdateAvailability(availability.AvailibityID, availability).subscribe(res  =>{
      if(res){
        alert(`El registro ${availability.AvailibityID} se ha modificado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('ERROR')
      }
    });
  }

  //seleccionar datos y set
  onSetData(select:any){  
    //igual que en el modelo - igual que en la api
    this.availability.AvailibityID = select.AvailibityID;
    this.availability.AvailibityPersonsMAX = select.AvailibityPersonsMAX;
    this.availability.AvailibityPersonsMIN = select.AvailibityPersonsMIN;
    this.availability.AvailibityReservationDailyMAX = select.AvailibityReservationDailyMAX;
    this.availability.AvailibityReservationMonthlyMAX = select.AvailibityReservationMonthlyMAX;
    this.availability.AvailibityReservationWeeklyMAX = select.AvailibityReservationWeeklyMAX;
  }

  clear(){
    // igual que en la api
    this.availability.AvailibityID = 0;
    this.availability.AvailibityPersonsMAX = 0;
    this.availability.AvailibityPersonsMIN= 0;
    this.availability.AvailibityReservationDailyMAX = 0;
    this.availability.AvailibityReservationMonthlyMAX = 0;
    this.availability.AvailibityReservationWeeklyMAX = 0;
  }
}
