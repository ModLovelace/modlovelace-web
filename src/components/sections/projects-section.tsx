import Link from "next/link";
import { siteConfig } from "@/config/site";

export function ProjectsSection() {
  return (
    <section id="proyectos" className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        
        {/* Encabezado editorial */}
        <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-3 mb-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
            Proyectos Seleccionados
          </h2>
          <span className="text-[11px] font-mono text-[var(--muted)]">
            Código abierto &amp; Producción
          </span>
        </div>

        {/* Lista de Proyectos Minimalista */}
        <div className="divide-y divide-[var(--border)]">
          {siteConfig.projects.map((project, idx) => (
            <article key={idx} className="py-7 space-y-3 group">
              
              {/* Encabezado del proyecto: Título + Categoría */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-base sm:text-lg font-medium text-[var(--foreground)] group-hover:text-[#e63946] transition-colors">
                  {project.title}
                </h3>
                <span className="text-xs font-mono text-[var(--muted)]">
                  {project.category} · {project.status}
                </span>
              </div>

              {/* Descripción clara y concisa */}
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                {project.description}
              </p>

              {/* Puntos destacados clave */}
              <ul className="space-y-1 text-xs text-[var(--foreground)]/75">
                {project.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2">
                    <span className="text-[#e63946] font-mono select-none">―</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Stack & Enlaces limpios */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-mono">
                <span className="text-[11px] text-[var(--muted)]">
                  {project.tech.join(" · ")}
                </span>

                <div className="flex items-center gap-4 text-xs shrink-0">
                  {project.links.repo && (
                    <Link
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--foreground)] hover:text-[#e63946] transition-colors"
                    >
                      GitHub (⭐) ↗
                    </Link>
                  )}
                  {project.links.releases && (
                    <Link
                      href={project.links.releases}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      Descargas ↗
                    </Link>
                  )}
                  {project.links.live && (
                    <Link
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      Demo en vivo ↗
                    </Link>
                  )}
                  {project.links.playStore && (
                    <Link
                      href={project.links.playStore}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      Google Play ↗
                    </Link>
                  )}
                  {project.links.appStore && (
                    <Link
                      href={project.links.appStore}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
                    >
                      App Store ↗
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
