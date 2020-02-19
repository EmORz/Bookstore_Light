import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list/list.component';
import { ProductRoutingModule } from './product-routing.module';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { FormsModule } from '@angular/forms';
import { RemoveComponent } from './remove/remove.component';



@NgModule({
  declarations: [ListComponent, DetailComponent, CreateComponent, RemoveComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule
  ],
  exports: [ListComponent, DetailComponent, CreateComponent]
})
export class ProductModule { }
