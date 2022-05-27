import { Product, ProductCheckout } from 'model/product/product';

export interface Order {
  id?: number;
  userId?: number;
  totalPrice?: number;
  address?: string;
  contact?: string;
  paymentMethod?: string;
  isPaid?: boolean;
  paidAt?: string;
  status?: string;
  createAt?: string;
  updateAt?: string;
}

export interface itemsCheckout {
  id?: number;
  quantity?: number;
  total?: number;
  price?: number;
  itemInfo: ProductCheckout;
}
export interface OrderResponse<T> {
  order: Order;
  items: T[];
}
