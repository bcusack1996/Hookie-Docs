import { signedSample } from "../../../../sample.mjs";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await signedSample(), { headers: { "Cache-Control": "no-store" } });
}
