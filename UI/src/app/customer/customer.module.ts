import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
