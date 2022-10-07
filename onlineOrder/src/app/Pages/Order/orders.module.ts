import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './Components/orders/orders.component';
import {AngularMaterialModule} from "../../Core/DesignModule/angular-material.module";
import { QuantityProductComponent } from './Components/Dialogue/quantity-product/quantity-product.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrdersComponent,
    QuantityProductComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class OrdersModule { }
