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
    <Layout title="Luxury Collection - Exclusive Products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-xl mb-12 overflow-hidden">
          <div className="px-8 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-white mb-4">Luxury Collection</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Experience the pinnacle of sophistication with our handpicked premium products.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-serif font-light text-gray-800 mb-4 md:mb-0">Exclusive Offerings</h2>

          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                id="sort"
                className="appearance-none border-b border-gray-400 py-2 pl-3 pr-10 bg-transparent font-serif text-gray-700 focus:outline-none focus:border-gray-900"
                hx-get="/"
                hx-target="body"
                hx-swap="outerHTML"
                name="sortBy"
              >
                <option value="default" selected={sortBy === "default"}>
                  Curated Selection
                </option>
                <option value="price-asc" selected={sortBy === "price-asc"}>
                  Price (Ascending)
                </option>
                <option value="price-desc" selected={sortBy === "price-desc"}>
                  Price (Descending)
                </option>
                <option value="name-asc" selected={sortBy === "name-asc"}>
                  Name (A-Z)
                </option>
                <option value="name-desc" selected={sortBy === "name-desc"}>
                  Name (Z-A)
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <div
              className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 product-item"
              data-product-id={String(product.id)}
            >
              <div className="h-48 bg-gray-200 relative">
                {/* Product Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <span className="font-serif text-sm">Product Image</span>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-serif font-medium text-gray-900 product-name">{product.name}</h2>
                <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
                <p className="text-xl font-serif font-light mt-4 text-gray-900">
                  {formatPrice(product.price)} ฿
                </p>
                
                <form hx-post="/add-to-cart" hx-swap="none" className="mt-6">
                  <div className="flex items-center justify-between mb-5">
                    <label className="text-gray-700 font-serif">
                      Quantity
                    </label>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                        onclick={`if(this.nextElementSibling.value > 1) this.nextElementSibling.value--`}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        id={`quantity-${product.id}`}
                        name="quantity"
                        value="1"
                        min="1"
                        max="99"
                        className="w-12 h-8 text-center border-x border-gray-300 focus:outline-none"
                      />
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
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
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-md font-serif transition duration-300"
                    type="submit"
                    onclick={`createToast('Added ${product.name} to your collection', 'success')`}
                  >
                    Add to Collection
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};