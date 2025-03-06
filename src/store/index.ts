import { Product, Order } from "../types";

// In-memory storage for server-side rendering
const memoryStorage: Record<string, any> = {};

const getFromStorage = <T>(key: string, defaultValue: T): T => {
  // For server-side rendering or when localStorage is not available
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return key in memoryStorage ? memoryStorage[key] : defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, value: T): void => {
  // For server-side rendering or when localStorage is not available
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    memoryStorage[key] = value;
    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Updated product list with the new items
export const products: Product[] = [
  {
    id: 1,
    name: "กระป๋องเก็บความเย็น",
    price: 500,
    description: "กระป๋องเก็บความเย็นคุณภาพสูง รักษาอุณหภูมิได้นาน",
  },
  {
    id: 2,
    name: "เสื้อโปโล",
    price: 800,
    description: "เสื้อโปโลผ้าคุณภาพดี สวมใส่สบาย ระบายอากาศได้ดี",
  },
  {
    id: 3,
    name: "เสื้อ t-shirt",
    price: 350,
    description: "เสื้อยืดคอกลมสไตล์ทันสมัย ผลิตจากผ้าฝ้ายอย่างดี",
  },
  {
    id: 4,
    name: "แก้ว",
    price: 299,
    description: "แก้วดีไซน์สวยงาม ใช้วัสดุคุณภาพสูง ทนทาน",
  },
  {
    id: 5,
    name: "กระเป๋าออกกำลังกาย",
    price: 5000,
    description: "กระเป๋าออกกำลังกายขนาดใหญ่ มีช่องเก็บของหลากหลาย",
  },
  {
    id: 6,
    name: "หมวก",
    price: 250,
    description: "หมวกแฟชั่นทันสมัย ปกป้องจากแสงแดด",
  },
  {
    id: 7,
    name: "เสื้อวิ่ง",
    price: 850,
    description: "เสื้อวิ่งออกแบบพิเศษ ระบายเหงื่อได้ดี น้ำหนักเบา",
  },
  {
    id: 8,
    name: "พวงกุญแจ",
    price: 390,
    description: "พวงกุญแจดีไซน์เฉพาะ ทำจากวัสดุแข็งแรง",
  },
  {
    id: 9,
    name: "ถุงผ้า",
    price: 690,
    description: "ถุงผ้ารักษ์โลก ทนทานสูง รับน้ำหนักได้มาก",
  },
  {
    id: 10,
    name: "ถุงเท้า",
    price: 199,
    description: "ถุงเท้าคุณภาพสูง นุ่มสบาย ระบายอากาศได้ดี",
  },
  {
    id: 11,
    name: "ยาดม",
    price: 69,
    description: "ยาดมสูตรพิเศษ หอมสดชื่น ช่วยให้รู้สึกกระปรี้กระเปร่า",
  },
  {
    id: 12,
    name: "สมุด",
    price: 69,
    description: "สมุดบันทึกคุณภาพดี กระดาษหนา เขียนง่าย",
  },
  {
    id: 13,
    name: "ปากกา",
    price: 30,
    description: "ปากกาเขียนลื่น หมึกคุณภาพสูง",
  },
  {
    id: 14,
    name: "ดินสอ",
    price: 29,
    description: "ดินสอคุณภาพดี เขียนง่าย ไส้ดินสอไม่หักง่าย",
  },
  {
    id: 15,
    name: "ผ้าบัฟ",
    price: 250,
    description: "ผ้าบัฟอเนกประสงค์ สวมใส่ได้หลายแบบ",
  },
  {
    id: 16,
    name: "ขวดน้ำออกกำลังกาย",
    price: 490,
    description: "ขวดน้ำออกกำลังกายดีไซน์พิเศษ พกพาสะดวก ไม่รั่วซึม",
  },
];

export const getOrders = (): Order[] => {
  return getFromStorage<Order[]>("orders", []);
};

export function addOrder(order: Omit<Order, "id">): Order {
  const orders = getOrders();
  const newOrder = {
    ...order,
    id: Math.random().toString(36).substring(2, 15),
  };

  orders.push(newOrder);
  saveToStorage("orders", orders);
  return newOrder;
}

export function getOrderById(id: string): Order | undefined {
  const orders = getOrders();
  return orders.find((order) => order.id === id);
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function createPendingOrder(
  productId: number,
  quantity: number,
): string {
  const id = Math.random().toString(36).substring(2, 15);
  const pendingOrder = { productId, quantity, id };
  saveToStorage(`pending_order_${id}`, pendingOrder);
  return id;
}

export function getPendingOrder(
  id: string,
): { productId: number; quantity: number } | null {
  return getFromStorage(`pending_order_${id}`, null);
}

export function removePendingOrder(id: string): void {
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    delete memoryStorage[`pending_order_${id}`];
    return;
  }
  localStorage.removeItem(`pending_order_${id}`);
}
