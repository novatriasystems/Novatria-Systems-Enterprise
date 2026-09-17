import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

interface HeaderProps {
  onEvaluar: () => void;
  onOpenCloser?: () => void;
}

export function Header({ onEvaluar, onOpenCloser }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <img src="/logo.png" alt="Novatria Systems" className="h-8 w-auto select-none" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans text-sm font-bold uppercase tracking-tight text-zinc-100">
                Novatria Systems
              </span>
              <span className="hidden font-mono text-[9px] uppercase tracking-widest text-zinc-400 md:inline">
                // SGN ARCHITECTURE CORE
              </span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400">
              Novatria Systems
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          <a
            href="#evidencia"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Investigación Global
          </a>
          <a
            href="#prueba-viva"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Demostración en Vivo
          </a>
          <a
            href="#laboratorio"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Demo Funcional
          </a>
          <a
            href="#faq"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Preguntas Frecuentes
          </a>
          <a
            href="#empresas"
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Empresas & Proveedores
          </a>
        </nav>

        {/* Actions & Status */}
        <div className="hidden items-center gap-4 sm:flex">
          <Badge variant="emerald" pulse className="inline-flex font-mono text-[11px] tracking-wider">
            Status: Active
          </Badge>
          {onOpenCloser && (
            <button
              onClick={onOpenCloser}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-blue-400"
              title="Abrir terminal HUD"
            >
              [HUD Terminal]
            </button>
          )}
          <Button
            onClick={() => {
              const el = document.getElementById("diagnostico");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else onEvaluar();
            }}
            size="sm"
            variant="primary"
          >
            Diagnóstico Gratuito →
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            onClick={() => {
              const el = document.getElementById("diagnostico");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else onEvaluar();
            }}
            size="sm"
            variant="primary"
            className="text-[10px] px-2.5 py-1"
          >
            Diagnóstico
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
              href="#evidencia"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 hover:text-blue-400"
            >
              // Investigación Global
            </a>
            <a
              href="#prueba-viva"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 hover:text-blue-400"
            >
              // Demostración en Vivo
            </a>
            <a
              href="#laboratorio"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 hover:text-blue-400"
            >
              // Demo Funcional
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 hover:text-blue-400"
            >
              // Preguntas Frecuentes
            </a>
            <a
              href="#empresas"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-300 hover:text-blue-400"
            >
              // Empresas & Proveedores
            </a>
            {onOpenCloser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCloser();
                }}
                className="text-left font-mono text-xs uppercase tracking-[0.18em] text-blue-400 hover:underline"
              >
                // Abrir Terminal Closer
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
