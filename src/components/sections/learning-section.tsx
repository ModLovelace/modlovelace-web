import Link from "next/link";
import Image from "next/image";

export function LearningSection() {
  const articles = [
    {
      id: "starforces-game",
      image: "/images/projects/starforces-game.jpg",
      title: "StarForces: Un laboratorio 2.5D para físicas deterministas en Swift 6",
      excerpt:
        "Cómo desacoplar la simulación física a 60 FPS de la proyección cartesiana en SceneKit y armar un pipeline de compilación en Linux e instalación directa al iPhone por USB en < 2 segundos.",
      linkText: "Leer artículo →",
      linkHref: "/lab#starforces-game",
    },
    {
      id: "catjang-linux-native",
      image: "/images/projects/catjang.jpg",
      title: "Del seguimiento visual por polling a DBus nativo a 50Hz en Linux Wayland",
      excerpt:
        "La transición desde polling continuo en Electron hacia un daemon de bajo nivel con GNOME Shell a 0.2ms de latencia, máscara compacta setShape() y suite de 54 tests automatizados.",
      linkText: "Leer artículo →",
      linkHref: "/lab#catjang-linux-native",
    },
    {
      id: "network-json-devtools",
      image: "/images/projects/network-json-devtools.jpg",
      title: "Intercepción y descifrado seguro de tráfico HTTP en Dart DevTools",
      excerpt:
        "Diseño de un módulo criptográfico en memoria (RSA-OAEP / AES-CBC) para inspeccionar APIs de banca en Flutter en tiempo real sin tocar disco ni alterar binarios de producción.",
      linkText: "Leer artículo →",
      linkHref: "/lab#network-json-devtools",
    },
  ];

  return (
    <section id="bitacora" className="py-16 sm:py-20 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estilo Delpaqq */}
        <div className="flex flex-col items-center text-center mb-12 space-y-1.5">
          <div className="w-0.5 h-6 bg-[#ff6b4a] mx-auto rounded-full" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-neutral-400">
            04 / BITÁCORA
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide uppercase text-[var(--foreground)]">
            NOTAS SOBRE LO QUE VOY APRENDIENDO
          </h2>
        </div>

        {/* Grid de 3 Artículos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {articles.map((art) => (
            <article
              key={art.id}
              className="group flex flex-col justify-between rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-violet-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden shadow-sm"
            >
              <div className="space-y-4">
                <div className="relative w-full aspect-[16/10] bg-neutral-900 overflow-hidden">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="p-5 pt-0 space-y-2.5">
                  <h3 className="font-bold text-base text-[var(--foreground)] group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[var(--muted)] leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-[var(--border)]/60">
                <Link
                  href={art.linkHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-500 hover:text-violet-400 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
                >
                  <span>{art.linkText}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Enlace Inferior */}
        <div className="text-center pt-2">
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-violet-500 hover:text-violet-400 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
          >
            <span>Ver toda la bitácora →</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
