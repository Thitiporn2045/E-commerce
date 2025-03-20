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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">Payment</h1>
          <p className="text-gray-500 text-center mb-10">Please complete your payment to finalize your order</p>
          
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            {/* Progress bar */}
            <div className="bg-gray-50 px-8 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-300 text-gray-600 rounded-full h-8 w-8 flex items-center justify-center font-bold">1</div>
                  <span className="ml-2 text-gray-600">Cart</span>
                </div>
                <div className="h-0.5 w-12 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="bg-gray-300 text-gray-600 rounded-full h-8 w-8 flex items-center justify-center font-bold">2</div>
                  <span className="ml-2 text-gray-600">Details</span>
                </div>
                <div className="h-0.5 w-12 bg-gray-300"></div>
                <div className="flex items-center">
                  <div className="bg-black text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">3</div>
                  <span className="ml-2 font-medium">Payment</span>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-1 gap-8">
                {/* Payment Details Section */}
                <div className="md:col-span-3">
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
                    
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">QR Payment</h2>
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex justify-center mb-6">
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                            className="w-64 h-64"
                            alt="Payment QR Code"
                          />
                        </div>
                        
                        <div className="text-center space-y-2 mb-6">
                          <p className="text-gray-700">Scan the QR code with any mobile banking app</p>
                          <p className="font-medium text-lg">{formatPrice(orderData.totalAmount)} ฿</p>
                        </div>
                        
                        <div className="flex items-center justify-center space-x-4">
                          <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </div>
                          <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Payment Proof</h2>
                      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                        <div className="mb-4" id="preview-container">
                          {/* Preview will be inserted here by JavaScript */}
                        </div>
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
                          className="bg-black text-white py-3 px-6 rounded-lg cursor-pointer hover:bg-gray-800 inline-flex items-center justify-center transition duration-300"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Select Receipt Image
                        </label>
                        <p className="text-sm text-gray-500 mt-4">
                          Please upload a screenshot of your payment confirmation
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button 
                        type="button"
                        onClick="history.back()"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg transition duration-300 font-medium"
                      >
                        Back to Details
                      </button>
                      <button
                        className="bg-black hover:bg-gray-800 text-white py-3 px-8 rounded-lg transition duration-300 font-medium"
                        type="submit"
                      >
                        Complete Order
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Order Summary Section */}
                {/* <div className="md:col-span-2">
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 sticky top-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
                    
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Order ID</span>
                        <span className="font-medium">#{orderData.orderId}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Customer</span>
                        <span className="font-medium">{orderData.customerName}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Contact</span>
                        <span className="font-medium">{orderData.customerTel}</span>
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatPrice(orderData.totalAmount)} ฿</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Shipping</span>
                        <span>Free</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg text-gray-800">Total</span>
                      <span className="font-bold text-lg text-gray-800">{formatPrice(orderData.totalAmount)} ฿</span>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex items-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span className="text-sm text-gray-600">Secure payment processing</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm text-gray-600">Your data is protected</span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
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
              img.className = 'max-h-64 mx-auto rounded-lg mb-3 border border-gray-200 shadow-sm';
              previewContainer.appendChild(img);
              
              // Add filename display
              const filenameEl = document.createElement('p');
              filenameEl.className = 'text-sm text-gray-600 mt-2';
              filenameEl.textContent = input.files[0].name;
              previewContainer.appendChild(filenameEl);
            }

            reader.readAsDataURL(input.files[0]);
          }
        }
      `}</script>
    </Layout>
  );
};