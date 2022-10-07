import {Injectable} from '@angular/core';
import {IProduct} from "../Model/Interface/product";
import {Observable} from "rxjs";
import {DataService} from "../../../Core/Services/Data/data.service";
import {API_NAME} from "../../../Core/Models/Static/API_NAME";
import {IProductListOBJ, IProductListOBJList} from "../Model/Interface/product-list";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productOBJ = {} as IProduct;

  constructor(private dataService: DataService) {
  }

  addProduct(): Observable<any> {
    let formData = new FormData();
    formData.append('name', this.productOBJ.name);
    formData.append('description', this.productOBJ.description);
    formData.append('price', String(this.productOBJ.price));
    formData.append('stock_items', String(this.productOBJ.stock_items));
    if (this.productOBJ.image) {
      formData.append('image', this.productOBJ.image, this.productOBJ.image.name);
    }
    return this.dataService.post(API_NAME.product.add, formData)
  }

  getProductList(): Observable<IProductListOBJ> {
    return this.dataService.get(API_NAME.product.getList)
  }

  getProductDetails(id: number): Observable<IProductListOBJList> {
    return this.dataService.get(API_NAME.product.getList + id)
  }

  editProduct(id: number): Observable<any> {
    let formData = new FormData();
    formData.append('name', this.productOBJ.name);
    formData.append('description', this.productOBJ.description);
    formData.append('price', String(this.productOBJ.price));
    formData.append('stock_items', String(this.productOBJ.stock_items));
    if (this.productOBJ.image && typeof this.productOBJ.image !== 'string') {
      formData.append('image', this.productOBJ.image, this.productOBJ.image.name);
    }
    return this.dataService.patch(API_NAME.product.getList + id + '/', formData)
  }

  deleteProduct(id: number): Observable<any> {
    return this.dataService.delete(API_NAME.product.delete, id)
  }

}
