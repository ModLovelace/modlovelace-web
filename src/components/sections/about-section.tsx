import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, Mail, Star } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export function AboutSection() {
  return (
    <section id="sobre-mi" className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Tarjeta con Sello Hanko de autor */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-sm border border-[#e3dfd4] dark:border-[#1f2228] bg-white dark:bg-[#131518] p-8 text-center space-y-4 shadow-sm">
              <div className="w-20 h-20 mx-auto rounded-sm border-2 border-[#e63946] bg-[#e63946]/10 flex items-center justify-center text-2xl font-bold font-mono text-[#e63946]">
                EB
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#16171a] dark:text-[#eae7e1]">
                  Enrique Becerra
                </h3>
                <p className="text-xs font-mono text-[#e05244]">
                  @ModLovelace · Ingeniero de Software
                </p>
              </div>
              <p className="text-xs text-[#525660] dark:text-[#9ea2ac] leading-relaxed max-w-xs mx-auto">
                Sin ataduras a un único framework: resuelvo retos de software con visión holística, especialidad en móviles y mentalidad polyglot.
              </p>

              <div className="pt-4 border-t border-[#f0ede4] dark:border-[#1a1c21] flex justify-center gap-3 font-mono text-xs">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#676a73] dark:text-[#868a93] hover:text-[#e05244] flex items-center gap-1 font-semibold"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  GitHub <Star className="w-3 h-3 text-amber-400 fill-current" />
                </Link>
                <span className="text-[#e3dfd4] dark:text-[#252830]">·</span>
                <Link
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#676a73] dark:text-[#868a93] hover:text-[#e05244] flex items-center gap-1"
                >
                  LinkedIn <ArrowUpRight className="w-3 h-3" />
                </Link>
                <span className="text-[#e3dfd4] dark:text-[#252830]">·</span>
                <Link
                  href={siteConfig.links.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#676a73] dark:text-[#868a93] hover:text-[#e05244] flex items-center gap-1"
                >
                  YouTube <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#e05244]">
                Filosofía de Ingeniería · 理念
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#16171a] dark:text-[#eae7e1]">
                Sobre Mí
              </h2>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#525660] dark:text-[#9ea2ac] leading-relaxed">
              <p>
                Soy <strong>Enrique Becerra</strong> (en la comunidad, <strong>Mod / ModLovelace</strong>). Concibo la tecnología con una premisa clara: <em>las herramientas son un medio, la solución y la calidad son el fin</em>. Me enfoco en resolver problemas de ingeniería de software con rigor y arquitectura limpia, adaptándome a lo que el reto requiera.
              </p>
              <p>
                Cuento con una <strong>profunda especialización en ingeniería móvil</strong>: diseño, desarrollo y escalo aplicaciones tanto en entornos nativos (<strong>Kotlin en Android, Swift en iOS</strong>) como multiplataforma (<strong>Flutter y Dart</strong>), cuidando los detalles críticos de memoria, batería y puentes de hardware.
              </p>
              <p>
                En backend y arquitectura distribuida, construyo microservicios y APIs robustas con <strong>.NET Core (C#)</strong>, bases de datos <strong>PostgreSQL / SQL Server</strong> y entornos reproducibles con <strong>Docker</strong>.
              </p>
              <p>
                Como <strong>AI-Augmented Developer</strong>, integro agentes de inteligencia artificial no para autocompletar sin pensar, sino como multiplicadores metodológicos bajo el principio rector: <em>&ldquo;Pausar, Diagnosticar y Corregir&rdquo;</em>, respaldado por suites de regresión automatizada que garantizan código estable.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 text-xs font-mono text-[#e05244] hover:underline"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{siteConfig.email}</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
