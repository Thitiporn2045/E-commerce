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
      <Layout title="Your Collection - Luxury Store">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-serif font-light mb-8 text-gray-900">Your Collection</h1>
          <div className="bg-white p-10 rounded-lg shadow-lg text-center border border-gray-100">
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <p className="text-xl font-serif text-gray-600 mb-6">Your collection is empty</p>
            <a
              href="/"
              className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-8 rounded-md inline-block font-serif transition duration-300"
            >
              Explore Our Collection
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Your Collection - Luxury Store">
      <div className="max-w-8xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-serif font-light mb-8 text-gray-900">Your Collection</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 mb-6">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-serif font-medium text-gray-600">Product</th>
                    <th className="py-4 px-6 text-center text-sm font-serif font-medium text-gray-600">Quantity</th>
                    <th className="py-4 px-6 text-right text-sm font-serif font-medium text-gray-600">Price</th>
                    <th className="py-4 px-6 text-right text-sm font-serif font-medium text-gray-600">Total</th>
                    <th className="py-4 px-6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cart.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;

                    const itemTotal = product.price * item.quantity;

                    return (
                      <tr className="hover:bg-gray-50 transition duration-150">
                        <td className="py-6 px-6">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 rounded bg-gray-100 mr-4">
                              {/* Product Image Placeholder */}
                              <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <span className="text-xs">Image</span>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-serif font-medium text-gray-800">{product.name}</h3>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex justify-center items-center">
                            <form
                              className="flex items-center"
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
                                className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
                                onclick={`if(this.nextElementSibling.value > 1) { this.nextElementSibling.value--; this.form.submit(); }`}
                              >
                                −
                              </button>
                              <input
                                type="number"
                                name="quantity"
                                value={String(item.quantity)}
                                min="1"
                                max="99"
                                className="w-12 h-8 text-center border-y border-gray-300 focus:outline-none"
                                onchange="this.form.submit()"
                              />
                              <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
                                onclick={`this.previousElementSibling.value = parseInt(this.previousElementSibling.value) + 1; this.form.submit();`}
                              >
                                +
                              </button>
                            </form>
                          </div>
                        </td>
                        <td className="py-6 px-6 text-right font-serif text-gray-700">
                          {formatPrice(product.price)} ฿
                        </td>
                        <td className="py-6 px-6 text-right font-serif font-medium text-gray-900">
                          {formatPrice(itemTotal)} ฿
                        </td>
                        <td className="py-6 px-6 text-center">
                          <form hx-post="/remove-from-cart" hx-swap="none">
                            <input
                              type="hidden"
                              name="productId"
                              value={String(product.id)}
                            />
                            <button
                              type="submit"
                              className="text-gray-400 hover:text-gray-600 transition duration-150"
                              aria-label="Remove item"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.5"
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
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 sticky top-4">
              <h2 className="text-xl font-serif font-light mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-serif">{formatPrice(totalAmount)} ฿</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-serif">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span className="font-serif">Included</span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-6 pt-6">
                <div className="flex justify-between font-serif text-lg">
                  <span>Total</span>
                  <span className="font-medium">{formatPrice(totalAmount)} ฿</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">Including VAT</p>
              </div>

              <div className="mt-8">
                <form hx-post="/checkout" hx-swap="none">
                  <button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-md font-serif transition duration-300"
                  >
                    Proceed to Checkout
                  </button>
                </form>

                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href="/"
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 px-6 rounded-md font-serif text-center transition duration-300"
                  >
                    Continue Shopping
                  </a>

                  <form hx-post="/clear-cart" hx-swap="none" className="w-full">
                    <button
                      type="submit"
                      className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-500 py-3 px-6 rounded-md font-serif transition duration-300"
                    >
                      Clear Collection
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};