import { Layout } from "../components/Layout";
import { getProductById, getPendingOrder } from "../store";

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

interface ConfirmOrderPageProps {
  orderId: string;
}

export const ConfirmOrderPage = ({ orderId }: ConfirmOrderPageProps) => {
  const pendingOrder = getPendingOrder(orderId);

  if (!pendingOrder) {
    return (
      <Layout title="Error">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-red-500">Order not found</h1>
          <a href="/" class="text-blue-500 hover:underline mt-4 inline-block">
            Back to Home
          </a>
        </div>
      </Layout>
    );
  }

  // Type guard to check if pendingOrder has items property
  interface PendingOrderWithItems {
    productId: number;
    quantity: number;
    items?: Array<{ productId: number; quantity: number }>;
  }

  const orderWithItems = pendingOrder as PendingOrderWithItems;

  if (!orderWithItems.items || orderWithItems.items.length === 0) {
    return (
      <Layout title="Error">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-red-500">No items in order</h1>
          <a href="/" class="text-blue-500 hover:underline mt-4 inline-block">
            Back to Home
          </a>
        </div>
      </Layout>
    );
  }

  const totalAmount = orderWithItems.items.reduce(
    (total: number, item: { productId: number; quantity: number }) => {
      const product = getProductById(item.productId);
      return total + (product?.price || 0) * item.quantity;
    },
    0,
  );

  return (
    <Layout title="Confirm Order">
      <div class="max-w-md mx-auto">
        <h1 class="text-3xl font-bold mb-6">Confirm Your Order</h1>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold">Address</h2>
          <div>
            <input
              class="mr-2"
              type="radio"
              id="tipco"
              name="address"
              value="tipco"
              checked
            />
            <label for="tipco">Tipco</label>
            <br />
          </div>
          <h2 class="text-xl font-semibold mt-4">สรุปรายการสั่งซื้อ</h2>
          <div class="mb-4 mt-4">
            {orderWithItems.items.map(
              (item: { productId: number; quantity: number }) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                const itemTotal = product.price * item.quantity;

                return (
                  <div class="mb-4">
                    <h2 class="font-medium">{product.name}</h2>
                    <p class="text-gray-600">{product.description}</p>
                    <p class="mt-2">
                      Price: {formatPrice(product.price)} ฿ x {item.quantity}{" "}
                      unit(s)
                    </p>
                    <p class="font-bold mt-2">
                      Subtotal: {formatPrice(itemTotal)} ฿
                    </p>
                  </div>
                );
              },
            )}
            <div class="border-t pt-4 mt-4">
              <p class="font-bold text-lg">
                Total: {formatPrice(totalAmount)} ฿
              </p>
            </div>
          </div>

          <form
            hx-post={`/${orderId}/success`}
            hx-swap="innerHTML"
            hx-target="body"
          >
            {orderWithItems.items.map(
              (item: { productId: number; quantity: number }) => (
                <>
                  <input
                    type="hidden"
                    name="productId"
                    value={String(item.productId)}
                  />
                  <input
                    type="hidden"
                    name="quantity"
                    value={String(item.quantity)}
                  />
                </>
              ),
            )}
            <input
              type="hidden"
              name="totalAmount"
              value={String(totalAmount)}
            />

            <div class="mb-4">
              <label class="block text-gray-700 mb-1">Your Name</label>
              <input
                type="text"
                name="customerName"
                required
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 mb-1">Tel</label>
              <input
                type="string"
                name="customerTel"
                required
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <div class="mb-6">
              <label class="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="customerEmail"
                required
                class="w-full px-3 py-2 border rounded"
              />
            </div>

            <div class="flex justify-between">
              <a
                href="/"
                class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Cancel
              </a>
              <button
                type="submit"
                class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Complete Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};
