import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { ConfirmOrderPage } from "../pages/ConfirmOrderPage";
import { SuccessPage } from "../pages/SuccessPage";
import { PaymentPage } from "../pages/PaymentPage";
import {
  addOrder,
  createPendingOrder,
  getPendingOrder,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,
  getCart,
  getProductById,
} from "../store";
import { sendOrderConfirmationEmail } from "../utils/email";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

const ensureUploadDir = async () => {
  try {
    await mkdir("./uploads/payments", { recursive: true });
  } catch (error) {
    console.error("Error creating upload directory:", error);
  }
};

ensureUploadDir();

export const routes = new Elysia()
  .get("/", ({ query }) => {
    return HomePage({
      sortBy: query.sortBy || "default",
    });
  })

  .get("/cart", () => {
    return CartPage();
  })

  .post(
    "/add-to-cart",
    ({ body, set }) => {
      const productId = Number(body.productId);
      const quantity = Number(body.quantity);
      const product = getProductById(productId);

      addToCart(productId, quantity);

      // Use a simpler approach without trying to put Thai characters in headers
      // Create a custom event with productId instead of productName
      set.headers["HX-Trigger"] = "itemAddedToCart";
      set.headers["HX-Trigger-product-id"] = String(productId);
      set.headers["HX-Trigger-quantity"] = String(quantity);

      return null;
    },
    {
      body: t.Object({
        productId: t.String(),
        quantity: t.String(),
      }),
    },
  )

  .post(
    "/update-cart",
    ({ body, set }) => {
      const productId = Number(body.productId);
      const quantity = Number(body.quantity);
      const product = getProductById(productId);

      updateCartItem(productId, quantity);

      // Simple approach for setting toast info
      set.headers["HX-Trigger-After-Swap"] = "cartUpdated";
      set.headers["HX-Trigger-After-Swap-message"] =
        `Updated ${product?.name || "Product"} quantity to ${quantity}`;
      set.headers["HX-Trigger-After-Swap-type"] = "info";

      return CartPage();
    },
    {
      body: t.Object({
        productId: t.String(),
        quantity: t.String(),
      }),
    },
  )

  .post(
    "/remove-from-cart",
    ({ body, set }) => {
      const productId = Number(body.productId);
      const product = getProductById(productId);

      removeFromCart(productId);

      // Simple approach for setting toast info
      set.headers["HX-Trigger-After-Swap"] = "cartUpdated";
      set.headers["HX-Trigger-After-Swap-message"] =
        `Removed ${product?.name || "Product"} from cart`;
      set.headers["HX-Trigger-After-Swap-type"] = "info";

      return CartPage();
    },
    {
      body: t.Object({
        productId: t.String(),
      }),
    },
  )

  .post("/clear-cart", ({ set }) => {
    clearCart();

    // Simple approach for setting toast info
    set.headers["HX-Trigger-After-Swap"] = "cartUpdated";
    set.headers["HX-Trigger-After-Swap-message"] = "Cart cleared";
    set.headers["HX-Trigger-After-Swap-type"] = "info";

    return CartPage();
  })

  .post("/checkout", ({ set }) => {
    const cart = getCart();
    const orderId = createPendingOrder(cart);

    set.headers["HX-Redirect"] = `/${orderId}/confirm-order`;
    return null;
  })

  .get("/:orderId/confirm-order", ({ params }) => {
    return ConfirmOrderPage({
      orderId: params.orderId,
    });
  })

  .post(
    "/:orderId/success",
    ({ params, body }) => {
      const pendingOrder = getPendingOrder(params.orderId);

      if (!pendingOrder) {
        return { error: "Order not found" };
      }

      const totalAmount = Number(body.totalAmount);

      // Convert pendingOrder to match OrderData interface structure
      const orderData = {
        orderId: params.orderId,
        productId: pendingOrder.productId,
        quantity: pendingOrder.quantity,
        totalAmount,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerTel: body.customerTel,
      };

      return PaymentPage({ orderData });
    },
    {
      body: t.Object({
        totalAmount: t.String(),
        customerName: t.String(),
        customerTel: t.String(),
        customerEmail: t.String(),
      }),
    },
  )

  .post(
    "/:orderId/complete",
    async ({ params, body }) => {
      const totalAmount = Number(body.totalAmount);
      const productId = Number(body.productId);
      const quantity = Number(body.quantity);

      let paymentProofPath: string | undefined = undefined;
      if (body.paymentProof) {
        try {
          const fileExt = body.paymentProof.name.split(".").pop() || "jpg";
          const fileName = `payment_${params.orderId}.${fileExt}`;
          const filePath = join("./uploads/payments", fileName);

          await writeFile(
            filePath,
            Buffer.from(await body.paymentProof.arrayBuffer()),
          );
          paymentProofPath = `/uploads/payments/${fileName}`;
          console.log(`Payment proof saved at: ${filePath}`);
        } catch (error) {
          console.error("Error saving payment proof:", error);
        }
      }

      addOrder({
        products: [{ productId, quantity }],
        totalAmount,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerTel: body.customerTel,
        paymentProofPath,
      });

      try {
        await sendOrderConfirmationEmail(
          params.orderId,
          body.customerName,
          body.customerEmail,
          totalAmount,
          [{ productId, quantity }],
        );
        console.log("Order confirmation email sent successfully");
      } catch (error) {
        console.error("Error sending order confirmation email:", error);
      }

      return SuccessPage({
        orderId: params.orderId,
        productId,
        quantity,
        totalAmount,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerTel: body.customerTel,
      });
    },
    {
      body: t.Object({
        productId: t.String(),
        quantity: t.String(),
        totalAmount: t.String(),
        customerName: t.String(),
        customerEmail: t.String(),
        customerTel: t.String(),
        paymentProof: t.Optional(t.Any()),
      }),
    },
  );
