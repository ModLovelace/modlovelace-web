import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[var(--muted)]">
        <div className="flex items-center gap-2">
          <span className="text-[var(--foreground)] font-bold">Enrique Becerra</span>
          <span className="text-neutral-500">·</span>
          <span>ModLovelace</span>
          <span className="text-neutral-500">·</span>
          <span>© {currentYear}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          <Link href="https://catjang.modlovelace.com" target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">
            Catjang-Sue ↗
          </Link>
          <span className="text-neutral-600">·</span>
          <Link href="https://regalaflores.modlovelace.com" target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">
            Regala Flores · Configurar ↗
          </Link>
          <span className="text-neutral-600">·</span>
          <Link href="https://pub.dev/packages/network_json_devtools" target="_blank" rel="noreferrer" className="hover:text-[var(--foreground)] transition-colors">
            Network JSON (pub.dev) ↗
          </Link>
          <span className="text-neutral-600">·</span>
          <Link href="/lab#starforces-game" className="hover:text-[var(--foreground)] transition-colors text-violet-400">
            StarForces Lab ➔
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span>Licencia MIT / GPL-3.0 · Cero analíticas invasivas</span>
        </div>
      </div>
    </footer>
  );
}
