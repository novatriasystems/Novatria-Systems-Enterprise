import { useState } from "react";
import { Building2, Network, ServerCog, ArrowRight, ShoppingCart, Loader2 } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

interface ServicesMatrixProps {
  onEvaluar: () => void;
}

/**
 * #servicios — Linea 2 Enterprise (storefront E-3) + consultoria (posicionamiento).
 * Las 4 ofertas compran por /api/checkout (Stripe Checkout Session -> redirect).
 * Sin precios publicos (SDD Seccion 7): el CTA abre el flujo de compra directo.
 */
const OFFERS = [
  {
    id: "NEURIS_1",
    tag: "IA SOBERANA ENTERPRISE",
    title: "Neuris",
    desc: "RAG e inferencia sobre documentación confidencial en enclave local. Propiedad intelectual que jamás sale de tu infraestructura.",
    metrics: "On-premise // Cero Vendor Lock-in",
  },
  {
    id: "TALOS_2",
    tag: "ORQUESTACIÓN MULTI-AGENTE",
    title: "Talos-for-enterprise",
    desc: "La línea de reactivación de clientes, escalada a operación multi-sede con gobernanza central y ledger auditable.",
    metrics: "Multi-tenant // Reporte COP mensual",
  },
  {
    id: "MITHRA_3",
    tag: "BLINDAJE DE DATOS",
    title: "Mithra",
    desc: "Sanitización y egress filtering en tiempo real para equipos que consultan LLMs sin filtrar secretos ni PII.",
    metrics: "Egress Filtering // RAM-only",
  },
  {
    id: "WEBDEV_4",
    tag: "INFRAESTRUCTURA WEB",
    title: "WebDev",
    desc: "Motores digitales de alta conversión sobre infraestructura propietaria. Cero comisiones, 100% código soberano.",
    metrics: "100% Ownership // Sin SaaS",
  },
];

const CONSULTING = [
  {
    icon: <Network className="h-6 w-6 text-blue-400" />,
    tag: "HIGH-TICKET ACQUISITION",
    title: "Faro Comercial B2B",
    desc: "Portales de captura de leads High-Ticket desplegados en Edge Network. Arquitectura diseñada para maximizar conversión comercial sin fricción técnica.",
    metrics: "0ms Latencia Edge // Conversión Sin Fricción",
  },
  {
    icon: <ServerCog className="h-6 w-6 text-zinc-300" />,
    tag: "HARDENING & RESILIENCIA",
    title: "Hardening de Interfaz",
    desc: "Auditoría y refactorización de sistemas legacy con validación Zod y protección anti-SSRF. Blindaje contra OWASP Top 10.",
    metrics: "Esquemas Zod Estrictos // Anti-SSRF Mitigado",
  },
];

export function ServicesMatrix({ onEvaluar }: ServicesMatrixProps) {
  const [buying, setBuying] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async (offer: string) => {
    setBuying(offer);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer }),
      });
      if (!res.ok) {
        setError("Checkout no disponible temporalmente. Escríbenos para compra directa.");
        return;
      }
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError("Checkout no disponible temporalmente.");
    } catch {
      setError("Error de conexión con el enclave de pagos.");
    } finally {
      setBuying(null);
    }
  };

  return (
    <section id="servicios" className="border-b border-white/[0.08] bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Enterprise Storefront */}
        <div className="mb-16 max-w-3xl">
          <Badge variant="cobalt" className="mb-4">
            // LÍNEA 2 — SERVICIOS ENTERPRISE
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
            Infraestructura de IA Soberana para Empresas.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Cuatro arquitecturas certificadas de licenciamiento automático. Pago por Stripe
            con activación inmediata: la licencia llega firmada criptográficamente a tu infraestructura.
          </p>
        </div>

        {error && (
          <div className="mb-8 rounded-sm border border-red-800/40 bg-red-950/20 p-3 font-mono text-[11px] text-red-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {OFFERS.map((offer) => (
            <Card key={offer.id} className="flex flex-col justify-between border-white/[0.08] bg-zinc-900/30 p-7 hover:border-zinc-700/80">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-blue-500/30 bg-blue-950/40">
                    <Building2 className="h-6 w-6 text-blue-500" />
                  </div>
                  <Badge variant="default" className="text-[9px] px-2">{offer.tag}</Badge>
                </div>
                <h3 className="mt-5 font-sans text-lg font-bold text-zinc-100">{offer.title}</h3>
                <p className="mt-3 text-xs leading-relaxed text-zinc-400">{offer.desc}</p>
              </div>
              <div className="mt-8 border-t border-white/[0.06] pt-4">
                <div className="mb-4 font-mono text-[10px] text-zinc-400">
                  METRICS: <span className="text-zinc-200">{offer.metrics}</span>
                </div>
                <Button
                  onClick={() => handleBuy(offer.id)}
                  disabled={buying !== null}
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  {buying === offer.id ? (
                    <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Abriendo checkout...</>
                  ) : (
                    <><ShoppingCart className="h-3.5 w-3.5" /> Contratar con Stripe</>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Consultoria — posicionamiento (sin compra directa) */}
        <div className="mt-20 mb-16 max-w-3xl">
          <Badge variant="default" className="mb-4">
            // DOMINIOS DE INTERVENCIÓN ESTRATÉGICA
          </Badge>
          <h3 className="font-sans text-2xl font-bold tracking-tight text-zinc-100">
            Consultoría de Arquitectura de Alto Nivel.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Para organizaciones que requieren intervención dirigida sobre su infraestructura existente.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CONSULTING.map((svc) => (
            <Card key={svc.title} className="flex flex-col justify-between border-white/[0.06] bg-zinc-900/20 p-6">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/[0.08] bg-zinc-950">
                    {svc.icon}
                  </div>
                  <Badge variant="default" className="text-[9px] px-2">{svc.tag}</Badge>
                </div>
                <h4 className="mt-5 font-sans text-base font-bold text-zinc-100">{svc.title}</h4>
                <p className="mt-3 text-xs leading-relaxed text-zinc-400">{svc.desc}</p>
              </div>
              <div className="mt-6 border-t border-white/[0.06] pt-4">
                <div className="mb-4 font-mono text-[10px] text-zinc-400">
                  METRICS: <span className="text-zinc-200">{svc.metrics}</span>
                </div>
                <button
                  onClick={onEvaluar}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-400 hover:text-blue-300"
                >
                  Solicitar Evaluación
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
