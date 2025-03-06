import { Layout } from "../components/Layout";

interface OrderData {
  orderId: string;
  productId: number;
  quantity: number;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerTel: string;
}

interface PaymentPageProps {
  orderData: OrderData;
}

export const PaymentPage = ({ orderData }: PaymentPageProps) => {
  return (
    <Layout title="ODTS RETAIL - Payment">
      <div class="max-w-md mx-auto">
        <h1 class="text-3xl font-bold mt-10 mb-5">Payment</h1>
        <div class="border rounded-lg p-4 shadow-sm">
          <div class="bg-gray-100 rounded p-3 mb-4">
            <h2 class="font-semibold mb-2">Order Summary</h2>
            <p class="text-sm">Order ID: #{orderData.orderId}</p>
            <p class="text-sm">
              Amount: ${Number(orderData.totalAmount).toFixed(2)}
            </p>
          </div>

          <div class="flex justify-center py-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
              class="w-64 h-64 md:w-80 md:h-80"
              alt="Payment QR Code"
            />
          </div>

          <form
            hx-post={`/${orderData.orderId}/complete`}
            hx-swap="innerHTML"
            hx-target="body"
          >
            <input type="hidden" name="orderId" value={orderData.orderId} />
            <input
              type="hidden"
              name="productId"
              value={String(orderData.productId)}
            />
            <input
              type="hidden"
              name="quantity"
              value={String(orderData.quantity)}
            />
            <input
              type="hidden"
              name="totalAmount"
              value={String(orderData.totalAmount)}
            />
            <input
              type="hidden"
              name="customerName"
              value={orderData.customerName}
            />
            <input
              type="hidden"
              name="customerEmail"
              value={orderData.customerEmail}
            />
            <input
              type="hidden"
              name="customerTel"
              value={orderData.customerTel}
            />

            <button
              class="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
              type="submit"
            >
              Complete Payment
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
