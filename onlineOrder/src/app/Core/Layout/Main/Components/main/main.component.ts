import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../Service/cart.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {CartBottomSheetComponent} from "../cart-bottom-sheet/cart-bottom-sheet.component";
import {ICartDataItems} from "../../Model/Interface/cart";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, public cartService: CartService, private _bottomSheet: MatBottomSheet, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(res => {
      this.cartService.cartList = res['cartList']
    })
  }

  openBottomSheet(cartItem: ICartDataItems): void {
    this._bottomSheet.open(CartBottomSheetComponent, {
      data: cartItem
    });
  }

  logOut(): void {
    localStorage.removeItem('Access-Token');
    this.router.navigate(['login'])
  }
}
