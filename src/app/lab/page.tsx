import type { Metadata } from "next";
import { LabSection } from "@/components/sections/lab-section";
import Link from "next/link";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Laboratorio Técnico & Blog de Ingeniería",
  description:
    "Bitácora técnica, experimentos activos y soluciones a problemas de bajo nivel: seguimiento DBus en Wayland para Catjang, síntesis de sonido procedural con Web Audio API, orquestación de agentes de IA y sistemas offline-first.",
  alternates: {
    canonical: `https://${siteConfig.domain}/lab`,
  },
  openGraph: {
    title: "Laboratorio Técnico & Blog de Ingeniería | Enrique Becerra",
    description:
      "Bitácora técnica, arquitectura de software y experimentos de ingeniería por Enrique Becerra (ModLovelace).",
    url: `https://${siteConfig.domain}/lab`,
  },
};

export default function LabPage() {
  return (
    <div className="flex flex-col">
      {/* Sección principal del Laboratorio & Blog */}
      <LabSection isStandalonePage={true} />

      {/* Tarjeta de Cierre / Contacto */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                <span>¿Tienes un reto técnico o quieres intercambiar ideas?</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                Construyamos software sólido juntos
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
                Disponible para proyectos de ingeniería móvil (Flutter/Android/iOS), arquitecturas distribuidas y orquestación con IA.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/25 hover:-translate-y-0.5"
              >
                <span>Iniciar Contacto</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--background)] hover:bg-[var(--border)]/40 border border-[var(--border)] text-[var(--foreground)] text-sm font-medium transition-all"
              >
                <span>Ver Portafolio</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
