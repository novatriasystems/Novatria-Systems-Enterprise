import { UserCheck, MessageSquare, CalendarCheck, ShieldAlert, Sparkles, ArrowRight, Clock, TrendingUp } from "lucide-react";

export function SolutionTalos() {
  const features = [
    {
      icon: UserCheck,
      title: "Detecta quién se enfrió",
      desc: "Cruza su lista de clientes y encuentra quién dejó de venir — desde hace 14 días hasta 300, según su tipo de negocio.",
      tag: "Segmentación Automática",
    },
    {
      icon: MessageSquare,
      title: "Les escribe como usted escribiría",
      desc: "Mensajes personalizados con su nombre, su negocio y su tono. Nada de robots ni spam. Todo de forma transparente.",
      tag: "Tono Humano Natural",
    },
    {
      icon: CalendarCheck,
      title: "Responde y agenda",
      desc: "Si el cliente contesta afirmativamente, Talos confirma y gestiona la reserva en su agenda habitual al instante.",
      tag: "Agenda Directa",
    },
    {
      icon: ShieldAlert,
      title: "Insiste con elegancia",
      desc: "Si no responden, realiza un segundo recordatorio elegante días después. Y hasta ahí — sin acoso ni spam innecesario.",
      tag: "Filtro Anti-Spam",
    },
  ];

  return (
    <section id="talos" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-950/40 px-3.5 py-1 text-xs font-mono text-blue-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>RECUPERACIÓN DE CLIENTES · AUTOMÁTICA · TODOS LOS DÍAS</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Talos: el encargado de hacer volver a sus clientes —{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              que usted nunca tuvo que contratar.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-300">
            Un asistente inteligente que trabaja desde <strong className="text-white">SU propio computador</strong>.
            Detecta quién dejó de venir, escribe por WhatsApp con el tono de su negocio, agenda por usted, y lo hace todos los días.
          </p>
        </div>

        {/* 2-Column Grid: Feature Blocks + Side Telemetry Panel */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 4 Features + Callout (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/80"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-[10px] uppercase text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded">
                        {f.tag}
                      </span>
                    </div>
                    <h3 className="mt-4 font-sans text-base font-semibold text-zinc-100">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Daily callout notification */}
            <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-zinc-950 p-5 sm:p-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Clock className="h-4 w-4 animate-spin" style={{ animationDuration: "12s" }} />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                    "Y mañana vuelve a empezar"
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    La lista de inactivos se refresca sola todas las mañanas. El ciclo de reactivación trabaja para usted sin entrenamiento ni asistencia humana.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Metrics Simulation Panel (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-7 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-200">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span>Análisis de Pérdida por Inactividad</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                Simulador Vivo
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-4">
                <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
                  Base Analizada
                </span>
                <p className="mt-1 text-xs text-zinc-300">
                  Su base de clientes de clínicas posee datos sin interacción desde hace varios meses.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-3.5">
                  <span className="text-[10px] text-zinc-400 block uppercase">Inactividad promedio</span>
                  <span className="text-xl font-bold text-white mt-1 block">91 días</span>
                </div>
                <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/60 p-3.5">
                  <span className="text-[10px] text-zinc-400 block uppercase">Límite reactivación</span>
                  <span className="text-xs font-semibold text-cyan-300 mt-2 block">Por tipo de negocio</span>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-emerald-300 font-semibold uppercase tracking-wider">
                    Retención recuperada
                  </span>
                  <span className="font-mono text-lg font-extrabold text-emerald-400">
                    </span>
                </div>
                <p className="mt-1.5 text-[11px] text-emerald-200/80">
                  Impacto directo en facturación recurrente sin inversión publicitaria adicional.
                </p>
              </div>

              <a
                href="#prueba-viva"
                className="group flex items-center justify-between w-full rounded-lg border border-blue-500/40 bg-blue-600/10 hover:bg-blue-600/20 p-3.5 text-xs font-mono font-medium text-blue-300 transition-all"
              >
                <span>Transfiera este mensaje a su cliente en este instante</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
