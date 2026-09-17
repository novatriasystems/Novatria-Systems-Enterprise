import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { z } from "zod";
import { createRateLimiter } from "../../lib/rate-limit";

const checkoutRateLimiter = createRateLimiter({
  windowMs: 60_000,
  max: 10,
});

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || import.meta.env.STRIPE_SECRET_KEY || "",
  { apiVersion: "2024-06-20" as Stripe.LatestApiVersion }
);

/**
 * E-3 (adenda SDD): oferta -> price_id por env STRIPE_PRICE_MAP_JSON
 * (JSON serializado: {"NEURIS_1":"price_...","TALOS_2":"price_...",...})
 */
function priceMap(): Record<string, string> {
  const raw = process.env.STRIPE_PRICE_MAP_JSON || import.meta.env.STRIPE_PRICE_MAP_JSON || "{}";
  try { return JSON.parse(raw); } catch { return {}; }
}

const checkoutSchema = z.object({
  offer: z.enum(["NEURIS_1", "TALOS_2", "MITHRA_3", "WEBDEV_4"]),
});

export const Route = createFileRoute("/api/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
        if (!checkoutRateLimiter.check(ip)) {
          return new Response("Rate limit exceeded", { status: 429 });
        }

        let raw: unknown;
        try { raw = await request.json(); } catch { return new Response("Bad JSON", { status: 400 }); }
        const parsed = checkoutSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json({ error: "Invalid offer" }, { status: 422 });
        }

        const priceId = priceMap()[parsed.data.offer];
        if (!priceId) {
          console.error(`STRIPE_PRICE_MAP_JSON sin entrada para ${parsed.data.offer}`);
          return Response.json({ error: "Oferta no disponible" }, { status: 503 });
        }

        try {
          const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            line_items: [{ price: priceId, quantity: 1 }],
            metadata: { offer_id: parsed.data.offer },
            // El webhook exige customer email (W-4): Stripe lo colecta en checkout
          });
          return Response.json({ url: session.url });
        } catch (err) {
          console.error(`Stripe checkout failed: ${err}`);
          return Response.json({ error: "Checkout no disponible" }, { status: 502 });
        }
      },
    },
  },
});
