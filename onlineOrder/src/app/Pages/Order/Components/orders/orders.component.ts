import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IOrder} from "../../Model/order";
import {MatDialog} from "@angular/material/dialog";
import {QuantityProductComponent} from "../Dialogue/quantity-product/quantity-product.component";
import {CartService} from "../../../../Core/Layout/Main/Service/cart.service";
import {SnakbarService} from "../../../../Core/Services/Snakbar/snakbar.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderList: IOrder[] = [];

  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog, private cartService: CartService, private snakbarService: SnakbarService) {
  }

  ngOnInit(): void {
    this.onCheck(4)
    this.activatedRoute.data.subscribe(res => {
      this.orderList = res['orderList']
    })
  }

  onAddToCart(product: IOrder): void {
    const dialogRef = this.dialog.open(QuantityProductComponent, {
      width: '25vw',
      maxHeight: '90vh',
      data: {
        headerName: `Add ${product.name} To Cart`,
        maxValue: product.stock_items,
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.cartService.cartOBJ = {
          product: product.id,
          quantity: res.quantity
        }
        this.cartService.addToCart().subscribe(res => {
          this.snakbarService.openSnackBar(`${product.name} Added To Cart Successfully`, 'Cart')
        }, error => {
        }, () => {
          this.cartService.onReloadCart()
        })
      }
    })
  }

  onCheck(id: number): boolean {
    return !!this.cartService.cartList.cart_items.find(c => c.product.id === id)
  }
}
