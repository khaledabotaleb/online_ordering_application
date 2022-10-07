import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './Components/main/main.component';
import {AngularMaterialModule} from "../../DesignModule/angular-material.module";
import { CartBottomSheetComponent } from './Components/cart-bottom-sheet/cart-bottom-sheet.component';


@NgModule({
  declarations: [
    MainComponent,
    CartBottomSheetComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule
  ]
})
export class MainModule { }
