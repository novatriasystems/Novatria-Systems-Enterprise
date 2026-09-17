# N-PORTAL REARMADO — SDD v1.0.1 (CONSOLIDADO)
**Proyecto:** Novatria-Systems-Enterprise → portal-enterprise · **Propietario:** Novatria Systems
**Linaje:** v1.0.0 (Estratega) → **v1.0.1 (Arquitecto)** — enmiendas A-1..A-8, decisiones P-1..P-7,
directriz de ruptura del Ingeniero incorporada y ejercida (ver Sección 8).
**Rol:** ÚNICA fuente de verdad del rearmado. Todo trabajo se valida contra este documento.
Toda decisión fuera de él escala al Arquitecto. Nada se improvisa.

---

## SECCIÓN 0 — IDENTIDAD Y MISIÓN

Novatria Systems es una firma de ciberseguridad e ingeniería de software soberano. Este
proyecto es su **portal corporativo enterprise**: vitrina de servicios, captura de
prospectos cualificados, pago con licenciamiento automático y demostración en vivo del
agente de cierre con IA local (cero SaaS de IA, cero telemetría).

**MISIÓN DEL REARMADO:** el portal funciona — no se reconstruye. Se **reorganiza con
superioridad demostrable** para vender la estructura real de la firma: **Kernel del Arnés +
Línea de Nichos (8 productos) + Servicios Enterprise**, con los hallazgos de auditoría
remediados y el funnel conectado a persistencia real.

**PRINCIPIO RECTOR — REORGANIZACIÓN CON SUPERIORIDAD DEMOSTRABLE:**
La conservación es el DEFAULT. La ruptura estructural está AUTORIZADA (directriz del
Ingeniero) y exige tres condiciones acumulativas:
  (a) argumento de superioridad escrito en el acta,
  (b) verificación de que ninguna de las 10 restricciones (Sección 5) se toca,
  (c) aprobación del Arquitecto en la auditoría del WP.
**Lista de conservación base (default, no dogma):** los 4 endpoints de src/routes/api/,
las 4 ofertas (NEURIS_1, TALOS_2, MITHRA_3, WEBDEV_4), el ciclo
Stripe→webhook→generate_license.py, el perímetro de server.ts, la lib de errores, las
9 secciones existentes. Lo que se AGREGA: línea de nichos, funnel modal, contratos Zod,
persistencia de leads, fixes de auditoría. Lo que se MODIFICA: lo que fixes y nueva
arquitectura exigen, más las rupturas de Sección 8.
---

## SECCIÓN 1 — CONTEXTO: ESTADO CERTIFICADO (AUDITORÍA FÍSICA)

**1.1 Jurisdicción y control.** Ruta canónica actual (WP2-2a cumplida — ver acta):
C:\Users\papel\Novatria_Lab\Proyectos\Novatria-Systems-Enterprise. Git: main, push activo
a github.com/novatriasystems/Novatria-Systems-Enterprise. Runtime verificado: Node v24.13.1,
pnpm 11.9.0. Stack: TanStack Start + React 19 + Vite 8 + Tailwind v4 CSS-first +
TypeScript (project references) + Stripe SDK + pnpm. Estado: WP1 completado (11 fixes,
commit 37ae4fb, firmas 11/11, gates verdes).

**1.2 Backend auditado (4 endpoints + perímetro) — estado POST-WP1.**
- server.ts: CSP con nonce por request, Trusted Types, HSTS preload, COOP/CORP,
  X-Frame-Options DENY, Permissions-Policy, normalización de errores h3 del SSR. NI-1
  aplicado (inyector por callback). Intocable salvo WP2-2b (CSP de fuentes).
- closer.ts: rate limit 10/min/IP (rate-limit.ts con purga), SYSTEM_PROMPT Hormozi
  backend-only, escape CL-1 aplicado, modelo por env TALOS_MODEL, CORS * eliminado,
  despacho a INFERENCE_URL | OLLAMA_HOST | localhost:11434, SSE, timeout 30s en streaming.
- webhook.ts: firma Stripe antes de confiar en event.id, idempotencia por líneas exactas
  (W-1), comentario TOCTOU con veredicto GL-2 (W-2), rotación mensual (W-3), 422 sin
  email (W-4), OFFER_MAP y scriptPath por env (W-5), whitelist de offers, execFile sin
  shell, anti-DoS 1MB.
- payment.ts: stub de UX-tracking con rate limit. El pago real vive en webhook.ts.
- contact.ts: consume lead-store (node:sqlite), log reducido a reference+score, rate
  limit 5/min. Persistencia: data/leads.db, email_domain solo (Ley 1581).

