import { ArrowRight, Wallet, Lock, Play } from "lucide-react";
import { Button } from "../ui/Button";

interface HeroSectionProps {
  onEvaluar: () => void;
}

export function HeroSection({ onEvaluar }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-zinc-950">
      {/* IMAGEN TALOS — mitad izquierda, altura completa del hero */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 md:block hidden">
        <img
          src="/talos-hero.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-left mix-blend-screen opacity-90 select-none [mask-image:linear-gradient(to_right,black_55%,transparent_100%)]"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-blue-500/[0.07] to-transparent" />

      {/* CONTENIDO — columna derecha, altura compacta */}
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid min-h-[85vh] grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Columna izquierda vacia en desktop (reservada a la imagen) */}
          <div className="hidden md:block" aria-hidden="true" />

          {/* Columna derecha: todo el contenido */}
          <div className="py-16">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-zinc-900/60 px-4 py-1.5">
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

            <p className="mt-6 text-sm leading-relaxed text-zinc-400 lg:text-base">
              Instalamos un asistente inteligente que recupera los clientes que su negocio
              dejó de atender, operando 100% dentro de su empresa — y garantizando que su
              información jamás pase por servidores de terceros.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
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

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      </div>
    </section>
  );
}
