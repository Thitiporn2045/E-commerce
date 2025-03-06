import nodemailer from "nodemailer";
import { getProductById } from "../store";

const formatPrice = (price: number): string => {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const createGmailTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
};

export type EmailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createGmailTransporter();

    const mailOptions = {
      from: "ODTS RETAIL Store <bossnattapat238@gmail.com>",
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const sendOrderConfirmationEmail = async (
  orderId: string,
  customerName: string,
  customerEmail: string,
  totalAmount: number,
  productDetails: { productId: number; quantity: number }[],
): Promise<boolean> => {
  const subject = `Your Order Confirmation #${orderId} - ODTS RETAIL`;

  const productList = productDetails
    .map((product) => {
      const productName =
        getProductById(product.productId)?.name ||
        `Product ID: ${product.productId}`;
      return `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">${productName}</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: center;">${
                product.quantity
              }</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">$${formatPrice(
                getProductById(product.productId)?.price || 0,
              )}</td>
            </tr>
          `;
    })
    .join("");

  const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 0;">
              <table role="presentation" style="width: 100%; max-width: 600px; margin: 0 auto; border-collapse: collapse;">
                <!-- Header with Logo -->
                <tr>
                  <td style="padding: 30px 0; text-align: center; background-color: #f8fafc;">
                    <h1 style="margin: 0; color: #1e3a8a; font-size: 28px; font-weight: bold;">ODTS RETAIL</h1>
                  </td>
                </tr>

                <!-- Hero Section -->
                <tr>
                  <td style="background-color: #2563eb; padding: 40px 30px; text-align: center; color: white;">
                    <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Thank You For Your Order, ${customerName}!</h2>
                    <p style="margin: 10px 0 0; font-size: 16px;">Your order has been confirmed and is being processed.</p>
                  </td>
                </tr>

                <!-- Order Info -->
                <tr>
                  <td style="padding: 30px; background-color: #ffffff;">
                    <h3 style="margin: 0 0 20px; color: #1e3a8a; font-size: 18px; font-weight: bold;">Order Information</h3>
                    <p style="margin: 0 0 8px;"><strong>Order Number:</strong> #${orderId}</p>
                    <p style="margin: 0 0 8px;"><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>

                    <!-- Order Items -->
                    <table role="presentation" style="width: 100%; margin-top: 25px; border-collapse: collapse;">
                      <thead>
                        <tr>
                          <th style="text-align: left; padding: 12px 0; border-bottom: 2px solid #e5e7eb;">Product</th>
                          <th style="text-align: center; padding: 12px 0; border-bottom: 2px solid #e5e7eb;">Quantity</th>
                          <th style="text-align: right; padding: 12px 0; border-bottom: 2px solid #e5e7eb;">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${productList}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="2" style="padding-top: 20px; text-align: right;"><strong>Total:</strong></td>
                          <td style="padding-top: 20px; text-align: right;"><strong>$${formatPrice(
                            totalAmount,
                          )}</strong></td>
                        </tr>
                      </tfoot>
                    </table>
                  </td>
                </tr>

                <!-- Shipping Info -->
                <tr>
                  <td style="padding: 0 30px 30px; background-color: #ffffff;">
                    <h3 style="margin: 0 0 15px; color: #1e3a8a; font-size: 18px; font-weight: bold;">What's Next?</h3>
                    <p style="margin: 0 0 10px;">We're preparing your order for shipment. You'll receive another email with tracking information once your order ships.</p>
                    <p style="margin: 0;">If you have any questions about your order, please contact our customer service team.</p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px; background-color: #f8fafc; text-align: center; font-size: 14px; color: #64748b;">
                    <p style="margin: 0 0 10px;">© ${new Date().getFullYear()} ODTS RETAIL. All rights reserved.</p>
                    <p style="margin: 0;">123 Retail Street, Bangkok, Thailand</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

  // Simple text version as fallback
  const text = `
      Thank you for your order, ${customerName}!

      Your order #${orderId} has been confirmed.

      Order Details:
      ${productDetails
        .map((product) => {
          const productName =
            getProductById(product.productId)?.name ||
            `Product ID: ${product.productId}`;
          return `${productName} - Quantity: ${product.quantity}`;
        })
        .join("\n")}

      Total Amount: ฿ ${formatPrice(totalAmount)}

      We'll let you know when your order ships.

      Best regards,
      ODTS RETAIL Team
    `;

  return sendEmail({
    to: customerEmail,
    subject,
    text,
    html,
  });
};
