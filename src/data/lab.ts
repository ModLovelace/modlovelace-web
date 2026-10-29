export interface LabEntry {
  id: string;
  category: "gatito" | "ia" | "audio" | "movil" | "devtools";
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
    id: "catjang-linux-native",
    category: "gatito",
    categoryLabel: "Catjang Lab · Linux Nativo (GNOME 50 & Wayland)",
    status: "En Desarrollo",
    date: "Octubre 2026",
    title: "Implementación nativa en GNOME 50.1 y Wayland: Arquitectura híbrida, 16 segmentos y 115 tests",
    summary:
      "Avance en worktree experimental para Linux (validado en Ubuntu 26.04, GNOME 50.1 y Wayland). GNOME dibuja la mascota de forma nativa con cuerpo de 16 segmentos, acordeón elástico, teclado global fuera del visor y termodinámica reactiva; Electron conserva configuración, licencia y audio sin alterar los renderizadores de Windows ni macOS.",
    tags: [
      "GNOME 50.1 Nativo",
      "Wayland & Ubuntu 26.04",
      "16 Segmentos",
      "Teclado Global",
      "Termodinámica",
      "115 Tests Wayland",
      "AppImage & .deb",
    ],
    metrics: [
      { label: "Tests Wayland", value: "115 / 115 OK" },
      { label: "Compositor", value: "GNOME 50.1" },
      { label: "Física", value: "16 segmentos" },
      { label: "Empaquetado", value: "AppImage & .deb" },
    ],
    details: {
      problem:
        "El aislamiento de seguridad de Wayland y la gestión de ventanas flotantes sin marcos limitaban el control de transparencia y eventos continuos de ratón/teclado en Electron puro. Se requería una solución nativa de alto rendimiento sin romper la base de código compartida con Windows y macOS.",
      solution:
        "Arquitectura híbrida desacoplada en worktree experimental: GNOME Shell dibuja la mascota de forma nativa mientras Electron gestiona la configuración, licenciamiento y audio. La última iteración incorpora: arrastre con cuerpo de 16 segmentos (movimiento de acordeón, inercia y retorno al soltar); estiramiento grande y centrado con ~50% de opacidad a mitad de la animación; patas sincronizadas con cada pulsación del teclado (incluso fuera del visor); color rojo progresivo según velocidad y actividad acumulada con vapor y enfriamiento; seguimiento ocular, caricias, corazones y ronroneo.",
      keyTakeaway:
        "Superó 115 observaciones automatizadas en un compositor Wayland aislado y comprobación obligatoria de recursos de mascotas. AppImage y .deb reconstruidos y validados sin instalarlos en el sistema. Pendiente: revisión humana del acordeón, transparencia y teclado global de esta última versión, y validación en el escritorio habitual con monitores físicos. Soporte acotado por ahora a Catjang y GNOME 50 (sin declarar aún soporte general para Ubuntu). Renderizadores compartidos de Windows y macOS 100% intactos.",
      codeSnippet: `// Arquitectura Híbrida: GNOME 50.1 Wayland + Electron Core
// 1. GNOME Shell (Worktree experimental):
//    - Renderizado nativo del felino con físicas de 16 segmentos
//    - Movimiento de acordeón, inercia y retorno elástico al soltar
//    - Estiramiento grande y centrado con ~50% de opacidad intermedia
//    - Sincronización de patas con teclado global fuera del visor
//    - Termodinámica: velocidad/pulsaciones -> rojo térmico + vapor + enfriamiento
//    - Seguimiento ocular, caricias, corazones y ronroneo acústico
// 2. Electron Core:
//    - Almacén de configuración, activación de licencia y pipeline de audio
// 3. QA & Validación:
//    - 115 tests en compositor Wayland aislado (headless)
//    - Verificación directa de artefactos AppImage y .deb sin instalar
//    - Cero regresiones: Windows y macOS permanecen intactos`,
    },
    link: {
      label: "Repositorio Catjang-Sue",
      url: "https://github.com/ModLovelace/catjang-sue",
    },
  },
  {
    id: "network-json-devtools",
    category: "devtools",
    categoryLabel: "Flutter & Dart · DevTools Extension",
    status: "Completado",
    date: "Octubre 2026",
    title: "Extensión para Dart DevTools: Inspección HTTP en vivo y descifrado criptográfico local",
    summary:
      "Diseño y desarrollo de una extensión oficial para Dart DevTools que captura el tráfico de red de aplicaciones Flutter, renderiza un árbol JSON reactivo y permite descifrar payloads sobre RSA/AES en memoria sin tocar el almacenamiento local.",
    tags: [
      "Flutter DevTools",
      "Dart Extension Protocol",
      "AES-CBC & RSA-OAEP",
      "JSON Tree View",
      "pub.dev Package",
      "Open Source",
    ],
    metrics: [
      { label: "Versión", value: "v0.1.4" },
      { label: "Validación DevTools", value: "100% Passed" },
      { label: "Persistencia", value: "Cero (Solo RAM)" },
      { label: "Licencia", value: "MIT" },
    ],
    details: {
      problem:
        "Al desarrollar y auditar aplicaciones móviles Flutter con APIs empresariales o financieras que implementan cifrado de extremo a extremo (payload encryption), el inspector estándar de red solo muestra strings Base64 o binarios ilegibles, dificultando enormemente la depuración sin comprometer la seguridad.",
      solution:
        "Creé una extensión oficial para Dart DevTools basada en el protocolo devtools_extensions: se conecta a la VM Service de Dart para capturar eventos de dart:io y HttpClient, añade filtrado instantáneo por verbo HTTP y código de respuesta, y cuenta con un motor criptográfico en memoria (AES-CBC + sobre RSA-OAEP) que descifra los payloads en caliente para renderizarlos en un árbol JSON interactivo con selección y copia.",
      keyTakeaway:
        "Las extensiones de Dart DevTools desacoplan completamente la lógica de auditoría del código de producción: se consumen como dependencia de desarrollo (dev_dependencies) y eliminan cualquier superficie de ataque en compilaciones release.",
      codeSnippet: `// Integración en dev_dependencies de Flutter
// flutter pub add dev:network_json_devtools

dev_dependencies:
  network_json_devtools: ^0.1.4

// En VS Code / DevTools:
// 1. Abre Dart DevTools en modo debug
// 2. Activa la pestaña 'network_json_devtools'
// 3. Carga la llave privada PEM (RSA) o clave AES en memoria
// 4. Inspecciona y descifra los cuerpos JSON en tiempo real`,
    },
    link: {
      label: "Paquete en pub.dev",
      url: "https://pub.dev/packages/network_json_devtools",
    },
  },
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
      url: "https://flores.modlovelace.com",
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
