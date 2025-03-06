import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { routes } from "./routes/index";

const app = new Elysia().use(html()).use(routes).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
