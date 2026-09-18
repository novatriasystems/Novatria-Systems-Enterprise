import { Stethoscope, Dumbbell, PawPrint, AlertCircle } from "lucide-react";

export function MirrorSection() {
  const verticals = [
    {
      id: "odonto",
      icon: Stethoscope,
      category: "ODONTOLOGÍA",
      subtitle: "El control que nunca se agendó.",
      story:
        "La paciente terminó su tratamiento en marzo. Feliz, agradecida. 'Su control en 6 meses', le dijeron. Y no volvió. No porque no quisiera — porque la vida la distrajo y nadie la recordó.",
      statusText: "Verificar período de inactividad: 120 – 300 DÍAS",
      statusColor: "text-amber-400 border-amber-500/30 bg-amber-950/30",
    },
    {
      id: "gym",
      icon: Dumbbell,
      category: "GIMNASIO",
      subtitle: "La asistencia que se apagó en silencio.",
      story:
        "El socio fue 12 veces en enero. En febrero, 4. En marzo, cero. Nadie le escribió. Nadie lo extrañó.",
      statusText: "Inactividad recurrente detectada",
      statusColor: "text-rose-400 border-rose-500/30 bg-rose-950/30",
    },
    {
      id: "vet",
      icon: PawPrint,
      category: "VETERINARIA",
      subtitle: "La vacuna que se le puso en un rival.",
      story:
        "El perro que atienden desde cachorro debía su vacuna anual. El recordatorio se quedó en una libreta. La vacuna se la pusieron en otra veterinaria.",
      statusText: "Dejar la paciente ir por olvido",
      statusColor: "text-blue-400 border-blue-500/30 bg-blue-950/30",
    },
  ];

  return (
    <section id="espejo" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Floating status tag */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-950/40 px-3.5 py-1 text-[11px] font-mono text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Negocios de servicio recurrente
          </div>
        </div>

        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">
            ESTO PASA TODOS LOS DÍAS EN SU NEGOCIO...
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Sus clientes no lo dejaron a usted.{" "}
            <span className="bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-400 bg-clip-text text-transparent">
              Les ganó el olvido.
            </span>
          </h2>
        </div>

        {/* Vertical Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {verticals.map((vert) => {
            const Icon = vert.icon;
            return (
              <div
                key={vert.id}
                className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-800 text-zinc-300">
                        <Icon className="h-4 w-4 text-cyan-400" />
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                        {vert.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 font-sans text-base sm:text-lg font-semibold text-zinc-100">
                    {vert.subtitle}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-400 italic">
                    "{vert.story}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <div
                    className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 font-mono text-[11px] ${vert.statusColor}`}
                  >
                    <AlertCircle className="h-3 w-3 shrink-0" />
                    <span>{vert.statusText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing punchline */}
        <div className="mt-12 rounded-xl border border-blue-500/20 bg-blue-950/20 p-6 sm:p-8 text-center backdrop-blur-sm">
          <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-200">
            No es culpa suya. Perseguir clientes no es su trabajo.{" "}
            <strong className="text-cyan-300 font-bold">Es el nuestro.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
