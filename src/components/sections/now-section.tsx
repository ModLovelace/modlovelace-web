import { siteConfig } from "@/config/site";
import { Activity } from "lucide-react";

export function NowSection() {
  return (
    <section id="ahora" className="py-14 border-y border-[#e3dfd4] dark:border-[#1f2228] bg-[#f1ede4]/40 dark:bg-[#101215]/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#e05244] mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Bitácora de Enfoque · 現在</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#16171a] dark:text-[#eae7e1]">
              Ahora <span className="text-xs font-mono font-normal text-[#676a73] dark:text-[#868a93]">· {siteConfig.now.date}</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-[#676a73] dark:text-[#868a93] max-w-sm">
            Enfoque activo y proyectos en desarrollo continuo durante este mes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.now.items.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-sm border border-[#e3dfd4] dark:border-[#1f2228] bg-white dark:bg-[#131518] hover:border-[#e05244]/50 transition-colors shadow-sm"
            >
              <div className="text-xs font-mono font-bold text-[#e05244] mb-2">
                0{index + 1} //
              </div>
              <h3 className="font-semibold text-[#16171a] dark:text-[#eae7e1] text-sm mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-[#525660] dark:text-[#9ea2ac] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
