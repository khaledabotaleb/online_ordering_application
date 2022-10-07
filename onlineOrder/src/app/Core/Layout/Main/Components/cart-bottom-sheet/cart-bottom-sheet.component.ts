import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {ICartDataItems} from "../../Model/Interface/cart";
import {IOrder} from "../../../../../Pages/Order/Model/order";
import {
  QuantityProductComponent
} from "../../../../../Pages/Order/Components/Dialogue/quantity-product/quantity-product.component";
import {MatDialog} from "@angular/material/dialog";
import {CartService} from "../../Service/cart.service";
import {SnakbarService} from "../../../../Services/Snakbar/snakbar.service";

@Component({
  selector: 'app-cart-bottom-sheet',
  templateUrl: './cart-bottom-sheet.component.html',
  styleUrls: ['./cart-bottom-sheet.component.scss']
})
export class CartBottomSheetComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CartBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, public dialog: MatDialog, private cartService: CartService, private snakbarService: SnakbarService) {
  }

  ngOnInit(): void {
  }


  onEditToCart(): void {
    const dialogRef = this.dialog.open(QuantityProductComponent, {
      width: '25vw',
      maxHeight: '90vh',
      data: {
        headerName: `Edit ${this.data.product.name} To Cart`,
        maxValue: this.data.product.stock_items,
        data: this.data
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.cartService.cartOBJ = {
          product: this.data.product.id,
          quantity: res.quantity
        }
        this.cartService.editToCart(this.data.id).subscribe(res => {
          this.snakbarService.openSnackBar(`${this.data.product.name} Updated To Cart Successfully`, 'Cart')
        }, error => {
        }, () => {
          this.cartService.onReloadCart()
        })
      }
    })
    this._bottomSheetRef.dismiss();
  }

  onDeleteCart(): void {
    this.cartService.deleteCart(this.data.id).subscribe(res => {
      this.snakbarService.openSnackBar(`${this.data.product.name} Deleted Successfully`, 'Cart')
    }, error => {
    }, () => {
      this.cartService.onReloadCart()
    })
    this._bottomSheetRef.dismiss();
  }
}
