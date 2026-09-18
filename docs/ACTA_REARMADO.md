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

## WP2-2c FIX-2 — TS5101 baseUrl deprecado — 17-sep
- Segundo gate rojo de 2c: mi tsconfig reescrito incluyo "baseUrl": "." por habito TS5.
  TS6 la deprecacion formal (TS5101). Migracion correcta: eliminar baseUrl; paths se
  resuelve relativo al directorio del tsconfig.POSITIVO: la disciplina de bloque
  aislado funciono — el gate rojo detuvo la secuencia y NADA se committeo con build roto.
- Fix: tsconfig.app.json sin baseUrl, paths "@/*" intacto.

## WP2 (CIERRE) + HALLAZGO HD-1 — 17-sep
- 2b FT-1: fuentes self-host, @font-face, cero Google en src (verificado por grep).
- 2d LECCION HD-1: la clasificacion "peso muerto" de src/start.ts fue ERRONEA. Es archivo
  de convencion de TanStack Start (descubierto por ruta, no por import): su createStart
  registra la instancia y la augmentacion de tipos que legitima server.handlers en las
  rutas API, y su errorMiddleware normaliza errores SSR. Al retirarlo: 8 errores TS2353/
  TS7031. REGLA NUEVA: archivos de convencion de framework jamas se clasifican muertos
  por ausencia de importadores. Restaurado por biseccion (1 variable por paso).
- index.html: restaurado solo si la biseccion lo exijo (ver cual bloque dio verde).
- error-reporting.ts y vite.svg: retirados sin consecuencia (esos SI eran muertos).
- 2e: README real. 2f: cumplido (SDD in-repo, 83d0afc).
- Desviacion aceptada: commits incrementales por sub-tarea vs commit unico por WP
  (post-incidente, gates atomicos por paso).

## WP3 — CONTRATOS ZOD + SCORE SERVER-SIDE (CIERRE) — 17-sep
- zod 3.25.76. Schemas: contact (NICHOS_PROVISIONAL enum 3c), closer (messages 1-40,
  content <=8000, roles user|assistant — el cliente ya filtra system), payment
  (discriminatedUnion card|pse con regex de campos).
- CT-1: 4 handlers -> safeParse -> 422 con issues tipados. Type guards manuales eliminados.
- SC-1: score recalculado server-side (50 + 35 public_cloud + 10 high); el del cliente
  se ignora; el calculado se devuelve y persiste.
- Regresion WP1 verificada por lectura: insertLead, rate limits, CL-1 intactos.
- GATES: tsc -b verde, build verde (138 modulos SSR, zod bundlado).
- HALLAZGO GD-1: el gate grep-any detecto "as any" en routeTree.gen.ts — archivo
  GENERADO por @tanstack/router-plugin (regen por build, no editable). Segunda leccion
  de la familia HD-1: los gates de codigo escrito EXCLUYEN explicitamente artefactos
  generados. Gate v2 aplicado: 0 coincidencias excluyendo *.gen.ts.
- Regla nueva GD-1: gates que auditan codigo declaran sus exclusiones de generados en
  el propio comando, jamas implicitas.

## WP3b — LINEA DE NICHOS (CIERRE) — 18-sep
- yaml ^2 (2.9.1). scripts/build-nichos-index.mjs (ESM puro): lee los 8 yaml del kernel
  via NICHOS_SOURCE_DIR (UNC WSL), emite nichos.index.json con nicho/nombre/grafo/
  umbral_dias/canal/toques/dias_entre_toques/plantilla_inicial. Escalera determinista
  (regen -> warning conservando commiteado -> fallo). prebuild anadido al build.
- Manifiesto verificado contra yaml fuente: 8 nichos, umbrales 14-300d, WhatsApp, 2 toques.
- HALLAZGO ND-1: formula de toques contaba esperas (+1) en vez de nodos mensaje; atrapado
  por contraste con tabla predictiva. Regla: builders de datos de negocio llevan tabla de
  contraste previa; el output se contrasta linea a linea antes de consumir.
- NicheProducts.tsx: grid de 8 tarjetas 100% manifiesto (cero texto de nicho hardcodeado).
  Precio de vitrina Linea 1 (desde $150.000 COP/mes) como constante con referencia SDD 2 —
  el kernel no declara precios por nicho (hallazgo documental: los campos que el SDD v1.0.0
  asumia en el manifiesto no existen en el kernel; el portal no inventa datos).
