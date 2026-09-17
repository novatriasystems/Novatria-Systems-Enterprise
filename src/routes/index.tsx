import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { Header } from "../components/sections/Header";
import { HeroSection } from "../components/sections/HeroSection";
import { MirrorSection } from "../components/sections/MirrorSection";
import { SolutionTalos } from "../components/sections/SolutionTalos";
import { NicheProducts } from "../components/sections/NicheProducts";
import { LiveProofWhatsApp } from "../components/sections/LiveProofWhatsApp";
import { EvidenceCES } from "../components/sections/EvidenceCES";
import { BridgeSteps } from "../components/sections/BridgeSteps";
import { FaqSection } from "../components/sections/FaqSection";
import { EnterpriseB2B } from "../components/sections/EnterpriseB2B";
import { RealCases } from "../components/sections/RealCases";
import { LocalFirstLab } from "../components/sections/LocalFirstLab";
import { DiagnosticFinal } from "../components/sections/DiagnosticFinal";
import { Footer } from "../components/sections/Footer";
import { PerimeterAssessment } from "../components/sections/PerimeterAssessment";
import { CloserTerminal } from "../components/sections/CloserTerminal";

export const Route = createFileRoute("/")({
  component: NovatriaEnterprisePage,
});

function NovatriaEnterprisePage() {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-600 selection:text-white">
      {/* Barra de Navegación (Header Superior) */}
      <Header
        onEvaluar={() => setIsAssessmentOpen(true)}
        onOpenCloser={() => setIsTerminalOpen(true)}
      />

      <main>
        {/* Sección 1: Hero */}
        <HeroSection
          onEvaluar={() => setIsAssessmentOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Sección 2: El Espejo (Escenas) */}
        <MirrorSection />

        {/* Sección 3: La Solución (Talos Engine) */}
        <SolutionTalos />

        {/* Linea 1 — Su negocio. Su Talos. (manifiesto kernel, WP3b) */}
        <NicheProducts onEvaluar={() => setIsAssessmentOpen(true)} />

        {/* Sección 4: La Prueba Viva (Demostración Interactiva) */}
        <LiveProofWhatsApp />

        {/* Sección 5: Evidencia de Terceros (Estudio CES) */}
        <EvidenceCES />

        {/* Sección 6: El Puente (Paso a Paso) */}
        <BridgeSteps />

        {/* Sección 7: Objeciones (FAQ) */}
        <FaqSection />

        {/* Sección 8: Empresas y Proveedores (Puerta Grande) */}
        <EnterpriseB2B />

        {/* Sección 9: Casos Reales */}
        <RealCases />

        {/* Sección 10: Laboratorio (Demo Interactiva Client-Side) */}
        <LocalFirstLab />

        {/* Sección 11: Cierre / Conversión Final */}
        <DiagnosticFinal />
      </main>

      {/* Pie de Página (Footer) original conservado */}
      <Footer />

      {/* Multi-Step Diagnostic Assessment Modal */}
      <PerimeterAssessment
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
      />

      {/* Live Streaming Security & Closer Terminal (/api/closer) */}
      <CloserTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Floating Tactical HUD Opener */}
      {!isTerminalOpen && (
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 rounded-sm border border-blue-500/40 bg-zinc-950/90 px-4 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-blue-400 shadow-xl shadow-black/60 backdrop-blur-md hover:border-blue-400 hover:bg-blue-950/30 hover:text-blue-300 transition-all active:scale-95"
          aria-label="Abrir Terminal Closer"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
          <TerminalIcon className="h-3.5 w-3.5" />
          <span>CLOSER HUD</span>
        </button>
      )}
    </div>
  );
}
