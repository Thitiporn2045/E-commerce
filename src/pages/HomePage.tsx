import { products } from "../store";
import { Layout } from "../components/Layout";

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const HomePage = () => {
  return (
    <Layout title="Online Store - Home">
      <div>
        <h1 class="text-3xl font-bold mb-6">Products</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div class="border rounded-lg p-4 shadow-sm">
              <h2 class="text-xl font-semibold">{product.name}</h2>
              <p class="text-gray-600 mt-2">{product.description}</p>
              <p class="text-lg font-bold mt-2">
                ฿ {formatPrice(product.price)}
              </p>
              <form hx-post="/create-pending-order" hx-swap="none" class="mt-4">
                <div class="flex items-center justify-between mb-3">
                  <label for={`quantity-${product.id}`} class="text-gray-700">
                    Quantity:
                  </label>
                  <div class="flex items-center">
                    <button
                      type="button"
                      class="bg-gray-200 text-gray-700 w-8 h-8 flex items-center justify-center rounded-l"
                      onclick={`if(this.nextElementSibling.value > 1) this.nextElementSibling.value--`}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id={`quantity-${product.id}`}
                      name="quantity"
                      value="1"
                      min="1"
                      max="99"
                      class="w-12 h-8 text-center border-y"
                    />
                    <button
                      type="button"
                      class="bg-gray-200 text-gray-700 w-8 h-8 flex items-center justify-center rounded-r"
                      onclick={`this.previousElementSibling.value = parseInt(this.previousElementSibling.value) + 1`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="hidden"
                  name="productId"
                  value={String(product.id)}
                />
                <button
                  class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  type="submit"
                >
                  Buy Now
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