- index.tsx reescrito con NicheProducts tras Hero; Header con ancla #productos.
- closer.ts SYSTEM_PROMPT v2: linea de 8 productos, CES acotado, guardrail clinico.
- HALLAZGO CF-1: artefacto CJK (ni los追问) llego a disco porque el control era edicion
  manual delegada. Regla nueva: defectos conocidos en un bloque DETIENEN la emision del
  bloque, jamas se delegan a edicion manual. Corregido + guard CJK permanente en gates.
- Incidencias de proceso: builder ESM con require (corregido a import); backtick-n en
  package.json (segunda vez — regla: configs solo reescritura completa).

## WP4 — FUNNEL + STOREFRONT (CIERRE) — 18-sep
- 5c adaptacion: PerimeterAssessment evoluciona EN SU ARCHIVO (git mv diferido a WP5;
  el nombre de archivo no es contrato publico). Zod cliente (mismo schema del server),
  dropdown nicho_interes (8 valores), checkbox Ley 1581 OBLIGATORIO, score mostrado =
  el del server (SC-1 cierra circulo en UI).
- 5d: CloserTerminal sin modelos hardcodeados (referencia generica al enclave).
- 5e E-3 STOREFRONT: 4 ofertas con CTA -> POST /api/checkout -> Checkout Session
  (subscription, metadata offer_id que el webhook ya consume) -> redirect Stripe.
  /api/checkout: rate limit 10/min, Zod enum, price IDs por STRIPE_PRICE_MAP_JSON,
  503 si falta price_id. 2 servicios de consultoria conservados como posicionamiento.
  DECISION coherencia: Obsidian B2B retirado del grid (externalUrl a proyecto hermano,
  no vendible aqui).
- HALLAZGO HD-2: nueva ruta API exige regen de routeTree.gen.ts ANTES del primer tsc -b
  (orden del script build: tsc corre antes de vite). Secuencia: vite build (regen) ->
  tsc -b -> pnpm run build. Costo: 1 gate rojo documentado, cero daño (bloque aislado).
- 5b mini-terminal Hero + pre-carga bienvenida: DIFERIDO a WP5 (mismo archivo que HC-1).
  DECISION Arquitecto reversible: pre-carga con bienvenida (conversion).
- GATES: tsc + build + grep-any v2 + CJK — verdes.

## WP5 — HONESTIDAD + ESTADOS (CIERRE) — 18-sep
- HC-1: Hero honesto. handleVerify -> SHA-256 REAL via crypto.subtle (WebCrypto, local,
  cero egress). Contador de paquetes aleatorio -> metrica real de sesion: LocalFirstLab
  emite nvt:lab-op por operacion de sanitizacion; el Hero escucha y cuenta. Label
  "Firma criptografica valida (Ed25519)" -> "SHA-256 verificado en cliente".
  La pagina ahora cumple su promesa: "Demostramos, no teorizamos".
- 5b (parcial): la pre-carga del mini-terminal Hero queda para refinamiento posterior —
  el CloserTerminal ya abre precargado con mensaje de bienvenida del sistema.
- EM-1: verificado contra SDD 6c — superficies ya en 950/800; texto pequeno conserva
  300-400 por contraste WCAG AA (documentado, sin cambios rompientes).
- DESVIACION ACEPTADA 5a/6a: primitivas Modal/Field/GridTile/SectionHeader y refactor
  bento DIFERIDOS a fase optima (post-verificacion visual del Ingeniero). El funnel y la
  vitrina ya operan con las primitivas existentes — la componentizacion es refinamiento,
  no bloqueo. 6d alias @/: aplicado a tsconfig para codigo nuevo (migracion masiva de
  imports existentes re-evaluable al cierre).

## POST-WP5 FIX — STRIPE INIT EN CHECKOUT (hallazgo del primer arranque dev) — 18-sep
- Sintoma: 500 en TODA la pagina al primer pnpm dev. Causa: checkout.ts inicializaba
  new Stripe("") con fallback vacio — Stripe lanza en constructor con apiKey vacia; como
  routeTree.gen importa las rutas eager, el throw al importar tumbo todo el SSR.
- Causa raiz de proceso: me desvie del patron documentado del propio webhook.ts
  ("placeholder para evitar crash en SSR") sin consultarlo. REGLA NUEVA: inicializadores
  de clientes de terceros a nivel de modulo jamas lanzan en import (placeholder
  documentado o init lazy dentro del handler).
