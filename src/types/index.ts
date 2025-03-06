export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Order {
  id: string;
  products: Array<{ productId: number; quantity: number }>;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerTel: string;
  paymentProofPath?: string;
}
