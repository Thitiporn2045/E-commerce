// src/routes/index.ts
import { Elysia, t } from "elysia";
import { HomePage } from "../pages/HomePage";
import { ConfirmOrderPage } from "../pages/ConfirmOrderPage";
import { SuccessPage } from "../pages/SuccessPage";
import { addOrder, createPendingOrder, getPendingOrder } from "../store";

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

  // Success page route with order ID
  .post(
    "/:orderId/success",
    ({ params, body }) => {
      const pendingOrder = getPendingOrder(params.orderId);

      if (!pendingOrder) {
        return { error: "Order not found" };
      }

      const { productId, quantity } = pendingOrder;
      const totalAmount = Number(body.totalAmount);

      // Create final order in store
      const order = addOrder({
        products: [{ productId, quantity }],
        totalAmount,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerTel: body.customerTel, // Add this field
      });

      return SuccessPage({
        orderId: params.orderId,
        productId,
        quantity,
        totalAmount,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
        customerTel: body.customerTel, // Add this field
      });
    },
    {
      body: t.Object({
        // Allow productId and quantity as they're coming from the form
        productId: t.Optional(t.String()),
        quantity: t.Optional(t.String()),
        totalAmount: t.String(),
        customerName: t.String(),
        customerTel: t.String(), // Add this field to validation
        customerEmail: t.String(),
      }),
    },
  );