**1.3 MATRIZ DE HALLAZGOS.** 13 originales + 6 del Arquitecto. Estado: WP1 remedió
CT-2/CT-3/CT-4/CL-1..4/W-1..W-5/NI-1 (13 ítems). Pendientes: CT-1 y SC-1 (WP3),
FT-1 y GH-1 (WP2), HC-1 y EM-1 (WP5).

**1.4 Frontend.** 9 secciones + 4 primitivas (Badge, Button, Card, DragonBackdrop) +
CSS-first con tokens verificados (#09090b base, #2563eb primario). Tono: corporativo
frío, técnico, determinista. Cero emojis. Cero neón. Pasada 3 del Arquitecto: COMPLETA.

**1.5 Peso muerto nominal (retiro en WP2-2d con build de verificación y acta):**
app.config.ts, src/start.ts, index.html raíz, src/assets/vite.svg,
src/lib/error-reporting.ts, README.md de plantilla.

**1.6 [ING-1] RESUELTO:** desarrollo en Windows Host. LICENSE_SCRIPT_PATH permite la
migración futura a WSL cambiando una env-var.
---

## SECCIÓN 2 — MODELO DE NEGOCIO QUE EL PORTAL DEBE VENDER

**LÍNEA 1 — PRODUCTOS POR NICHO (Talos, pyme):** capa de orquestación que recupera ingresos
perdidos por inasistencia/clientes inactivos en negocios de servicio recurrente. El kernel
está construido y certificado (fuera de este repo); el portal lo VENDE como 8 productos:
  Talos Odontología · Talos Gimnasios · Talos Fisioterapia · Talos Peluquería ·
  Talos Veterinaria · Talos Agro-Vet · Talos Hoteles · Talos Bicicleterías
Dato de venta central (fuente citada y acotada): estudio Universidad CES (Medellín) —
costo promedio mensual por inasistencias odontológicas en la clínica estudiada:
COP $14.955.492; causa #1: olvido (28%). El 90% de los mensajes de Talos ataca esa causa.
Precio: desde $150.000 COP/mes (piloto 3 meses + fee $200.000 una vez).

**LÍNEA 2 — SERVICIOS ENTERPRISE:** Neuris, Talos-for-enterprise, Mithra, WebDev — pago por
Stripe checkout con licencia automática. Reposicionadas para empresa mediana y grande.

**Despliegue dual (mensaje de marca):** nube local privada en el negocio (on-premise, los
datos jamás salen) o gestionado por Novatria. Meta: cloud multi-tenant propia.

---

## SECCIÓN 3 — ARQUITECTURA DE DESTINO DEL PORTAL

Orden de secciones (single-page + anclas):
1. Header fijo: anclas #productos #servicios #laboratorio #faq + CTA "Diagnóstico gratuito"
2. HERO: propuesta de valor de recuperación de ingresos + CTA modal + mini-terminal closer
3. #productos — grid de 8 tarjetas generadas desde nichos.index.json (WP3b): nombre,
   evento de dinero perdido que ataca, umbral, "desde $150.000 COP/mes". Fuente única:
   los yaml del kernel. El portal JAMÁS duplica esa información a mano.
4. #kernel — CÓMO FUNCIONA: grafo → scheduler → canal asistido → ledger/report COP.
   Lenguaje de dueño de negocio, cero jerga técnica.
5. EVIDENCIA: estudio CES citado con acotación correcta + formato del reporte mensual.
   PROHIBIDO prometer % de reducción sin piloto.
6. #servicios — ServicesMatrix (4 ofertas, flujo Stripe intacto)
7. #laboratorio — LocalFirstLab + RiskTelemetry existentes
8. #faq — privacidad, DIAN, WhatsApp, precios
9. Footer + CloserTerminal flotante (existente)

**Reglas de arquitectura:**
- nichos.index.json es GENERADO por scripts/build-nichos-index.mjs leyendo los 8 yaml
  desde env NICHOS_SOURCE_DIR (default documentado:
  \\wsl.localhost\Ubuntu\home\papel\Talos\nichos). Escalera del prebuild: (1) fuente
  alcanzable → regenerar y validar; (2) inalcanzable pero manifiesto commiteado existe →
  warning y continuar; (3) inalcanzable y sin manifiesto → fallar con mensaje
  determinista. El build NUNCA depende de WSL vivo.
- El closer actualiza su SYSTEM_PROMPT: los 8 productos, dato CES acotado, guardrail de
  datos clínicos. Conserva todas sus reglas.
- El funnel (DiagnosticModal) captura nicho_interes (dropdown = manifiesto) → SQLite.
- Modelo de egress: allowlist = {inferencia local, Stripe}. Tras WP2: cero terceros en
  la carga de página.
---

## SECCIÓN 4 — PAQUETES DE TRABAJO (ORDEN INMUTABLE)

### WP1 — FIXES DE AUDITORÍA + PERSISTENCIA — COMPLETADO (ver acta, commit 37ae4fb)
11 ítems aplicados y verificados por firmas 11/11 + gates verdes: gitignore data/,
lead-store (node:sqlite), rate-limit.ts (closer 10/min, contact 5/min, payment 10/min),
closer (CL-1 escape, TALOS_MODEL, sin CORS *), contact (persistencia + log mínimo),
webhook (W-1 líneas exactas, W-2 TOCTOU+GL-2 documentado, W-3 rotación mensual, W-4
422 sin email, W-5 env OFFER_MAP/LICENSE_SCRIPT_PATH), server.ts NI-1 callback.

### WP2 — HIGIENE + SOBERANÍA (EN CURSO)
2a. Migración de ruta: CUMPLIDA por restauración post-incidente (ruta limpia
    C:\Users\papel\Novatria_Lab\Proyectos\Novatria-Systems-Enterprise). Registrada.
2b. FT-1 — Soberanía tipográfica: fuentes self-host OFL en public/fonts/, @font-face en
    styles.css, ELIMINAR links/preconnect de fonts.googleapis.com en __root.tsx, CSP de
    server.ts sin excepciones Google. Gate: cero peticiones a terceros en carga.
2c. GH-1 (REMEDIACIÓN INVERTIDA — evidencia julio: Vite 8 soporta resolve.tsconfigPaths
    nativamente): CONSERVAR la clave en vite.config.ts; REMOVER el plugin
    vite-tsconfig-paths (pnpm remove). Añadir paths "@/*" a tsconfig.app.json para
    código nuevo; migración de imports existentes diferida a WP5.
2d. Retiro del peso muerto (Sección 1.5) con build tras cada retiro y acta. Si el build
    exige un archivo, se restaura y se registra el hallazgo.
2e. README real: qué es, stack, las 7 env-vars (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
    INFERENCE_URL, OLLAMA_HOST, TALOS_MODEL, LICENSE_SCRIPT_PATH, NICHOS_SOURCE_DIR),
    cómo correr, referencia al SDD. Versión coherente.
2f. Este SDD: actualizar jurisdicción → v1.1.0 en-repo.
Gates: build verde · README sin plantilla · cero terceros en carga.

### WP3 — CONTRATOS ZOD + SCORE SERVER-SIDE
3a. zod ^3. src/lib/schemas/: contact.schema.ts, closer.schema.ts, payment.schema.ts.
    Handlers → safeParse → 422 con issues. Type guards manuales eliminados.
3b. SC-1: contact recalcula el score server-side; el del cliente se IGNORA en servidor.
3c. nicho_interes: enum estático provisional → manifiesto en WP3b.
Gates: tsc -b + grep-any + leads siguen persistiendo.

### WP3b — LÍNEA DE NICHOS
4a. yaml ^2 a devDependencies.
4b. scripts/build-nichos-index.mjs: 8 yaml desde NICHOS_SOURCE_DIR → nichos.index.json
    (nombre, evento de dinero perdido, umbral, precio). Prebuild + escalera determinista.
    El manifiesto SE COMMITEA.
4c. components/sections/NicheProducts.tsx: grid de 8 tarjetas desde el manifiesto.
    Marca pública: "Talos {Nicho}".
4d. closer.ts: SYSTEM_PROMPT con línea de 8 productos + dato CES acotado + guardrail.
4e. DiagnosticModal (esqueleto) registra nicho_interes.
Gates: build verde · manifiesto 8 entradas · tarjetas renderizadas.

### WP4 — FUNNEL (+ STOREFRONT ENTERPRISE — adenda E-3 aprobada por el Ingeniero)
5a. DiagnosticModal 2 etapas: cualificación (schema + nicho_interes + checkbox Ley 1581
    OBLIGATORIO: "almacenamos únicamente el dominio del correo") → entrega: score + CTA.
5b. Hero: CTA abre el modal + mini-terminal closer pre-cargada.
5c. PerimeterAssessment → DiagnosticModal (git mv).
5d. CloserTerminal: error sin nombres de modelo hardcodeados (referencia TALOS_MODEL).
5e. STOREFRONT E-3: sección #ofertas con las 4 ofertas (NEURIS_1, TALOS_2, MITHRA_3,
    WEBDEV_4) y endpoint /api/checkout que crea Checkout Sessions (price IDs por env
    STRIPE_PRICE_MAP_JSON). Conserva los 3 servicios de consultoría como posicionamiento.
