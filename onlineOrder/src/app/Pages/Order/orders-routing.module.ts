import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent} from "./Components/orders/orders.component";
import {OrderResolver} from "./Resolver/order.resolver";

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
    resolve: {
      orderList: OrderResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
