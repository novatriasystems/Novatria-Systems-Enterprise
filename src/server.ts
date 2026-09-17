import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import crypto from "crypto";

const CSP_DIRECTIVES_BASE = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://api.stripe.com https://m.stripe.com",
  "frame-src 'self' https://js.stripe.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "media-src 'self'",
  "form-action 'self' https://api.stripe.com",
  "navigate-to 'self'",
  "base-uri 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "plugin-types application/pdf",
].join("; ");

function generateNonce(): string {
  return crypto.randomBytes(16).toString("base64");
}

async function applySecurityHeaders(response: Response): Promise<Response> {
  const nonce = generateNonce();

  const cspWithNonce = `${CSP_DIRECTIVES_BASE}; script-src 'self' https://js.stripe.com 'nonce-${nonce}'; require-trusted-types-for 'script'`;

  const newResponse = new Response(response.body, response);

  newResponse.headers.set("Content-Security-Policy", cspWithNonce);

  if (!newResponse.headers.has("X-Content-Type-Options")) {
    newResponse.headers.set("X-Content-Type-Options", "nosniff");
  }
  if (!newResponse.headers.has("X-Frame-Options")) {
    newResponse.headers.set("X-Frame-Options", "DENY");
  }
  if (!newResponse.headers.has("Referrer-Policy")) {
    newResponse.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  }
  if (!newResponse.headers.has("Permissions-Policy")) {
    newResponse.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=(), payment=(self https://js.stripe.com), fullscreen=(self)");
  }
  if (!newResponse.headers.has("Cross-Origin-Opener-Policy")) {
    newResponse.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  }
  if (!newResponse.headers.has("Cross-Origin-Resource-Policy")) {
    newResponse.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  }
  if (!newResponse.headers.has("Strict-Transport-Security")) {
    newResponse.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }

  // Si es HTML, inyectar el nonce en los scripts para permitir hidratación
  const contentType = newResponse.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    const html = await newResponse.text();
    // NI-1: Inyector de nonce por callback posicional inmune a multilínea
    // Si los atributos del tag script ya contienen nonce, dejar intacto; si no, inyectar el atributo con el nonce del request
    const patchedHtml = html.replace(/<script([^>]*)>/g, (match, attrs) => {
      // Si ya tiene nonce, no tocar
      if (/\bnonce\s*=/.test(attrs)) {
        return match;
      }
      // Inyectar nonce al principio de los atributos
      return `<script nonce="${nonce}"${attrs}>`;
    });
    return new Response(patchedHtml, {
      status: newResponse.status,
      statusText: newResponse.statusText,
      headers: newResponse.headers,
    });
  }

  return newResponse;
}

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return await applySecurityHeaders(normalized);
    } catch (error) {
      console.error(error);
      return await applySecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        })
      );
    }
  },
};