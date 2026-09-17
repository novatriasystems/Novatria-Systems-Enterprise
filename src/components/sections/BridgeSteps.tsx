import { CheckCircle2, UploadCloud, Users, MessageCircle, CalendarCheck2 } from "lucide-react";

export function BridgeSteps() {
  const steps = [
    {
      num: "01",
      icon: UploadCloud,
      title: "Cargamos su lista",
      desc: "Cargamos su lista base de clientes... usted no prepara nada. Una llamada y su base actual de clientes hace el resto.",
    },
    {
      num: "02",
      icon: Users,
      title: "Talos encuentra a los fríos",
      desc: "Cada negocio tiene su propio ciclo: una peluquería mira 28 días, una veterinaria hasta 300. El suyo tendrá el suyo.",
    },
    {
      num: "03",
      icon: MessageCircle,
      title: "Escribe con su tono",
      desc: "WhatsApp, a nombre suyo, con mensajes que usted aprueba antes de que salga el primero.",
    },
    {
      num: "04",
      icon: CalendarCheck2,
      title: "Usted solo ve llegar las citas",
      desc: "Citas confirmadas llegando a su agenda habitual. Sin instalar nada. Sin entrenar personal.",
    },
  ];

  const guarantees = [
    "Sin instalar apps",
    "Sin cambiar su agenda",
    "Sin entrenar personal",
    "Cancelable al final del piloto",
  ];

  return (
    <section id="puente" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3">
            <span>DE LA FIRMA DEL PILOTO A LA PRIMERA CITA RECUPERADA...</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Cómo funciona —{" "}
            <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              sin que usted cambie nada de lo que hace.
            </span>
          </h2>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-zinc-900/80"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-cyan-400">
                    {step.num}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
                    <Icon className="h-4 w-4 text-cyan-300" />
                  </div>
                </div>
                <h3 className="mt-5 font-sans text-base font-bold text-zinc-100">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Row of Guarantees */}
        <div className="mt-12 rounded-xl border border-white/[0.08] bg-zinc-900/40 p-5 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {guarantees.map((g, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-xs sm:text-sm text-zinc-200">{g}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
