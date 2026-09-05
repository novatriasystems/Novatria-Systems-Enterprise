import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { Header } from "../components/sections/Header";
import { HeroSection } from "../components/sections/HeroSection";
import { DoctrineValues } from "../components/sections/DoctrineValues";
import { RiskTelemetry } from "../components/sections/RiskTelemetry";
import { ServicesMatrix } from "../components/sections/ServicesMatrix";
import { LocalFirstLab } from "../components/sections/LocalFirstLab";
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
      {/* Top Command Navigation */}
      <Header
        onEvaluar={() => setIsAssessmentOpen(true)}
        onOpenCloser={() => setIsTerminalOpen(true)}
      />

      <main>
        {/* Hero with Live Enclave Monitor */}
        <HeroSection
          onEvaluar={() => setIsAssessmentOpen(true)}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />

        {/* Engineering Doctrine */}
        <DoctrineValues />

        {/* Threat Telemetry & Public Cloud Risk */}
        <RiskTelemetry onEvaluar={() => setIsAssessmentOpen(true)} />

        {/* 4 Sovereign Architectural Pillars */}
        <ServicesMatrix onEvaluar={() => setIsAssessmentOpen(true)} />

        {/* Browser Sovereign Proof-of-Work Sandbox */}
        <LocalFirstLab />
      </main>

      {/* Enterprise Perimeter Footer */}
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
