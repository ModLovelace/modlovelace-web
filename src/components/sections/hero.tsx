import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        
        {/* Estado sutil con punto carmesí */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e63946] animate-pulse" />
          <span>Disponible para retos de ingeniería &amp; consultoría</span>
        </div>

        {/* Nombre & Rol principal */}
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-[var(--foreground)]">
            Enrique Becerra
          </h1>
          <p className="text-sm sm:text-base font-mono text-[var(--muted)]">
            Ingeniero de Software &amp; Especialista en Soluciones Móviles
          </p>
        </div>

        {/* Manifiesto técnico conciso */}
        <p className="text-sm sm:text-base text-[var(--foreground)]/80 leading-relaxed max-w-2xl mb-8">
          Construyo tecnología y resuelvo problemas de software de extremo a extremo. Cuento con profunda especialización en el ecosistema móvil nativo y multiplataforma (Android, iOS, Flutter), sistemas backend con .NET Core y Docker, y orquestación deliberada de agentes de IA.
        </p>

        {/* Enfoques técnicos en texto monoespaciado */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-mono text-[var(--muted)] mb-10 pb-8 border-b border-[var(--border)]">
          <span>Android · iOS · Flutter</span>
          <span className="text-[var(--border)]">/</span>
          <span>.NET Core · Docker · SQL</span>
          <span className="text-[var(--border)]">/</span>
          <span>Flujos IA &amp; QA</span>
          <span className="text-[var(--border)]">/</span>
          <span className="text-[#e63946]">Autor de Catjang-Sue</span>
        </div>

        {/* Enlaces de acción limpios */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-mono">
          <Link
            href="#proyectos"
            className="text-[var(--foreground)] hover:text-[#e63946] transition-colors underline underline-offset-4 decoration-[var(--border)] hover:decoration-[#e63946]"
          >
            Proyectos seleccionados ↓
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            GitHub ↗
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            LinkedIn ↗
          </Link>
          <Link
            href="#contacto"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            Contacto ↓
          </Link>
        </div>

      </div>
    </section>
  );
}
