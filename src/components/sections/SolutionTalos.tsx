import { MessageSquare, FileLock, Building2, Bot } from "lucide-react";
import { Badge } from "../ui/Badge";
import nichosIndex from "../../../nichos.index.json";

const BENEFITS = [
  {
    icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
    title: "Atención inmediata por WhatsApp",
    body: "Responde y agenda a sus clientes al instante, en el momento preciso en que están listos para comprar.",
  },
  {
    icon: <FileLock className="h-6 w-6 text-emerald-400" />,
    title: "Control y transparencia total",
    body: "Cada interacción queda guardada en su equipo. Usted sabe exactamente qué se dijo, a quién y a qué hora.",
  },
  {
    icon: <Building2 className="h-6 w-6 text-blue-400" />,
    title: "Propiedad absoluta",
    body: "Sin dependencias externas. El sistema se instala en sus propios equipos y funciona de forma independiente.",
  },
];

export function SolutionTalos() {
  return (
    <section id="talos" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-14 max-w-3xl">
          <Badge variant="cobalt" className="mb-4">
            Talos — El Orquestador Soberano
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
            El asistente que reactiva su cartera de clientes en piloto automático.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Talos no es un chatbot. Es el orquestador de un equipo completo de agentes
            especializados — uno coordina, otros ejecutan — dirigidos con una sola
            secuencia lógica: recuperar cada cliente que su negocio dejó de atender.
          </p>
          <p className="mt-3 font-sans text-lg font-semibold text-zinc-200">
            Es el JARVIS con el que siempre soñó tener en su empresa — corriendo en su
            propio hardware.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-lg border border-white/[0.08] bg-zinc-900/40 p-6 transition-colors hover:border-zinc-700">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-950">
                {b.icon}
              </div>
              <h3 className="mt-4 font-sans text-lg font-bold text-zinc-100">{b.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{b.body}</p>
            </div>
          ))}
        </div>

        {/* Su negocio. Su Talos. */}
        <div className="mt-16">
          <Badge variant="emerald" className="mb-4">
            TALOS SE ADAPTA A SU TIPO DE NEGOCIO
          </Badge>
          <h3 className="font-sans text-2xl font-bold tracking-tight text-zinc-100">
            Su negocio. Su Talos.
          </h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {nichosIndex.nichos.map((n) => (
              <span
                key={n.nicho}
                className="rounded-sm border border-white/[0.10] bg-zinc-900/60 px-3.5 py-2 font-mono text-xs text-zinc-300"
              >
                Talos {n.nombre}
              </span>
            ))}
          </div>
        </div>

        {/* Escalera hardware — honesta y por niveles */}
        <div className="mt-14 rounded-lg border border-white/[0.10] bg-zinc-900/40 p-6">
          <div className="flex items-center gap-2.5">
            <Bot className="h-5 w-5 text-blue-400" />
            <h3 className="font-sans text-sm font-bold uppercase tracking-wide text-zinc-100">
              ¿Qué equipo necesita?
            </h3>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-blue-400">Nivel 1 — El Arnés</div>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                Talos corre en un computador ordinario de su negocio. Sin servidores caros
                para empezar.
              </p>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">Nivel 2 — Privacidad total con criterio</div>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                ¿Quiere que TODO — la inteligencia incluida — viva dentro de su empresa?
                Le dimensionamos el servidor apropiado: la diferencia entre un asistente
                básico y uno con el criterio de un modelo completo.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
