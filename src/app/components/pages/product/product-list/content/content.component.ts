import { Component } from '@angular/core';
import { Dish } from 'src/app/models/dish';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  dish:Dish = new Dish();
  datatable:any = [];
  typeMenus: string[] = [];


  constructor(private dishService:DishService) { }

  ngOnInit(): void {
    this.onDataTable();
    this.loadTypeMenus();
  }

  onDataTable(){
    this.dishService.GetDish().subscribe((res:any)=>{
       this.datatable = res;
    });
  }

  AddDish(dish:Dish):void{
    console.log(dish)
    this.dishService.AddDish(dish).subscribe(res=> {
      if(res){
        alert(`El plato ${dish.DishName} se ha registrado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('Error de registro')
      }
    });
  }

   //updateCustomer
   UpdateDish(dish:Dish):void{
    this.dishService.UpdateDish(dish.DishID, dish).subscribe(res  =>{
      if(res){
        alert(`El plato ${dish.DishID} se ha modificado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('ERROR')
      }
    });
  }

  onChangeState(dish: Dish): void {
    dish.Status = (dish.Status === 'ACTIVADO') ? 'DESACTIVADO' : 'ACTIVADO';
  
    // Llamada al servicio para actualizar el estado en la base de datos
    this.dishService.UpdateDish(dish.DishID, dish).subscribe(res => {
      if (res) {
        alert(`El estado del platillo ${dish.DishName} se ha actualizado a ${dish.Status}`);
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
    this.dish.DishID = select.DishID;
    this.dish.DishName = select.DishName;
    this.dish.DishDescription = select.DishDescription;
    this.dish.DishPrice = select.DishPrice;
    this.dish.TypeMenuName = select.TypeMenuName;
    this.dish.Status = select.Status;
  }


  clear(){
    this.dish.DishID = 0;
    this.dish.DishName = "";
    this.dish.DishDescription = "";
    this.dish.DishPrice = 0;
    this.dish.TypeMenuName = "";
    this.dish.Status = "";
  }

  loadTypeMenus() {
    this.dishService.loadTypeMenus().subscribe((res: any) => {
      this.typeMenus = res.map((item: any) => item.Type_Menus);
    });
  }
}
