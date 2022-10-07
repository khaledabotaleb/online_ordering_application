import {Injectable} from '@angular/core';
import {DataService} from "../../../Core/Services/Data/data.service";
import {Observable} from "rxjs";
import {API_NAME} from "../../../Core/Models/Static/API_NAME";
import {IOrder} from "../Model/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private dataService: DataService) {
  }

  getOrderList(): Observable<IOrder[]> {
    return this.dataService.get(API_NAME.order.list)
  }
}
