import { useState } from "react";
import { Terminal, ShieldCheck, Play, RotateCcw, Lock } from "lucide-react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

export function LocalFirstLab() {
  const defaultSample = `El Dr. Gómez atendió a Carlos Benítez, ID: 484729322, diagnóstico: en revisión médica.`;

  const [inputData, setInputData] = useState(defaultSample);
  const [sanitizedData, setSanitizedData] = useState("");
  const [hasRun, setHasRun] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  const runSanitization = () => {
    const start = performance.now();

    // Client-side regex PII & Clinical entity sanitization
    let scrubbed = inputData
      .replace(/Dr\.\s+[A-ZÁÉÍÓÚa-zñáéíóú]+/g, "[TKN_MEDICO_ANON]")
      .replace(/Dra\.\s+[A-ZÁÉÍÓÚa-zñáéíóú]+/g, "[TKN_MEDICO_ANON]")
      .replace(/Carlos\s+Benítez/gi, "[TKN_PACIENTE_01]")
      .replace(/ID:\s*\d+/gi, "ID: [TKN_IDENTIFICACION_MASKED]")
      .replace(/\b\d{7,10}\b/g, "[TKN_ID_HASH]")
      .replace(/diagnóstico:\s*[^,\n\.]+/gi, "diagnóstico: [TKN_ESTADO_CLINICO_REDACTED]")
      .replace(/sk-[a-zA-Z0-9_\-]{16,}/g, "[TKN_API_SECRET_REDACTED]");

    const end = performance.now();
    setLatency(Math.round((end - start) * 100) / 100);
    setSanitizedData(scrubbed);
    setHasRun(true);

    window.dispatchEvent(new CustomEvent("nvt:lab-op", { detail: { op: "sanitize" } }));
  };

  const handleReset = () => {
    setInputData(defaultSample);
    setSanitizedData("");
    setHasRun(false);
    setLatency(null);
  };

  return (
    <section id="laboratorio" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-mono text-emerald-300 mb-3">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>NOVATRIA LAB / PROBABILIDAD DE DATOS LOCALES...</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            No le crea a nuestra página. Créale a su navegador.
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-300">
            Sanitizador de texto local en RAM. Ingrese texto sensible para ver cómo es procesado y limpiado directamente desde su navegador, sin enviar absolutamente nada a internet.
          </p>
        </div>

        {/* Interactive Box */}
        <Card className="mt-12 border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-200">
              <Terminal className="h-4 w-4 text-cyan-400" />
              <span>Sanitizador de Texto Local en RAM (Zero-Egress)</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs">
              <span className="text-zinc-400">
                Peticiones de red: <strong className="text-emerald-400">0 (Sellado)</strong>
              </span>
              {latency !== null && (
                <span className="text-zinc-400">
                  Latencia: <strong className="text-cyan-400 tabular-nums">{latency} ms</strong>
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <div>
              <div className="mb-2 flex items-center justify-between font-mono text-xs text-zinc-400">
                <span>Texto de entrada (Pegue texto técnico aquí):</span>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Restaurar</span>
                </button>
              </div>
              <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                rows={6}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs sm:text-sm text-zinc-200 focus:border-cyan-500 focus:outline-none custom-scrollbar leading-relaxed"
                placeholder="Pegue texto técnico o datos de pacientes aquí..."
              />
            </div>

            {/* Output */}
            <div>
              <div className="mb-2 font-mono text-xs text-zinc-400">
                <span>Simulación de Salida:</span>
              </div>
              <div className="h-[148px] overflow-y-auto rounded-lg border border-emerald-500/20 bg-zinc-950/80 p-4 font-mono text-xs sm:text-sm text-emerald-300 custom-scrollbar leading-relaxed">
                {hasRun ? (
                  <pre className="whitespace-pre-wrap font-mono">{sanitizedData}</pre>
                ) : (
                  <span className="text-zinc-500 italic">
                    [Procesando entrada de texto... Presione el botón inferior para esterilizar en RAM]
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Procesado 100% en el motor V8 local de su equipo. Cero bytes salientes.</span>
            </div>
            <Button
              onClick={runSanitization}
              variant="primary"
              size="md"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-wider"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Procesar en navegador ahora</span>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
