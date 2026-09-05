import { AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

interface RiskTelemetryProps {
  onEvaluar: () => void;
}

export function RiskTelemetry({ onEvaluar }: RiskTelemetryProps) {
  return (
    <section id="riesgo" className="border-b border-white/[0.08] bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <Badge variant="amber" className="mb-4">
            // TELEMETRÍA DE AMENAZAS & RIESGO OPERATIVO
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
            El Costo Silencioso de las APIs de Nube Pública.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Cada vez que sus desarrolladores envían prompts a proveedores de IA centralizados, se exfiltra propiedad intelectual, secretos comerciales y PII de clientes. Cuantificamos el riesgo financiero y operativo frente al modelo de Enclave Soberano.
          </p>
        </div>

        {/* Matrix Comparison */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          
          {/* Public Cloud Risk Vector */}
          <Card className="border-red-900/30 bg-red-950/10 hover:border-red-800/40">
            <div className="flex items-center justify-between border-b border-red-900/30 pb-4">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h3 className="font-sans text-lg font-bold text-zinc-100">
                  Arquitectura SaaS Centralizada
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-red-400">
                Alta Exposición
              </span>
            </div>

            <div className="mt-6 space-y-4 font-mono text-xs">
              <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
                <span className="text-zinc-400">Fuga de Propiedad Intelectual:</span>
                <span className="text-right text-red-400 font-semibold">
                  Logs de entrenamiento ajenos
                </span>
              </div>
              <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
                <span className="text-zinc-400">Riesgo Regulatorio (Sanciones):</span>
                <span className="text-right text-red-400 font-semibold">
                  Hasta el 4% de ingresos globales
                </span>
              </div>
              <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
                <span className="text-zinc-400">Dependencia de Facturación:</span>
                <span className="text-right text-red-400 font-semibold">
                  Suscripciones perpetuas indexadas al dólar
                </span>
              </div>
              <div className="flex items-start justify-between pb-1">
                <span className="text-zinc-400">Disponibilidad & Latencia:</span>
                <span className="text-right text-red-400 font-semibold">
                  Sujeto a outages del proveedor (200-800ms)
                </span>
              </div>
            </div>

            <div className="mt-6 rounded border border-red-900/40 bg-red-950/20 p-3 text-xs text-red-300">
              Advertencia: Compartir código fuente o datos de clientes con endpoints de OpenAI/Anthropic sin contratos enterprise viola los acuerdos de confidencialidad y normativas locales de protección de datos.
            </div>
          </Card>

          {/* Novatria Sovereign Enclave */}
          <Card className="border-emerald-900/30 bg-emerald-950/10 hover:border-emerald-800/40">
            <div className="flex items-center justify-between border-b border-emerald-900/30 pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                <h3 className="font-sans text-lg font-bold text-zinc-100">
                  Enclave Novatria (Local First)
                </h3>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
                Inmunidad Operativa
              </span>
            </div>

            <div className="mt-6 space-y-4 font-mono text-xs">
              <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
                <span className="text-zinc-400">Tráfico Saliente (Egress):</span>
                <span className="text-right text-emerald-400 font-semibold">
                  0 Bytes a servidores externos
                </span>
              </div>
              <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
                <span className="text-zinc-400">Blindaje de Propiedad Intelectual:</span>
                <span className="text-right text-emerald-400 font-semibold">
                  100% Cifrado en RAM (Memory-Only Vault)
                </span>
              </div>
              <div className="flex items-start justify-between border-b border-white/[0.04] pb-3">
                <span className="text-zinc-400">Propiedad del Activo:</span>
                <span className="text-right text-emerald-400 font-semibold">
                  Activo capitalizable (Cero Vendor Lock-in)
                </span>
              </div>
              <div className="flex items-start justify-between pb-1">
                <span className="text-zinc-400">Latencia de Ejecución:</span>
                <span className="text-right text-emerald-400 font-semibold">
                  Ultra-baja (&lt; 15ms en Edge / UDS local)
                </span>
              </div>
            </div>

            <div className="mt-6 rounded border border-emerald-900/40 bg-emerald-950/20 p-3 text-xs text-emerald-300">
              Garantía Soberana: El código fuente y los modelos residen físicamente en los servidores de su compañía bajo su jurisdicción física y legal.
            </div>
          </Card>

        </div>

        {/* Action Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-sm border border-white/[0.08] bg-zinc-900/40 p-6 sm:flex-row">
          <div>
            <div className="font-sans text-sm font-bold text-zinc-100">
              ¿Desea medir la tasa de exfiltración de su empresa?
            </div>
            <div className="font-mono text-xs text-zinc-400">
              Ejecutamos un análisis forense de tráfico de red y contratos de proveedores sin interrumpir operaciones.
            </div>
          </div>
          <Button onClick={onEvaluar} variant="primary" size="md">
            Calcular Exposición
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

      </div>
    </section>
  );
}
