import { useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import nichosIndex from "../../../nichos.index.json";

/**
 * S4 Prueba Viva — WP6. Los mensajes SON las plantillas reales del kernel
 * (nichos.index.json -> plantilla_inicial). Los nombres son datos de demo;
 * la respuesta del cliente esta marcada visualmente como simulacion.
 * Cero textos de nicho hardcodeados: cuando el kernel cambia un yaml,
 * esta seccion lo refleja en el siguiente build.
 */
const DEMO_LEAD = "Carlos";

function renderPlantilla(t: string): string {
  return t
    .replaceAll("{lead_nombre}", DEMO_LEAD)
    .replaceAll("{cliente_nombre}", "Ana")
    .replaceAll("{cliente_negocio}", "su negocio");
}

export function LiveProofWhatsApp() {
  const [idx, setIdx] = useState(0);
  const nicho = nichosIndex.nichos[idx];
  const mensaje = renderPlantilla(nicho.plantilla_inicial);

  return (
    <section id="prueba-viva" className="border-b border-white/[0.08] bg-zinc-950 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 max-w-3xl">
          <Badge variant="emerald" className="mb-4">
            DEMOSTRACIÓN CON LAS PLANTILLAS REALES DEL SISTEMA
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
            Esto es lo que su cliente recibiría.
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Seleccione su tipo de negocio y vea el mensaje exacto que Talos enviaría por WhatsApp.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {nichosIndex.nichos.map((n, i) => (
            <button
              key={n.nicho}
              onClick={() => setIdx(i)}
              className={`rounded-sm border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                i === idx
                  ? "border-blue-500 bg-blue-950/40 text-blue-300"
                  : "border-white/[0.08] bg-zinc-900/40 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {n.nombre}
            </button>
          ))}
        </div>

        <div className="mx-auto max-w-md overflow-hidden rounded-lg border border-white/[0.10] bg-[#0b141a] shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/[0.06] bg-zinc-900/80 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-700 font-sans text-sm font-bold text-zinc-200">
              {nicho.nombre.charAt(0)}
            </div>
            <div>
              <div className="font-sans text-sm font-semibold text-zinc-100">{nicho.nombre}</div>
              <div className="font-mono text-[10px] text-emerald-400">en línea</div>
            </div>
          </div>

          <div className="space-y-2 bg-[#0b141a] p-4">
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-zinc-800/90 px-3 py-2 text-[13px] leading-relaxed text-zinc-100">
              {mensaje}
              <div className="mt-1 text-right font-mono text-[9px] text-zinc-500">10:32 ✓✓</div>
            </div>

            <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-none bg-emerald-950/70 px-3 py-2 text-[13px] leading-relaxed text-zinc-100">
              Sí, ¿qué días tiene disponibles esta semana?
              <div className="mt-1 text-right font-mono text-[9px] text-zinc-500">10:34</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-wider text-zinc-500">[Respuesta simulada — demostración]</div>
            </div>

            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-zinc-800/90 px-3 py-2 text-[13px] leading-relaxed text-zinc-100">
              Perfecto {DEMO_LEAD}, quedó agendado. Lo esperamos.
              <div className="mt-1 text-right font-mono text-[9px] text-zinc-500">10:35 ✓✓</div>
            </div>
          </div>

          <div className="border-t border-white/[0.06] bg-zinc-900/60 px-4 py-2">
            <span className="font-mono text-[10px] text-emerald-400">
              ⚡ Este mensaje lo escribió Talos, trabajando para {nicho.nombre}
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="primary" size="md">
            Así funcionaría en mi negocio — gratis
          </Button>
        </div>
      </div>
    </section>
  );
}
