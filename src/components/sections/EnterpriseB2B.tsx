import { Building2, ArrowRight, X, Check } from "lucide-react";

export function EnterpriseB2B() {
  const comparisons = [
    {
      cloud: "Sus datos pasan por servidores ajenos",
      novatria: "Sus datos nunca salen de su equipo",
    },
    {
      cloud: "La factura crece con cada uso",
      novatria: "Costo fijo, sin importar el uso",
    },
    {
      cloud: "Si el proveedor sube precios, usted paga",
      novatria: "Su servidor no le sube el precio",
    },
    {
      cloud: "Si cortan el servicio, pierde todo",
      novatria: "Nadie puede cortarle SU servidor",
    },
  ];

  return (
    <section id="seguridad" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 py-1 text-xs font-mono text-blue-300 mb-3">
            <Building2 className="h-3.5 w-3.5 text-blue-400" />
            <span>NOVATRIA PARA EMPRESAS MEDIANAS, GRANDES Y PROVEEDORES DE TECNOLOGÍA...</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Una infraestructura. Dos maneras de ganar.
          </h2>
        </div>

        {/* Two Columns: Puerta 1 & Puerta 2 */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column A: Para Empresas */}
          <div className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7 sm:p-8 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-400">
                  PUERTA 1: ES EMPRESAS
                </span>
              </div>

              <div className="mt-6 rounded-xl border border-rose-500/20 bg-rose-950/20 p-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-rose-300 font-semibold block">
                  EL DOLOR EMPRESARIAL:
                </span>
                <p className="mt-2 text-sm italic text-zinc-300">
                  "Necesito IA en mi operación pero mis datos no pueden salir. Y el costo por consumo me es impredecible."
                </p>
              </div>

              <div className="mt-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block">
                  LA SOLUCIÓN NOVATRIA:
                </span>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-300">
                  <strong className="text-white">Neuris, Mithra y WebDev</strong> corren en SU infraestructura: sus datos jamás salen, el costo es fijo mensual, y cada respuesta queda registrada en un registro auditable.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <a
                href="#diagnostico"
                className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>Hable con un arquitecto</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column B: Para Proveedores */}
          <div className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-7 sm:p-8 backdrop-blur-md">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                  PUERTA 2: ES PARA PROVEEDORES
                </span>
              </div>

              <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-950/20 p-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
                  EL DOLOR DEL PROVEEDOR:
                </span>
                <p className="mt-2 text-sm italic text-zinc-300">
                  "Administro la tecnología de 20 clínicas. Pago suscripciones a terceros por cada una — si me suben el precio, mi margen muere. Si me cortan, pierdo a mis clientes."
                </p>
              </div>

              <div className="mt-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block">
                  LA SOLUCIÓN NOVATRIA:
                </span>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-zinc-300">
                  Despliegue <strong className="text-white">Talos</strong> una vez en SU servidor y ofrezca reactivación de clientes como SU servicio a todas sus cuentas. Usted es dueño del sistema, de la relación y del margen. Nadie puede subirle el precio a su propio servidor.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <a
                href="#diagnostico"
                className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <span>Conversemos su operación multi-cliente</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Comparative Matrix: Cloud vs Novatria */}
        <div className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
          <h3 className="text-center font-mono text-xs uppercase tracking-[0.2em] text-zinc-400 mb-6">
            NUBE DE TERCEROS VS. NOVATRIA EN SU INFRAESTRUCTURA
          </h3>

          <div className="space-y-3">
            {comparisons.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 p-3 rounded-lg bg-zinc-950/60 border border-white/[0.04]"
              >
                <div className="flex items-center gap-3 text-xs sm:text-sm text-rose-300/90 font-mono">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-950 border border-rose-500/30 text-rose-400">
                    <X className="h-3 w-3" />
                  </div>
                  <span>{row.cloud}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-emerald-300 font-mono">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="font-semibold">{row.novatria}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
