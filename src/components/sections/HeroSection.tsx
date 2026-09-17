import { useRef } from "react";
import { ArrowRight, ShieldCheck, Cpu, Zap } from "lucide-react";

interface HeroSectionProps {
  onEvaluar: () => void;
  onOpenTerminal?: () => void;
}

export function HeroSection({ onEvaluar }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      onEvaluar();
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-b border-white/[0.08] bg-zinc-950 pt-16 pb-20 md:pt-24 md:pb-28"
    >
      {/* Background ambient radial gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-gradient-to-b from-blue-600/15 via-cyan-500/10 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {/* Top Tagline */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              TALOS FUNCIONA MIENTRAS USTED ATIENDE. O MIENTRAS DUERME.
            </span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-6xl md:text-7xl leading-[1.08]">
            ¿Cuántos clientes dejaron de venir{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              este mes?
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-zinc-300 max-w-3xl mx-auto">
            No lo notó, porque los clientes no se van:{" "}
            <strong className="text-white font-semibold">dejan de venir</strong>. Talos los detecta, les
            escribe por WhatsApp con el tono de su negocio, y los mete de nuevo en su agenda.{" "}
            <span className="text-cyan-300 font-medium">Usted no mueve un dedo.</span>
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection("diagnostico")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-500 hover:shadow-blue-500/35 active:scale-[0.98]"
            >
              <span>Tengo un negocio: ¿cuánto estoy perdiendo?</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollToSection("empresas")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/80 px-6 py-3.5 text-sm font-medium text-zinc-200 backdrop-blur-sm transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:text-white active:scale-[0.98]"
            >
              <span>Soy proveedor de tecnología</span>
              <span className="text-zinc-500">→</span>
            </button>
          </div>
        </div>

        {/* 3 Value Proposition Cards */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="group relative rounded-xl border border-emerald-500/20 bg-zinc-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-zinc-900/80">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                1. SUS DATOS VIVEN EN SU SERVIDOR
              </span>
            </div>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
              Sus datos viven en <strong className="text-white">SU servidor</strong> — jamás en nubes ajenas.
              Sin fugas ni envío de expedientes o datos de sus clientes.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-xl border border-blue-500/20 bg-zinc-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:bg-zinc-900/80">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-400">
                <Cpu className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
                2. EL COSTO EMPRESARIAL
              </span>
            </div>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
              Costo fijo mensual. Sin consumo por uso. Inversión fija controlada. Elimine millones de consultas
              por token de nubes públicas.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-xl border border-cyan-500/20 bg-zinc-900/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/40 hover:bg-zinc-900/80">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                <Zap className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-400">
                3. ACTIVIDAD CONTINUA
              </span>
            </div>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-300">
              Trabajando 24/7, incluso hoy domingo. El motor de Inteligencia Artificial ejecuta la reactivación
              constante sin descansos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
