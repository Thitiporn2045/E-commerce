import { products } from "../store";
import { Layout } from "../components/Layout";

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

interface HomePageProps {
  sortBy?: string;
}

export const HomePage = ({ sortBy = "default" }: HomePageProps) => {
  const sortedProducts = [...products];

  if (sortBy === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-desc") {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <Layout title="Online Store - Home">
      <div>
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">Products</h1>

          <div class="flex items-center gap-4">
            {/* Add Cart Button */}
            {/* <a
              href="/cart"
              class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Cart
            </a> */}

            <div class="flex items-center">
              <label for="sort" class="mr-2 text-gray-700">
                Sort by:
              </label>
              <select
                id="sort"
                class="border rounded py-1 px-3 bg-white"
                hx-get="/"
                hx-target="body"
                hx-swap="outerHTML"
                name="sortBy"
              >
                <option value="default" selected={sortBy === "default"}>
                  Default
                </option>
                <option value="price-asc" selected={sortBy === "price-asc"}>
                  Price (Low to High)
                </option>
                <option value="price-desc" selected={sortBy === "price-desc"}>
                  Price (High to Low)
                </option>
                <option value="name-asc" selected={sortBy === "name-asc"}>
                  Name (A-Z)
                </option>
                <option value="name-desc" selected={sortBy === "name-desc"}>
                  Name (Z-A)
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div
              class="border rounded-lg p-4 shadow-sm product-item"
              data-product-id={String(product.id)}
            >
              <h2 class="text-xl font-semibold product-name">{product.name}</h2>
              <p class="text-gray-600 mt-2">{product.description}</p>
              <p class="text-lg font-bold mt-2">
                {formatPrice(product.price)} ฿
              </p>
              <form hx-post="/add-to-cart" hx-swap="none" class="mt-4">
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
                  onclick={`createToast('Added 1 ${product.name} to cart', 'success')`}
                >
                  Add to Cart
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
