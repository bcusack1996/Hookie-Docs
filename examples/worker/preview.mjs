// Run this Web-standard Worker handler inside StackBlitz's Node runtime.
import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { fixture } from "./fixture.mjs";
import receiver from "./receiver.mjs";

const secret = "whsec_" + randomBytes(32).toString("base64");
const form = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Hookie Worker receiver</title>
<main><h1>Verify a webhook</h1><p>The preview signs a sample delivery with a key created for this session. Choose a signature to check.</p>
<form method="post" action="/sample"><button>Send valid sample</button></form>
<form method="post" action="/tampered"><button>Send modified sample</button></form></main></html>`;
createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }).end(form);
    return;
  }
  if (req.method !== "POST" || !["/sample", "/tampered"].includes(req.url)) {
    res.writeHead(404).end();
    return;
  }
  const result = await receiver.fetch(fixture(secret, req.url === "/sample"), {
    HOOKIE_SIGNING_SECRET: secret,
  });
  res
    .writeHead(result.status, { "Content-Type": result.headers.get("Content-Type") })
    .end(await result.text());
}).listen(Number(process.env.PORT || 3000), "0.0.0.0", () =>
  console.log("Open the preview to verify a sample delivery."),
);
