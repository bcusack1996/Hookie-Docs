import express from "express";
import { createWebhookHandler } from "@hookieai/node/express";
import { onEvent, previewPage, signedSample } from "./sample.mjs";

const app = express();

// Verification needs the bytes the sender signed, before JSON parsing.
app.post(
  "/api/hooks/hookie",
  express.raw({ type: "*/*", limit: "1mb", inflate: false }),
  createWebhookHandler(process.env.HOOKIE_RECEIVER_DEMO_SECRET, onEvent),
);
app.use(express.json());

app.get("/", (_req, res) => res.type("html").send(previewPage));
app.get("/api/sample", async (_req, res) => {
  res.set("Cache-Control", "no-store").json(await signedSample());
});

app.listen(Number(process.env.PORT || 3000), "0.0.0.0");
