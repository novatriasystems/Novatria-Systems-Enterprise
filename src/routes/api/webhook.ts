import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { execFile } from "child_process";
import { promisify } from "util";
import { promises as fs } from "fs";
import path from "path";

const execFileAsync = promisify(execFile);

// Inicialización segura: fallback a placeholder para evitar crash en SSR
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || import.meta.env.STRIPE_SECRET_KEY || "sk_test_PLACEHOLDER",
  {
    apiVersion: "2024-06-20" as Stripe.LatestApiVersion,
  }
);

const OFFER_MAP: Record<string, string> = {
  "price_neuris": "NEURIS_1",
  "price_talos": "TALOS_2",
  "price_mithra": "MITHRA_3",
  "price_webdev": "WEBDEV_4",
};

const WEBHOOK_LOG_PATH = path.resolve(process.cwd(), "data/processed_webhooks.txt");
const MAX_PAYLOAD_BYTES = 1048576; // 1MB

async function isDuplicateEvent(eventId: string): Promise<boolean> {
  try {
    const data = await fs.readFile(WEBHOOK_LOG_PATH, "utf-8");
    return data.includes(eventId);
  } catch {
    return false;
  }
}

async function logEventId(eventId: string): Promise<void> {
  await fs.mkdir(path.dirname(WEBHOOK_LOG_PATH), { recursive: true });
  await fs.appendFile(WEBHOOK_LOG_PATH, `${eventId}\n`, "utf-8");
}

export const Route = createFileRoute("/api/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // 1a. VALIDACIÓN DE TAMAÑO (ANTI-DoS)
        const contentLength = parseInt(request.headers.get("content-length") || "0", 10);
        if (contentLength > MAX_PAYLOAD_BYTES) {
          return new Response("Payload Too Large", { status: 413 });
        }

        // 1. RAW BODY OBLIGATORIO
        const rawBody = await request.text();
        const signature = request.headers.get("stripe-signature");

        if (!signature) {
          return new Response("Missing stripe-signature header", { status: 400 });
        }

        // 2. VERIFICACIÓN DE FIRMA
        let event: Stripe.Event;
        try {
          event = stripe.webhooks.constructEvent(
            rawBody,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET || import.meta.env.STRIPE_WEBHOOK_SECRET || ""
          );
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Unknown error";
          console.error(`Webhook signature verification failed: ${errorMessage}`);
          return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
        }

        // 1b. CONTROL DE IDEMPOTENCIA PERSISTENTE (ANTI-REPLAY)
        if (await isDuplicateEvent(event.id)) {
          console.log(`Duplicate event ignored: ${event.id}`);
          return Response.json({ status: "DUPLICATE_IGNORED" });
        }

        // 3. PARSEO Y MAPEO DE EVENTO
        if (event.type === "checkout.session.completed") {
          const session = event.data.object as Stripe.Checkout.Session;
          const customerEmail = session.customer_details?.email || "unknown@novatria.systems";
          
          const offerKey = session.metadata?.offer_id || session.client_reference_id || "";
          const offerId = OFFER_MAP[offerKey] || offerKey;

          if (!offerId || !["NEURIS_1", "TALOS_2", "MITHRA_3", "WEBDEV_4"].includes(offerId)) {
            console.error(`Unknown or missing offer ID: ${offerId}`);
            return new Response("Invalid offer mapping", { status: 400 });
          }

          // 4. EJECUCIÓN SEGURA DE GENERATE_LICENSE.PY
          try {
            const scriptPath = "C:\\Novatria_Control_Center\\internal_tools\\generate_license.py";
            
            const { stdout, stderr } = await execFileAsync(
              "python",
              [scriptPath, "--customer", customerEmail, "--offer", offerId, "--ttl", "30"],
              { windowsHide: true }
            );

            if (stderr) {
              console.error(`Python script error: ${stderr}`);
              return new Response("Internal Server Error", { status: 500 });
            }

            console.log(`License generated successfully: ${stdout}`);
            await logEventId(event.id);
            return Response.json({ status: "LICENSE_GENERATED", output: stdout.trim() });
          } catch (error) {
            console.error(`Execution failed: ${error}`);
            return new Response("Internal Server Error", { status: 500 });
          }
        }

        await logEventId(event.id);
        return Response.json({ received: true });
      },
    },
  },
});