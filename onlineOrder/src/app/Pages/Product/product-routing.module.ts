import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from "./Components/product/product.component";
import {ProductResolver} from "./Resolver/product.resolver";

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    resolve: {
      productList: ProductResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
