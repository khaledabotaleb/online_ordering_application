import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {AngularMaterialModule} from "../../Core/DesignModule/angular-material.module";
import { AddEditProductComponent } from './Components/Dialogue/add-edit-product/add-edit-product.component';
import {ProductComponent} from "./Components/product/product.component";
import {ReactiveFormsModule} from "@angular/forms";
import { ViewProductComponent } from './Components/Dialogue/view-product/view-product.component';


@NgModule({
  declarations: [
    ProductComponent,
    AddEditProductComponent,
    ViewProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
