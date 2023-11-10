import { Component } from '@angular/core';
import { Bill } from 'src/app/models/bill';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  bill:Bill = new Bill();
  datatable:any = [];
  typePays: string[] = [];
  descriptionOrders: string[] = [];

  constructor(private billService:BillService) { }

  ngOnInit(): void {
    this.onDataTable();
    this.loadTypePays();
    this.loadDescriptionOrders();
  }

  onDataTable(){
    this.billService.GetBills().subscribe((res:any)=>{
       this.datatable = res;
    });
  }

  AddBill(bill:Bill):void{
    console.log(bill)
    this.billService.AddBill(bill).subscribe(res=> {
      if(res){
        alert(`La factura ${bill.BillID} se ha registrado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('Error de registro')
      }
    });
  }

   //updateCustomer
   UpdateBill(bill:Bill):void{
    this.billService.UpdateBill(bill.BillID, bill).subscribe(res  =>{
      if(res){
        alert(`La factura ${bill.BillID} se ha modificado correctamente`);
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
    this.bill.BillID = select.BillID;
    this.bill.TypePay = select.TypePay;
    this.bill.DescriptionOrder = select.DescriptionOrder;
    this.bill.BillDate = select.BillDate;
    this.bill.Total = select.Total;
  }

  clear(){
    this.bill.BillID = 0;
    this.bill.TypePay = "";
    this.bill.DescriptionOrder = "";
    this.bill.BillDate = new Date();
    this.bill.Total = 0;
  }

  loadTypePays() {
    this.billService.loadTypePays().subscribe((res: any) => {
      this.typePays = res.map((item: any) => item.Name_typepay);
    });
  }

  loadDescriptionOrders() {
    this.billService.loadDescriptionOrders().subscribe((res: any) => {
      this.descriptionOrders = res.map((item: any) => item.DescriptionOrder);
    });
  }
}
