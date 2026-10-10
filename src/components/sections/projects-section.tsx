import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ExternalLink, Smartphone } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export function ProjectsSection() {
  return (
    <section id="proyectos" className="py-16 sm:py-24 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado plano, sobrio y profesional */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-[var(--border)] gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <span>01 / Portafolio</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Proyectos Seleccionados
            </h2>
          </div>
          <p className="text-sm text-[var(--muted)] max-w-md">
            Sistemas en producción comercial, arquitecturas móviles y herramientas de software libre creadas para perdurar.
          </p>
        </div>

        {/* Grid de Proyectos Modular y Plano */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {siteConfig.projects.map((project, idx) => (
            <article
              key={idx}
              className="p-7 sm:p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-neutral-400 dark:hover:border-neutral-700 transition-all flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md"
            >
              <div className="space-y-4">
                {/* Categoría & Estado */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                    <span>{project.category}</span>
                  </span>
                  <span className="text-xs font-mono text-[var(--muted)]">
                    {project.status}
                  </span>
                </div>

                {/* Título */}
                <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                  {project.title}
                </h3>

                {/* Descripción */}
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {project.description}
                </p>

                {/* Aspectos destacados */}
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--foreground)]/80 pt-1">
                  {project.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5">
                      <span className="text-blue-600 dark:text-blue-400 font-bold select-none">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack y Botones de Acción que Resaltan */}
              <div className="pt-5 border-t border-[var(--border)] space-y-4">
                {/* Chips de tecnologías planas */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-[11px] font-mono text-[var(--muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Botones de Acción Claros y Notorios */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {/* Botón Principal de Demo o Releases si existe */}
                  {project.links.live && (
                    <Link
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-sm"
                    >
                      <span>Ver Demo en vivo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {project.links.releases && (
                    <Link
                      href={project.links.releases}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-sm"
                    >
                      <span>Descargas / Releases</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {project.links.playStore && (
                    <Link
                      href={project.links.playStore}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium text-xs hover:opacity-90 transition-all shadow-sm"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Google Play</span>
                    </Link>
                  )}

                  {project.links.appStore && (
                    <Link
                      href={project.links.appStore}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 font-medium text-xs hover:opacity-90 transition-all shadow-sm"
                    >
                      <span>App Store</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {project.links.repo && (
                    <Link
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--card)] hover:bg-[var(--border)]/50 border border-[var(--border)] text-[var(--foreground)] font-medium text-xs transition-colors"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Código GitHub</span>
                    </Link>
                  )}
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
