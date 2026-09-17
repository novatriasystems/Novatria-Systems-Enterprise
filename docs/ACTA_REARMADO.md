# ACTA_REARMADO — Novatria-Systems-Enterprise

## INC-20260916 — PERDIDA Y RECUPERACION DEL ARBOL
- 16-sep 09:10: Hermes ejecuta `mv *` con CWD=C:\Users\papel (TERMINAL_CWD deprecated), CWD raiz de perfil.
- 16-sep 09:25: `rm -rf portal-enterprise` 138s, interrumpido (Device busy). Auto-aprobacion auxiliar activa (P-INC-2).
- Perdidas: arbol fuente del portal (sin push), Downloads, Kernel_Boyaca, kernel-scripts, frutos-mi-tierra, NOMAD_Design, n8n-docker, ANTIGRAVITY_WORKPLACE, zips backup.
- Supervivientes: OneDrive (KFM), AppData, dotfolders, [PROJECT_NAME]\{novatria-core-hub, obsidian_cybernetics_b2b_v3}, edge Cloudflare.
- Causa raiz (5): CWD en perfil raiz (P-INC-1 complementado por orden ambigua del Arquitecto), auto-aprobacion auxiliar, wildcards sin friccion, deshacer destructivo, amnesia por compresion + confabulacion.

## REMEDIACION DE GOBERNANZA (aplicada y verificada)
- config.yaml: cwd -> C:\Users\papel\Novatria_Lab\hermes-workspace | hard_stop_enabled: true | pre_update_backup: true
- config.yaml: seccion approvals {destructive_slash_confirm: true, mcp_reload_confirm: true}
- .env: AUXILIARY_APPROVAL_* neutralizadas + HERMES_NO_AUTO_APPROVE=1
- Constitucion de Seguridad inyectada en 7 SOULs (global + 6 perfiles; test-agent excluido por R1)
- Rotacon de claves API pendiente de confirmacion del usuario.

## RECONSTRUCCION DEL PORTAL
- Fuente: copia USB pre-WP1 (commit 26d3fc3, 59 archivos, 4 binarios de marca intactos).
- Anonimizacion: filter-branch (canary b68a563).
- WP1 re-aplicado desde AUDITORIA_WP1.txt + 2 archivos nuevos desde canal. Verificacion: 10/10 firmas.
- Gates: pnpm install --frozen-lockfile | tsc -b | build. Resultado: VERDES.
- Push: P0 inmediato post-commit (doctrina: estado sin push = estado sin backup).

## DEUDAS TECNICAS (adendas SDD v1.0.1)
- WP3: idempotencia webhook -> SQLite (INSERT OR IGNORE). GL-2 confirmado.
- WP4: checkbox de consentimiento Ley 1581 obligatorio.
- WP5: HC-1 ampliado (hash real + label Ed25519).
- E-1 Ingeniero: rotacion clave Ed25519 (generate_license.py, comprometida en canal).
- E-2: canal de entrega de licencias. E-3: enmienda v1.0.2 storefront (SM-1: ServicesMatrix no contiene las 4 ofertas; PAY-1: sin creador de checkout).
- Pasada 3: COMPLETA (10/10 archivos leidos). Gate WP5 despejado.

## ESTADO
- WP1: RE-APLICADO Y VERIFICADO. Correctivo (acta + W-2) INCLUIDO en esta entrada.
- WP2: AUTORIZADO bajo nueva Constitucion, con comandos exactos del Arquitecto.
- Pendiente de la sesion 16-sep: rotacion de claves API (3), USN admin, winfr USB (Kernel_Boyaca - ventana del usuario), Zotero.
## WP2-2c — GH-1 (REMEDIACION INVERTIDA) — 17-sep
- pnpm remove vite-tsconfig-paths (Packages -3). tsconfigPaths: true CONSERVADO en
  vite.config.ts (nativo en Vite 8 — evidencia: warning de build de julio). Alias @/*
  anadido a tsconfig.app.json (codigo nuevo; migracion de imports en WP5).
- Nota de proceso: tres gates de transito del SDD dispararon falsos positivos (criterios
  stale del Arquitecto). Autoridad: sellador estructural (10/10 secciones, 14889 chars).
  SDD committeado: 83d0afc.
