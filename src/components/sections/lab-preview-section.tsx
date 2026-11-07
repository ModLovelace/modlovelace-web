"use client";

import Link from "next/link";
import Image from "next/image";

export function LabPreviewSection() {
  const labItems = [
    {
      id: "starforces-game",
      tag: "JUEGO",
      tagColor: "bg-purple-900/40 text-purple-300 border-purple-700/50",
      image: "/images/projects/starforces-game.jpg",
      title: "StarForces Game: Físicas deterministas en Swift 6 & SceneKit 2.5D",
      description:
        "Motor de combate a 60 FPS desacoplado para iPhone (iOS 17+), auto-pitch ±35°, colisiones OBB y pipeline de compilación e instalación directa por USB desde Linux en < 2 segundos vía xtool.",
      date: "NOVIEMBRE DE 2026",
    },
    {
      id: "catjang-linux-native",
      tag: "SISTEMAS",
      tagColor: "bg-emerald-900/40 text-emerald-300 border-emerald-700/50",
      image: "/images/projects/catjang.jpg",
      title: "Catjang: Mascota de escritorio con Wayland DBus a 50Hz",
      description:
        "Seguimiento ocular global a 0.2ms de latencia vía DBus en GNOME Shell, recorte transparente con setShape() en XWayland y reactividad para 5 agentes de IA.",
      date: "OCTUBRE DE 2026",
    },
    {
      id: "network-json-devtools",
      tag: "TOOLING",
      tagColor: "bg-cyan-900/40 text-cyan-300 border-cyan-700/50",
      image: "/images/projects/network-json-devtools.jpg",
      title: "Network JSON DevTools: Descifrado criptográfico en memoria",
      description:
        "Extensión oficial para Dart DevTools: inspección HTTP en tiempo real, visor de árbol JSON reactivo y descifrado local RSA-OAEP / AES-CBC sin persistencia en disco ni alterar binarios release.",
      date: "OCTUBRE DE 2026",
    },
  ];

  return (
    <section id="lab" className="py-16 sm:py-20 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estilo Delpaqq: Línea vertical + 01 / LAB + Título condensado */}
        <div className="flex flex-col items-center text-center mb-12 space-y-1.5">
          <div className="w-0.5 h-6 bg-pink-500 mx-auto rounded-full" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-neutral-400">
            01 / LAB
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide uppercase text-[var(--foreground)]">
            EXPERIMENTOS Y PÁGINAS SUELTAS
          </h2>
        </div>

        {/* Grid de 3 Cards Delpaqq */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {labItems.map((item) => (
            <Link
              key={item.id}
              href={`/lab#${item.id}`}
              className="group flex flex-col justify-between rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-violet-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden shadow-sm"
            >
              <div className="space-y-4">
                {/* Imagen Preview con borde suave */}
                <div className="relative w-full aspect-[16/10] bg-neutral-900 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  
                  {/* Badge de Categoría Delpaqq */}
                  <div className="absolute bottom-3 left-3">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase border backdrop-blur-md ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="px-5 pb-2 space-y-2.5">
                  <h3 className="font-bold text-base text-[var(--foreground)] group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Fecha al pie */}
              <div className="px-5 pb-5 pt-3 border-t border-[var(--border)]/50">
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase text-[var(--muted)]">
                  {item.date}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Enlace Inferior Estilo Delpaqq */}
        <div className="text-center pt-2">
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-violet-500 hover:text-violet-400 dark:text-violet-400 dark:hover:text-violet-300 transition-colors group"
          >
            <span>Ver todo el Lab →</span>
            <span className="text-xs font-normal text-[var(--muted)]">Juegos, experimentos, shaders, audio y repositorios.</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
