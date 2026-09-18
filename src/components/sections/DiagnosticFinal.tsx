import { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";
import { contactSchema } from "../../lib/schemas/contact.schema";

/**
 * S11 Conversion final — WP7. Persiste en /api/contact (mismo funnel del modal):
 * SQLite con minimizacion Ley 1581 (solo dominio del email). Consentimiento
 * OBLIGATORIO. Telefono eliminado del formulario: sin columna en BD, no se
 * colecta lo que no se almacena (decision documentada en acta — reversible).
 */
export function DiagnosticFinal() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [formData, setFormData] = useState({ nameOrRole: "", businessName: "", email: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setServerError("Debes autorizar el tratamiento del dominio del correo para continuar.");
      return;
    }
    const check = contactSchema.safeParse({
      fullName: formData.nameOrRole,
      company: formData.businessName,
      workEmail: formData.email,
    });
    if (!check.success) {
      setServerError(check.error.issues[0]?.message ?? "Revisa los campos");
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
        if (data.reference) setReference(data.reference);
        setIsSubmitted(true);
      } else {
        setServerError("No pudimos registrar el diagnóstico. Intenta de nuevo.");
      }
    } catch {
      setServerError("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="diagnostico" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 py-1 text-xs font-mono text-blue-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>DIAGNÓSTICO GRATUITO DE CLIENTES PERDIDOS...</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Descubra cuánto dinero está perdiendo por clientes no atendidos.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto">
            Solicite su diagnóstico de recuperación de cartera sin costo y reciba un plan
            de implementación para su empresa.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-white">
                Diagnóstico registrado con éxito
              </h3>
              {reference && (
                <div className="inline-flex items-center gap-2 rounded-sm border border-emerald-500/30 bg-emerald-950/30 px-4 py-2 font-mono text-xs text-emerald-300">
                  Referencia: <strong>{reference}</strong>
                </div>
              )}
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Un especialista preparará su diagnóstico de reactivación y lo contactará
                en el correo indicado.
              </p>
              <button
                onClick={() => { setIsSubmitted(false); setConsent(false); setFormData({ nameOrRole: "", businessName: "", email: "" }); }}
                className="mt-2 text-xs font-mono text-blue-400 hover:underline"
              >
                Enviar otra consulta →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                    Nombre y Cargo
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.nameOrRole}
                    onChange={(e) => setFormData({ ...formData, nameOrRole: e.target.value })}
                    placeholder="Dueño / Gerente / CTO"
                    className="w-full rounded-sm border border-white/[0.08] bg-zinc-950 p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                    Nombre del Negocio
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Su empresa o entidad"
                    className="w-full rounded-sm border border-white/[0.08] bg-zinc-950 p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-1">
                  Email Corporativo
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@negocio.com"
                  className="w-full rounded-sm border border-white/[0.08] bg-zinc-950 p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <label className="flex items-start gap-3 p-3 rounded-sm border border-white/[0.08] bg-zinc-900/40 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 text-blue-600 focus:ring-0"
                />
                <span className="font-mono text-[10px] leading-relaxed text-zinc-400">
                  AUTORIZO el tratamiento de mis datos conforme a la Ley 1581 de 2012.
                  Novatria Systems almacena únicamente el dominio del correo electrónico
                  (jamás el correo completo) y los datos de este formulario.
                </span>
              </label>

              {serverError && (
                <div className="rounded-sm border border-red-800/40 bg-red-950/20 p-3 font-mono text-[11px] text-red-300">
                  {serverError}
                </div>
              )}

              <Button type="submit" disabled={isSubmitting || !consent} variant="primary" size="lg" className="w-full">
                {isSubmitting ? "Registrando..." : "Solicitar diagnóstico gratuito de mi negocio"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
