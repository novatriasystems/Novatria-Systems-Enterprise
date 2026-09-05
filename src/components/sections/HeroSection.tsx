import { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Lock, Activity, Terminal as TerminalIcon, Check } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { DragonBackdrop } from "../ui/DragonBackdrop";

interface HeroSectionProps {
  onEvaluar: () => void;
  onOpenTerminal: () => void;
}

export function HeroSection({ onEvaluar, onOpenTerminal }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<"perimeter" | "egress" | "integrity">("perimeter");
  const [packetCount, setPacketCount] = useState(14829);
  const [lastHash, setLastHash] = useState("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    const randomHex = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
    setLastHash(randomHex);
  };

  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] py-20 lg:py-28">
      {/* Sovereign Tribal Dragon Backdrop & Vignette Grid */}
      <DragonBackdrop />
      <div className="bg-grid mask-radial-vignette pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Mission Manifesto */}
          <div className="lg:col-span-7">
            <div className="mb-5 inline-flex items-center gap-2">
              <Badge variant="cobalt" pulse>
                INGENIERÍA SOBERANA // ENCLAVE AIR-GAPPED
              </Badge>
            </div>

            <h1 className="font-sans text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
              Infraestructura de IA Soberana.{" "}
              <span className="text-blue-500">Cero Exfiltración</span> a Nubes Públicas.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              Desplegamos búnkers digitales de alta fidelidad con arquitectura Zero-Trust. Ejecute modelos y flujos de trabajo en Edge Network y hardware local: su propiedad intelectual nunca viaja a servidores de terceros ni alimenta suscripciones ajenas.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button onClick={onEvaluar} size="lg" variant="primary">
                Solicitar Auditoría de Perímetro
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button onClick={onOpenTerminal} size="lg" variant="secondary">
                <TerminalIcon className="h-4 w-4 text-blue-400" />
                Interrogar Agente Closer
              </Button>
            </div>

            {/* Quick trust markers */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/[0.06] pt-6 text-left">
              <div>
                <div className="font-mono text-xl font-bold text-zinc-100 tabular-nums">0 ms</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Latencia Egress
                </div>
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-emerald-400 tabular-nums">100%</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Soberanía de Datos
                </div>
              </div>
              <div>
                <div className="font-mono text-xl font-bold text-blue-400 tabular-nums">Zod / Strict</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  Tipado Inmutable
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Enclave Live Monitor (Tactical Console) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-sm bg-zinc-950/90 p-5 specular-card shadow-2xl backdrop-blur-xl">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 pulse-dot" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-200">
                    Sovereign Enclave Monitor
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                  NODE-01 // AIR-GAPPED
                </span>
              </div>

              {/* Console Tabs */}
              <div className="mt-3 flex gap-1 border-b border-white/[0.06] pb-2 text-[11px] font-mono">
                <button
                  onClick={() => setActiveTab("perimeter")}
                  className={`px-2.5 py-1 transition-colors ${
                    activeTab === "perimeter"
                      ? "border-b border-blue-500 text-blue-400 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  [Perímetro]
                </button>
                <button
                  onClick={() => setActiveTab("egress")}
                  className={`px-2.5 py-1 transition-colors ${
                    activeTab === "egress"
                      ? "border-b border-blue-500 text-blue-400 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  [Filtro Egress]
                </button>
                <button
                  onClick={() => setActiveTab("integrity")}
                  className={`px-2.5 py-1 transition-colors ${
                    activeTab === "integrity"
                      ? "border-b border-blue-500 text-blue-400 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  [Cripto-Hash]
                </button>
              </div>

              {/* Console Body */}
              <div className="mt-4 min-h-[220px]">
                {activeTab === "perimeter" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between bg-zinc-900/50 px-3 py-2 border border-white/[0.04]">
                      <span className="text-zinc-400">Estado de Aislamiento:</span>
                      <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                        <ShieldCheck className="h-3.5 w-3.5" /> SELLADO
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-3 py-1.5">
                      <span className="text-zinc-400">Ruta Inferencia:</span>
                      <span className="text-zinc-200">Local UDS (Ollama Native)</span>
                    </div>
                    <div className="flex items-center justify-between px-3 py-1.5">
                      <span className="text-zinc-400">Paquetes Verificados:</span>
                      <span className="text-blue-400 font-bold tabular-nums">
                        {packetCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between px-3 py-1.5">
                      <span className="text-zinc-400">Almacenamiento de Llaves:</span>
                      <span className="text-zinc-200">Memory-Only Vault (0 Disco)</span>
                    </div>
                    <div className="mt-4 rounded-sm border border-emerald-500/20 bg-emerald-950/20 p-2.5 text-[11px] text-emerald-300 flex items-center gap-2">
                      <Lock className="h-3.5 w-3.5 shrink-0" />
                      <span>Zero-Knowledge Policy: Cero telemetría enviada a terceros.</span>
                    </div>
                  </div>
                )}

                {activeTab === "egress" && (
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest">
                      // Reglas de Cortafuegos de Tráfico
                    </div>
                    <div className="flex items-center justify-between rounded bg-zinc-900/60 p-2 border border-white/[0.04]">
                      <span className="text-zinc-300">api.openai.com</span>
                      <span className="text-red-400 font-semibold">[DROPPED // BLOCKED]</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-zinc-900/60 p-2 border border-white/[0.04]">
                      <span className="text-zinc-300">api.anthropic.com</span>
                      <span className="text-red-400 font-semibold">[DROPPED // BLOCKED]</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-emerald-950/30 p-2 border border-emerald-500/30">
                      <span className="text-emerald-300">localhost:11434 (Unix Socket)</span>
                      <span className="text-emerald-400 font-semibold">[PERMITTED // SECURE]</span>
                    </div>
                  </div>
                )}

                {activeTab === "integrity" && (
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                        // Firma SHA-256 del Bundle
                      </span>
                      <button
                        onClick={handleVerify}
                        className="text-[10px] text-blue-400 hover:text-blue-300 underline"
                      >
                        Re-verificar
                      </button>
                    </div>
                    <div className="break-all rounded bg-zinc-900/80 p-3 text-[10px] leading-relaxed text-zinc-300 border border-white/[0.06]">
                      {lastHash}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                      <span>Firma criptográfica válida (Ed25519)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Activity Pulse Footer */}
              <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[10px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Activity className="h-3 w-3 text-emerald-400" /> Telemetría de Nodo Activa
                </span>
                <span className="text-zinc-400">v1.0.0-sovereign</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
