import { MessageSquare, FileLock, Building2 } from "lucide-react";
import { Badge } from "../ui/Badge";

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

        {/* Puente hacia el explorador de verticales (NicheProducts, montado debajo) */}
        <div className="mt-14 rounded-lg border border-white/[0.10] bg-zinc-900/40 p-6">
          <h3 className="font-sans text-base font-bold text-zinc-100">
            ¿Y qué equipo necesita para tenerlo funcionando?
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
            Empezar es más simple de lo que parece: <strong className="text-zinc-200">Talos corre en un
            computador ordinario de su negocio</strong> — el mismo que ya tiene encendido. Sin
            servidores caros para comenzar.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
            ¿Quiere llevarlo al máximo nivel — que <strong className="text-zinc-200">toda la inteligencia</strong> viva
            dentro de su empresa y jamás dependa de nadie? Ahí sí entramos a dimensionar
            un servidor a la medida: es la diferencia entre un asistente básico y uno con
            el criterio completo de un modelo profesional. Esa decisión la tomamos juntos
            en el diagnóstico — según su volumen, su operación y qué tan lejos quiere
            llegar.{" "}
            <span className="font-mono text-xs text-zinc-500">
              (Explore sus verticales más abajo ↓)
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
