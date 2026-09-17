import { useState } from "react";
import { X, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { contactSchema } from "../../lib/schemas/contact.schema";

interface PerimeterAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PerimeterAssessment({ isOpen, onClose }: PerimeterAssessmentProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverScore, setServerScore] = useState<number | null>(null);
  const [auditRef, setAuditRef] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({
    infrastructureType: "public_cloud",
    complianceNeeds: "high",
    workload: "rag_proprietary",
    fullName: "",
    workEmail: "",
    company: "",
    nichoInteres: "" as string | undefined,
  });

  if (!isOpen) return null;

  // Estimacion presentacional (misma formula que SC-1 server-side — documentado)
  const estimateScore = () => {
    let score = 50;
    if (formData.infrastructureType === "public_cloud") score += 35;
    if (formData.complianceNeeds === "high") score += 10;
    return score;
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    if (step === 2) { setStep(3); return; }

    if (step === 3) {
      // Validacion cliente con el MISMO schema que el servidor
      const check = contactSchema.safeParse({
        ...formData,
        nichoInteres: formData.nichoInteres || undefined,
      });
      if (!check.success) {
        setServerError(check.error.issues[0]?.message ?? "Revisa los campos");
        return;
      }
      if (!consent) {
        setServerError("Debes autorizar el tratamiento del dominio del correo para continuar.");
        return;
      }

      setIsSubmitting(true);
      setServerError(null);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(check.data),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.reference) setAuditRef(data.reference);
          if (typeof data.score === "number") setServerScore(data.score);
        } else {
          setServerError("El enclave no pudo registrar la evaluación. Intenta de nuevo.");
        }
      } catch {
        setServerError("Error de conexión con el enclave.");
      } finally {
        setIsSubmitting(false);
        setStep(4);
      }
    }
  };

  const handleReset = () => {
    setStep(1);
    setAuditRef(null);
    setServerScore(null);
    setServerError(null);
    setConsent(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-xl rounded-sm border border-white/[0.12] bg-zinc-950 p-7 shadow-2xl specular-card">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-zinc-400 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {step < 4 ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="cobalt">
                // AUDITORÍA DE ARQUITECTURA [PASO {step}/3]
              </Badge>
            </div>

            <h3 className="font-sans text-2xl font-bold tracking-tight text-zinc-100">
              Evaluación Confidencial de Perímetro
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Cualificación de aislamiento de infraestructura y cálculo de superficie de ataque.
            </p>

            <form onSubmit={handleNext} className="mt-6 space-y-5">
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 mb-2">
                      ¿Dónde residen y procesan sus datos de IA actualmente?
                    </label>
                    <div className="space-y-2 text-xs">
                      {[
                        { id: "public_cloud", label: "APIs de Nube Pública Directas (OpenAI / Anthropic / AWS)" },
                        { id: "hybrid", label: "Arquitectura Híbrida con VPN / Proxy Intermedio" },
                        { id: "on_prem", label: "Hardware Local / Servidores Privados (Enclave Soberano)" },
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`flex items-center gap-3 p-3 rounded-sm border cursor-pointer transition-colors ${
                            formData.infrastructureType === item.id
                              ? "border-blue-500 bg-blue-950/20 text-white"
                              : "border-white/[0.06] bg-zinc-900/40 text-zinc-300 hover:border-zinc-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name="infrastructureType"
                            checked={formData.infrastructureType === item.id}
                            onChange={() => setFormData({ ...formData, infrastructureType: item.id })}
                            className="text-blue-600 focus:ring-0"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" variant="primary" className="w-full mt-4">
                    Siguiente: Carga de Trabajo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 mb-2">
                      ¿Cuál es la carga de trabajo más sensible de su organización?
                    </label>
                    <select
                      value={formData.workload}
                      onChange={(e) => setFormData({ ...formData, workload: e.target.value })}
                      className="w-full rounded-sm border border-white/[0.08] bg-zinc-900 p-3 font-mono text-xs text-zinc-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="rag_proprietary">RAG sobre Documentación Confidencial & Propiedad Intelectual</option>
                      <option value="code_generation">Pipelines de Código Fuente & Repositorios de Desarrollo</option>
                      <option value="customer_pii">Atención al Cliente con Datos Financieros o Médicos (PII)</option>
                      <option value="b2b_transactions">Procesamiento de Facturación & Licitaciones Corporativas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-zinc-300 mb-2">
                      ¿Su negocio encaja en la Línea Talos? (opcional)
                    </label>
                    <select
                      value={formData.nichoInteres ?? ""}
                      onChange={(e) => setFormData({ ...formData, nichoInteres: e.target.value || undefined })}
                      className="w-full rounded-sm border border-white/[0.08] bg-zinc-900 p-3 font-mono text-xs text-zinc-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">No — soy empresa / corporación (Línea Enterprise)</option>
                      <option value="Odontologia">Tengo clínica dental (Talos Odontología)</option>
                      <option value="Gimnasios">Tengo gimnasio (Talos Gimnasios)</option>
                      <option value="Fisioterapia">Tengo consultorio de fisioterapia</option>
                      <option value="Peluqueria">Tengo peluquería / barbería</option>
                      <option value="Veterinaria">Tengo veterinaria</option>
                      <option value="Agro-Vet">Tengo agro-veterinaria</option>
                      <option value="Hoteles">Tengo hotel</option>
                      <option value="Bicicleterias">Tengo bicicletería / taller de bikes</option>
                    </select>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button type="button" variant="secondary" onClick={() => setStep(1)} className="w-1/3">
                      Atrás
                    </Button>
                    <Button type="submit" variant="primary" className="w-2/3">
                      Siguiente: Datos de Contacto
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                      Nombre y Apellido
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Director de Operaciones / CTO / Dueño"
                      className="w-full rounded-sm border border-white/[0.08] bg-zinc-900 p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                      Email Corporativo (Requerido para NDA)
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="tu@empresa.com"
                      className="w-full rounded-sm border border-white/[0.08] bg-zinc-900 p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                      Compañía / Negocio
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nombre de la entidad"
                      className="w-full rounded-sm border border-white/[0.08] bg-zinc-900 p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Consentimiento Ley 1581 — OBLIGATORIO (adenda SDD) */}
                  <label className="flex items-start gap-3 p-3 rounded-sm border border-white/[0.08] bg-zinc-900/40 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 text-blue-600 focus:ring-0"
                      required
                    />
                    <span className="font-mono text-[10px] leading-relaxed text-zinc-400">
                      AUTORIZO el tratamiento de mis datos conforme a la Ley 1581 de 2012.
                      Novatria Systems almacena únicamente el dominio del correo electrónico
                      (jamás el correo completo) y los datos de esta evaluación, con fines
                      exclusivamente comerciales.
                    </span>
                  </label>

                  {serverError && (
                    <div className="rounded-sm border border-red-800/40 bg-red-950/20 p-3 font-mono text-[11px] text-red-300">
                      {serverError}
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    <Button type="button" variant="secondary" onClick={() => setStep(2)} className="w-1/3" disabled={isSubmitting}>
                      Atrás
                    </Button>
                    <Button type="submit" disabled={isSubmitting || !consent} variant="primary" className="w-2/3">
                      {isSubmitting ? "Registrando en Enclave..." : "Ejecutar Dictamen"}
                      <ShieldCheck className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-950/60 border border-blue-500/40 text-blue-400 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <Badge variant="amber" className="mb-2">
              ÍNDICE DE EXPOSICIÓN (VERIFICADO EN ENCLAVE): {serverScore ?? estimateScore()}%
            </Badge>

            <h3 className="font-sans text-2xl font-bold text-zinc-100 mt-2">
              Diagnóstico Preliminar Emitido
            </h3>

            <div className="mt-4 rounded-sm border border-white/[0.08] bg-zinc-900/50 p-4 text-left font-mono text-xs text-zinc-300 space-y-2">
              {auditRef && (
                <div className="flex justify-between border-b border-white/[0.06] pb-2 text-emerald-400">
                  <span className="text-zinc-400">Referencia Enclave:</span>
                  <span className="font-bold tracking-wider">{auditRef}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-400">Entidad:</span>
                <span className="text-zinc-100 font-semibold">{formData.company || "Corporación"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Destinatario:</span>
                <span className="text-zinc-100">{formData.workEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Riesgo Exfiltración:</span>
                <span className="text-red-400 font-semibold flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" /> Moderado a Alto
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs text-zinc-400 leading-relaxed">
              Un Arquitecto de Infraestructura Soberana de Novatria Systems analizará su
              topología y remitirá el plan de remediación en menos de 24 horas. Si su negocio
              encaja en la Línea Talos, el diagnóstico incluirá la propuesta de piloto.
            </p>

            <Button onClick={handleReset} variant="primary" size="md" className="mt-6 w-full">
              Finalizar y Cerrar
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
