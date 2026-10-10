export interface LabEntry {
  id: string;
  category: "gatito" | "ia" | "audio" | "movil";
  categoryLabel: string;
  status: "En Desarrollo" | "En Investigación" | "Completado";
  date: string;
  title: string;
  summary: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  details: {
    problem: string;
    solution: string;
    keyTakeaway: string;
    codeSnippet?: string;
  };
  link?: { label: string; url: string };
}

export const LAB_ENTRIES: LabEntry[] = [
  {
    id: "catjang-wayland",
    category: "gatito",
    categoryLabel: "Catjang Lab · Linux Wayland",
    status: "En Desarrollo",
    date: "Octubre 2026",
    title: "Seguimiento de cursor global a 50Hz en GNOME Shell Wayland vía DBus",
    summary:
      "En Wayland moderno, screen.getCursorScreenPoint() de Electron se congela sobre apps nativas. Diseñé un daemon ligero en Python que consulta GNOME Shell a través de DBus para alimentar la mirada reactiva de Catjang.",
    tags: ["Electron", "Wayland", "GNOME DBus", "Python Daemon", "Linux"],
    metrics: [
      { label: "Frecuencia", value: "50 Hz" },
      { label: "Latencia DBus", value: "0.2 ms" },
      { label: "Consumo CPU", value: "< 0.8%" },
    ],
    details: {
      problem:
        "Wayland por seguridad bloquea el acceso de aplicaciones X11 y Electron a coordenadas del puntero global fuera de su propia ventana. Esto congelaba los ojos de la mascota cuando el usuario navegaba en terminales nativas o navegadores.",
      solution:
        "Implementé un micro-servicio que interroga la extensión KandoIntegration en org.gnome.Shell vía bus de sesión (GetWMInfo) y transmite las coordenadas normalizadas al proceso principal de Electron a 50 FPS.",
      keyTakeaway:
        "Interoperabilidad sin hacks de root: una latencia menor a 1ms mantiene la ilusión de vida orgánica sin violar el aislamiento de seguridad de Wayland.",
      codeSnippet: `// Consulta DBus a GNOME Shell a 50Hz
bus = Gio.bus_get_sync(Gio.BusType.SESSION, None)
proxy = Gio.DBusProxy.new_sync(
    bus, Gio.DBusProxyFlags.NONE, None,
    "org.gnome.Shell",
    "/org/gnome/shell/extensions/KandoIntegration",
    "org.gnome.Shell.Extensions.KandoIntegration", None
)
x, y = proxy.GetWMInfo()["cursor"]`,
    },
    link: {
      label: "Repositorio Catjang-Sue",
      url: "https://github.com/ModLovelace/catjang-sue",
    },
  },
  {
    id: "catjang-stretch",
    category: "gatito",
    categoryLabel: "Catjang Lab · Físicas & UI",
    status: "Completado",
    date: "Septiembre 2026",
    title: "Elongación de 16 segmentos y péndulo con BrowserWindow.setShape()",
    summary:
      "Recorte de ventana transparente a 111x111px en reposo, y desactivación dinámica con setWindowShape([]) durante el arrastre para desplegar el acordeón elástico (385px) y la oscilación pendular sin parpadeos.",
    tags: ["setShape()", "SVG Morphing", "setPointerCapture", "XWayland"],
    metrics: [
      { label: "Segmentos", value: "16 nodos" },
      { label: "Elongación máx", value: "385 px" },
      { label: "Suite de Tests", value: "54 / 54 OK" },
    ],
    details: {
      problem:
        "Si la ventana de Electron se mantiene en su tamaño expandido (385px), el usuario no puede hacer clic en las ventanas que están detrás del espacio transparente. Si se recorta fija a 111px, la animación de estiramiento se corta bruscamente.",
      solution:
        "Mascara nativa dinámica: en reposo se aplica una máscara compacta de 111px. Al iniciar el evento pointerdown, se invoca setWindowShape([]) permitiendo el balanceo pendular completo (±22° en cola). Al asentar la física, se restaura la máscara compacta.",
      keyTakeaway:
        "La física interactiva requiere sincronizar el ciclo de vida del gestor de ventanas del sistema operativo con el bucle de renderizado de requestAnimationFrame.",
    },
    link: {
      label: "Ver Releases de Catjang",
      url: "https://github.com/ModLovelace/catjang-sue/releases/latest",
    },
  },
  {
    id: "ai-lifecycle-hooks",
    category: "ia",
    categoryLabel: "IA & Workflows · Agentes Autónomos",
    status: "En Investigación",
    date: "Octubre 2026",
    title: "Orquestación multi-agente y guardarraíles: Gemini CLI, Claude & Cursor",
    summary:
      "Protocolo de comunicación reactivo entre agentes de inteligencia artificial y el entorno de trabajo. Reacciones de estado en vivo a concentración profunda, ejecución de comandos y confirmación de cambios.",
    tags: ["Antigravity SDK", "Claude Code", "Lifecycle Hooks", "Testing Riguroso"],
    metrics: [
      { label: "Agentes Soportados", value: "5 modelos" },
      { label: "Retardo IPC", value: "< 15 ms" },
      { label: "Falsos Positivos", value: "0 %" },
    ],
    details: {
      problem:
        "Los asistentes de código pierden contexto cuando realizan tareas multi-archivo de gran escala, o cometen errores mecánicos cuando no existe una pausa sistemática entre diagnóstico y ejecución.",
      solution:
        "Diseñé guardarraíles de contexto estrictos basados en el principio rector 'Pausar, Diagnosticar y Resolver'. Catjang y el entorno visual cambian de estado de ánimo según la fase del agente (lectura, ejecución, éxito o bloqueo).",
      keyTakeaway:
        "La observabilidad visual del estado de un agente de IA reduce drásticamente el tiempo de supervisión humana durante refactorizaciones complejas.",
    },
  },
  {
    id: "flores-web-audio",
    category: "audio",
    categoryLabel: "Web Audio · Síntesis Procedural",
    status: "Completado",
    date: "Septiembre 2026",
    title: "Síntesis acústica en tiempo real con Web Audio API (Cero archivos MP3)",
    summary:
      "Cómo generar una experiencia musical armónica sintetizada en vivo por el navegador a través de curvas de ganancia exponenciales, reduciendo el peso de la experiencia interactiva a menos de 150KB totales.",
    tags: ["Web Audio API", "GainNode Curves", "React 18", "Audio Síntesis"],
    metrics: [
      { label: "Archivos Audio", value: "0 bytes" },
      { label: "Bundle Total", value: "< 150 KB" },
      { label: "Rendimiento", value: "60 FPS" },
    ],
    details: {
      problem:
        "Cargar archivos de audio pesados en una experiencia web móvil genera retrasos de carga y consumo innecesario de ancho de banda para los usuarios.",
      solution:
        "Diseñé una cadena de sintetizadores con Web Audio API que genera ondas senoidales y triangulares procesadas con curvas exponenciales para emular campanillas acústicas y melodías orgánicas procedimentales sincronizadas con la floración.",
      keyTakeaway:
        "El audio procedural web es ultraligero, interactivo y jamás se desincroniza con los eventos del DOM.",
      codeSnippet: `// Síntesis armónica procedural en vivo
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.type = "sine";
osc.frequency.setValueAtTime(freq, ctx.currentTime);
gain.gain.setValueAtTime(0.08, ctx.currentTime);
gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
osc.connect(gain);
gain.connect(ctx.destination);`,
    },
    link: {
      label: "Demo de Flores Amarillas",
      url: "https://regala-flores-amarillas.vercel.app",
    },
  },
  {
    id: "offline-first-mobile",
    category: "movil",
    categoryLabel: "Arquitectura Móvil · Sistemas",
    status: "Completado",
    date: "Agosto 2026",
    title: "Arquitecturas offline-first con colas de sincronización deterministas",
    summary:
      "Estrategias de persistencia cifrada y reconciliación de datos sin conectividad en entornos mineros e industriales (WebControl) y aplicaciones financieras de alta concurrencia (Santa Isabel).",
    tags: ["Flutter", "Kotlin", "SQLite Cifrado", "Sync Queues", "Offline-First"],
    metrics: [
      { label: "Disponibilidad", value: "100% Offline" },
      { label: "Colisiones", value: "0 pérdidas" },
      { label: "Cifrado", value: "AES-256" },
    ],
    details: {
      problem:
        "En faenas remotas sin red celular, las aplicaciones deben validar credenciales, accesos y turnos con precisión absoluta sin depender de llamadas HTTP activas.",
      solution:
        "Arquitectura de réplica local con almacenes SQLite cifrados, firmas HMAC para validaciones off-line y colas transaccionales con reintentos exponenciales y desduplicación en el gateway .NET Core.",
      keyTakeaway:
        "El modo offline no es una característica opcional; es la base sobre la que se debe modelar cualquier entidad de dominio crítica.",
    },
  },
];
