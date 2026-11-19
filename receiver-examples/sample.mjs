import { randomUUID } from "node:crypto";
import { Webhook } from "standardwebhooks";

export function signedSample() {
  const body = JSON.stringify({ type: "order.created", orderId: "demo-order" });
  const id = randomUUID();
  const now = new Date();
  return {
    body,
    headers: {
      "content-type": "application/json",
      "webhook-id": id,
      "webhook-timestamp": String(Math.floor(now.getTime() / 1000)),
      "webhook-signature": new Webhook(process.env.HOOKIE_RECEIVER_DEMO_SECRET).sign(id, now, body),
    },
  };
}

export function onEvent(event, delivery) {
  console.log("Received verified event", event.type, delivery.id);
}

export const previewPage = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hookie webhook receiver</title>
</head>
<body>
  <main>
    <h1>Test a signed webhook</h1>
    <p>This preview signs a sample order. Changing its body after signing lets you check how the receiver handles an invalid signature.</p>
    <button type="button" id="valid">Send valid delivery</button>
    <button type="button" id="modified">Send modified delivery</button>
    <p role="status" id="result"></p>
  </main>
  <script type="module">
    const result = document.querySelector("#result");
    async function send(modified) {
      result.textContent = "Sending…";
      try {
        const sample = await fetch("/api/sample", { cache: "no-store" });
        if (!sample.ok) throw new Error("Could not sign the sample.");
        const { body, headers } = await sample.json();
        const response = await fetch("/api/hooks/hookie", {
          method: "POST", headers, body: modified ? body + " " : body,
        });
        result.textContent = "Receiver returned HTTP " + response.status + ".";
      } catch (error) {
        result.textContent = error.message;
      }
    }
    document.querySelector("#valid").addEventListener("click", () => send(false));
    document.querySelector("#modified").addEventListener("click", () => send(true));
  </script>
</body>
</html>`;
