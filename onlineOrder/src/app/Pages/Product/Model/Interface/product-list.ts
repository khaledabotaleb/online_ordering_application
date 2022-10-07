export interface IProductListOBJ {
  count: number;
  next: string;
  previous: string;
  results: IProductListOBJList[];
}

export interface IProductListOBJList {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock_items: number;
  create_at: Date;
}
