import { siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs font-mono text-[var(--muted)]">
        <div>
          <span className="text-[var(--foreground)] font-medium">Enrique Becerra</span>
          <span className="mx-2">·</span>
          <span>© {currentYear}</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-[var(--foreground)] transition-colors"
          >
            {siteConfig.email} ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
