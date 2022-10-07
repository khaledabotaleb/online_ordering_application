import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {CartService} from "../Service/cart.service";
import {ICartData} from "../Model/Interface/cart";

@Injectable({
  providedIn: 'root'
})
export class CartResolver implements Resolve<ICartData> {
  constructor(private cartService: CartService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICartData> {
    return this.cartService.getCart()
  }
}
