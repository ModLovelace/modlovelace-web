"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Header() {
  const navItems = [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Stack", href: "#stack" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--background)]/90 border-b border-[var(--border)] transition-colors">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between">
        
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
              className="hover:text-[var(--foreground)] transition-colors"
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
