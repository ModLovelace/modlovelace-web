import { siteConfig } from "@/config/site";

export function StackSection() {
  const categories = [
    {
      index: "01",
      title: "Ecosistema Móvil",
      subtitle: "Android, iOS & Multi-SO",
      items: siteConfig.skills.mobile,
    },
    {
      index: "02",
      title: "Sistemas & Backend",
      subtitle: "Arquitectura & Datos",
      items: siteConfig.skills.fullstack,
    },
    {
      index: "03",
      title: "Metodología & Agentes IA",
      subtitle: "Resolución & Automatización",
      items: siteConfig.skills.aiAndMethodology,
    },
  ];

  return (
    <section id="stack" className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        
        {/* Encabezado editorial */}
        <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-3 mb-10">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
            Dominio Técnico &amp; Stack
          </h2>
          <span className="text-[11px] font-mono text-[var(--muted)]">
            Especialización &amp; Herramientas
          </span>
        </div>

        {/* 3 Bloques tipográficos limpios */}
        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat.index} className="space-y-4">
              
              {/* Título de categoría */}
              <div className="flex items-baseline gap-3 text-xs font-mono">
                <span className="text-[#e63946]">{cat.index}</span>
                <span className="font-medium text-[var(--foreground)] uppercase tracking-wider">
                  {cat.title}
                </span>
                <span className="text-[var(--muted)]">· {cat.subtitle}</span>
              </div>

              {/* Lista limpia de tecnologías */}
              <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
                {cat.items.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                  >
                    <span className="font-medium text-[var(--foreground)]">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--muted)]">
                      <span>{skill.role}</span>
                      {skill.level && (
                        <span className="text-[10px] text-[var(--foreground)]/60 border border-[var(--border)] px-1.5 py-0.5 rounded-[2px]">
                          {skill.level}
                        </span>
                      )}
                    </div>
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
