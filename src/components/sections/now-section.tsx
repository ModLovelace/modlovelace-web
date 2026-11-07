import Link from "next/link";

export function NowSection() {
  const columns = [
    {
      dotColor: "bg-orange-500",
      title: "EN QUÉ ESTOY TRABAJANDO",
      description:
        "Desarrollando StarForces Game: videojuego 2D/2.5D nativo en Swift 6 para iOS con SceneKit (Metal), colisiones OBB y pipeline de compilación e instalación directa por USB desde Linux con xtool. En paralelo, manteniendo Catjang-Sue y Network JSON DevTools.",
      linkText: "Bitácora de StarForces →",
      linkHref: "/lab#starforces-game",
    },
    {
      dotColor: "bg-purple-500",
      title: "QUÉ ESTOY APRENDIENDO",
      description:
        "A orquestar multi-agentes de IA coordinados sin alucinaciones con runners dedicados, puentes de bajo nivel Wayland DBus a 50Hz (0.2ms de latencia en Linux) y optimización de shaders ortográficos Metal en iOS 17+.",
      linkText: "Notas del Lab →",
      linkHref: "/lab",
    },
    {
      dotColor: "bg-slate-400",
      title: "QUÉ TENGO EN PAUSA",
      description:
        "Las transmisiones en directo y los prototipos de productividad en realidad virtual para Quest 3, para enfocar el 100% de la energía libre en el motor de juego determinista en Swift y herramientas de desarrollo para la comunidad Flutter/Dart.",
      linkText: "Ver proyectos activos →",
      linkHref: "/#proyectos",
    },
    {
      dotColor: "bg-emerald-500",
      title: "DISPONIBILIDAD",
      description:
        "Abierto a conversar sobre arquitectura de software de alto impacto, desarrollo móvil nativo/multiplataforma y retos técnicos de ingeniería compleja. Escríbeme sobre lo que estás intentando resolver.",
      linkText: "Formatos y precios →",
      linkHref: "/#formatos",
    },
  ];

  return (
    <section id="ahora" className="py-10 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera estilo Delpaqq: Título + Última Actualización */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[var(--border)] mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Ahora <span className="text-violet-500 dark:text-violet-400 font-semibold">· Noviembre 2026</span>
          </h2>
          <span className="text-[11px] font-mono tracking-widest uppercase text-[var(--muted)]">
            ÚLTIMA ACTUALIZACIÓN: 07/11/2026
          </span>
        </div>

        {/* 4 Columnas Horizontales con Viñetas de Color */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.dotColor} shrink-0`} />
                  <span className="font-mono text-xs font-bold tracking-wider uppercase text-[var(--foreground)]">
                    {col.title}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                  {col.description}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={col.linkHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-500 hover:text-violet-400 dark:text-violet-400 dark:hover:text-violet-300 transition-colors group"
                >
                  <span>{col.linkText}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
