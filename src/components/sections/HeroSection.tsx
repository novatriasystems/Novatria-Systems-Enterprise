import { ArrowRight, Wallet, Lock, Play } from "lucide-react";
import { Button } from "../ui/Button";

interface HeroSectionProps {
  onEvaluar: () => void;
}

export function HeroSection({ onEvaluar }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-zinc-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-blue-500/[0.07] to-transparent" />

      <div className="relative mx-auto flex max-w-7xl items-end gap-6 px-6 pt-16 pb-16 md:items-center md:min-h-[560px]">

        {/* TALOS — imagen completa de pies a cabeza, altura contenida, integrada al diseño */}
        <div className="hidden shrink-0 md:block md:w-[38%]">
          <img
            src="/talos-hero.png"
            alt=""
            aria-hidden="true"
            className="h-[480px] w-auto max-w-none object-contain object-bottom mix-blend-screen opacity-95 select-none"
          />
        </div>

        {/* CONTENIDO — coexiste a la derecha del personaje */}
        <div className="flex-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-zinc-900/60 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px] tracking-wide text-zinc-300">
              IA Local · Sus datos jamás salen de su empresa
            </span>
          </div>

          <h1 className="font-sans text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-zinc-50 lg:text-5xl">
            Inteligencia Artificial que
            <br />
            trabaja en su propio computador.
            <br />
            <span className="bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 bg-clip-text text-transparent">
              Sin fugas de datos. Sin facturas por consumo.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-400 lg:text-base">
            Instalamos un asistente inteligente que recupera los clientes que su negocio
            dejó de atender, operando 100% dentro de su empresa — y garantizando que su
            información jamás pase por servidores de terceros.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button onClick={onEvaluar} variant="primary" size="lg" className="rounded-full">
              Probar cómo funciona en mi negocio
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href="#prueba-viva"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-zinc-900/60 px-6 py-3 font-sans text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-800/60"
            >
              <Play className="h-4 w-4 text-emerald-500" />
              Ver demostración en vivo
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-white/[0.08] bg-zinc-900/50 p-4">
              <Wallet className="h-5 w-5 text-blue-400" />
              <h3 className="mt-2.5 font-sans text-sm font-bold text-zinc-100">Costo fijo y transparente</h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                Cero tarifas por consumo o mensajes enviados. Su inversión no cambia.
              </p>
            </div>
            <div className="rounded-lg border border-white/[0.08] bg-zinc-900/50 p-4">
              <Lock className="h-5 w-5 text-emerald-400" />
              <h3 className="mt-2.5 font-sans text-sm font-bold text-zinc-100">Privacidad absoluta</h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                El sistema, la inteligencia y sus bases de clientes corren localmente. Todo se queda en su firma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
