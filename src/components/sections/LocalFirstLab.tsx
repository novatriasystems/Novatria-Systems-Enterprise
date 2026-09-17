import { useState } from "react";
import { ScanFace, FileText, ShieldCheck, ArrowRight, Terminal, CheckCircle2 } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

export function LocalFirstLab() {
  const defaultSample = `{
  "usuario": "Carlos Mendoza",
  "empresa": "Banco Andino S.A.",
  "api_key": "sk-live-99a88f72c61e47b0a1949e29471",
  "servidor_ip": "190.144.20.15",
  "proyecto": "Licitación Autopista Norte TKN_CONFIDENTIAL"
}`;

  const [inputData, setInputData] = useState(defaultSample);
  const [sanitizedData, setSanitizedData] = useState("");
  const [hasRun, setHasRun] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  const runSanitization = () => {
    const start = performance.now();
    
    // Client-side regex PII & Secret scrub
    let scrubbed = inputData
      .replace(/sk-[a-zA-Z0-9_\-]{20,}/g, "TKN_API_SECRET_REDACTED")
      .replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, "TKN_IP_MASKED")
      .replace(/("usuario"\s*:\s*)"[^"]+"/g, '$1"TKN_PII_PERSONA"')
      .replace(/("empresa"\s*:\s*)"[^"]+"/g, '$1"TKN_CORP_ENTITY"');

    const end = performance.now();
    setLatency(Math.round((end - start) * 100) / 100);
    setSanitizedData(scrubbed);
    setHasRun(true);
    // HC-1: metrica real compartida con el Hero (misma sesion, cero egress)
    window.dispatchEvent(new CustomEvent("nvt:lab-op", { detail: { op: "sanitize" } }));
  };

  return (
    <section id="lab" className="border-b border-white/[0.08] bg-zinc-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <Badge variant="emerald" className="mb-4" pulse>
            // NOVATRIA LAB // PROOF-OF-WORK
          </Badge>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-zinc-100 md:text-4xl">
            Soberanía en el Navegador. Demostramos, no teorizamos.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Compruebe la potencia del paradigma Local-First. Esta herramienta interactiva procesa y esteriliza datos sensibles exclusivamente dentro de la RAM de su navegador. Cero peticiones de red salientes.
          </p>
        </div>

        {/* Live Interactive Sandbox */}
        <Card className="mb-16 border-blue-500/20 bg-zinc-900/40 p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-white/[0.08] pb-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
              <Terminal className="h-4 w-4 text-blue-400" />
              <span>Sanitizador Interactivo en Memoria (RAM Client-Side)</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="text-zinc-400">Peticiones de Red: <strong className="text-emerald-400">0 (Sellado)</strong></span>
              {latency !== null && (
                <span className="text-zinc-400">Tiempo: <strong className="text-blue-400 tabular-nums">{latency}ms</strong></span>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Input Viewport */}
            <div>
              <div className="mb-2 flex items-center justify-between font-mono text-[11px] text-zinc-400">
                <span>[INPUT: PAYLOAD CON PII Y API KEYS]</span>
                <button
                  onClick={() => { setInputData(defaultSample); setHasRun(false); }}
                  className="text-blue-400 hover:underline"
                >
                  Restaurar muestra
                </button>
              </div>
              <textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                rows={8}
                className="w-full rounded-sm border border-white/[0.08] bg-zinc-950 p-3 font-mono text-xs text-zinc-200 focus:border-blue-500 focus:outline-none custom-scrollbar"
                placeholder="Pegue aquí cualquier JSON o texto sensible..."
              />
            </div>

            {/* Output Viewport */}
            <div>
              <div className="mb-2 font-mono text-[11px] text-zinc-400">
                <span>[OUTPUT: PAYLOAD SANITIZADO PARA NUBE ESTÉRIL]</span>
              </div>
              <div className="h-[178px] overflow-y-auto rounded-sm border border-emerald-500/20 bg-zinc-950/80 p-3 font-mono text-xs text-emerald-300 custom-scrollbar">
                {hasRun ? (
                  <pre className="whitespace-pre-wrap">{sanitizedData}</pre>
                ) : (
                  <div className="flex h-full items-center justify-center text-zinc-400 text-center">
                    Haga clic en &quot;Ejecutar Sanitización en Cliente&quot; para verificar el filtrado en RAM.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Los datos jamás abandonan esta pestaña. Puede desconectar su Wi-Fi y funcionará igual.</span>
            </div>
            <Button onClick={runSanitization} variant="primary" size="sm">
              Ejecutar Sanitización en Cliente
            </Button>
          </div>
        </Card>

        {/* 3 Secondary Lab Capabilities */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-white/[0.06] bg-zinc-900/20 p-6">
            <ScanFace className="h-7 w-7 text-blue-400" />
            <h3 className="mt-4 font-sans text-base font-bold text-zinc-100">Media Privacy Shield</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Limpieza forense de metadatos EXIF, coordenadas GPS y huellas de dispositivo en imágenes mediante Canvas API local sin compresión destructiva.
            </p>
          </Card>

          <Card className="border-white/[0.06] bg-zinc-900/20 p-6">
            <FileText className="h-7 w-7 text-emerald-400" />
            <h3 className="mt-4 font-sans text-base font-bold text-zinc-100">Suite PDF Sovereign</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Manipulación, unión y ofuscación de documentos PDF empresariales ejecutada en Web Workers dedicados. Cero registros en bases de datos.
            </p>
          </Card>

          <Card className="border-white/[0.06] bg-zinc-900/20 p-6">
            <ShieldCheck className="h-7 w-7 text-blue-400" />
            <h3 className="mt-4 font-sans text-base font-bold text-zinc-100">Egress Firewall Tester</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Compruebe la hermeticidad de su red. Inspeccione las pestañas de red en DevTools (F12) para verificar que el perímetro Novatria está 100% sellado.
            </p>
          </Card>
        </div>

        {/* Lab Link */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-sm border border-white/[0.08] bg-zinc-900/40 p-6 md:flex-row">
          <div>
            <h4 className="font-sans text-sm font-bold text-zinc-100">Acceso a la Suite Completa del Laboratorio</h4>
            <p className="font-mono text-xs text-zinc-400">
              Herramientas de código abierto y utilidades de verificación criptográfica disponibles en vivo.
            </p>
          </div>
          <a
            href="https://novatria-core-hub.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-blue-400 hover:text-blue-300"
          >
            Abrir NOVATRIA // LAB ↗
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
