import { Lock, Code2, ShieldCheck, FileText, EyeOff } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

export function DoctrineValues() {
  const values = [
    {
      icon: <Lock className="h-5 w-5 text-blue-400" />,
      title: "Autenticidad",
      tech: "Arquitectura Soberana",
      desc: "Su código fuente, sus modelos y sus bases de datos operan bajo su dominio absoluto. Cero intermediarios opacos, cero vendor lock-in.",
    },
    {
      icon: <Code2 className="h-5 w-5 text-emerald-400" />,
      title: "Excelencia",
      tech: "Tipado Inmutable",
      desc: "Compilación estricta con TypeScript 5.x sin tipos implícitos. Cero deudas técnicas o librerías huérfanas en el pipeline de producción.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-blue-400" />,
      title: "Inmunidad",
      tech: "Defensa en Profundidad",
      desc: "Protección perimetral integral contra el OWASP Top 10, inyecciones de prompt adversarias y exfiltración lateral de tokens.",
    },
    {
      icon: <FileText className="h-5 w-5 text-zinc-300" />,
      title: "Determinismo",
      tech: "Spec-Driven Development",
      desc: "Cero líneas de código se integran sin un contrato arquitectónico previo. Lo que se especifica es exactamente lo que se compila y valida.",
    },
    {
      icon: <EyeOff className="h-5 w-5 text-emerald-400" />,
      title: "Hermeticidad",
      tech: "Cero Telemetría Saliente",
      desc: "Políticas de Egress Filtering estrictas a nivel de kernel/red. Ni su tráfico ni el de sus clientes se comparte con centros de datos externos.",
    },
  ];

  return (
    <section id="doctrina" className="border-b border-white/[0.08] bg-zinc-950/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="mb-14 max-w-3xl">
          <Badge variant="cobalt" className="mb-4">
            // DOCTRINA DE INGENIERÍA
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
            Valores Convertidos en Código Determinista.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Rechazamos los eslóganes vacíos de marketing. Cada postulado de nuestra doctrina se traduce en garantías matemáticas y barreras criptográficas comprobables en su infraestructura.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((val) => (
            <Card
              key={val.title}
              className="border-white/[0.06] bg-zinc-900/30 p-6 hover:border-zinc-700"
            >
              <div className="flex items-center gap-3 border-b border-white/[0.06] pb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/[0.08] bg-zinc-950">
                  {val.icon}
                </div>
                <div>
                  <h3 className="font-sans text-base font-bold text-zinc-100 uppercase tracking-tight">
                    {val.title}
                  </h3>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-blue-400">
                    {val.tech}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-zinc-400">
                {val.desc}
              </p>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
