import { Component } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {

  customer:Customer = new Customer();
  datatable:any = [];

  constructor(private customerservice:CustomerService) { }

  ngOnInit(): void {
    this.onDataTable();
  }

  onDataTable(){
    this.customerservice.GetCustomer().subscribe((res:any)=>{
       this.datatable = res;
    });
  }

  AddCustomer(customer:Customer):void{
    console.log(customer)
    this.customerservice.AddCustomer(customer).subscribe(res=> {
      if(res){
        alert(`El cliente ${customer.Name_Customer} se ha registrado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('Error de registro')
      }
    });
  }

   //updateCustomer
   UpdateCustomer(customer:Customer):void{
    this.customerservice.UpdateCustomer(customer.ID_Customer, customer).subscribe(res  =>{
      if(res){
        alert(`El cliente ${customer.ID_Customer} se ha modificado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('ERROR')
      }
    });
  }

  onChangeState(customer: Customer): void {
    customer.Status_Customer = (customer.Status_Customer === 'ACTIVO') ? 'DESACTIVADO' : 'ACTIVO';
  
    // Llamada al servicio para actualizar el estado en la base de datos
    this.customerservice.UpdateCustomer(customer.ID_Customer, customer).subscribe(res => {
      if (res) {
        alert(`El estado del menú ${customer.Name_Customer} se ha actualizado a ${customer.Status_Customer}`);
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
    this.customer.ID_Customer = select.ID_Customer;
    this.customer.Name_Customer = select.Name_Customer;
    this.customer.Nit_Customer = select.Nit_Customer;
    this.customer.Phone_Customer = select.Phone_Customer;
    this.customer.Addres_Customer = select.Addres_Customer;
    this.customer.Status_Customer = select.Status_Customer;
   
  }

  clear(){
    // igual que en la api
    this.customer.ID_Customer = 0;
    this.customer.Name_Customer = "";
    this.customer.Nit_Customer = "";
    this.customer.Phone_Customer = "";
    this.customer.Addres_Customer = "";
    this.customer.Status_Customer;
  }

}
