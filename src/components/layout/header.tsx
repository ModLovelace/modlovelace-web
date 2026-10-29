"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";

export function Header() {
  const pathname = usePathname();
  const isLabActive = pathname === "/lab" || pathname === "/blog";

  const navItems = [
    { label: "Proyectos", href: "/#proyectos", active: false },
    { label: "Lab & Blog", href: "/lab", active: isLabActive },
    { label: "Stack", href: "/#stack", active: false },
    { label: "Contacto", href: "/#contacto", active: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--background)]/90 border-b border-[var(--border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-0 sm:h-14 flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-4 gap-y-1.5">
        
        {/* Brand tipográfico zen con color del sistema */}
        <Link href="/" className="shrink-0 whitespace-nowrap font-mono text-xs font-medium tracking-tight text-[var(--foreground)] hover:text-[var(--accent)] transition-colors">
          <span>modlovelace.com</span>
        </Link>

        {/* Nav minimalista: en móvil pasa a su propia fila y no se parte */}
        <nav className="order-last sm:order-none w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 sm:gap-6 text-xs font-mono text-[var(--muted)] whitespace-nowrap [&_a]:whitespace-nowrap">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                item.active
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "hover:text-[var(--foreground)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-3">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="GitHub de ModLovelace"
            title="GitHub · @ModLovelace"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="LinkedIn de Enrique Becerra"
            title="LinkedIn · Enrique Becerra"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="Instagram oficial del desarrollador (@modfin_lovelace)"
            title="Instagram Oficial · @modfin_lovelace"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </Link>

          <ThemeToggle />
        </div>

      </div>
    </header>
  );
}
