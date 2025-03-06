export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface Order {
  id: string;
  products: Array<{ productId: number; quantity: number }>;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerTel: string; // Add this field
}
