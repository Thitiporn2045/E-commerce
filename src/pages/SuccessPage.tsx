import { Layout } from "../components/Layout";
import { getProductById, removePendingOrder } from "../store";

interface SuccessPageProps {
  orderId: string;
  productId: number;
  quantity: number;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
}

export const SuccessPage = ({
  orderId,
  productId,
  quantity,
  totalAmount,
  customerName,
  customerEmail,
}: SuccessPageProps) => {
  removePendingOrder(orderId);

  const product = getProductById(productId);

  return (
    <Layout title="Order Success">
      <div class="max-w-md mx-auto text-center">
        <div class="bg-green-100 p-6 rounded-lg border border-green-200">
          <div class="flex items-center space-x-2 justify-center">
            <h1 class="text-3xl font-bold text-green-600">
              คำสั่งซื้อเสร็จสมบูรณ์
            </h1>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-green-600">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 
              17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 
              0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
            </svg>
          </div>



          <p class="text-lg mb-2">
            ขอบคุณสำหรับการสั่งซื้อ คุณ{customerName}.
          </p>


          <div class="bg-white p-4 rounded shadow-sm mb-6">
            <h3 class="font-bold text-lg mb-2">รายละเอียดการสั่งซื้อ</h3>
            <p class="mb-1">Order ID: #{orderId}</p>
            <p class="mb-1">สินค้า: {product?.name}</p>
            <p class="mb-1">จำนวน: {quantity}</p>
            <p class="mb-1">จัดส่งไปยัง: ตึก Tipco Tower 2 ชั้น 20</p>
            <p class="font-bold">ราคาสุทธิ: {Number(totalAmount).toFixed(2)} บาท</p>
          </div>
          <p class="mb-6">
            รายละเอียดการสั่งซื้อจะถูกส่งไปยัง {customerEmail}
          </p>

          <a
            href="/"
            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded inline-block"
          >
            กลับสู่หน้าหลัก
          </a>
        </div>
      </div>
    </Layout>
  );
};