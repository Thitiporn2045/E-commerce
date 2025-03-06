import { products } from "../store";
import { Layout } from "../components/Layout";

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
              <p class="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
              <form
                hx-post="/confirm-order"
                hx-swap="innerHTML"
                hx-target="body"
              >
                <input
                  type="hidden"
                  name="productId"
                  value={String(product.id)}
                />
                <input type="hidden" name="quantity" value="1" />
                <button
                  class="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
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
