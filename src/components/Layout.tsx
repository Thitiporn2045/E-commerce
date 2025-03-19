interface LayoutProps {
  title?: string;
  children: any;
}

export const Layout = ({ children, title = "Online Store" }: LayoutProps) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <script src="https://unpkg.com/htmx.org@1.9.10"></script>
        <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
        <style>{`
          /* Add any custom styles here */
          .opacity-0 { opacity: 0; }
          .opacity-100 { opacity: 1; }
        `}</style>
      </head>
      <body class="bg-gray-100 min-h-screen">
        <header class="bg-white shadow-sm">
          <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <a href="/" class="font-bold text-xl text-blue-600">
              ODTS RETAIL
            </a>
            <a
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
            </a>
          </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 py-8">{children}</main>

        <footer class="bg-white py-6 mt-12">
          <div class="max-w-7xl mx-auto px-4 text-center text-gray-500">
            &copy; {new Date().getFullYear()} ODTS RETAIL. All rights reserved.
          </div>
        </footer>

        {/* Toast container for HTMX event responses */}
        <div id="toast-container"></div>

        {/* Script for handling toast events */}
        <script>{`
          // Toast counter to ensure unique IDs and proper stacking
          let toastCounter = 0;

          // Function to create a toast notification
          function createToast(message, type = 'info', duration = 3000) {
            const toastId = 'toast-' + (toastCounter++);
            const toast = document.createElement('div');
            toast.id = toastId;
            toast.className = 'fixed text-white px-6 py-3 rounded-md shadow-lg transform transition-all duration-300 flex items-center opacity-0';
            toast.style.zIndex = '9999';
            toast.style.transform = 'translateY(100%)';
            toast.style.right = '1rem'; // 4px in Tailwind

            // Calculate bottom position based on existing toasts
            const existingToasts = document.querySelectorAll('[id^="toast-"]');
            const bottomOffset = 16; // 1rem in pixels
            const toastHeight = 60; // Approximate height of a toast in pixels
            const bottomPosition = bottomOffset + (existingToasts.length * (toastHeight + 8)); // 8px gap between toasts
            toast.style.bottom = bottomPosition + 'px';

            // Set the background color based on type
            if (type === 'success') {
              toast.classList.add('bg-green-500');
            } else if (type === 'error') {
              toast.classList.add('bg-red-500');
            } else {
              toast.classList.add('bg-blue-500');
            }

            // Add icon based on type
            let icon = '';
            if (type === 'success') {
              icon = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>';
            } else if (type === 'error') {
              icon = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>';
            } else {
              icon = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"/></svg>';
            }

            toast.innerHTML = icon + message;

            // Create a container for toasts if it doesn't exist
            let toastContainer = document.getElementById('toast-container');
            if (!toastContainer) {
              toastContainer = document.createElement('div');
              toastContainer.id = 'toast-container';
              toastContainer.style.position = 'fixed';
              toastContainer.style.bottom = '0';
              toastContainer.style.right = '0';
              toastContainer.style.zIndex = '9998';
              document.body.appendChild(toastContainer);
            }

            // Append the toast to the container
            toastContainer.appendChild(toast);

            // Animate the toast in
            setTimeout(() => {
              toast.classList.add('opacity-100');
              toast.style.transform = 'translateY(0)';
            }, 50);

            // Remove the toast after the duration
            setTimeout(() => {
              toast.style.transform = 'translateY(100%)';
              toast.classList.remove('opacity-100');
              toast.classList.add('opacity-0');

              // After animation completes, remove the element and adjust other toasts
              setTimeout(() => {
                const removedHeight = toast.offsetHeight + 8; // Height + margin
                toast.remove();

                // Adjust positions of toasts above the removed one
                const remainingToasts = document.querySelectorAll('[id^="toast-"]');
                remainingToasts.forEach(t => {
                  const currentBottom = parseInt(t.style.bottom, 10);
                  if (currentBottom > bottomPosition) {
                    t.style.bottom = (currentBottom - removedHeight) + 'px';
                  }
                });
              }, 300);
            }, duration);

            return toast;
          }

          // Listen for the itemAddedToCart event
          document.body.addEventListener('htmx:afterRequest', function(event) {
            // Check if the event has the itemAddedToCart trigger
            if (event.detail.headers && event.detail.headers['HX-Trigger'] === 'itemAddedToCart') {
              const productId = event.detail.headers['HX-Trigger-product-id'];
              const quantity = event.detail.headers['HX-Trigger-quantity'] || '1';

              // Find the product name in the page
              let productName = 'Product';
              const productEl = document.querySelector(\`[data-product-id="\${productId}"]\`);
              if (productEl) {
                productName = productEl.querySelector('.product-name').textContent;
              }

              createToast(\`Added \${quantity} \${productName} to cart\`, 'success');
            }

            // Try to parse potential JSON triggers
            try {
              const triggerHeader = event.detail.headers && event.detail.headers['HX-Trigger'];
              if (triggerHeader && triggerHeader.startsWith('{')) {
                const triggers = JSON.parse(triggerHeader);
                if (triggers.itemAddedToCart) {
                  const data = triggers.itemAddedToCart;
                  createToast(\`Added \${data.quantity} \${data.name} to cart\`, 'success');
                }
                if (triggers.cartUpdated) {
                  const data = triggers.cartUpdated;
                  createToast(data.message || 'Cart updated', data.type || 'info');
                }
              }
            } catch (e) {
              console.log('Error parsing HX-Trigger JSON:', e);
            }
          });

          // Listen for after-swap events specifically for cartUpdated
          document.body.addEventListener('htmx:afterSwap', function(event) {
            // Check headers for the cartUpdated trigger
            if (event.detail.headers && event.detail.headers['HX-Trigger-After-Swap'] === 'cartUpdated') {
              const message = event.detail.headers['HX-Trigger-After-Swap-message'] || 'Cart updated';
              const type = event.detail.headers['HX-Trigger-After-Swap-type'] || 'info';
              createToast(message, type);
            }
          });

          // Additionally listen for direct trigger events
          document.body.addEventListener('htmx:trigger', function(event) {
            if (event.detail.name === 'cartUpdated') {
              const message = event.detail.detail && event.detail.detail.message ?
                event.detail.detail.message : 'Cart updated';
              const type = event.detail.detail && event.detail.detail.type ?
                event.detail.detail.type : 'info';
              createToast(message, type);
            }
          });
        `}</script>
      </body>
    </html>
  );
};
