"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        
        {/* Brand tipográfico zen */}
        <Link href="/" className="font-mono text-xs font-medium tracking-tight text-[var(--foreground)] hover:text-[#e63946] transition-colors">
          <span>modlovelace</span>
          <span className="text-[#e63946]">.com</span>
        </Link>

        {/* Nav minimalista */}
        <nav className="flex items-center gap-5 sm:gap-6 text-xs font-mono text-[var(--muted)]">
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
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-block text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            aria-label="LinkedIn de Enrique Becerra"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </Link>

          <ThemeToggle />
        </div>

      </div>
    </header>
  );
}
