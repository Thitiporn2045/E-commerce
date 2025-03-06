import { Product, Order } from "../types";

// Sample data
export const products: Product[] = [
  { id: 1, name: "T-Shirt", price: 19.99, description: "Cotton t-shirt" },
  { id: 2, name: "Jeans", price: 49.99, description: "Blue denim jeans" },
  { id: 3, name: "Sneakers", price: 79.99, description: "Running shoes" },
];

export let orders: Order[] = [];

// Store functions
export function addOrder(order: Omit<Order, "id">): Order {
  const newOrder = {
    ...order,
    id: Math.random().toString(36).substring(2, 15),
  };
  orders.push(newOrder);
  return newOrder;
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}
