"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FlaskConical, 
  Terminal, 
  Cpu, 
  Music, 
  Smartphone, 
  ArrowUpRight, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ExternalLink
} from "lucide-react";

interface LabEntry {
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

const LAB_ENTRIES: LabEntry[] = [
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

export function LabSection() {
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  const [expandedId, setExpandedId] = useState<string | null>("catjang-wayland");

  const filteredEntries =
    activeFilter === "todos"
      ? LAB_ENTRIES
      : LAB_ENTRIES.filter((entry) => entry.category === activeFilter);

  return (
    <section id="lab" className="py-16 sm:py-24 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado del Laboratorio & Blog */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-10 border-b border-[var(--border)] gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>02 / Laboratorio &amp; Blog Técnico</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Experimentos, Bitácora &amp; Avances
            </h2>
          </div>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: "todos", label: "Todos los Avances" },
            { id: "gatito", label: "🐾 Catjang Lab (Gatito)", icon: Sparkles },
            { id: "ia", label: "🤖 Agentes de IA", icon: Cpu },
            { id: "audio", label: "🎵 Web Audio & Síntesis", icon: Music },
            { id: "movil", label: "📱 Arquitectura Móvil", icon: Smartphone },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm font-semibold"
                    : "bg-[var(--card)] hover:bg-[var(--border)]/50 border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Lista de Experimentos / Artículos de Bitácora */}
        <div className="space-y-6">
          {filteredEntries.map((entry) => {
            const isExpanded = expandedId === entry.id;

            return (
              <article
                key={entry.id}
                className={`rounded-2xl border transition-all duration-300 bg-[var(--card)] ${
                  isExpanded
                    ? "border-blue-500/50 shadow-md ring-1 ring-blue-500/20"
                    : "border-[var(--border)] hover:border-neutral-400 dark:hover:border-neutral-700"
                }`}
              >
                {/* Cabecera / Vista Previa del Experimento */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                  className="p-6 sm:p-7 cursor-pointer select-none space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                        {entry.categoryLabel}
                      </span>
                      <span className="text-[var(--border)] font-mono">/</span>
                      <span className="text-[var(--muted)] text-[11px] font-mono">
                        {entry.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-medium ${
                          entry.status === "En Desarrollo"
                            ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300"
                            : entry.status === "En Investigación"
                            ? "bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300"
                            : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300"
                        }`}
                      >
                        {entry.status}
                      </span>

                      <div className="w-7 h-7 rounded-lg bg-[var(--background)] flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)]">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Título & Resumen */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] leading-snug">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed max-w-4xl">
                      {entry.summary}
                    </p>
                  </div>

                  {/* Tags & Métricas rápidas */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)]/60">
                    <div className="flex flex-wrap gap-1.5">
                      {entry.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-[11px] font-mono text-[var(--muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-5 text-xs font-mono">
                      {entry.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="flex items-center gap-1.5">
                          <span className="text-[var(--muted)]">{m.label}:</span>
                          <span className="font-semibold text-[var(--foreground)]">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contenido Extendido (Bitácora Técnica & Detalles) */}
                {isExpanded && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-[var(--border)] bg-neutral-50/50 dark:bg-neutral-900/40 rounded-b-2xl space-y-5 animate-in fade-in-50 duration-200">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
                      {/* El reto técnico */}
                      <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] space-y-1.5">
                        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider font-mono">
                          El Reto Técnico / Desafío
                        </span>
                        <p className="text-xs text-[var(--muted)] leading-relaxed">
                          {entry.details.problem}
                        </p>
                      </div>

                      {/* La solución implementada */}
                      <div className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] space-y-1.5">
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider font-mono">
                          Solución Arquitectónica
                        </span>
                        <p className="text-xs text-[var(--muted)] leading-relaxed">
                          {entry.details.solution}
                        </p>
                      </div>
                    </div>

                    {/* Conclusión clave */}
                    <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-950 dark:text-blue-200 leading-relaxed font-medium">
                        <strong>Conclusión de ingeniería:</strong> {entry.details.keyTakeaway}
                      </p>
                    </div>

                    {/* Código de muestra si aplica */}
                    {entry.details.codeSnippet && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                          <span>Fragmento de Implementación:</span>
                        </div>
                        <pre className="p-4 rounded-xl bg-neutral-950 text-neutral-200 text-xs font-mono overflow-x-auto border border-neutral-800 leading-relaxed">
                          <code>{entry.details.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {/* Enlace al código o demo */}
                    {entry.link && (
                      <div className="pt-2 flex justify-end">
                        <Link
                          href={entry.link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-sm"
                        >
                          <span>{entry.link.label}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}

                  </div>
                )}
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
