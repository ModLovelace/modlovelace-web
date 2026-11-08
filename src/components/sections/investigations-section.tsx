import Link from "next/link";

export function InvestigationsSection() {
  const investigations = [
    {
      badge: "EN CURSO",
      badgeColor: "text-orange-700 dark:text-orange-300 border-orange-500/30 bg-orange-500/10",
      dotColor: "bg-[#ff6b4a]",
      question: "¿Cuándo conviene Swift 6 nativo frente a motores genéricos?",
      whatITried:
        "Comparé el loop budget y consumo de memoria de un motor de físicas deterministas puro en Swift frente a engines de propósito general para iPhone, compilando de forma independiente desde Linux con SDK Darwin y firma USB vía xtool.",
      soFar:
        "Swift 6 con SceneKit/Metal corre a 60 FPS estables con <1.5ms por frame y <35MB de RAM. Para gameplay 2D/2.5D de precisión táctica, desacoplar físicas del renderizador supera con creces el overhead de un motor comercial.",
      linkText: "Notas completas →",
      linkHref: "/lab#starforces-game",
    },
    {
      badge: "EN CURSO",
      badgeColor: "text-orange-700 dark:text-orange-300 border-orange-500/30 bg-orange-500/10",
      dotColor: "bg-[#ff6b4a]",
      question: "¿Cómo lograr 0.2ms de latencia en seguimiento ocular bajo Wayland sin IPC pesado?",
      whatITried:
        "En Electron bajo Wayland el puntero se congela fuera de la ventana. Evalué polling continuo a XWayland vs. un daemon DBus asíncrono consultando directamente al compositor GNOME Shell.",
      soFar:
        "El daemon DBus a 50Hz consume 0.1% de CPU y reduce la latencia a 0.2ms. El evento llega fluido a Electron sin pérdida de frames, eliminando cualquier tirón visual durante el arrastre o reposo.",
      linkText: "Notas completas →",
      linkHref: "/lab#catjang-linux-native",
    },
    {
      badge: "NUEVA · NOVIEMBRE 2026",
      badgeColor: "text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      dotColor: "bg-emerald-500",
      question: "¿Cómo descifrar payloads criptográficos en memoria sin alterar compilaciones release?",
      whatITried:
        "Interceptar HttpClient en Dart e inyectar un módulo de descifrado local (RSA-OAEP + AES-CBC) en DevTools sin persistir llaves privadas en disco ni tocar binarios release.",
      soFar:
        "El protocolo devtools_extensions permite empaquetar la inspección únicamente en dev_dependencies. Durante la compilación release de Flutter, el tree-shaking elimina por completo la herramienta con 0 impacto en el artefacto final.",
      linkText: "Leer la lista completa →",
      linkHref: "/lab#network-json-devtools",
    },
  ];

  return (
    <section id="investigaciones" className="pb-16 sm:pb-20 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Uniforme Estilo Delpaqq: Línea conectada al borde + Numerador + Título */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="w-0.5 h-10 sm:h-12 bg-gradient-to-b from-violet-500 to-[#ff6b4a] mx-auto mb-3.5" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-1.5">
            02 / INVESTIGACIONES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-[var(--foreground)]">
            PREGUNTAS EN CURSO
          </h2>
          <p className="text-xs font-mono tracking-widest uppercase text-[var(--muted)] pt-1.5">
            ACTUALIZADO EL 07/11/2026
          </p>
        </div>

        {/* Grid de 3 Cards de Preguntas Delpaqq */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {investigations.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl bg-[var(--card)] border border-[var(--border)] p-6 sm:p-7 hover:border-violet-500/50 hover:shadow-xl transition-all duration-300 space-y-6 shadow-sm"
            >
              <div className="space-y-4">
                {/* Badge con viñeta */}
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${item.badgeColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`} />
                    <span>{item.badge}</span>
                  </span>
                </div>

                {/* Pregunta en negrita */}
                <h3 className="font-bold text-base sm:text-lg text-[var(--foreground)] leading-snug lg:min-h-[76px]">
                  {item.question}
                </h3>

                {/* Qué probé */}
                <div className="space-y-1 lg:min-h-[96px]">
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--muted)] block">
                    QUÉ PROBÉ
                  </span>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {item.whatITried}
                  </p>
                </div>

                {/* Hasta ahora */}
                <div className="space-y-1 lg:min-h-[84px]">
                  <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--muted)] block">
                    HASTA AHORA
                  </span>
                  <p className="text-xs text-[var(--foreground)]/90 leading-relaxed font-medium">
                    {item.soFar}
                  </p>
                </div>
              </div>

              {/* Enlace violeta */}
              <div className="pt-3 border-t border-[var(--border)]/60">
                <Link
                  href={item.linkHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
                >
                  <span>{item.linkText}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
