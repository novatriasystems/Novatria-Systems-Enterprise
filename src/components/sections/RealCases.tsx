import { CheckCircle2, Activity } from "lucide-react";

export function RealCases() {
  const cases = [
    {
      title: "Clínica Dental",
      badge: "Ciclo: 180 DÍAS",
      desc: "El ciclo de control dental es de 180 días. Talos detecta a los pacientes que cruzan ese umbral y les escribe con el tono de la clínica. La agenda del control deja de depender de la memoria de nadie.",
      metric: "✓ Controles re-agendados sin intervención humana",
      color: "border-blue-500/30 text-blue-400",
    },
    {
      title: "Proveedor con 20 Clínicas",
      badge: "MULTI-TENANT ON-PREM",
      desc: "Un servidor propio, veinte negocios administrados. Cada clínica con su tono y sus mensajes; el proveedor con un solo panel y cero suscripciones a terceros creciendo cada mes.",
      metric: "✓ Cero suscripciones crecientes por cliente",
      color: "border-emerald-500/30 text-emerald-400",
    },
    {
      title: "Hoteles y Temporadas",
      badge: "TEMPORADAS A 180 DÍAS",
      desc: "Ciclo largo (180 días), espera paciente (10 días entre toques). Talos trabaja la temporada siguiente mientras el hotel atiende la actual — con tarifas preferenciales para quienes ya estuvieron.",
      metric: "✓ Temporada siguiente trabajada en temporada baja",
      color: "border-cyan-500/30 text-cyan-400",
    },
  ];

  return (
    <section id="casos" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-mono text-emerald-300 mb-3">
            <Activity className="h-3.5 w-3.5 text-emerald-400" />
            <span>ESCENARIOS REALES DEL SISTEMA...</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Así opera Talos en el mundo real.
          </h2>
        </div>

        {/* 3 Cases Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-7 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/80"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                  <h3 className="font-sans text-lg font-bold text-white">
                    {c.title}
                  </h3>
                  <span className={`font-mono text-[11px] font-semibold px-2.5 py-1 rounded border bg-zinc-950 ${c.color}`}>
                    {c.badge}
                  </span>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06]">
                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-500/20 px-3 py-1.5 rounded-md w-full">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{c.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
