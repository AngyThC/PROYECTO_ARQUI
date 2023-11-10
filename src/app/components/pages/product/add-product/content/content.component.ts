import { Component } from '@angular/core';
import { TypeMenu } from 'src/app/models/typemenu';
import { TypeMenuService } from 'src/app/services/type-menu.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
//editado
//modelo
typemenu:TypeMenu = new TypeMenu(); 
datatable:any = [];

constructor(private typeMenuService:TypeMenuService) { 

}

ngOnInit(): void {
  this.onDataTable();
}

//obtener tipo smenu
onDataTable(){
  this.typeMenuService.getTypeMenu().subscribe((res:any)=>{
    this.datatable = res;
  });
}

//añadir menu
    //NOMBRE archivo MODELO
onAddMenu(typemenu:TypeMenu):void{
  console.log(typemenu)
  this.typeMenuService.AddTypeMenu(typemenu).subscribe(res=> {
    if(res){
      alert(`El menu ${typemenu.Type_Menus} se ha registrado correctamente`);
      this.clear();
      this.onDataTable();
    }else{
      alert('Error de registro')
    }
  });
}

onChangeState(typemenu: TypeMenu): void {
  typemenu.Status = (typemenu.Status === 'ACTIVADO') ? 'DESACTIVADO' : 'ACTIVADO';

  // Llamada al servicio para actualizar el estado en la base de datos
  this.typeMenuService.UpdateTypeMenu(typemenu.Id, typemenu).subscribe(res => {
    if (res) {
      alert(`El estado del menú ${typemenu.Type_Menus} se ha actualizado a ${typemenu.Status}`);
      this.clear();
      this.onDataTable();
    } else {
      alert('Error de actualización');
    }
  });
}

//updateMenu
onUpdateMenu(typemenu:TypeMenu):void{
  this.typeMenuService.UpdateTypeMenu(typemenu.Id,typemenu).subscribe(res  =>{
    if(res){
      alert(`El menu ${typemenu.Id} se ha modificado correctamente`);
      this.clear();
      this.onDataTable();
    }else{
      alert('ERROR')
    }
  });
}

onDelete(id:number):void{
  this.typeMenuService.DeleteTypeMenu(id).subscribe(res =>{
    if(res){
      alert('Se ha eliminado correctamente');
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
    this.typemenu.Id = select.Id_TypeMenu;
    this.typemenu.Type_Menus = select.Type_Menus;
    this.typemenu.Status = select.Status;
  }

  //limpiar
  clear(){
    // igual que en la api
    this.typemenu.Id = 0;
    this.typemenu.Type_Menus = "";
    this.typemenu.Status = "";
  }


}

