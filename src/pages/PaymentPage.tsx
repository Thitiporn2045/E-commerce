import { Layout } from "../components/Layout";

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
              Amount: {formatPrice(orderData.totalAmount)} ฿
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
            enctype="multipart/form-data"
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

            <div class="mb-6 mt-6">
              <label class="block text-gray-700 mb-2 font-medium">
                Upload Payment Proof
              </label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div class="mb-3" id="preview-container"></div>
                <input
                  type="file"
                  name="paymentProof"
                  id="payment-proof"
                  accept="image/*"
                  required
                  class="hidden"
                  onchange="previewImage(this)"
                />
                <label
                  for="payment-proof"
                  class="bg-blue-100 text-blue-800 py-2 px-4 rounded cursor-pointer hover:bg-blue-200 inline-block"
                >
                  Select Image
                </label>
                <p class="text-sm text-gray-500 mt-2">
                  Please upload a screenshot of your payment
                </p>
              </div>
            </div>

            <button
              class="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
              type="submit"
            >
              Complete Payment
            </button>
          </form>
        </div>
      </div>

      <script>{`
        function previewImage(input) {
          const previewContainer = document.getElementById('preview-container');
          previewContainer.innerHTML = '';

          if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function(e) {
              const img = document.createElement('img');
              img.src = e.target.result;
              img.className = 'max-h-48 mx-auto rounded-lg mb-3';
              previewContainer.appendChild(img);
            }

            reader.readAsDataURL(input.files[0]);
          }
        }
      `}</script>
    </Layout>
  );
};
