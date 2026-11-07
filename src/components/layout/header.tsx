"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Header() {
  const pathname = usePathname();
  const isLabActive = pathname === "/lab";
  const isBlogActive = pathname === "/blog";

  const navItems = [
    { label: "Ahora", href: "/#ahora", active: false },
    { label: "Proyectos", href: "/#proyectos", active: false },
    { label: "Investigaciones", href: "/#investigaciones", active: false },
    { label: "Lab", href: "/lab", active: isLabActive },
    { label: "Sobre Mí", href: "/#sobre-mi", active: false },
    { label: "Formatos", href: "/#formatos", active: false },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--background)]/90 border-b border-[var(--border)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-0 sm:h-16 flex flex-wrap sm:flex-nowrap items-center justify-between gap-x-4 gap-y-2">
        
        {/* Brand: Avatar circular + MODLOVELACE */}
        <Link href="/" className="shrink-0 flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--border)] ring-1 ring-orange-500/30 group-hover:ring-orange-500/60 transition-all bg-neutral-900 shrink-0">
            <Image
              src="/images/avatar-enrique.png"
              alt="Enrique Becerra (ModLovelace)"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <span className="font-bold text-sm tracking-wider uppercase text-[var(--foreground)] group-hover:text-[#ff6b4a] transition-colors">
            MODLOVELACE
          </span>
        </Link>

        {/* Nav estilo Delpaqq */}
        <nav className="order-last sm:order-none w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 sm:gap-5 text-xs font-medium text-[var(--muted)] whitespace-nowrap [&_a]:whitespace-nowrap overflow-x-auto py-1 sm:py-0">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-[var(--foreground)] px-1 py-0.5 ${
                item.active
                  ? "text-[#ff6b4a] font-semibold"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Acciones: Redes, Theme Toggle y Botón Contáctame Coral */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors hidden md:block"
            aria-label="GitHub de ModLovelace"
            title="GitHub · @ModLovelace"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors hidden md:block"
            aria-label="LinkedIn de Enrique Becerra"
            title="LinkedIn · Enrique Becerra"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
          </Link>

          <ThemeToggle />

          <Link
            href="/#contacto"
            className="px-3.5 py-1.5 rounded-lg bg-[#ff6b4a] hover:bg-[#ea580c] text-white font-semibold text-xs tracking-wide transition-all shadow-sm shadow-orange-500/20 active:scale-95"
          >
            Contáctame
          </Link>
        </div>
      </div>
    </header>
  );
}
