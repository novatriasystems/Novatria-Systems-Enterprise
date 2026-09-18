import { ArrowRight, ShieldCheck, RefreshCw, KeyRound, CircleCheck } from "lucide-react";
import { Button } from "../ui/Button";

interface HeroSectionProps {
  onEvaluar: () => void;
}

export function HeroSection({ onEvaluar }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-zinc-950">
      {/* Haz cenital sutil */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-blue-500/[0.07] to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
        {/* Etiqueta */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-zinc-900/60 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[11px] tracking-wide text-zinc-300">
            Inteligencia Artificial Local · Sin fuga de datos ni costos SaaS
          </span>
        </div>

        {/* Titular */}
        <h1 className="font-sans text-5xl font-bold leading-[1.08] tracking-[-0.03em] text-zinc-50 sm:text-6xl">
          Inteligencia Artificial
          <br />
          Soberana.
          <br />
          <span className="bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-400 bg-clip-text text-transparent">
            Sus datos nunca salen de su empresa.
          </span>
        </h1>

        {/* Subtitulo */}
        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-400">
          Desplegamos sistemas de IA y agentes autónomos que se ejecutan directamente en su
          propia infraestructura. Sin cuotas por suscripción de terceros, sin riesgos de
          privacidad y con propiedad total de sus modelos y código.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={onEvaluar} variant="primary" size="lg" className="rounded-full">
            Agendar diagnóstico confidencial
            <ArrowRight className="h-4 w-4" />
          </Button>
          <a
            href="#talos"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-zinc-900/60 px-7 py-3.5 font-sans text-sm font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-800/60"
          >
            <CircleCheck className="h-4 w-4 text-emerald-500" />
            Ver cómo funciona Talos
          </a>
        </div>

        {/* 3 tarjetas de garantia */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 text-left md:grid-cols-3">
          <div className="rounded-lg border border-white/[0.08] bg-zinc-900/50 p-5">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <h3 className="mt-3 font-sans text-sm font-bold text-zinc-100">100% On-Premise</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              Cero telemetría externa. La inferencia y los expedientes residen en su hardware corporativo.
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.08] bg-zinc-900/50 p-5">
            <RefreshCw className="h-5 w-5 text-blue-400" />
            <h3 className="mt-3 font-sans text-sm font-bold text-zinc-100">Sin Costos por Token</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              Inversión fija predecible. Ejecute millones de consultas sin facturas sorpresa de nubes públicas.
            </p>
          </div>
          <div className="rounded-lg border border-white/[0.08] bg-zinc-900/50 p-5">
            <KeyRound className="h-5 w-5 text-emerald-400" />
            <h3 className="mt-3 font-sans text-sm font-bold text-zinc-100">Propiedad Total</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
              El código, pesos sinápticos y bases de conocimiento le pertenecen exclusivamente a su firma.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
