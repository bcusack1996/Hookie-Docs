import { createWebhookHandler } from "@hookieai/node/next";
import { onEvent } from "../../../../../sample.mjs";

export const POST = createWebhookHandler(process.env.HOOKIE_RECEIVER_DEMO_SECRET, onEvent);
