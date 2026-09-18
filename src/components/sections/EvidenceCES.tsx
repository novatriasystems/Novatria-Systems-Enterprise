import { FileText, ArrowRight, Building2, TrendingDown } from "lucide-react";

export function EvidenceCES() {
  return (
    <section id="evidencia" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Narrative (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 px-3.5 py-1 text-xs font-mono text-rose-300 mb-4">
              <FileText className="h-3.5 w-3.5 text-rose-400" />
              <span>EL COSTO DEL OLVIDO, MEDIDO POR OTROS...</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              A una clínica de Medellín el olvido le costaba{" "}
              <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-rose-300 bg-clip-text text-transparent">
                $14,9 millones
              </span>{" "}
              de pesos al mes.
            </h2>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-zinc-300">
              El estudio de la <strong className="text-white font-semibold">Universidad CES</strong> midió las
              inasistencias odontológicas de una clínica real:{" "}
              <strong className="text-rose-300 font-semibold tabular-critical">$14.955.492 COP perdidos cada mes</strong>, y la
              causa número uno no fue el dinero ni el miedo — fue{" "}
              <span className="text-amber-300 font-semibold underline decoration-amber-400/40 underline-offset-4">
                el olvido (28%)
              </span>
              . Exactamente la causa que Talos ataca: el 90% de sus mensajes buscan a ese cliente olvidado.
            </p>

            <div className="mt-8 flex items-center gap-3 text-xs font-mono text-zinc-300">
              <Building2 className="h-4 w-4 text-cyan-400" />
              <span>Fuente: Universidad CES, Medellín — Estudio de inasistencias odontológicas.</span>
            </div>

            <div className="mt-8">
              <a
                href="#diagnostico"
                className="inline-flex items-center gap-2 rounded-md bg-rose-600 hover:bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition-all active:scale-[0.98]"
              >
                <span>Calcule lo que el olvido le cuesta a usted — gratis</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Prominent Metrics Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-rose-500/30 bg-gradient-to-b from-rose-950/30 via-zinc-900/80 to-zinc-950 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2 font-mono text-xs text-rose-300">
                  <TrendingDown className="h-4 w-4 text-rose-400" />
                  <span className="uppercase font-bold tracking-wider">Evidencia Clínica Real</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded">
                  CES Medellín
                </span>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 block">
                    PÉRDIDA MENSUAL MEDIDA
                  </span>
                  <div className="mt-1 font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    $14.955.492 COP
                  </div>
                  <span className="text-xs text-zinc-300 font-mono">/ MES ESTIMADO / REF.</span>
                </div>

                <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-400 block font-semibold">
                    CAUSA N°1: EL OLVIDO
                  </span>
                  <div className="mt-1 font-mono text-3xl sm:text-4xl font-black text-amber-300">
                    28%
                  </div>
                  <span className="text-xs text-amber-200/80">del total de inasistencias registradas.</span>
                </div>

                <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-300 block">
                    EFECTO DIRECTO SOBRE ESE MARGEN
                  </span>
                  <div className="mt-1 font-mono text-xs font-semibold text-emerald-400">
                    DATO MEDIDO EN ESTUDIO CES MEDELLÍN
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-300">
                    Recuperable casi en su totalidad mediante recordatorios automatizados oportunos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
