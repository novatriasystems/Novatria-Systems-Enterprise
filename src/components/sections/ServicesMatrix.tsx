import { Building2, Network, ServerCog, ArrowRight } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

interface ServicesMatrixProps {
  onEvaluar: () => void;
}

export function ServicesMatrix({ onEvaluar }: ServicesMatrixProps) {
  const services = [
    {
      id: "obsidian",
      icon: <Building2 className="h-6 w-6 text-blue-500" />,
      tag: "INFRAESTRUCTURA PROPIETARIA",
      title: "Obsidian Cybernetics B2B",
      desc: "No diseñamos sitios web. Construimos motores digitales de alta conversión blindados. Erradicamos el software comercial (WordPress/SaaS) para entregarte un activo de infraestructura propietario. Cero comisiones, 100% ownership.",
      metrics: "0% Comisiones // 100% Código Soberano",
      externalUrl: "https://obsidian-cybernetics-b2b.novatriasystems-io.workers.dev",
      cta: "Agendar Diagnóstico",
    },
    {
      id: "faro",
      icon: <Network className="h-6 w-6 text-blue-400" />,
      tag: "HIGH-TICKET ACQUISITION",
      title: "Faro Comercial B2B",
      desc: "Portales de captura de leads High-Ticket desplegados en Edge Network (Latencia 0ms). Arquitectura SPA pura diseñada para maximizar conversión comercial sin fricción técnica.",
      metrics: "0ms Latencia Edge // Conversión Sin Fricción",
      cta: "Solicitar Evaluación",
    },
    {
      id: "hardening",
      icon: <ServerCog className="h-6 w-6 text-zinc-300" />,
      tag: "HARDENING & RESILIENCIA",
      title: "Hardening de Interfaz",
      desc: "Auditoría y refactorización de sistemas legacy a SPA puras con validación Zod y protección Anti-SSRF. Blindaje de interfaces contra extracción automatizada y ataques OWASP Top 10.",
      metrics: "Esquemas Zod Estrictos // Anti-SSRF Mitigado",
      cta: "Solicitar Evaluación",
    },
  ];

  return (
    <section id="servicios" className="border-b border-white/[0.08] bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Title */}
        <div className="mb-16 max-w-3xl">
          <Badge variant="cobalt" className="mb-4">
            // DOMINIOS DE INTERVENCIÓN ESTRATÉGICA
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
            Servicios de Arquitectura de Alto Nivel.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            No vendemos horas de consultoría ni plantillas prediseñadas. Desplegamos infraestructura de software pesado y blindaje de código como activos capitalizables para su compañía.
          </p>
        </div>

        {/* 3-Pillar Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((svc) => (
            <Card
              key={svc.id}
              className="flex flex-col justify-between border-white/[0.08] bg-zinc-900/30 p-7 hover:border-zinc-700/80"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/[0.08] bg-zinc-950">
                    {svc.icon}
                  </div>
                  <Badge variant="default" className="text-[9px] px-2">{svc.tag}</Badge>
                </div>

                <h3 className="mt-5 font-sans text-lg font-bold text-zinc-100">
                  {svc.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                  {svc.desc}
                </p>
              </div>

              <div className="mt-8 border-t border-white/[0.06] pt-4">
                <div className="mb-4 font-mono text-[10px] text-zinc-400">
                  METRICS: <span className="text-zinc-200">{svc.metrics}</span>
                </div>

                {svc.externalUrl ? (
                  <a
                    href={svc.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-400 hover:text-blue-300"
                  >
                    {svc.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={onEvaluar}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-400 hover:text-blue-300"
                  >
                    {svc.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
