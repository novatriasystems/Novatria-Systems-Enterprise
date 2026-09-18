import { Lock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-zinc-950 py-16 text-zinc-400">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Novatria Systems" className="h-7 w-auto select-none" />
              <span className="font-sans text-sm font-bold uppercase tracking-tight text-zinc-100">
                Novatria Systems
              </span>
            </div>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-zinc-400">
              IA que trabaja en su propio computador. Recuperamos los clientes que su
              negocio dejó de atender — y sus datos jamás salen de su empresa.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-zinc-400">
              <Lock className="h-3 w-3 text-emerald-400" />
              <span>PROCESAMIENTO 100% LOCAL · CERO TELEMETRÍA</span>
            </div>
          </div>

          {/* Columna 1: Navegación viva */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-3">
              Explorar
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#talos" className="hover:text-zinc-200 transition-colors">Talos — El Orquestador</a></li>
              <li><a href="#prueba-viva" className="hover:text-zinc-200 transition-colors">Prueba en vivo</a></li>
              <li><a href="#empresas" className="hover:text-zinc-200 transition-colors">Empresas & Proveedores</a></li>
              <li><a href="#faq" className="hover:text-zinc-200 transition-colors">Preguntas frecuentes</a></li>
            </ul>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-3">
              Empezar
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#diagnostico" className="text-blue-400 hover:text-blue-300 transition-colors">Diagnóstico gratuito</a></li>
              <li><a href="#laboratorio" className="hover:text-zinc-200 transition-colors">Laboratorio</a></li>
            </ul>
          </div>

        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 font-mono text-[10px] text-zinc-400 sm:flex-row">
          <div>
            &copy; {new Date().getFullYear()} Novatria Systems. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>PROCESAMIENTO LOCAL</span>
            <span>&bull;</span>
            <span>CERO TELEMETRÍA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
