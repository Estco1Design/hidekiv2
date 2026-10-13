import { mailConfigured } from "@/lib/mail";
export function GET() {
  return Response.json(
    { emailDelivery: mailConfigured },
    { headers: { "Cache-Control": "no-store" } },
  );
}
