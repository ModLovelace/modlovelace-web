import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon, YoutubeIcon, InstagramIcon } from "@/components/icons";
import { Smartphone, Monitor, Globe, Cpu, ArrowRight } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      icon: Smartphone,
      iconColor: "text-[#ff6b4a] bg-[#ff6b4a]/10 border-[#ff6b4a]/20",
      title: "Mobile",
      description: "Apps nativas y multiplataforma con soporte offline-first, biometría y publicación en tiendas.",
    },
    {
      icon: Globe,
      iconColor: "text-violet-500 dark:text-violet-400 bg-violet-500/10 border-violet-500/20",
      title: "Web",
      description: "Plataformas modernas en React y Next.js, interfaces fluidas y servicios backend escalables.",
    },
    {
      icon: Monitor,
      iconColor: "text-sky-500 dark:text-sky-400 bg-sky-500/10 border-sky-500/20",
      title: "Desktop",
      description: "Software multiplataforma para Linux, macOS y Windows con integración nativa y bajo consumo.",
    },
    {
      icon: Cpu,
      iconColor: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      title: "IA & Tooling",
      description: "Flujos con agentes de IA, automatización técnica y extensiones de diagnóstico para equipos.",
    },
  ];

  const metrics = [
    { value: "+7 Años", label: "En producción real", accent: "text-[#ff6b4a]" },
    { value: "+150k", label: "Descargas en tiendas", accent: "text-violet-600 dark:text-violet-400" },
    { value: "3 Entornos", label: "Mobile · Web · Desktop", accent: "text-[var(--foreground)]" },
    { value: "Open Source", label: "pub.dev & GitHub", accent: "text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <section id="sobre-mi" className="pb-16 sm:pb-20 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Uniforme Estilo Delpaqq: Línea conectada al borde + Numerador + Título */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="w-0.5 h-10 sm:h-12 bg-gradient-to-b from-violet-500 to-[#ff6b4a] mx-auto mb-3.5" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-1.5">
            03 / SOBRE MÍ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-[var(--foreground)]">
            ENRIQUE BECERRA (MODLOVELACE)
          </h2>
          <p className="text-xs font-mono text-[var(--muted)] pt-1.5">
            Senior Software Engineer &amp; Solutions Architect · Mobile, Web &amp; Desktop
          </p>
        </div>

        {/* Layout en 2 Columnas: Ilustración/Póster + Perfil Profesional */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Columna Izquierda: Tarjeta Gráfica del Casillero / Ilustración */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] p-4 shadow-xl flex flex-col justify-between gap-4">
              <div className="relative w-full flex-1 min-h-[380px] sm:min-h-[420px] rounded-xl overflow-hidden bg-neutral-900 border border-[var(--border)]">
                <Image
                  src="/images/enrique-poster.png"
                  alt="Enrique Becerra (ModLovelace) - Software Engineer"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Status pill y badge */}
              <div className="space-y-1.5 pt-1 text-center shrink-0">
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

          {/* Columna Derecha: Manifiesto, Trayectoria y Pilares en Tarjeta Estructurada */}
          <div className="lg:col-span-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm flex flex-col justify-between h-full gap-6">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] leading-snug">
                Creando productos digitales sólidos para Mobile, Web y Desktop.
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Soy <strong className="text-[var(--foreground)]">Enrique Becerra</strong> (conocido como <em>ModLovelace</em>). Llevo más de 7 años diseñando y desplegando software en producción: desde aplicaciones financieras para banca cooperativa y plataformas móviles offline-first para minería, hasta herramientas open source como <strong className="text-[var(--foreground)]">Catjang-Sue</strong> y <strong className="text-[var(--foreground)]">Network JSON DevTools</strong>.
              </p>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Mi enfoque es entender la causa raíz antes de escribir código, cuidar el rendimiento en cada plataforma y entregar soluciones limpias, probadas y fáciles de mantener.
              </p>
            </div>

            {/* Métricas Clave */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-stretch">
              {metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[var(--background)]/60 border border-[var(--border)] text-center flex flex-col justify-center space-y-0.5">
                  <span className={`font-extrabold text-sm sm:text-base block font-mono ${m.accent}`}>
                    {m.value}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--muted)] block leading-tight">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* 4 Pilares Técnicos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-[var(--background)]/60 border border-[var(--border)] flex items-start gap-3 h-full">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${p.iconColor}`}>
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
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border)]/60">
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
