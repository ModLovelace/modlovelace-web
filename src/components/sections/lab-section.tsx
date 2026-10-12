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

import { LAB_ENTRIES, type LabEntry } from "@/data/lab";

interface LabSectionProps {
  isStandalonePage?: boolean;
}

export function LabSection({ isStandalonePage = false }: LabSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  const [expandedId, setExpandedId] = useState<string | null>("catjang-linux-native");

  const filteredEntries =
    activeFilter === "todos"
      ? LAB_ENTRIES
      : LAB_ENTRIES.filter((entry) => entry.category === activeFilter);

  return (
    <section id="lab" className={`py-12 sm:py-20 ${isStandalonePage ? "" : "border-t border-[var(--border)]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Barra superior de retorno en página dedicada /lab */}
        {isStandalonePage && (
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border)] text-xs font-mono text-[var(--muted)]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 hover:text-[var(--foreground)] transition-colors text-blue-600 dark:text-blue-400 font-semibold"
            >
              <span>← Volver al Portafolio (modlovelace.com)</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bitácora Activa · Investigaciones de Bajo Nivel</span>
            </div>
          </div>
        )}

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

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-mono min-w-0">
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
                      <div className="space-y-2 min-w-0 max-w-full">
                        <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                          <span>Fragmento de Implementación:</span>
                        </div>
                        <pre className="max-w-full p-4 rounded-xl bg-neutral-950 text-neutral-200 text-xs font-mono overflow-x-auto border border-neutral-800 leading-relaxed">
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
