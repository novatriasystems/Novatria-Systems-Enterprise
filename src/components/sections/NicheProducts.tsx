import { ArrowRight } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import nichosIndex from "../../../nichos.index.json";

/**
 * Vitrina de la Linea 1 — datos 100% del manifiesto generado (kernel Talos).
 * Cero texto hardcodeado de nichos (SDD 4c). Precio de vitrina de la Linea 1
 * retirado por decision del Ingeniero (estudio de mercado pendiente — ver acta).
 */


interface NicheProductsProps {
  onEvaluar: () => void;
}

export function NicheProducts({ onEvaluar }: NicheProductsProps) {
  return (
    <section id="productos" className="border-b border-white/[0.08] bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <Badge variant="cobalt" className="mb-4">
            TALOS SE ADAPTA A SU TIPO DE NEGOCIO
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
            Tus clientes no desaparecen. Solo dejan de venir.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Talos detecta a los clientes inactivos de tu negocio, los contacta por WhatsApp
            con un mensaje asistido a tu nombre y los devuelve a tu agenda. El sistema
            trabaja todos los días; tú no haces nada. Cuota mensual: sin comisiones,
            sin contratos eternos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {nichosIndex.nichos.map((n) => (
            <Card key={n.nicho} className="flex flex-col justify-between border-white/[0.06] bg-zinc-900/30 p-5 hover:border-zinc-700">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <h3 className="font-sans text-base font-bold text-zinc-100">
                    Talos {n.nombre}
                  </h3>
                </div>
                <ul className="mt-4 space-y-2 font-mono text-[11px] text-zinc-400">
                  <li className="flex justify-between">
                    <span>Ciclo inactivo</span>
                    <span className="text-zinc-200">{n.umbral_dias} días</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Canal</span>
                    <span className="text-zinc-200">WhatsApp asistido</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Toques</span>
                    <span className="text-zinc-200">{n.toques} (cada {n.dias_entre_toques} días)</span>
                  </li>
                </ul>
              </div>
              <div className="mt-5 border-t border-white/[0.06] pt-4">
                <div className="font-mono text-[11px] text-zinc-300">Piloto de implementación: 3 meses</div>
                <Button onClick={onEvaluar} variant="outline" size="sm" className="mt-3 w-full">
                  Diagnóstico gratuito
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
