import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./Components/main/main.component";
import {AuthGuard} from "../../Guard/Auth/auth.guard";
import {CartResolver} from "./Resolver/cart.resolver";

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    resolve: {
      cartList: CartResolver
    },
    children: [
      {
        path: 'product',
        loadChildren: () => import('../../../Pages/Product/product.module').then(module => module.ProductModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'orders',
        loadChildren: () => import('../../../Pages/Order/orders.module').then(module => module.OrdersModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
