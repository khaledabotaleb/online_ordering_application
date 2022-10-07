export interface ICart {
  product: number;
  quantity: number;
}

export interface ICartData {
  cart_items: ICartDataItems[];
  total_price: number;
}

export interface ICartDataItems {
  id: number;
  product: ICartDataItemProduct;
  quantity: number;
  item_cost: number;
}

export interface ICartDataItemProduct {
  id: number;
  name:string;
  description:string;
  image:string;
  stock_items:number;
  create_at:Date;
}
