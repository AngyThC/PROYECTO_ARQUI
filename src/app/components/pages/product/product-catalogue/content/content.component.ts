import { Component } from '@angular/core';
import { TypePay } from 'src/app/models/typepay';
import { TypepayService } from 'src/app/services/typepay.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']

})
export class ContentComponent{
  imagePath: string = '../assets';
  //editado
  //modelo
  typepay:TypePay = new TypePay();
  datatable:any = [];

  constructor(private typepayservice:TypepayService) {}

  ngOnInit(): void {
    this.onDataTable();
  }

  //obtener tipo menu
  onDataTable(){
    this.typepayservice.GetTypePay().subscribe((res:any)=>{
      this.datatable = res;
    });
  }

  //añadir tipo
  //Nombre archivo nombre
  AddTypePay(typepay:TypePay):void{
    console.log(typepay)
    this.typepayservice.AddTypePay(typepay).subscribe(res => {
      if(res){
        alert(`El tipo de pago ${typepay.Name_typepay} se ha registrado correctamente`);
        this.clear();
        this.onDataTable();
      }
      else{
        alert('Error de registro')
      }
    });
  }

  UpdateTypePay(typepay:TypePay):void {
    this.typepayservice.UpdateTypePay(typepay.ID_typepay,typepay).subscribe(res => {
      if(res){
        alert(`El tipo de pago ${typepay.ID_typepay} se ha sido actualizado correctamente`);
        this.clear();
        this.onDataTable();
      }
      else{
        alert('ERROR!')
      }
    });
  }

  onChangeState(typepay: TypePay): void {
    typepay.Status = (typepay.Status === 'ACTIVO') ? 'DESACTIVADO' : 'ACTIVO';
  
    // Llamada al servicio para actualizar el estado en la base de datos
    this.typepayservice.UpdateTypePay(typepay.ID_typepay, typepay).subscribe(res => {
      if (res) {
        alert(`El estado del tipo de pago ${typepay.Name_typepay} se ha actualizado a ${typepay.Status}`);
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
    this.typepay.ID_typepay = select.ID_typepay;
    this.typepay.Name_typepay = select.Name_typepay;
    this.typepay.Status = select.Status;
  }

  //limpiar
  clear(){
    // igual que en la api
    this.typepay.ID_typepay = 0;
    this.typepay.Name_typepay = "";
    this.typepay.Status = "";
  }
}