Criterio E2E: visitante → modal → fila SQLite con nicho_interes y consent_utc → closer
responde vía Ollama.

### WP5 — BENTO + COMPONENTIZACIÓN + HONESTIDAD
6a. Primitivas nuevas: Modal, Field, StatusBadge, GridTile, SectionHeader. Refactor con
    comportamiento intacto. Nichos y LocalFirstLab en grid bento.
6b. HC-1: SHA-256 real vía crypto.subtle (sobre nichos.index.json o payload sanitizado);
    contador de paquetes → métrica real de sesión (evento nvt:lab-op); label "Ed25519"
    del tab integrity se corrige o elimina. Cero egress.
6c. EM-1: superficies/bordes/badges a Emerald-700/Red-800; texto pequeño puede conservar
    300-400 por contraste WCAG AA. Verificación en acta.
6d. Migración oportunista de imports a alias @/.
Gates: build verde · cero regresiones · audita el Arquitecto contra pasada 3 (COMPLETA).
---

## SECCIÓN 5 — RESTRICCIONES INQUEBRANTABLES (MUROS DUROS)
1. Cero egress de IA externa: inferencia exclusivamente Ollama local.
2. Cero datos clínicos en el ledger ni en cualquier capa del portal.
3. Cero secretos hardcodeados. Todo por env-var (las 8 nombradas aquí, incluidas
   STRIPE_PRICE_MAP_JSON y NICHOS_SOURCE_DIR).
