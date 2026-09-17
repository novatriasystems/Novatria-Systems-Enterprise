import { useState } from "react";
import { ArrowRight, CheckCircle2, Lock, Sparkles } from "lucide-react";

export function DiagnosticFinal() {
  const [formData, setFormData] = useState({
    nameOrRole: "",
    businessName: "",
    email: "",
    phone: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="diagnostico" className="relative border-b border-white/[0.08] bg-zinc-950 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 py-1 text-xs font-mono text-blue-300 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>DIAGNÓSTICO GRATUITO DE CLIENTES PERDIDOS...</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Calcule cuánto está perdiendo su negocio.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto">
            Ingrese los datos de su negocio para que un especialista prepare un informe con la estimación confidencial del volumen de clientes que Talos reactivaría durante su piloto.
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-sans text-2xl font-bold text-white">
                Solicitud Recibida con Éxito
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Un arquitecto de Talos preparará su diagnóstico de reactivación y lo contactará en el número <strong>{formData.phone || "indicado"}</strong>.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ nameOrRole: "", businessName: "", email: "", phone: "" });
                }}
                className="mt-4 text-xs font-mono text-blue-400 hover:underline"
              >
                Enviar otra consulta →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Field 1: Name or Role */}
                <div>
                  <label className="block font-mono text-xs text-zinc-300 mb-2">
                    Nombre o Cargo:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nameOrRole}
                    onChange={(e) => setFormData({ ...formData, nameOrRole: e.target.value })}
                    placeholder="Ej. Dr. Carlos / Dueño"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Field 2: Business Name */}
                <div>
                  <label className="block font-mono text-xs text-zinc-300 mb-2">
                    Nombre del Negocio:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="Ej. Clínica Dental Odonto"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Field 3: Email */}
                <div>
                  <label className="block font-mono text-xs text-zinc-300 mb-2">
                    Email del Negocio:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ej.contacto@clinica.com"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Field 4: Phone */}
                <div>
                  <label className="block font-mono text-xs text-zinc-300 mb-2">
                    Teléfono de Contacto:
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+57 300 000 000"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-600/25 transition-all active:scale-[0.99] disabled:opacity-70"
                >
                  <span>
                    {isLoading ? "Generando diagnóstico confidencial..." : "Solicitar diagnóstico y cita estratégica"}
                  </span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              {/* Security Privacy Notice */}
              <div className="flex items-center justify-center gap-2 pt-2 text-center text-xs font-mono text-zinc-500">
                <Lock className="h-3.5 w-3.5 text-emerald-400" />
                <span>Sus datos están protegidos por protocolo criptográfico local. Cero spam.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
