import { useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import nichosIndex from "../../../nichos.index.json";

/**
 * S4 Prueba Viva — WP7 v2. El mensaje INICIAL es la plantilla real del kernel
 * (nichos.index.json -> plantilla_inicial) personalizada con datos de demo.
 * Las respuestas del asistente son conversaciones de demostracion: variadas,
 * naturales, una personalidad por vertical. Marcadas como simulacion.
 */
interface Demo {
  business: string;
  owner: string;
  lead: string;
  pet?: string;
  reply: string;
  confirm: string;
}

const DEMO: Record<string, Demo> = {
  odontologia: {
    business: "Clínica Dental Andina",
    owner: "la Dra. Martínez",
    lead: "Carlos",
    reply: "Sí claro, ¿tienen el jueves en la mañana?",
    confirm: "Listo Carlos, te aparté el jueves a las 10:00. Si algo se mueve, avísame por aquí.",
  },
  gimnasio: {
    business: "PowerGym",
    owner: "el equipo de PowerGym",
    lead: "Laura",
    reply: "Jaja sí, esta semana vuelvo, lo prometo",
    confirm: "Te espero el miércoles entonces. El primer día siempre es el más difícil — después fluye solo.",
  },
  fisioterapia: {
    business: "Fisioterapia Integral",
    owner: "Marcela",
    lead: "Andrés",
    reply: "Verdad, se me había pasado. ¿El viernes a las 4?",
    confirm: "Viernes 4:00 pm reservado. Trae la toalla, seguimos con el trabajo de movilidad.",
  },
  peluqueria: {
    business: "Salón Bella Vista",
    owner: "Camila",
    lead: "Daniela",
    reply: "Sí!! ¿El sábado temprano?",
    confirm: "Sábado 9:00 am, silla reservada. Llegas y te atiendo de una.",
  },
  veterinaria: {
    business: "Veterinaria El Roble",
    owner: "el Dr. Restrepo",
    lead: "Sofía",
    pet: "Lucas",
    reply: "Cierto, ya le tocaba. ¿Qué día tienen?",
    confirm: "Martes y jueves en la mañana. Confírmame el que le quede mejor a Lucas.",
  },
  agrovet: {
    business: "AgroCampos Vet",
    owner: "Juliana",
    lead: "don Hernando",
    reply: "Sí, la verdad se les está pasando. ¿Qué me recomienda para las terneras?",
    confirm: "Perfecto, le preparo la cotización para las terneras y se la envío por aquí mismo.",
  },
  hotel: {
    business: "Hotel Casa Blanca",
    owner: "reservas del Casa Blanca",
    lead: "Patricia",
    reply: "Qué bueno saber de ustedes. ¿Qué fechas tienen disponibles?",
    confirm: "Le envío el calendario de la temporada con el descuento por repetir. La fecha que elija, aquí la aseguramos.",
  },
  bicicleteria: {
    business: "BikeHub",
    owner: "Andrés de BikeHub",
    lead: "Santiago",
    reply: "Sí, le hace falta una buena pasada por el taller",
    confirm: "Déjala el viernes y el sábado al mediodía te aviso que está lista, revisión completa.",
  },
};

function renderPlantilla(t: string, d: Demo): string {
  return t
    .replaceAll("{lead_nombre}", d.lead)
    .replaceAll("{cliente_nombre}", d.owner)
    .replaceAll("{cliente_negocio}", d.business);
}

export function LiveProofWhatsApp() {
  const [idx, setIdx] = useState(0);
  const nicho = nichosIndex.nichos[idx];
  const demo = DEMO[nicho.nicho] ?? {
    business: nicho.nombre,
    owner: "su equipo",
    lead: "Carlos",
    reply: "Sí, ¿qué fechas tienen?",
    confirm: "Quedó agendado. Lo esperamos.",
  };
  const mensaje = renderPlantilla(nicho.plantilla_inicial, demo);

  return (
    <section id="prueba-viva" className="border-b border-white/[0.08] bg-zinc-950 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 max-w-3xl">
          <Badge variant="emerald" className="mb-4">
            ASÍ CONVERSA TALOS CON SUS CLIENTES
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
            Mensajes naturales. Con su nombre. Con el tono de su negocio.
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Seleccione su tipo de negocio y vea una conversación real: Talos escribe con el
            nombre del cliente, responde en contexto y agenda — sin sonar a robot.
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
              {demo.business.charAt(0)}
            </div>
            <div>
              <div className="font-sans text-sm font-semibold text-zinc-100">{demo.business}</div>
              <div className="font-mono text-[10px] text-emerald-400">en línea</div>
            </div>
          </div>

          <div className="space-y-2 bg-[#0b141a] p-4">
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-zinc-800/90 px-3 py-2 text-[13px] leading-relaxed text-zinc-100">
              {mensaje}
              <div className="mt-1 text-right font-mono text-[9px] text-zinc-500">10:32 ✓✓</div>
            </div>

            <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-none bg-emerald-950/70 px-3 py-2 text-[13px] leading-relaxed text-zinc-100">
              {demo.reply}
              <div className="mt-1 text-right font-mono text-[9px] text-zinc-500">10:34</div>
            </div>

            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-zinc-800/90 px-3 py-2 text-[13px] leading-relaxed text-zinc-100">
              {demo.confirm}
              <div className="mt-1 text-right font-mono text-[9px] text-zinc-500">10:35 ✓✓</div>
            </div>
          </div>

          <div className="border-t border-white/[0.06] bg-zinc-900/60 px-4 py-2.5">
            <div className="font-mono text-[10px] text-emerald-400">
              ⚡ Primer mensaje generado por Talos con la plantilla de {nicho.nombre}
            </div>
            <div className="mt-0.5 font-mono text-[9px] text-zinc-500">
              Conversación de demostración con datos ficticios.
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="primary" size="md">
            Así sonaría en mi negocio — gratis
          </Button>
        </div>
      </div>
    </section>
  );
}
