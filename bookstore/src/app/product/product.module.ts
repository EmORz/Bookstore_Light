import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { ProductRoutingModule } from './product-routing.module';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [ListComponent, DetailComponent, CreateComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  exports: [ListComponent, DetailComponent]
})
export class ProductModule { }
