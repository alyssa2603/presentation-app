export interface Product {
  id: string;
  productName: string;
  price: number;
  image: string;
}

export interface Item {
  id: string;
  itemName: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  productName: string;
  price: number;
  cartQuantity: number;
}

export interface Order {
  id?: string;
  customer: string;
  amountPaid: number;
  total: number;
  itemsBought: string[]; // Document references to items in 'items' collection
  isPrinted: boolean;
  createdAt: Date;
}