import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMeseroComponent } from './homeM.component';

const routes: Routes = [
  { path: '', component: HomeMeseroComponent }
  // Otras rutas si es necesario
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeMeseroRoutingModule { }
