import { previewPage } from "../../sample.mjs";

export function GET() {
  return new Response(previewPage, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
