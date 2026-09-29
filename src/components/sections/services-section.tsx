import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowRight } from "lucide-react";

export function ServicesSection() {
  return (
    <section id="servicios" className="py-20 border-t border-[#e3dfd4] dark:border-[#1f2228] bg-[#f1ede4]/40 dark:bg-[#101215]/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-14">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#e05244] mb-1">
              Colaboración &amp; Consultoría · 協力
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#16171a] dark:text-[#eae7e1]">
              Formatos de Trabajo
            </h2>
          </div>
          <p className="text-xs font-mono text-[#676a73] dark:text-[#868a93] max-w-sm">
            Ingeniería deliberada para proyectos y empresas que valoran entregas sin deuda técnica.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.services.map((service, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-sm border border-[#e3dfd4] dark:border-[#1f2228] bg-white dark:bg-[#131518] hover:border-[#e05244]/40 transition-colors shadow-sm"
            >
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-0.5 rounded-sm text-[11px] font-mono font-semibold bg-[#e05244]/8 text-[#e05244] border border-[#e05244]/20">
                  {service.tag}
                </span>

                <h3 className="text-lg font-bold text-[#16171a] dark:text-[#eae7e1]">
                  {service.title}
                </h3>

                <p className="text-xs text-[#525660] dark:text-[#9ea2ac] leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 pt-3 border-t border-[#f0ede4] dark:border-[#1a1c21]">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-[#525660] dark:text-[#9ea2ac]">
                      <span className="text-[#e05244] font-bold">―</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#f0ede4] dark:border-[#1a1c21]">
                <Link
                  href="#contacto"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-sm border border-[#e3dfd4] dark:border-[#1f2228] hover:bg-[#16171a] hover:text-white dark:hover:bg-[#eae7e1] dark:hover:text-[#0d0e11] text-[#16171a] dark:text-[#eae7e1] text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  <span>Consultar</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
