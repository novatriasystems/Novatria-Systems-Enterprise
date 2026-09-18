import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

interface HeaderProps {
  onEvaluar: () => void;
}

const NAV = [
  { href: "#talos", label: "Talos (Agente)" },
  { href: "#empresas", label: "Para Empresas" },
  { href: "#seguridad", label: "Seguridad & Privacidad" },
  { href: "#faq", label: "Preguntas Frecuentes" },
  { href: "#prueba-viva", label: "Ver funcionamiento" },
];

export function Header({ onEvaluar }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3">
          <img src="/logo.png" alt="Novatria Systems" className="h-8 w-auto select-none" />
          <div className="leading-tight">
            <div className="font-sans text-sm font-bold text-zinc-100">Novatria Systems</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
              IA Soberana para Negocios
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-sans text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA principal */}
        <div className="hidden md:block">
          <Button onClick={onEvaluar} size="sm" variant="primary" className="rounded-full">
            Solicitar Demo / Auditoría
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans text-sm font-medium text-zinc-300 hover:text-blue-400"
              >
                {item.label}
              </a>
            ))}
            <Button onClick={() => { setMobileMenuOpen(false); onEvaluar(); }} size="sm" variant="primary" className="mt-2 w-full">
              Solicitar Demo / Auditoría
              <ArrowRight className="h-3 w-3" />
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
