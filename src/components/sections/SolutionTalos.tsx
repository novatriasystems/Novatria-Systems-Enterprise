import { MessageSquare, FileLock, Building2 } from "lucide-react";
import { Badge } from "../ui/Badge";

/**
 * Seccion #talos — que hace Talos y para quien. Dos audiencias, un sistema:
 * el dueño de negocio lee beneficios; el CTO lee garantias. Cero jerga sin ganar.
 */
const PILLARS = [
  {
    icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
    title: "WhatsApp, sin fricción",
    body: "Inferencia directa por WhatsApp con entendimiento contextual. Agendamiento, re-agendamiento e historial de cada cliente — sin APIs externas ni bots que suenen a robot.",
  },
  {
    icon: <FileLock className="h-6 w-6 text-emerald-400" />,
    title: "Cada respuesta queda registrada",
    body: "Un registro auditable y encriptado de todo lo que la IA dijo, a quién y cuándo. Sabe exactamente qué comunicó su negocio — y puede demostrarlo en una auditoría.",
  },
  {
    icon: <Building2 className="h-6 w-6 text-blue-400" />,
    title: "Los datos viven en su servidor",
    body: "La información de sus clientes se procesa dentro de su propia infraestructura física. Cero exposición a bases de datos de terceros — por diseño, no por promesa.",
  },
];

export function SolutionTalos() {
  return (
    <section id="talos" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">

        {/* Encabezado */}
        <div className="mb-14 max-w-3xl">
          <Badge variant="cobalt" className="mb-4">
            El agente que trabaja para su negocio
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
            Talos hace volver a los clientes que usted creyó perdidos —{" "}
            <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
              mientras usted atiende lo que importa.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Talos no es un chatbot. Es el sistema que recupera clientes inactivos, captura
            nuevos leads y ejecuta el seguimiento que nadie tiene tiempo de hacer — operando
            desde su propia infraestructura. Sin depender de OpenAI, Anthropic ni ningún tercero.
          </p>
        </div>

        {/* 3 pilares de beneficio */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="rounded-lg border border-white/[0.08] bg-zinc-900/40 p-6 transition-colors hover:border-zinc-700"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.08] bg-zinc-950">
                {p.icon}
              </div>
              <h3 className="mt-4 font-sans text-lg font-bold text-zinc-100">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Ciclo autonomo — la linea que cierra */}
        <div className="mt-8 rounded-lg border border-emerald-900/40 bg-emerald-950/20 p-5">
          <p className="font-mono text-xs leading-relaxed text-emerald-300">
            Y mañana vuelve a empezar: Talos refresca la lista de inactivos, escribe el
            primer mensaje, insiste con elegancia si no responden — y a usted solo le llegan
            las citas confirmadas.
          </p>
        </div>

      </div>
    </section>
  );
}
