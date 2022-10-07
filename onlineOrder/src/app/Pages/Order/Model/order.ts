export interface IOrder {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  stock_items: number;
  create_at: Date;
}
