import { Layout } from "../components/Layout";
import { getProductById, removePendingOrder } from "../store";

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

interface SuccessPageProps {
  orderId: string;
  productId: number;
  quantity: number;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerTel: string;
}

export const SuccessPage = ({
  orderId,
  productId,
  quantity,
  totalAmount,
  customerName,
  customerEmail,
  customerTel,
}: SuccessPageProps) => {
  removePendingOrder(orderId);
  const product = getProductById(productId);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto my-16 px-4">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-amber-100 rounded-xl shadow-lg overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-8 py-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center">
              คำสั่งซื้อเสร็จสมบูรณ์
            </h1>
          </div>

          {/* Success Icon */}
          <div className="flex justify-center mt-2">
            <div className="bg-white rounded-full p-4 border-4 border-amber-500 shadow-lg transform transition-all duration-300 hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 stroke-amber-500 font-bold" 
                fill="none" viewBox="0 0 24 24" 
                stroke="currentColor" strokeWidth={4}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 py-6">
            <p className="text-lg text-center text-gray-300 mb-8">
              ขอบคุณสำหรับการสั่งซื้อ คุณ <span className="font-bold">{customerName}</span>
            </p>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-md">
              <h2 className="text-xl font-semibold text-amber-800 border-b border-gray-200 pb-3 mb-4">
                รายละเอียดการสั่งซื้อ
              </h2>
              
              <div className="space-y-4 text-gray-700">
                <div className="flex justify-between items-center">
                  <span className="font-medium">สินค้า:</span>
                  <span className="text-lg">{product?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">จำนวน:</span>
                  <span className="text-lg">{quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">จัดส่งไปยัง:</span>
                  <span className="text-lg">ตึก Tipco Tower 2 ชั้น 20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">เบอร์โทรศัพท์:</span>
                  <span className="text-lg">{customerTel}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-3">
                  <span className="font-semibold text-lg">ราคาสุทธิ:</span>
                  <span className="font-semibold text-lg text-amber-800">{formatPrice(totalAmount)} บาท</span>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 mb-8">
              รายละเอียดการสั่งซื้อจะถูกส่งไปยัง <span className="font-medium text-amber-700">{customerEmail}</span>
            </p>

            <div className="text-center">
              <a
                href="/"
                className="inline-block px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium rounded-full shadow-md hover:from-amber-700 hover:to-amber-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                กลับสู่หน้าหลัก
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
