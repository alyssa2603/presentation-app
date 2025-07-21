export interface Item {
  id: string;
  itemName: string;
  price: number;
  quantity: number;
}

export interface CartItem extends Item {
  cartQuantity: number;
}

export interface Order {
  id?: string;
  customer: string;
  amountPaid: number;
  total: number;
  itemsBought: string[]; // Item IDs for simplicity
  isPrinted: boolean;
  createdAt: Date;
}