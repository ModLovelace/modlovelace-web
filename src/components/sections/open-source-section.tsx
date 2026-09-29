import Link from "next/link";
import { Download, Star } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export function OpenSourceSection() {
  const pets = [
    { name: "Catjang", icon: "🐱", desc: "Gatito clásico con tecleo rápido y humo térmico" },
    { name: "Toto", icon: "🐶", desc: "Schnauzer con cejas expresivas y ladrido sutil" },
    { name: "Chisi", icon: "🐩", desc: "Caniche Toy blanco con animaciones esponjosas" },
    { name: "Milo", icon: "🐕", desc: "Mestizo marrón y blanco con cola enérgica" },
    { name: "Musubi", icon: "🐱", desc: "Gato atigrado con textura detallada" },
    { name: "Chuño 🇵🇪", icon: "🐕", desc: "Perro sin pelo del Perú con cresta cobriza y teclados 3D" },
  ];

  const agents = ["Gemini / Antigravity", "Claude Code", "Cursor", "OpenAI Codex", "Kiro"];

  return (
    <section id="open-source" className="py-20 border-y border-[#e3dfd4] dark:border-[#1f2228] bg-[#f1ede4]/40 dark:bg-[#101215]/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm border border-[#e05244]/40 bg-[#e05244]/8 text-[#c83b2e] dark:text-[#ff6b5e] text-xs font-mono mb-3">
            <span>EB</span>
            <span>CONTRIBUCIÓN OPEN SOURCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#16171a] dark:text-[#eae7e1] mb-3">
            Catjang-Sue: Mascota Virtual Multiplataforma
          </h2>
          <p className="text-sm text-[#525660] dark:text-[#9ea2ac] leading-relaxed">
            Ecosistema de escritorio para desarrolladores con 6 especies canónicas y reactividad en tiempo real al ciclo de vida de los agentes de IA.
          </p>
        </div>

        {/* Big Feature Showcase Card */}
        <div className="rounded-sm border border-[#e3dfd4] dark:border-[#1f2228] bg-white dark:bg-[#131518] p-6 sm:p-8 space-y-8 shadow-sm">
          
          {/* Top stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-[#f0ede4] dark:border-[#1a1c21] text-center font-mono">
            <div>
              <div className="text-2xl font-bold text-[#16171a] dark:text-[#eae7e1]">6</div>
              <div className="text-xs text-[#676a73] dark:text-[#868a93]">Mascotas Animadas</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#e05244]">5</div>
              <div className="text-xs text-[#676a73] dark:text-[#868a93]">Agentes IA</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#16171a] dark:text-[#eae7e1]">54 / 54</div>
              <div className="text-xs text-[#676a73] dark:text-[#868a93]">Tests en Verde</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#676a73] dark:text-[#868a93]">&lt; 1%</div>
              <div className="text-xs text-[#676a73] dark:text-[#868a93]">Consumo de CPU</div>
            </div>
          </div>

          {/* Grid de 2 columnas: Mascotas & Agentes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Mascotas */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-mono font-bold text-[#16171a] dark:text-[#eae7e1] uppercase tracking-wider">
                Catálogo de Especies (8 animaciones SVG)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pets.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-sm border border-[#e3dfd4] dark:border-[#1f2228] bg-[#fbf9f4] dark:bg-[#0d0e11] flex items-start gap-3"
                  >
                    <span className="text-xl">{p.icon}</span>
                    <div>
                      <div className="font-semibold text-xs text-[#16171a] dark:text-[#eae7e1]">{p.name}</div>
                      <div className="text-[11px] text-[#676a73] dark:text-[#868a93] leading-snug">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agentes IA & Físicas */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-mono font-bold text-[#16171a] dark:text-[#eae7e1] uppercase tracking-wider">
                Reacción a Agentes IA
              </h3>
              <p className="text-xs text-[#525660] dark:text-[#9ea2ac] leading-relaxed">
                Hooks que detectan en vivo estados de <em>pensamiento</em>, <em>ejecución de herramientas</em>, <em>espera</em> o <em>éxito</em>.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {agents.map((ag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-sm text-[11px] font-mono border border-[#e3dfd4] dark:border-[#1f2228] bg-[#fbf9f4] dark:bg-[#0d0e11] text-[#16171a] dark:text-[#eae7e1]"
                  >
                    {ag}
                  </span>
                ))}
              </div>

              <div className="p-3.5 rounded-sm border border-[#e3dfd4] dark:border-[#1f2228] bg-[#fbf9f4] dark:bg-[#0d0e11] text-[11px] text-[#676a73] dark:text-[#868a93] space-y-1 font-mono">
                <div className="text-[#e05244] font-semibold">QA &amp; Estabilidad:</div>
                <div>· Físicas de arrastre pendular (±16° patas, ±22° cola)</div>
                <div>· Retardo deliberado anti-falsos positivos (~1.4s)</div>
                <div>· Principio: &ldquo;Pausar, Diagnosticar y Corregir&rdquo;</div>
              </div>
            </div>

          </div>

          {/* Action Downloads & GitHub Star Callout */}
          <div className="pt-6 border-t border-[#f0ede4] dark:border-[#1a1c21] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="https://github.com/ModLovelace/catjang-sue"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#e05244] hover:bg-[#c83b2e] text-white font-semibold transition-colors shadow-sm"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Ver Repo y dar Star</span>
                <Star className="w-3 h-3 fill-current" />
              </Link>
              <Link
                href="https://github.com/ModLovelace/catjang-sue/releases/latest"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-[#e3dfd4] dark:border-[#1f2228] bg-transparent hover:bg-[#eae6db] dark:hover:bg-[#181a1e] text-[#16171a] dark:text-[#eae7e1] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargas (Win / Mac / Linux)</span>
              </Link>
            </div>
            <span className="text-[#676a73] dark:text-[#868a93]">Licencia CC BY-NC 4.0</span>
          </div>

        </div>

      </div>
    </section>
  );
}
