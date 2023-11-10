import { Component } from '@angular/core';
import { Role } from 'src/app/models/role';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent  {
  //editado
  //modelo
  role:Role = new Role(); 
  datatable:any = [];

  constructor(private roleService:RoleService) { }

  ngOnInit(): void {
    this.onDataTable();
  }

  //obtener tipo smenu
  onDataTable(){
    this.roleService.GetRol().subscribe((res:any)=>{
      this.datatable = res;
    });
  }

  //añadir menu
    //NOMBRE archivo MODELO
  AddRole(role:Role):void{
    console.log(role)
    this.roleService.AddRol(role).subscribe(res=> {
      if(res){
        alert(`El menu ${role.Name_Role} se ha registrado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('Error de registro')
      }
    });
  }


  //updateMenu
  UpdateRole(role:Role):void{
    this.roleService.UpdateRol(role.ID_Role,role).subscribe(res  =>{
      if(res){
        alert(`El menu ${role.ID_Role} se ha modificado correctamente`);
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
    this.role.ID_Role = select.ID_Role;
    this.role.Name_Role = select.Name_Role;
  }


  //limpiar
  clear(){
    // igual que en la api
    this.role.ID_Role = 0;
    this.role.Name_Role = "";
  }
}
