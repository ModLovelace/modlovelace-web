"use client";

import Link from "next/link";
import { FlaskConical, ArrowRight, Sparkles, Cpu, Music, Terminal } from "lucide-react";
import { LAB_ENTRIES } from "@/data/lab";

export function LabPreviewSection() {
  // Tomamos los 3 experimentos más emblemáticos para el resumen en Home
  const featured = [
    {
      entry: LAB_ENTRIES.find((e) => e.id === "catjang-linux-native") || LAB_ENTRIES[0],
      icon: "🐾",
      color: "amber",
    },
    {
      entry: LAB_ENTRIES.find((e) => e.id === "flores-web-audio") || LAB_ENTRIES[3],
      icon: "🌻",
      color: "yellow",
    },
    {
      entry: LAB_ENTRIES.find((e) => e.id === "ai-lifecycle-hooks") || LAB_ENTRIES[2],
      icon: "🤖",
      color: "blue",
    },
  ];

  return (
    <section id="lab" className="py-16 sm:py-20 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado elegante de sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-[var(--border)] gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-mono">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>02 / Laboratorio &amp; Blog Técnico</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
              Experimentos, Bitácora &amp; Avances
            </h2>
          </div>

          <Link
            href="/lab"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 hover:underline font-semibold w-fit"
          >
            <span>Ver bitácora completa en modlovelace.com/lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid de 3 Tarjetas Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {featured.map(({ entry, icon }, idx) => (
            <Link
              key={idx}
              href="/lab"
              className="p-5 sm:p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-blue-500/50 hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{icon}</span>
                    <span className="text-[11px] font-mono text-[var(--muted)]">
                      {entry.categoryLabel.split("·")[0]}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[var(--muted)] font-medium">
                    {entry.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[var(--foreground)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                  {entry.title}
                </h3>

                <p className="text-xs text-[var(--muted)] line-clamp-3 leading-relaxed">
                  {entry.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border)]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-[11px] text-[var(--muted)]">
                  {entry.metrics[0]?.label}: <strong>{entry.metrics[0]?.value}</strong>
                </span>
                <span className="text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                  Leer caso ➔
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Tarjeta CTA destacada para explorar la página dedicada /lab */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
              Página Independiente de Investigación
            </span>
            <p className="text-xs sm:text-sm text-[var(--foreground)]/85">
              Accede a la bitácora completa con snippets de código, retos de bajo nivel y conclusiones de arquitectura.
            </p>
          </div>

          <Link
            href="/lab"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/20 shrink-0 hover:-translate-y-0.5"
          >
            <span>Explorar Laboratorio Completo ➔</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
