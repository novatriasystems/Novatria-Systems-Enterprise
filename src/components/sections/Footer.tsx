import { Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-zinc-950 py-16 text-zinc-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          
          {/* Brand info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Novatria Systems" className="h-7 w-auto select-none" />
              <span className="font-sans text-sm font-bold uppercase tracking-tight text-zinc-100">
                Novatria Systems
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-zinc-400">
              Despliegue de infraestructura de IA soberana, enclaves digitales aislados y arquitectura de software pesado sin dependencias de nubes públicas.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-zinc-400">
              <Lock className="h-3 w-3 text-emerald-400" />
              <span>JURISDICCIÓN: HARDWARE ON-PREM // ZERO-EGRESS</span>
            </div>
          </div>

          {/* Column 1: Doctrina */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-3">
              Doctrina & Perímetro
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#doctrina" className="hover:text-zinc-200 transition-colors">Soberanía Absoluta</a></li>
              <li><a href="#riesgo" className="hover:text-zinc-200 transition-colors">Telemetría de Fugas</a></li>
              <li><a href="#servicios" className="hover:text-zinc-200 transition-colors">Obsidian Cybernetics B2B</a></li>
              <li><a href="#servicios" className="hover:text-zinc-200 transition-colors">Faro Comercial B2B</a></li>
            </ul>
          </div>

          {/* Column 2: Verificación */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-3">
              Laboratorio Abierto
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://novatria-core-hub.pages.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  NOVATRIA // LAB ↗
                </a>
              </li>
              <li><a href="#lab" className="hover:text-zinc-200 transition-colors">Sanitizador en RAM</a></li>
              <li><a href="#lab" className="hover:text-zinc-200 transition-colors">Media Privacy Shield</a></li>
              <li><a href="#lab" className="hover:text-zinc-200 transition-colors">Zero-Egress DevTools</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 font-mono text-[10px] text-zinc-400 sm:flex-row">
          <div>
            &copy; {new Date().getFullYear()} Novatria Systems Enterprise. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>ED25519 VERIFIED</span>
            <span>&bull;</span>
            <span>AIR-GAPPED COMPATIBLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
