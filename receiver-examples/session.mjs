import { randomBytes } from "node:crypto";

// Each preview signs its fixed sample with a fresh, local-only key. Next's
// subprocesses inherit this value so its signing and receiver routes agree.
process.env.HOOKIE_RECEIVER_DEMO_SECRET ??= "whsec_" + randomBytes(32).toString("base64");
