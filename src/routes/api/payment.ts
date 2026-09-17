import { createFileRoute } from "@tanstack/react-router";
import { createRateLimiter } from "../../lib/rate-limit";
import { paymentSchema } from "../../lib/schemas/payment.schema";

const paymentRateLimiter = createRateLimiter({
  windowMs: 60_000,
  max: 10,
});

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

function reference(): string {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `NVT-${hex.toUpperCase()}`;
}

export const Route = createFileRoute("/api/payment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const clientIp = getClientIp(request);
        if (!paymentRateLimiter.check(clientIp)) {
          return new Response("Rate limit exceeded. Espere 60 segundos.", {
            status: 429,
            headers: { "Content-Type": "text/plain" },
          });
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return new Response("Bad JSON", { status: 400 });
        }

        // CT-1: discriminantedUnion valida AMBAS ramas (card|pse) campo a campo
        const parsed = paymentSchema.safeParse(raw);
        if (!parsed.success) {
          return new Response(
            JSON.stringify({
              error: "Invalid payload",
              issues: parsed.error.issues.map((i) => ({
                path: i.path.join("."),
                message: i.message,
              })),
            }),
            { status: 422, headers: { "Content-Type": "application/json" } }
          );
        }
        const body = parsed.data;

        // Perimeter stub: no persistence, no external SaaS call.
        return Response.json({
          status: "ACCEPTED",
          reference: reference(),
          method: body.method,
          received_at: new Date().toISOString(),
        });
      },
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "content-type",
          },
        }),
    },
  },
});
