import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddEditProductComponent} from "../Dialogue/add-edit-product/add-edit-product.component";
import {ProductService} from "../../Service/product.service";
import {SnakbarService} from "../../../../Core/Services/Snakbar/snakbar.service";
import {ActivatedRoute} from "@angular/router";
import {IProductListOBJ, IProductListOBJList} from "../../Model/Interface/product-list";
import {ViewProductComponent} from "../Dialogue/view-product/view-product.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productList = {} as IProductListOBJ

  constructor(public dialog: MatDialog, private productService: ProductService, private snakbarService: SnakbarService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(res => {
      this.productList = res['productList'];
    })
  }

  onAddProduct(): void {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      width: '40vw',
      maxHeight: '90vh',
      data: {
        headerName: 'Add Product',
        data: {}
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.productService.productOBJ = res;
        this.productService.addProduct().subscribe(res => {
          this.snakbarService.openSnackBar('Added Successfully', 'Product')
        }, error => {
        }, () => {
          this.onReloadProduct()
        })
      }
    })
  }

  onEditProduct(prod: IProductListOBJList): void {
    let product = {} as IProductListOBJList
    this.productService.getProductDetails(prod.id).subscribe(res => {
      product = res
    }, error => {
    }, () => {
      const dialogRef = this.dialog.open(AddEditProductComponent, {
        width: '40vw',
        maxHeight: '90vh',
        data: {
          headerName: `Edit ${product.name}`,
          data: product
        }
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          this.productService.productOBJ = res;
          this.productService.editProduct(product.id).subscribe(res => {
            this.snakbarService.openSnackBar('Updated Successfully', 'Product')
          }, error => {
          }, () => {
            this.onReloadProduct()
          })
        }
      })
    })
  }

  onViewProduct(prod: IProductListOBJList): void {
    let product = {} as IProductListOBJList
    this.productService.getProductDetails(prod.id).subscribe(res => {
      product = res
    }, error => {
    }, () => {
      this.dialog.open(ViewProductComponent, {
        width: '40vw',
        maxHeight: '90vh',
        data: {
          headerName: product.name,
          data: product
        }
      });
    })
  }

  onDeleteProduct(prod: IProductListOBJList): void {
    this.productService.deleteProduct(prod.id).subscribe(res => {
      this.snakbarService.openSnackBar('Deleted Successfully', 'Product')
    }, error => {
    }, () => {
      this.onReloadProduct()
    })
  }

  onReloadProduct(): void {
    this.productService.getProductList().subscribe(res => {
      this.productList = res
    })
  }
}
