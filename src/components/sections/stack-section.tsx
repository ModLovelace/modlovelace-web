export function StackSection() {
  const categories = [
    {
      title: "Android & iOS",
      subtitle: "Apps móviles nativas y fluidas",
      description: "Aplicaciones que se sienten rápidas, intuitivas y confiables en el bolsillo de cada usuario, con soporte offline y listas para tiendas.",
      items: [
        { name: "Flutter & Dart", role: "Apps multiplataforma con animaciones fluidas", level: "Principal" },
        { name: "Android Nativo (Kotlin)", role: "Integración profunda con hardware y sistema", level: "Avanzado" },
        { name: "iOS (Swift)", role: "Experiencias optimizadas para el ecosistema Apple", level: "Sólido" },
        { name: "Publicación en Tiendas", role: "Lanzamientos en Google Play y App Store", level: "Producción" },
      ],
    },
    {
      title: "Web",
      subtitle: "Experiencias interactivas y ligeras",
      description: "Sitios y aplicaciones web que cargan al instante, se ven impecables en cualquier pantalla y son fáciles de navegar.",
      items: [
        { name: "React 19 & Next.js", role: "Aplicaciones web modernas y dinámicas", level: "Principal" },
        { name: "Diseño & UI Adaptativa", role: "Diseño limpio con modo claro y oscuro pulido", level: "Avanzado" },
        { name: "Web Audio & Interactividad", role: "Experiencias sonoras y florales en tiempo real", level: "Creativo" },
        { name: "Velocidad & Accesibilidad", role: "Carga rápida, bajo peso y navegación accesible", level: "Optimizado" },
      ],
    },
    {
      title: "Desktop & Sistemas",
      subtitle: "Linux · Windows · macOS",
      description: "Software de escritorio como Catjang y sistemas que mantienen los datos seguros, sincronizados y conectados.",
      items: [
        { name: "Software de Escritorio", role: "Apps multi-SO (Linux, macOS y Windows)", level: "Avanzado" },
        { name: "APIs & Servicios Conectados", role: "Conexión segura y lógica de negocio (.NET, Node)", level: "Sólido" },
        { name: "Bases de Datos & Modo Offline", role: "Sincronización que funciona sin internet", level: "Robusto" },
        { name: "Automatización & Asistentes IA", role: "Flujos de desarrollo ágiles y probados", level: "Moderno" },
      ],
    },
  ];

  return (
    <section id="stack" className="py-16 sm:py-24 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado en lenguaje natural */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-8 border-b border-[var(--border)] gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <span>03 / Plataformas</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Android, iOS, Web &amp; Desktop
            </h2>
          </div>
          <p className="text-sm text-[var(--muted)] max-w-md">
            Un enfoque práctico y centrado en las personas para construir buen software en cualquier dispositivo.
          </p>
        </div>

        {/* 3 Columnas en Grid Plano */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col justify-between space-y-6 shadow-sm"
            >
              <div className="space-y-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[var(--foreground)]">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {cat.subtitle}
                  </p>
                </div>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Lista limpia de tecnologías */}
              <div className="divide-y divide-[var(--border)] pt-2 border-t border-[var(--border)]">
                {cat.items.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="py-3 flex flex-col justify-between gap-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--foreground)]">
                        {skill.name}
                      </span>
                      {skill.level && (
                        <span className="text-[10px] text-[var(--muted)] bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full font-medium">
                          {skill.level}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[var(--muted)]">
                      {skill.role}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
