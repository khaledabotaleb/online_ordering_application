import {Injectable} from '@angular/core';
import {DataService} from "../../../Services/Data/data.service";
import {Observable} from "rxjs";
import {API_NAME} from "../../../Models/Static/API_NAME";
import {ICart, ICartData} from "../Model/Interface/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartOBJ = {} as ICart
  cartList = {} as ICartData;

  constructor(private dataService: DataService) {
  }

  addToCart(): Observable<any> {
    return this.dataService.post(API_NAME.cart.add, this.cartOBJ)
  }

  editToCart(id: number): Observable<any> {
    return this.dataService.patch(API_NAME.cart.edit + id + '/', this.cartOBJ)
  }

  getCart(): Observable<ICartData> {
    return this.dataService.get(API_NAME.cart.getList);
  }

  deleteCart(id: number): Observable<ICartData> {
    return this.dataService.delete(API_NAME.cart.delete, id);
  }

  onReloadCart(): void {
    this.getCart().subscribe(res => {
      this.cartList = res
    })
  }
}
