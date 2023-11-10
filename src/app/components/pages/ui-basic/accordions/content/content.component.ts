import { Component } from '@angular/core';
import { Drink } from 'src/app/models/drink';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent  {

  drink:Drink = new Drink();
  datatable:any = [];
  typeMenus: string[] = [];

  constructor(private drinkService:DrinkService) { }

  ngOnInit(): void {
    this.onDataTable();
    this.loadTypeMenus();
  }

  
  onDataTable(){
    this.drinkService.GetDrink().subscribe((res:any)=>{
       this.datatable = res;
    });
  }

  AddDrink(drink:Drink):void{
    console.log(drink)
    this.drinkService.AddDrink(drink).subscribe(res=> {
      if(res){
        alert(`La bebida ${drink.DrinkName} se ha registrado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('Error de registro')
      }
    });
  }

   //updateCustomer
   UpdateDrink(drink:Drink):void{
    this.drinkService.UpdateDrink(drink.DrinkID, drink).subscribe(res  =>{
      if(res){
        alert(`El bebida ${drink.DrinkID} se ha modificado correctamente`);
        this.clear();
        this.onDataTable();
      }else{
        alert('ERROR')
      }
    });
  }

  onChangeState(drink: Drink): void {
    drink.Status = (drink.Status === 'ACTIVADO') ? 'DESACTIVADO' : 'ACTIVADO';
  
    // Llamada al servicio para actualizar el estado en la base de datos
    this.drinkService.UpdateDrink(drink.DrinkID, drink).subscribe(res => {
      if (res) {
        alert(`El estado de la bebida ${drink.DrinkName} se ha actualizado a ${drink.Status}`);
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
    this.drink.DrinkID = select.DrinkID;
    this.drink.DrinkName = select.DrinkName;
    this.drink.DrinkDescription = select.DrinkDescription;
    this.drink.DrinkPrice = select.DrinkPrice;
    this.drink.TypeMenuName = select.TypeMenuName;
    this.drink.Status = select.Status;
  }

  clear(){
    // igual que en la api
    this.drink.DrinkID = 0;
    this.drink.DrinkName = "";
    this.drink.DrinkDescription = "";
    this.drink.DrinkPrice = 0.0;
    this.drink.TypeMenuName = "";
    this.drink.Status = "";
  }

  loadTypeMenus() {
    this.drinkService.loadTypeMenus().subscribe((res: any) => {
      this.typeMenus = res.map((item: any) => item.Type_Menus);
    });
  }
}
