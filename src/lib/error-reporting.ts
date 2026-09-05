export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[Error Report]", { error, context, timestamp: new Date().toISOString() });
  // Future: send to your own telemetry endpoint
}