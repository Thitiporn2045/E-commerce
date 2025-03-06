import { Layout } from "../components/Layout";
import {
  getCart,
  getProductById,
  clearCart,
  removeFromCart,
  getCartTotal,
} from "../store";

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const CartPage = () => {
  const cart = getCart();
  const totalAmount = getCartTotal();

  if (cart.length === 0) {
    return (
      <Layout title="Shopping Cart">
        <div class="max-w-4xl mx-auto px-4">
          <h1 class="text-3xl font-bold mb-6">Your Shopping Cart</h1>
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <p class="text-lg mb-4">Your cart is empty</p>
            <a
              href="/"
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded inline-block"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Shopping Cart">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl font-bold mb-6">Your Shopping Cart</h1>

        <div class="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="py-3 px-4 text-left">Product</th>
                <th class="py-3 px-4 text-center">Quantity</th>
                <th class="py-3 px-4 text-right">Price</th>
                <th class="py-3 px-4 text-right">Total</th>
                <th class="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {cart.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;

                const itemTotal = product.price * item.quantity;

                return (
                  <tr>
                    <td class="py-4 px-4">
                      <div>
                        <h3 class="font-medium">{product.name}</h3>
                        <p class="text-sm text-gray-500">
                          {product.description}
                        </p>
                      </div>
                    </td>
                    <td class="py-4 px-4 text-center">
                      <div class="flex justify-center items-center">
                        <form
                          class="flex items-center"
                          hx-post="/update-cart"
                          hx-swap="none"
                        >
                          <input
                            type="hidden"
                            name="productId"
                            value={String(product.id)}
                          />
                          <button
                            type="button"
                            class="bg-gray-200 text-gray-700 w-8 h-8 flex items-center justify-center rounded-l"
                            onclick={`if(this.nextElementSibling.value > 1) { this.nextElementSibling.value--; this.form.submit(); }`}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            name="quantity"
                            value={String(item.quantity)}
                            min="1"
                            max="99"
                            class="w-12 h-8 text-center border-y"
                            onchange="this.form.submit()"
                          />
                          <button
                            type="button"
                            class="bg-gray-200 text-gray-700 w-8 h-8 flex items-center justify-center rounded-r"
                            onclick={`this.previousElementSibling.value = parseInt(this.previousElementSibling.value) + 1; this.form.submit();`}
                          >
                            +
                          </button>
                        </form>
                      </div>
                    </td>
                    <td class="py-4 px-4 text-right">
                      {formatPrice(product.price)} ฿
                    </td>
                    <td class="py-4 px-4 text-right font-medium">
                      {formatPrice(itemTotal)} ฿
                    </td>
                    <td class="py-4 px-4 text-center">
                      <form hx-post="/remove-from-cart" hx-swap="none">
                        <input
                          type="hidden"
                          name="productId"
                          value={String(product.id)}
                        />
                        <button
                          type="submit"
                          class="text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-start gap-4">
          <div class="bg-white p-4 rounded-lg shadow-md w-full md:w-1/3">
            <h2 class="text-lg font-semibold mb-4">Order Summary</h2>
            <div class="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{formatPrice(totalAmount)} ฿</span>
            </div>
            <div class="border-t pt-2 mt-2">
              <div class="flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatPrice(totalAmount)} ฿</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2 w-full md:w-2/3 md:text-right">
            <form hx-post="/checkout" hx-swap="none">
              <button
                type="submit"
                class="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded"
              >
                Proceed to Checkout
              </button>
            </form>

            <div class="flex flex-col md:flex-row gap-2 md:justify-end">
              <a
                href="/"
                class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
              >
                Continue Shopping
              </a>

              <form hx-post="/clear-cart" hx-swap="none">
                <button
                  type="submit"
                  class="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded w-full"
                >
                  Clear Cart
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
