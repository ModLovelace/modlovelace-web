import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] mt-20 transition-colors">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-10 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs font-mono text-[var(--muted)]">
        <div>
          <span className="text-[var(--foreground)] font-medium">Enrique Becerra</span>
          <span className="mx-2">·</span>
          <span>© {currentYear}</span>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            GitHub ↗
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            LinkedIn ↗
          </Link>
          <Link
            href={siteConfig.links.youtube}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            YouTube ↗
          </Link>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Correo ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
