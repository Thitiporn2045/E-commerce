import { Elysia, t } from "elysia";
import { HomePage } from "../pages/HomePage";
import { ConfirmOrderPage } from "../pages/ConfirmOrderPage";
import { SuccessPage } from "../pages/SuccessPage";
import { addOrder } from "../store";

export const routes = new Elysia()
  // Home page route
  .get("/", () => {
    return HomePage();
  })

  // Confirm order page route
  .post(
    "/confirm-order",
    ({ body }) => {
      const productId = Number(body.productId);
      const quantity = Number(body.quantity);

      return ConfirmOrderPage({
        productId,
        quantity,
      });
    },
    {
      body: t.Object({
        productId: t.String(),
        quantity: t.String(),
      }),
    },
  )

  // Success page route
  .post(
    "/success",
    ({ body }) => {
      const productId = Number(body.productId);
      const quantity = Number(body.quantity);
      const totalAmount = Number(body.totalAmount);

      // Create order in store
      const order = addOrder({
        products: [{ productId, quantity }],
        totalAmount,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
      });

      return SuccessPage({
        orderId: order.id,
        productId: productId,
        quantity: quantity,
        totalAmount: totalAmount,
        customerName: body.customerName,
        customerEmail: body.customerEmail,
      });
    },
    {
      body: t.Object({
        productId: t.String(),
        quantity: t.String(),
        totalAmount: t.String(),
        customerName: t.String(),
        customerEmail: t.String(),
      }),
    },
  );
