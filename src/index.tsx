import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { routes } from "./routes/index";
import { join } from "path";
import { mkdir } from "fs/promises";

try {
  await mkdir("./uploads/payments", { recursive: true });
} catch (err) {
  console.error("Error creating directories:", err);
}

const app = new Elysia()
  .use(html())
  .use(
    staticPlugin({
      assets: ".",
      prefix: "/",
    }),
  )
  .use(routes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
