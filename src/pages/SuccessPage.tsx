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
  // Clean up the pending order
  removePendingOrder(orderId);

  const product = getProductById(productId);

  return (
    <Layout title="Order Success">
      <div class="max-w-md mx-auto text-center">
        <div class="bg-green-100 p-6 rounded-lg border border-green-200">
          <h1 class="text-3xl font-bold text-green-600 mb-4">
            Order Successful!
          </h1>
          <p class="text-lg mb-2">
            Thank you for your purchase, {customerName}.
          </p>
          <p class="mb-6">
            Order confirmation has been sent to {customerEmail}
          </p>

          <div class="bg-white p-4 rounded shadow-sm mb-6">
            <h3 class="font-bold text-lg mb-2">Order Summary</h3>
            <p class="mb-1">Order ID: #{orderId}</p>
            <p class="mb-1">Product: {product?.name}</p>
            <p class="mb-1">Quantity: {quantity}</p>
            <p class="font-bold">Total: ${Number(totalAmount).toFixed(2)}</p>
          </div>

          <a
            href="/"
            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded inline-block"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </Layout>
  );
};
