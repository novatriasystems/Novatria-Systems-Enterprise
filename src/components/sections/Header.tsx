import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface HeaderProps {
  onEvaluar: () => void;
  onOpenCloser?: () => void;
}

export function Header({ onEvaluar, onOpenCloser }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <img src="/logo.png" alt="Novatria Systems" className="h-8 w-auto select-none" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-sm font-bold uppercase tracking-tight text-zinc-100">
                Novatria Systems
              </span>
              <span className="hidden font-mono text-[9px] uppercase tracking-widest text-zinc-500 md:inline">
                // ENTERPRISE
              </span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400">
              Sovereign AI Infrastructure
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <a
            href="#productos"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Productos
          </a>
          <a
            href="#doctrina"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Doctrina
          </a>
          <a
            href="#riesgo"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Riesgo
          </a>
          <a
            href="#servicios"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Servicios
          </a>
          <a
            href="#lab"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Laboratorio
          </a>
        </nav>

        {/* Actions & Status */}
        <div className="hidden items-center gap-4 sm:flex">
          <Badge variant="emerald" pulse className="hidden xl:inline-flex">
            Air-Gapped Ready
          </Badge>
          {onOpenCloser && (
            <button
              onClick={onOpenCloser}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-blue-400"
            >
              [HUD Terminal]
            </button>
          )}
          <Button onClick={onEvaluar} size="sm" variant="primary">
            Auditar Perímetro
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button onClick={onEvaluar} size="sm" variant="primary" className="text-[10px] px-2.5 py-1">
            Auditar
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            <a
              href="#doctrina"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 hover:text-blue-400"
            >
              // Doctrina & Valores
            </a>
            <a
              href="#riesgo"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 hover:text-blue-400"
            >
              // Telemetría de Riesgo
            </a>
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 hover:text-blue-400"
            >
              // Arquitecturas de Servicio
            </a>
            <a
              href="#lab"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 hover:text-blue-400"
            >
              // Novatria Lab (Client-Side)
            </a>
            {onOpenCloser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCloser();
                }}
                className="text-left font-mono text-xs uppercase tracking-[0.18em] text-blue-400 hover:underline"
              >
                // Abrir Terminal Closer_Novatria
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
