import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createWebhookHandler } from "@hookieai/node/hono";
import { onEvent, previewPage, signedSample } from "./sample.mjs";

const app = new Hono();
app.post("/api/hooks/hookie", createWebhookHandler(process.env.HOOKIE_RECEIVER_DEMO_SECRET, onEvent));

app.get("/", (context) => context.html(previewPage));
app.get("/api/sample", async (context) => {
  context.header("Cache-Control", "no-store");
  return context.json(await signedSample());
});

serve({ fetch: app.fetch, port: Number(process.env.PORT || 3000), hostname: "0.0.0.0" });
