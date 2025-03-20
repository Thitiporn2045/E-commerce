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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-w-md w-full">
            <h1 className="text-3xl font-bold text-red-600 text-center">Order not found</h1>
            <div className="flex justify-center mt-6">
            <a href="/" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Home
            </a>
            </div>
        </div>
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 max-w-md w-full">
            <h1 className="text-3xl font-bold text-red-600 text-center">No items in order</h1>
            <div className="flex justify-center mt-6">
            <a href="/" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Home
            </a>
            </div>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="max-w-8xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">Confirm Your Order</h1>
        <p className="text-gray-500 text-center mb-10">Please review your order details below</p>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            {/* Progress bar */}
            <div className="bg-gray-50 px-8 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                <div className="bg-black text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">1</div>
                <span className="ml-2 font-medium">Cart</span>
                </div>
                <div className="h-0.5 w-12 bg-gray-300"></div>
                <div className="flex items-center">
                <div className="bg-black text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">2</div>
                <span className="ml-2 font-medium">Details</span>
                </div>
                <div className="h-0.5 w-12 bg-gray-300"></div>
                <div className="flex items-center">
                <div className="bg-gray-200 text-gray-600 rounded-full h-8 w-8 flex items-center justify-center font-bold">3</div>
                <span className="ml-2 text-gray-600">Payment</span>
                </div>
            </div>
            </div>

            <div className="p-8">
            <div className="grid md:grid-cols-5 gap-8">
                {/* Customer Information Section */}
                <div className="md:col-span-3">
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

                    <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Shipping Address</h2>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                        <div className="flex items-center">
                        {/* <input
                            className="h-5 w-5 text-black focus:ring-black"
                            type="radio"
                            id="tipco"
                            name="address"
                            value="tipco"
                            checked
                        /> */}
                        <label className="ml-2 block text-gray-800 font-medium">
                            Tipco Headquarters
                        </label>
                        </div>
                        <p className="text-gray-500 mt-2 pl-7">118/1 Rama 6 Rd, Samsen Nai, Phaya Thai, Bangkok 10400</p>
                    </div>
                    </div>

                    <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Customer Information</h2>
                    <div className="space-y-4">
                        <div>
                        <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                        <input
                            type="text"
                            name="customerName"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                            placeholder="Enter your full name"
                        />
                        </div>

                        <div>
                        <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="customerTel"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                            placeholder="Enter your phone number"
                        />
                        </div>

                        <div>
                        <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                        <input
                            type="email"
                            name="customerEmail"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
                            placeholder="Enter your email address"
                        />
                        </div>
                    </div>
                    </div>

                    <div className="flex justify-between mt-8">
                    <a
                        href="/"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg transition duration-300 font-medium"
                    >
                        Return to Cart
                    </a>
                    <button
                        type="submit"
                        className="bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg transition duration-300 font-medium"
                    >
                        Proceed to Payment
                    </button>
                    </div>
                </form>
                </div>

                {/* Order Summary Section */}
                <div className="md:col-span-2">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">สรุปรายการสั่งซื้อ</h2>
                    
                    <div className="border-b border-gray-200 pb-4">
                    {orderWithItems.items.map(
                        (item: { productId: number; quantity: number }) => {
                        const product = getProductById(item.productId);
                        if (!product) return null;
                        const itemTotal = product.price * item.quantity;

                        return (
                            <div className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                            <div className="flex justify-between">
                                <h3 className="font-medium text-gray-800">{product.name}</h3>
                                <span className="font-bold">{formatPrice(product.price)} ฿</span>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">{product.description}</p>
                            <div className="flex justify-between items-center mt-2 text-gray-600">
                                <span>Quantity: {item.quantity}</span>
                                <span className="font-medium">Subtotal: {formatPrice(itemTotal)} ฿</span>
                            </div>
                            </div>
                        );
                        },
                    )}
                    </div>

                    <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>{formatPrice(totalAmount)} ฿</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                        <span className="font-bold text-lg text-gray-800">Total</span>
                        <span className="font-bold text-lg text-gray-800">{formatPrice(totalAmount)} ฿</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </Layout>
);
};