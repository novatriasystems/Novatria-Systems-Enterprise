import { useState } from "react";
import { Badge } from "../ui/Badge";
import { CheckCircle2, Plug } from "lucide-react";
import nichosIndex from "../../../nichos.index.json";
import detail from "../../../nichos-detail.json";

/**
 * "Su negocio. Su Talos." — selector interactivo de verticales (WP8).
 * Capa 1 (Dueño): decisiones administrativas automaticas — resultado de negocio.
 * Capa 2 (Hibrida): metricas que Talos analiza — nombre + una linea.
 * Capa 3 (Tecnica): ecosistema conectable via API/MCP — para el proveedor.
 * Fuente: nichos-detail.json (editable sin tocar codigo) + manifiesto kernel.
 */
export function NicheProducts() {
  const [idx, setIdx] = useState(0);
  const nicho = nichosIndex.nichos[idx];
  const det = detail.verticales.find((v) => v.id === nicho.nicho) ?? detail.verticales[idx];

  return (
    <div className="mt-16">
      <Badge variant="emerald" className="mb-4">
        TALOS SE ADAPTA A SU TIPO DE NEGOCIO
      </Badge>
      <h3 className="font-sans text-2xl font-bold tracking-tight text-zinc-100">
        Su negocio. Su Talos. Sus decisiones automáticas.
      </h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-400">
        Cada vertical tiene su propio ciclo, sus propias integraciones y sus propias
        decisiones administrativas que Talos toma por usted. Seleccione la suya y vea
        lo que el sistema hace todos los días.
      </p>

      {/* Selector de chips */}
      <div className="mt-8 flex flex-wrap gap-2">
        {nichosIndex.nichos.map((n, i) => (
          <button
            key={n.nicho}
            onClick={() => setIdx(i)}
            className={`rounded-sm border px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              i === idx
                ? "border-blue-500 bg-blue-950/40 text-blue-300"
                : "border-white/[0.10] bg-zinc-900/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }`}
          >
            Talos {n.nombre}
          </button>
        ))}
      </div>

      {/* Panel de la vertical activa */}
      <div className="mt-6 rounded-lg border border-white/[0.10] bg-zinc-900/40 p-6 sm:p-7">
        <h4 className="font-sans text-xl font-bold text-zinc-50">
          Talos {nicho.nombre}
        </h4>

        {/* CAPA 1 — Decisiones automaticas (Dueño) */}
        <div className="mt-6 space-y-3">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-400">
            Decisiones administrativas que Talos toma por usted
          </div>
          {det.decisiones.map((d, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-emerald-500/15 bg-emerald-950/15 p-4">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <p className="text-sm leading-relaxed text-zinc-200">{d}</p>
            </div>
          ))}
          {det.decision_flag && (
            <div className="rounded-lg border border-emerald-500/25 bg-emerald-950/30 p-4">
              <p className="text-xs leading-relaxed text-emerald-200">{det.decision_flag}</p>
            </div>
          )}
        </div>

        {/* CAPA 2 — Metricas (Hibrida) */}
        <div className="mt-7">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-blue-400">
            Lo que Talos analiza en su operación
          </div>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            {det.metricas.map((m) => (
              <div key={m.nombre} className="rounded-lg border border-white/[0.08] bg-zinc-950/60 p-4">
                <div className="font-sans text-sm font-bold text-zinc-100">{m.nombre}</div>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400">{m.detalle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CAPA 3 — Ecosistema (Tecnica, atenuada) */}
        <div className="mt-7 rounded-lg border border-white/[0.06] bg-zinc-950/80 p-4">
          <div className="flex items-center gap-2">
            <Plug className="h-3.5 w-3.5 text-zinc-500" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Capa técnica — para proveedores y equipos de TI
            </span>
          </div>
          <p className="mt-2 font-mono text-[11px] leading-relaxed text-zinc-500">
            {detail.ecosistema_copy} — en esta vertical: {det.integraciones}.
          </p>
        </div>
      </div>
    </div>
  );
}
