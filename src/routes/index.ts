import { Elysia, t } from "elysia";
import { HomePage } from "../pages/HomePage";
import { ConfirmOrderPage } from "../pages/ConfirmOrderPage";
import { SuccessPage } from "../pages/SuccessPage";
import { PaymentPage } from "../pages/PaymentPage";
import { addOrder, createPendingOrder, getPendingOrder } from "../store";
import { sendOrderConfirmationEmail } from "../utils/email";

export const routes = new Elysia()
  // Home page route
  .get("/", () => {
    return HomePage();
  })

  // Create pending order and redirect to confirm page
  .post(
    "/create-pending-order",
    ({ body, set }) => {
      const productId = Number(body.productId);
      const quantity = Number(body.quantity);

      // Create a pending order and get the ID
      const orderId = createPendingOrder(productId, quantity);

      // Redirect to the confirm page
      set.headers["HX-Redirect"] = `/${orderId}/confirm-order`;
      return null;
    },
    {
      body: t.Object({
        productId: t.String(),
        quantity: t.String(),
      }),
    },
  )

  // Confirm order page route with order ID
  .get("/:orderId/confirm-order", ({ params }) => {
    return ConfirmOrderPage({
      orderId: params.orderId,
    });
  })

  // Process order details and show payment page
  .post(
    "/:orderId/success",
    ({ params, body }) => {
      const pendingOrder = getPendingOrder(params.orderId);

      if (!pendingOrder) {
        return { error: "Order not found" };
      }

      const { productId, quantity } = pendingOrder;
      const totalAmount = Number(body.totalAmount);

      // Prepare order data for payment page
      const orderData = {
        orderId: params.orderId,
        productId,
        quantity,
        totalAmount,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerTel: body.customerTel,
      };

      return PaymentPage({ orderData });
    },
    {
      body: t.Object({
        productId: t.Optional(t.String()),
        quantity: t.Optional(t.String()),
        totalAmount: t.String(),
        customerName: t.String(),
        customerTel: t.String(),
        customerEmail: t.String(),
      }),
    },
  )

  // Complete the order after payment
  .post(
    "/:orderId/complete",
    async ({ params, body }) => {
      const productId = Number(body.productId);
      const quantity = Number(body.quantity);
      const totalAmount = Number(body.totalAmount);

      // Create final order in store
      const order = addOrder({
        products: [{ productId, quantity }],
        totalAmount,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerTel: body.customerTel,
      });

      // Send order confirmation email
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
        orderId: t.String(),
        productId: t.String(),
        quantity: t.String(),
        totalAmount: t.String(),
        customerName: t.String(),
        customerEmail: t.String(),
        customerTel: t.String(),
      }),
    },
  );
