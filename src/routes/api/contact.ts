import { createFileRoute } from "@tanstack/react-router";
import { insertLead } from "../../lib/lead-store";
import { createRateLimiter } from "../../lib/rate-limit";

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

export interface ContactPayload {
  fullName: string;
  workEmail: string;
  company: string;
  infrastructureType?: string;
  workload?: string;
  complianceNeeds?: string;
  score?: number;
  nichoInteres?: string;
}

function isValidContact(data: unknown): data is ContactPayload {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;
  if (typeof obj.fullName !== "string" || obj.fullName.trim().length < 2) return false;
  if (typeof obj.workEmail !== "string" || !obj.workEmail.includes("@") || !obj.workEmail.includes(".")) return false;
  if (typeof obj.company !== "string" || obj.company.trim().length < 2) return false;
  return true;
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
        // Rate limiting
        const clientIp = getClientIp(request);
        if (!contactRateLimiter.check(clientIp)) {
          return new Response("Rate limit exceeded. Espere 60 segundos.", {
            status: 429,
            headers: { "Content-Type": "text/plain" },
          });
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (!isValidContact(body)) {
          return new Response(
            JSON.stringify({ error: "Unprocessable payload: check required fields" }),
            { status: 422, headers: { "Content-Type": "application/json" } }
          );
        }

        const reference = generateAuditReference();
        const timestamp = new Date().toISOString();
        const emailDomain = extractEmailDomain(body.workEmail);

        // Enclave Audit Log (solo reference + score — PII minimizado según Ley 1581)
        console.log(`[PERIMETER AUDIT REGISTERED]: Ref ${reference} | Score: ${body.score ?? "N/A"}%`);

        // Persistencia en SQLite (lead-store)
        try {
          insertLead(
            reference,
            body.fullName,
            body.company,
            emailDomain,
            body.nichoInteres ?? null,
            body.score ?? null
          );
        } catch (err) {
          console.error(`Lead persistence failed: ${err}`);
          // No bloqueamos la respuesta por fallo de persistencia
        }

        return new Response(
          JSON.stringify({
            status: "REGISTERED",
            reference,
            timestamp,
            message: "Evaluación perimetral registrada en el enclave confidencial de Novatria.",
          }),
          {
            status: 201,
            headers: { "Content-Type": "application/json" },
          }
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