4. Cero telemetría saliente. Allowlist: inferencia local + Stripe. Tras WP2: cero
   terceros en la carga de página.
5. Ley 1581: solo dominio de email en logs/BD, jamás email completo.
6. pnpm v11+. npm/yarn proscritos.
7. TypeScript: cero any implícito Y cero any explícito (gate grep por commit).
   Full strict = evaluación post-WP5.
8. La línea de 8 productos + las 4 ofertas enterprise funcionales al cierre.
9. La matriz de hallazgos (Sección 1.3) remediada al cierre.
10. El ciclo Stripe → webhook → licencia funcionando al cierre.
**Operativas:** un commit por WP con gates en output crudo y hash en acta · cero
hardcodeo de precios, modelos, rutas · copys en español neutro, tono Novatria ·
dependencias nuevas solo las declaradas (zod, yaml) · resto escala al Arquitecto.

---

## SECCIÓN 6 — VERIFICACIÓN FINAL DEL REARMADO
1. pnpm build verde en la ruta canónica.
2. 8 tarjetas renderizadas desde nichos.index.json.
3. Modal → fila en SQLite con nicho_interes y consent_utc; cero emails completos en BD.
4. Closer responde vía Ollama (TALOS_MODEL).
5. Checkout de prueba → firma válida → licencia → reintento → DUPLICATE_IGNORED.
6. grep -ri "odisseus" = 0 · cero "[PROJECT_NAME]" · cero localhost:11434 fuera del
   fallback documentado.
7. Carga de página: cero peticiones a terceros.
8. README + SDD sin drift · acta con los hashes de todos los WPs.

---

## SECCIÓN 7 — DECISIONES QUE EL AGENTE NO TOMA (ESCALAN)
Precios en vitrina [DEFAULT: "desde $150.000 COP/mes" en nichos; enterprise sin precio
público] · Marca [DEFAULT: "Talos {Nicho}"] · Deploy target · Cambios a server.ts más
allá de lo especificado · Dependencias no declaradas · Rupturas sin protocolo.
Fallback: si node:sqlite fallara, escalar ANTES de sustituir. No improvisar.

---

## SECCIÓN 8 — DECISIONES DE RUPTURA DEL ARQUITECTO
ACEPTADAS: R1 soberanía tipográfica (WP2) · R2 node:sqlite (WP1, hecho) · R3 nonce por
callback (WP1, hecho) · R4 score server-side (WP3) · R5 hero honesto (WP5) · R6 alias @/
con tsconfigPaths nativo de Vite 8 (WP2, remediación invertida por evidencia).
RECHAZADAS: X1 feature-folders · X2 strict-dynamic CSP · X3 nonce por API del framework
· X4 monorepo portal+kernel.

---

## SECCIÓN 9 — PROTOCOLO DE AUDITORÍA Y ACTA
Por cada WP: (1) hash del commit, (2) archivos tocados, (3) output crudo de gates. El
Arquitecto audita el diff contra el código físico: lo no autorizado = rechazo.
Autorización explícita para el siguiente WP. Pasada 3: COMPLETA (gate de WP5 despejado).
docs/ACTA_REARMADO.md — una entrada por WP: fecha, WP, hash, gates, desviaciones.
Ejecución de mutaciones: comandos exactos del Arquitecto (directriz post-incidente);
Hermes solo bajo Constitución y contrato de comandos.
