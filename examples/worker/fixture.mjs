import { Webhook } from "standardwebhooks";

export function fixture(secret, valid = true) {
  const id = crypto.randomUUID(),
    now = new Date();
  const raw = JSON.stringify({ type: "order.created", sample: true });
  return new Request("https://example.invalid/webhook", {
    method: "POST",
    body: valid ? raw : raw + " ",
    headers: {
      "webhook-id": id,
      "webhook-timestamp": String(Math.floor(now.getTime() / 1000)),
      "webhook-signature": new Webhook(secret).sign(id, now, raw),
    },
  });
}