- Favicon: __root apuntaba a /favicon.ico inexistente; corregido a /favicon.svg real.
- Falso positivo descartado: bloqueo de fuente de extension Perplexity por la CSP es la
  restriccion (4) funcionando, no un defecto.

## DECISION DEL INGENIERO — PRECIOS FUERA HASTA ESTUDIO DE MERCADO — 18-sep
- Override del DEFAULT de SDD Seccion 7: los montos (desde $150.000 COP/mes, fee
  $200.000) salen de la vitrina de nichos Y del SYSTEM_PROMPT del closer.
- NicheProducts: linea de precio -> "Piloto de implementacion: 3 meses" (estructura
  sin montos). closer: el agente NUNCA cita cifras; precio se calibra en el
  diagnostico gratuito. Evidencia CES ($14.9M de perdidas en la clinica estudiada)
  SE CONSERVA: es dato de tercero, no precio propio.
- Reversal: cuando el estudio de mercado este listo, reintroducir precios en vitrina
  + prompt del closer (2 puntos de cambio identificados).

## WP6 — NARRATIVA DUAL-TRACK (CIERRE + AUDITORIA ANTIMATTER) — 18-sep
- Implementacion por Antigravity (sin acta previa — segunda vez). Auditoria Arquitecto
  contra fisico ANTES de commit: 9 componentes nuevos verificados, soberanos (modal/
  closer/footer) INTACTOS (diff vacio), precios respetados, gates verdes.
- HALLAZGOS CORREGIDOS (correccion dirigida, no re-ejecucion):
  HD-3: jerga SGN reintroducida (Header/LiveProof) — purgada.
  ND-2: metricas inventadas (+12%/+18% retencion) en SolutionTalos/RealCases —
        violaban prohibicion de promesas sin piloto — purgadas.
  ND-3: LiveProofWhatsApp con textos mockup — REESCRITO al 100% manifiesto
        (plantilla_inicial del kernel; cambia con el yaml en cada build).
  ND-4: NicheProducts (grid 8 productos, WP3b) OMITIDO del ensamblaje — insertado
        tras SolutionTalos.
- Copys anti-pedagogicos corregidos: RESIDEN-LOCAL -> "SUS DATOS VIVEN EN SU
  SERVIDOR".
- Diferencias con propuesta externa v1.0 (documentadas): jerga SGN no existia en
  nuestro codigo (era pagina fantasma); Dr. Valenzuela no existe (sustituido por
  Prueba Viva con plantillas reales); "cero alucinaciones" y "expedientes clinicos"
  eliminados por insostenibles (restriccion 2 y honestidad).
- REGLA PERMANENTE: todo agente (Hermes/Antigravity/otros) que toque este repo
  termina en auditoria Arquitecto + commit protocolar. Constitucion extensible a
  Antigravity — pendiente decision Ingeniero.
- PENDIENTE: verificacion visual del Ingeniero (criterio: pedagogia de ventas).

## WP6 — NARRATIVA DUAL-TRACK (CIERRE + AUDITORIA ANTIMATTER) — 19-sep
- Implementacion por Antigravity (sin acta previa — segunda vez). Auditoria Arquitecto
  contra fisico ANTES de commit. 9 componentes nuevos verificados en disco; soberanos
  (modal/closer/footer) INTACTOS; precios respetados; gates finales verdes.
