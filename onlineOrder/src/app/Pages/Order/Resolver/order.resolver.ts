import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {OrderService} from "../Service/order.service";
import {IOrder} from "../Model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderResolver implements Resolve<IOrder[]> {
  constructor(private orderService: OrderService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrder[]> {
    return this.orderService.getOrderList()
  }
}
