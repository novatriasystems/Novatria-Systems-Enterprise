import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Novatria Systems // Sovereign Enterprise Operations" },
      { name: "description", content: "Infraestructura de IA soberana y blindaje de propiedad intelectual para empresas." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  notFoundComponent: NotFoundComponent,
  component: RootComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-50 antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-zinc-950 text-zinc-100">
      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">404 // PERÍMETRO FUERA DE RUTA</span>
      <h1 className="font-sans text-3xl font-bold">Esta ruta no existe en el enclave.</h1>
      <a href="/" className="mt-2 rounded-sm border border-blue-500/40 bg-blue-950/30 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-blue-400 hover:bg-blue-950/50">
        Volver al inicio
      </a>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}