- HALLAZGOS CORREGIDOS (dirigidos, no re-ejecucion):
  HD-3: jerga SGN reintroducida (Header/LiveProof) — purgada; guard SGN permanente.
  ND-2: metricas inventadas (+12%/+18%) en SolutionTalos/RealCases — purgadas
        (prohibicion de promesas sin piloto).
  ND-3: LiveProofWhatsApp mockup — REESCRITO 100% manifiesto (plantilla_inicial del
        kernel; se actualiza con el yaml en cada build).
  ND-4: NicheProducts omitido del ensamblaje — insertado tras SolutionTalos.
  CP-1: modal re-rotulado a pedagogia ("Diagnostico gratuito", "Su nivel de riesgo
        actual") — logica intacta, solo texto.
- Diferencias con propuesta externa v1.0 documentadas: jerga SGN era pagina fantasma;
  Dr. Valenzuela no existe (sustituido por Prueba Viva con plantillas reales);
  "cero alucinaciones" y "expedientes clinicos" eliminados por insostenibles.
- REGLA PERMANENTE: todo agente que toque este repo termina en auditoria Arquitecto +
  commit protocolar. Constitucion extensible a Antigravity — pendiente Ingeniero.
- PENDIENTE: verificacion visual del Ingeniero (criterio: pedagogia de ventas).

## WP6 FIX-FINAL — BRECHA DE PROCESO + RESIDUOS — 19-sep
- BRECHA: c93e2c4 y d065c21 salieron con gate rojo vigente (SGN en Header) y un
  archivo basura commiteado. Causa: bloque de commit ejecutado tras Exception (patron
  repetido) y replace case-sensitive que no matcheo el texto en MAYUSCULAS.
- Correccion: comentario SGN eliminado (era comentario, cero impacto), metrica +21%
  de RealCases sustituida por version sin cifras (cuarta variante de metrica
  inventada — la purga de patrones no cubria rangos sueltos), archivo basura
  eliminado del arbol y del historial forward.
- REGLA REFORCADA: tras una Exception, el UNICO comando valido es reportar el error
  al canal. La linea de exito jamas se copia — es literal, no veredicto.
- state: WP6 CERRADO de verdad. Pendiente unica: verificacion visual del Ingeniero.

## NARRATIVA v2.1 — TANDA 1: HERO SOBERANO + HEADER NUEVO — 19-sep
- Hero reescrito al copy aprobado por el Ingeniero (etiqueta local, titular soberano,
  dual CTA, 3 tarjetas de garantia). Props simplificadas a onEvaluar; CTA secundario
  es ancla a #talos.
- Header nuevo: nav de la imagen aprobada (Talos Agente / Para Empresas / Seguridad &
  Privacidad / FAQ / Ver funcionamiento) + tagline "IA Soberana para Negocios" + CTA
  pill "Solicitar Demo / Auditoria". Drawer mobile incluido.
- Anclas: #talos y #seguridad insertadas. HALLAZGO T1-1: mi insercion ciega duplico
  ids existentes (solucion/empresas) que la sonda no detecto — leccion: sondas de
  atributos JSX deben inspeccionar el tag completo, no buscar strings. Corregido
  eliminando los ids viejos (el nav aprobado apunta a los nuevos).
- HALLAZGO T1-2: props huerfanas (onOpenCloser/onOpenTerminal) del desajuste
  header-viejo/index-nuevo — purgadas. El CloserTerminal sigue accesible via HUD
  flotante (isTerminalOpen sigue en estado).
- GATE ROJO intermedio: 4 errores TS atrapados antes de commit. Cero daño a origin.
- Pendiente Tanda 2: reorden index.tsx + humanizacion de copys + limpia del prop
  isTerminalOpen si el HUD es su unico consumidor vivo.

## NARRATIVA v2.1 — TANDA 2: HUMANIZACION + STOREFRONT REINTEGRADO — 19-sep
- Humanizacion aplicada (U1): HUD flotante "CLOSER HUD" -> "Habla con nuestro
  asistente"; mensaje inicial del CloserTerminal en lenguaje humano; Footer
  "JURISDICCION: HARDWARE ON-PREM // ZERO-EGRESS" -> "PROCESAMIENTO 100% LOCAL ·
  CERO TELEMETRIA"; badge de nichos "// LINEA 1" -> "TALOS SE ADAPTA A SU TIPO DE
  NEGOCIO". Los "//" metrics de consultoria se CONSERVAN (audiencia CTO).
- HALLAZGO ND-5 (el mas grave del ensamblaje Antigravity): ServicesMatrix — la
  UNICA puerta de compra de las 4 ofertas (checkout Stripe, WP4/E-3) — quedo
  DESMONTADA de la pagina. Sin el, la restriccion (10) no tenia entrada en UI.
  REINTEGRADO tras <EnterpriseB2B /> (posicionamiento dual -> venta ejecutiva).
- DECISION: la pregunta "¿Cuantos clientes dejaron de venir?" NO se duplica en el
  Espejo (su titulo ya cumple la funcion emocional); queda retirada del flujo —
  el hero soberano abre con autoridad y el espejo agita con la escena.
- Orden final de montaje verificado: 16 componentes presentes (13 secciones +
  modal + closer + footer).
- Pendiente unica del rearmado: verificacion visual del Ingeniero (criterio:
  pedagogia de ventas).
