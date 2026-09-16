import { createFileRoute } from "@tanstack/react-router";
import { createRateLimiter } from "../../lib/rate-limit";

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

type CardPayload = {
  method: "card";
  brand_hint: string;
  last4: string;
  exp: string;
  holder_len: number;
};

type PsePayload = {
  method: "pse";
  person_type: "natural" | "juridica";
  bank: string;
  doc_type: "CC" | "CE" | "NIT" | "PP";
  doc_last: string;
  email_domain: string;
};

type Payload = CardPayload | PsePayload;

function isPayload(x: unknown): x is Payload {
  if (!x || typeof x !== "object") return false;
  const m = (x as { method?: unknown }).method;
  return m === "card" || m === "pse";
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
        // Rate limiting
        const clientIp = getClientIp(request);
        if (!paymentRateLimiter.check(clientIp)) {
          return new Response("Rate limit exceeded. Espere 60 segundos.", {
            status: 429,
            headers: { "Content-Type": "text/plain" },
          });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response("Bad JSON", { status: 400 });
        }
        if (!isPayload(body)) {
          return new Response("Invalid payload", { status: 422 });
        }
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
