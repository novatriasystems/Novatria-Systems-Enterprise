### DOCUMENTO DE DISEÑO DE SOFTWARE (SDD): NOVATRIA-SYSTEMS-ENTERPRISE

**CLASIFICACIÓN:** ARQUITECTURA SOBERANA ENTERPRISE
**VERSIÓN:** 1.0.0-enterprise-init
**JURISDICCIÓN FÍSICA:** `C:\Users\papel\Novatria-Systems-Enterprise`

---

#### 1. METADATOS DEL SISTEMA Y STACK TECNOLÓGICO

El sistema se ejecuta bajo un paradigma de renderizado híbrido (SSR/SPA) con ejecución de API Routes en el mismo runtime, garantizando latencia cero en red para la lógica de negocio interna.

*   **Runtime Core:** Node.js / Vite 6 Dev Server.
*   **Framework UI:** React 19.
*   **Orquestador de Rutas y SSR:** TanStack Router + TanStack Start.
*   **Lenguaje:** TypeScript 5.x (Estricto, `strict: true`).
*   **Estilos:** Tailwind CSS v4 (Inyección vía `@tailwindcss/vite`).
*   **Gestión de Estado y Caché:** TanStack Query.
*   **Dependencias UI:** `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`.
*   **Procesamiento de Pagos:** `stripe` (SDK Backend).

#### 2. ARQUITECTURA DE DIRECTORIOS FÍSICA

El workspace se segmenta en capas de abstracción estrictas. Cero contaminación cruzada.

```text
C:\Users\papel\Novatria-Systems-Enterprise\
├── src/
│   ├── components/         # Capa de presentación pura (UI Enterprise)
│   │   ├── ui/             # Primitivas (Button, Card, Dialog)
│   │   └── sections/       # Secciones de página (Hero, Services, Footer)
│   ├── lib/                # Utilidades core y captura de errores
│   │   ├── error-capture.ts
│   │   ├── error-page.ts
│   │   ├── error-reporting.ts
│   │   └── utils.ts        # Helper `cn()` para Tailwind
│   ├── routes/             # Rutas físicas (File-based routing)
│   │   ├── api/            # Endpoints perimetrales (Backend)
│   │   │   ├── closer.ts   # Proxy de inferencia local (Ollama)
│   │   │   ├── payment.ts  # Saneamiento de payload de pago
│   │   │   └── webhook.ts  # Idempotencia y despacho de licencias
│   │   ├── __root.tsx      # Shell HTML, Inyección de CSS, QueryClient
│   │   └── index.tsx       # Página principal (Stealth Enterprise UI)
│   ├── server.ts           # Punto de entrada del servidor (CSP, Headers)
│   ├── start.ts            # Middleware de TanStack Start
│   └── styles.css          # Definición de tokens Tailwind v4
├── public/                 # Assets estáticos
├── package.json
├── tailwind.config.ts      # (Si aplica en v4, sino CSS-first)
├── tsconfig.json
└── vite.config.ts
```

#### 3. ARQUITECTURA DE BACKEND (EL ENCLAVE PERIMETRAL)

El backend opera bajo el dogma "Local First". No existen despachos a SaaS externos para operaciones críticas de IA.

*   **`POST /api/closer` (Agente CLOSER_NOVATRIA):**
    *   **Flujo:** Recibe mensajes del frontend -> Aplica Rate Limiting (10 req/min/IP) -> Inyecta System Prompt (Doctrina Hormozi) -> Envuelve input de usuario con tags `<user_input>` (Anti-Prompt Injection) -> Despacha vía `fetch` a `http://localhost:11434/v1/chat/completions` (Ollama local).
    *   **Streaming:** Retorna un `ReadableStream` en formato `text/event-stream` (SSE) directamente desde el modelo local, con un timeout `AbortSignal.timeout(30000)` para prevenir ataques Slowloris.
*   **`POST /api/payment` (Gateway Saneado):**
    *   **Flujo:** Recibe payload no sensible (last4, marca, tipo de persona) -> Valida tipado -> Retorna referencia efímera generada con `crypto.getRandomValues`.
    *   **Higiene:** Cero persistencia en disco. Saneamiento de variables en memoria invocado antes del return.
*   **`POST /api/webhook` (Cumplimiento de Licencias):**
    *   **Flujo:** Recibe raw body de Stripe -> Valida firma criptográfica -> Controla idempotencia leyendo `data/processed_webhooks.txt` -> Ejecuta binario Python nativo (`generate_license.py`) vía `child_process.execFile` -> Registra evento.
*   **`server.ts` (Security Headers Core):**
    *   Inyecta nonces criptográficos aleatorios en cada request para Cabeceras de Seguridad de Contenido (CSP).
    *   Fuerza HSTS, `X-Frame-Options: DENY`, y aislamiento de origen (COOP/COEP).

#### 4. CAPA DE PRESENTACIÓN (STEALTH ENTERPRISE UI)

Se erradica la estética "ciberpunk/hacker" (neones, glitch, scanlines). Se adopta una estética de Consola Corporativa Silenciosa, inspirada en la distribución de `gethouston.ai`.

*   **Sistema de Diseño (Design Tokens):**
    *   **Fondos:** `Zinc-950` (Base), `Zinc-900` (Superficies/Tarjetas).
    *   **Bordes:** `Zinc-800` (Bordes sutiles, sin glow).
    *   **Acentos:** Azul Corporativo (`Blue-600`) para CTAs principales. Verde desaturado (`Emerald-700`) para estados de éxito. Rojo desaturado (`Red-800`) para alertas.
    *   **Tipografía:** `Inter` o `Geist` para tipografía base (legibilidad máxima). `JetBrains Mono` restringido exclusivamente a métricas, logs técnicos y hashes.
*   **Estructura UI (Index.tsx):**
    1.  **HeroSection:** Propuesta de valor directa, CTA de auditoría, widget de estado del enclave (sutil, no animaciones agresivas).
    2.  **RiskTelemetry:** Datos de fugas de IA presentados como métricas de negocio (ROI, riesgo operativo), no como alertas de cataclismo.
    3.  **ServicesMatrix:** Grid de 4 ofertas (Neuris, Talos, Mithra, WebDev). Tarjetas limpias, bordes rectos, tipografía jerárquica.
    4.  **PaymentGateway:** Integrado en el flujo de adquisición, UI limpia con iconos SVG de franquicias.
    5.  **ProvisioningForm:** Formulario multi-paso cualificador. Validación de dominios corporativos en cliente.
    6.  **CloserNovatria:** Widget de chat flotante. Interfaz de terminal minimalista, no intrusiva.

#### 5. PROTOCOLO DE HIGIENE Y DESPLIEGUE

*   **Variables de Entorno:** Uso estricto de `import.meta.env` y `process.env`. Cero hardcodeo de secrets (Stripe, URLs de inferencia).
*   **Build:** `pnpm run build` generará artefactos estáticos y el bundle de servidor para TanStack Start.
*   **Validación:** TypeScript estricto bloquea el build si existe cualquier tipado implícito o `any`.

---