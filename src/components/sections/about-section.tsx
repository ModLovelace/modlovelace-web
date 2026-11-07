import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon, YoutubeIcon, InstagramIcon } from "@/components/icons";
import { Smartphone, Monitor, Globe, Cpu, ArrowRight } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      icon: Smartphone,
      title: "Mobile & Nativo",
      description: "Flutter & Dart, iOS Nativo (Swift 6 con SceneKit/Metal) y Android (Kotlin) con soporte offline y listas para tiendas.",
    },
    {
      icon: Monitor,
      title: "Desktop & Sistemas",
      description: "Desarrollo multiplataforma en Linux (Wayland DBus a 50Hz), macOS y Windows, con Electron y C# / .NET.",
    },
    {
      icon: Globe,
      title: "Web Moderna",
      description: "React 19, Next.js con Turbopack, síntesis de audio en tiempo real con Web Audio API y accesibilidad WCAG.",
    },
    {
      icon: Cpu,
      title: "IA & Developer Tooling",
      description: "Extensiones para Dart DevTools con descifrado criptográfico en memoria y orquestación de agentes con runners sin alucinaciones.",
    },
  ];

  const metrics = [
    { value: "+7 Años", label: "Ingeniería en producción" },
    { value: "60 FPS", label: "Loop físico en Swift 6 / iOS" },
    { value: "100%", label: "Tests OK (54/54 y 32/32)" },
    { value: "pub.dev", label: "Tooling oficial Dart & Flutter" },
  ];

  return (
    <section id="sobre-mi" className="py-16 sm:py-24 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estilo Delpaqq */}
        <div className="flex flex-col items-center text-center mb-14 space-y-1.5">
          <div className="w-0.5 h-6 bg-pink-500 mx-auto rounded-full" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-neutral-400">
            03 / SOBRE MÍ
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide uppercase text-[var(--foreground)]">
            ENRIQUE BECERRA (MODLOVELACE)
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[var(--muted)] pt-1">
            Senior Software Engineer &amp; Solutions Architect · Mobile, Web &amp; Desktop
          </p>
        </div>

        {/* Layout en 2 Columnas: Ilustración/Póster + Perfil Profesional */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Columna Izquierda: Tarjeta Gráfica del Casillero / Ilustración */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] p-4 shadow-xl space-y-4">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 border border-[var(--border)]">
                <Image
                  src="/images/enrique-poster.png"
                  alt="Enrique Becerra (ModLovelace) - Software Engineer"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Status pill y badge */}
              <div className="space-y-2 pt-1 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Disponible para proyectos &amp; asesoría técnica</span>
                </div>
                <p className="text-[11px] font-mono text-[var(--muted)]">
                  Lima, Perú · Trabajo remoto global · Polyglot
                </p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Manifiesto, Trayectoria y Pilares */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] leading-snug">
                Creando experiencias digitales y herramientas de bajo nivel que la gente ama usar.
              </h3>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                Soy <strong>Enrique Becerra</strong> (conocido como <em>Mod</em> o <em>ModLovelace</em>). Llevo más de 7 años diseñando y desplegando sistemas robustos, desde aplicaciones financieras de alta seguridad para banca cooperativa y plataformas móviles empresariales para faenas mineras, hasta herramientas de código abierto como <strong>Catjang-Sue</strong>, <strong>Network JSON DevTools</strong> y videojuegos nativos en <strong>Swift 6</strong>.
              </p>
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                Mi principio rector de ingeniería es <strong>«Pausar, Diagnosticar y Resolver»</strong>: entender la causa raíz antes de escribir una sola línea, mantener cero deuda técnica oculta y asegurar que cada solución sea testeada, medible y construida para perdurar.
              </p>
            </div>

            {/* Métricas Clave */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {metrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-center space-y-0.5">
                  <span className="font-extrabold text-base sm:text-lg text-[#ff6b4a] block font-mono">
                    {m.value}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--muted)] block">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* 4 Pilares Técnicos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 text-[#ff6b4a] mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-[var(--foreground)]">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Acciones y Enlaces */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff6b4a] hover:bg-[#ea580c] text-white font-semibold text-xs transition-all shadow-md shadow-orange-500/20 active:scale-95"
              >
                <span>Iniciar Conversación</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-2">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[var(--card)] hover:bg-[var(--border)]/50 border border-[var(--border)] text-[var(--foreground)] transition-colors"
                  aria-label="GitHub de ModLovelace"
                >
                  <GithubIcon className="w-4 h-4" />
                </Link>
                <Link
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[var(--card)] hover:bg-[var(--border)]/50 border border-[var(--border)] text-[var(--foreground)] transition-colors"
                  aria-label="LinkedIn de Enrique Becerra"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </Link>
                <Link
                  href={siteConfig.links.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[var(--card)] hover:bg-[var(--border)]/50 border border-[var(--border)] text-[var(--foreground)] transition-colors"
                  aria-label="YouTube de ModLovelace"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </Link>
                <Link
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[var(--card)] hover:bg-[var(--border)]/50 border border-[var(--border)] text-[var(--foreground)] transition-colors"
                  aria-label="Instagram (@modfin_lovelace)"
                >
                  <InstagramIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
