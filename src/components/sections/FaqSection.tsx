import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "¿No va a sonar a robot?",
    a: "Mensajes naturales, con el nombre del cliente y el tono exacto de su negocio. Usted aprueba las plantillas antes del primer envío.",
  },
  {
    q: "¿Y si el cliente pregunta algo complicado?",
    a: "Talos no improvisa: lo que no puede resolver, se lo pasa a usted o a su equipo con todo el contexto de la conversación.",
  },
  {
    q: "¿Qué pasa con los datos de mis clientes?",
    a: "Viven en SU servidor. Jamás se envían a nubes de terceros. Esa es la diferencia fundamental de Novatria: usted es dueño del sistema y del dato.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Un piloto de 3 meses con precio adaptado al tamaño de su negocio — lo define el diagnóstico gratuito, no una lista arbitraria.",
  },
  {
    q: "¿Y si no me funciona?",
    a: "El piloto existe para eso: al terminarlo, usted decide con números en la mano. Sin ataduras ni penalizaciones.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 py-1 text-xs font-mono text-blue-300 mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-blue-400" />
            <span>LAS PREGUNTAS QUE TODO DUEÑO HACE, RESPONDIDAS SIN LETRA PEQUEÑA...</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Lo que está pensando, respondido sin rodeos.
          </h2>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-blue-500/40 bg-zinc-900/80 shadow-lg"
                    : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className="font-sans text-base sm:text-lg font-semibold text-zinc-100 pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-cyan-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base leading-relaxed text-zinc-300 border-t border-white/[0.06] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
