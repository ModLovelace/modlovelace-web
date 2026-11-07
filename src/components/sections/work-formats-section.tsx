"use client";

import { ArrowRight } from "lucide-react";

export function WorkFormatsSection() {
  const handleSelectFormat = (formatSubject: string, messageHint: string) => {
    const contactSection = document.getElementById("contacto");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("modlovelace:select-format", {
          detail: { subject: formatSubject, hint: messageHint },
        })
      );
    }
  };

  const formats = [
    {
      number: "FORMATO #1",
      title: "Revisión puntual",
      description:
        "Tienes una app móvil, un sistema web/desktop o una idea con IA y necesitas una auditoría técnica externa y honesta.",
      usdPrice: "USD 72–120",
      penPrice: "≈ S/ 280–440",
      isFeatured: false,
      duration: "Una sesión de 60–90 min",
      payment: "100 % por adelantado",
      bullets: [
        "Revisión de arquitectura, código móvil (Flutter/iOS/Android) o flujos de IA.",
        "Diagnóstico de causa raíz y documento técnico con 3 pasos concretos.",
        "Si luego contratas un mini proyecto, te descuento el 100% de lo pagado.",
      ],
      ctaText: "Pedir una revisión",
      subjectVal: "Formato #1: Revisión puntual (USD 72–120)",
      hintVal: "Hola Enrique, me gustaría coordinar una revisión puntual para mi proyecto sobre...",
    },
    {
      number: "FORMATO #2",
      title: "Mini proyecto",
      description:
        "Necesitas algo construido y funcionando en producción: un prototipo, una extensión de tooling o una integración robusta.",
      usdPrice: "Desde USD 480",
      penPrice: "≈ S/ 1 760",
      isFeatured: true, // Tarjeta destacada con borde violeta estilo Delpaqq
      duration: "1 a 3 semanas",
      payment: "50 % al empezar, 50 % al entregar",
      bullets: [
        "Alcance y entregable medible acordados por escrito antes de empezar.",
        "Avances visibles y funcionales durante todo el desarrollo.",
        "Código probado, limpio, con documentación técnica de entrega.",
      ],
      ctaText: "Contar mi proyecto",
      subjectVal: "Formato #2: Mini proyecto (Desde USD 480)",
      hintVal: "Hola Enrique, tengo en mente un mini proyecto con las siguientes características...",
    },
    {
      number: "FORMATO #3",
      title: "Acompañamiento",
      description:
        "Tu equipo ya está construyendo y buscas una mirada senior externa para decisiones de arquitectura, entregas o agentes de IA.",
      usdPrice: "Desde USD 320/mes",
      penPrice: "≈ S/ 1 200/mes",
      isFeatured: false,
      duration: "Mensual, sin permanencia",
      payment: "Mes por adelantado",
      bullets: [
        "Sesiones periódicas 1 a 1 o con tu equipo de desarrollo.",
        "Revisión de decisiones técnicas, cuellos de botella y uso de IA.",
        "Notas y lineamientos escritos después de cada sesión técnica.",
      ],
      ctaText: "Hablar del acompañamiento",
      subjectVal: "Formato #3: Acompañamiento (Desde USD 320/mes)",
      hintVal: "Hola Enrique, nos interesa contar con acompañamiento técnico mensual para nuestro equipo...",
    },
  ];

  return (
    <section id="formatos" className="py-16 sm:py-24 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estilo Delpaqq */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 space-y-2">
          <div className="w-0.5 h-6 bg-pink-500 mx-auto rounded-full" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-neutral-400">
            06 / TRABAJEMOS JUNTOS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide uppercase text-[var(--foreground)]">
            FORMATOS PARA TRABAJAR CONMIGO
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] max-w-2xl mx-auto leading-relaxed pt-1">
            Tres maneras de empezar, de menos a más compromiso. Si no sabes cuál te sirve, la primera conversación es para eso.
          </p>
        </div>

        {/* Banner Superior: Primera conversación · Gratis */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-emerald-500/40 transition-colors">
          <div className="space-y-1 sm:space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
              <h3 className="font-bold text-sm sm:text-base text-[var(--foreground)]">
                Primera conversación · Gratis
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
              20 minutos para entender qué quieres resolver y decirte si puedo ayudar. Si no es lo mío, también te lo digo.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              handleSelectFormat(
                "Primera conversación (20 min · Gratis)",
                "Hola Enrique, me gustaría agendar la primera conversación de 20 minutos para conversar sobre..."
              )
            }
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-xs font-semibold text-white border border-neutral-700/50 transition-all shrink-0 shadow-sm active:scale-95 group cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Pedir los 20 minutos</span>
            <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Grid de 3 Tarjetas de Formatos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {formats.map((fmt, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between rounded-2xl bg-[var(--card)] p-6 sm:p-7 transition-all duration-300 shadow-sm hover:shadow-xl ${
                fmt.isFeatured
                  ? "border-2 border-violet-500/80 dark:border-violet-500 relative shadow-violet-500/10"
                  : "border border-[var(--border)] hover:border-violet-500/40"
              }`}
            >
              <div className="space-y-5">
                
                {/* Cabecera de la Tarjeta */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                      {fmt.number}
                    </span>
                    {fmt.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-[10px] font-mono font-bold uppercase text-violet-600 dark:text-violet-400">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--foreground)] tracking-tight">
                    {fmt.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed min-h-[38px]">
                    {fmt.description}
                  </p>
                </div>

                {/* Precios (-20% Ajustado a Enrique Becerra) */}
                <div className="pt-1">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[var(--foreground)] tracking-tight">
                      {fmt.usdPrice}
                    </span>
                    <span className="text-xs font-mono text-[var(--muted)] font-semibold">
                      {fmt.penPrice}
                    </span>
                  </div>
                </div>

                {/* Línea divisoria punteada */}
                <div className="border-b border-dashed border-[var(--border)]" />

                {/* Ficha Técnica: Duración y Pago */}
                <div className="grid grid-cols-2 gap-2 text-xs py-1">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-neutral-400 block">
                      DURACIÓN
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-[var(--foreground)] block">
                      {fmt.duration}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-neutral-400 block">
                      PAGO
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold text-[var(--foreground)] block">
                      {fmt.payment}
                    </span>
                  </div>
                </div>

                {/* Puntos Clave con viñeta de color */}
                <ul className="space-y-2.5 pt-1 text-xs text-[var(--muted)] leading-relaxed">
                  {fmt.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b4a] shrink-0 mt-1.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Botón CTA al pie de la tarjeta */}
              <div className="pt-6 sm:pt-8 mt-auto">
                <button
                  type="button"
                  onClick={() => handleSelectFormat(fmt.subjectVal, fmt.hintVal)}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer active:scale-95 ${
                    fmt.isFeatured
                      ? "bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white border border-neutral-700/60"
                      : "bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white border border-neutral-700/50"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b4a]" />
                  <span>{fmt.ctaText}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
