import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from './add-product.component';
import { SharedModule } from '../../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddProductComponent, ContentComponent],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule
  ]
})
export class AddProductModule { }
