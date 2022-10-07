import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ProductService} from "../Service/product.service";
import {IProductListOBJ} from "../Model/Interface/product-list";

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProductListOBJ> {
  constructor(private productService: ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductListOBJ> {
    return this.productService.getProductList();
  }
}
