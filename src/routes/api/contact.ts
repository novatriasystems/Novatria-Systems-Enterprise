import { createFileRoute } from "@tanstack/react-router";
import { insertLead } from "../../lib/lead-store";
import { createRateLimiter } from "../../lib/rate-limit";
import { contactSchema } from "../../lib/schemas/contact.schema";

const contactRateLimiter = createRateLimiter({
  windowMs: 60_000,
  max: 5,
});

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}

/**
 * SC-1: el score se recalcula SIEMPRE server-side desde las respuestas.
 * El score del cliente se ignora (suplantable). Misma formula que el modal
 * (documentado): base 50 + public_cloud 35 + compliance high 10.
 */
function computeRiskScore(input: {
  infrastructureType?: string;
  workload?: string;
  complianceNeeds?: string;
}): number {
  let score = 50;
  if (input.infrastructureType === "public_cloud") score += 35;
  if (input.complianceNeeds === "high") score += 10;
  return score;
}

function generateAuditReference(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `NVT-AUD-${hex.toUpperCase()}`;
}

function extractEmailDomain(email: string): string {
  const atIndex = email.lastIndexOf("@");
  return atIndex > 0 ? email.slice(atIndex + 1) : email;
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const clientIp = getClientIp(request);
        if (!contactRateLimiter.check(clientIp)) {
          return new Response("Rate limit exceeded. Espere 60 segundos.", {
            status: 429,
            headers: { "Content-Type": "text/plain" },
          });
        }

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        // CT-1: validacion Zod unica (type guards manuales eliminados)
        const parsed = contactSchema.safeParse(raw);
        if (!parsed.success) {
          return new Response(
            JSON.stringify({
              error: "Unprocessable payload",
              issues: parsed.error.issues.map((i) => ({
                path: i.path.join("."),
                message: i.message,
              })),
            }),
            { status: 422, headers: { "Content-Type": "application/json" } }
          );
        }
        const body = parsed.data;

        const reference = generateAuditReference();
        const timestamp = new Date().toISOString();
        const emailDomain = extractEmailDomain(body.workEmail);
        const score = computeRiskScore(body); // SC-1: server-side, no confiamos en cliente

        console.log(`[PERIMETER AUDIT REGISTERED]: Ref ${reference} | Score: ${score}%`);

        try {
          insertLead(
            reference,
            body.fullName,
            body.company,
            emailDomain,
            body.nichoInteres ?? null,
            score
          );
        } catch (err) {
          console.error(`Lead persistence failed: ${err}`);
        }

        return new Response(
          JSON.stringify({
            status: "REGISTERED",
            reference,
            timestamp,
            score,
            message: "Diagnóstico registrado. Un especialista de Novatria lo contactará.",
          }),
          { status: 201, headers: { "Content-Type": "application/json" } }
        );
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
