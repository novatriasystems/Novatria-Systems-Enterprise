import { createFileRoute } from "@tanstack/react-router";

export interface ContactPayload {
  fullName: string;
  workEmail: string;
  company: string;
  infrastructureType?: string;
  workload?: string;
  complianceNeeds?: string;
  score?: number;
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

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
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

        // Enclave Audit Log (In-memory / console audit trace sin filtrar PII a terceros)
        console.log(`[PERIMETER AUDIT REGISTERED]: Ref ${reference} | Entity: ${body.company} | Domain: ${body.workEmail.split("@")[1]} | Score: ${body.score ?? "N/A"}%`);

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
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "content-type",
          },
        }),
    },
  },
});
