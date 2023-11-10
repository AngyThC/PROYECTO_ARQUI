import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  order:Order = new Order();
  datatable:any = [];

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.onDataTable();
  }

  onDataTable(){
    this.orderService.GetOrder().subscribe((res:any)=>{
       this.datatable = res;
    });
  }

  AddOrder(order:Order):void{
    console.log(order)
    this.orderService.AddOrder(order).subscribe(res=> {
      if(res){
        alert(`La orden se ha registrado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('Error de registro')
      }
    });
  }

  UpdateOrder(order:Order):void{
    this.orderService.Updateorder(order.OrderID, order).subscribe(res  =>{
      if(res){
        alert(`La orden se ha modificado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('ERROR')
      }
    });
  }

  onSetData(select:any){  
    //igual que en el modelo - igual que en la api
    this.order.OrderID = select.OrderID;
    this.order.TypeOrder = select.TypeOrder;
    this.order.Name_Customer = select.Name;
    this.order.DescriptionOrder = select.DescriptionOrder;
  }

  clear(){
    this.order.OrderID = 0;
    this.order.TypeOrder = "";
    this.order.Name_Customer = "";
    this.order.DescriptionOrder = "";
  }

}
