import { Webhook } from "standardwebhooks";

// The Worker entry point. The preview supplies an ephemeral signing secret.
export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname !== "/webhook")
      return new Response("Not found", { status: 404 });
    if (request.method !== "POST")
      return new Response("Use POST", { status: 405, headers: { Allow: "POST" } });
    if (!env.HOOKIE_SIGNING_SECRET) return new Response("Signing secret missing", { status: 503 });
    // Signatures cover the raw body. Limit both fixed-length and streamed deliveries.
    const maxBytes = 64 * 1024;
    if (Number(request.headers.get("Content-Length")) > maxBytes) {
      return new Response("Sample too large", { status: 413 });
    }
    const reader = request.body?.getReader();
    if (!reader) return new Response("Missing sample", { status: 400 });
    const chunks = [];
    let size = 0;
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > maxBytes) {
          await reader.cancel();
          return new Response("Sample too large", { status: 413 });
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    try {
      const raw = new TextDecoder("utf-8", { fatal: true }).decode(
        await new Blob(chunks).arrayBuffer(),
      );
      new Webhook(env.HOOKIE_SIGNING_SECRET).verify(raw, Object.fromEntries(request.headers));
    } catch {
      return new Response("Invalid signature", { status: 401 });
    }
    // No business side effects in this example. For side effects, atomically
    // deduplicate the signed webhook-id before applying them.
    return Response.json({ verified: true });
  },
};
