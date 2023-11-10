import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCatalogueRoutingModule } from './product-catalogue-routing.module';
import { ProductCatalogueComponent } from './product-catalogue.component';
import { SharedModule } from '../../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductCatalogueComponent, ContentComponent],
  imports: [
    CommonModule,
    ProductCatalogueRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ProductCatalogueModule { }
