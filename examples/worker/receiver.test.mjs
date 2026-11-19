import { test } from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import receiver from "./receiver.mjs";
import { fixture } from "./fixture.mjs";

test("verifies a signed delivery and refuses the same signature on a changed body", async () => {
  const secret = "whsec_" + randomBytes(32).toString("base64"),
    env = { HOOKIE_SIGNING_SECRET: secret };
  assert.deepEqual(await (await receiver.fetch(fixture(secret), env)).json(), { verified: true });
  assert.equal((await receiver.fetch(fixture(secret, false), env)).status, 401);
});

test("caps streamed samples before verification", async () => {
  const request = new Request("https://example.invalid/webhook", {
    method: "POST",
    body: "x".repeat(65537),
  });
  const response = await receiver.fetch(request, { HOOKIE_SIGNING_SECRET: "test" });
  assert.equal(response.status, 413);
});
