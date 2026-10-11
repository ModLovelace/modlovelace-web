"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon, YoutubeIcon, InstagramIcon } from "@/components/icons";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

export function LockerHero() {
  const [isOpen, setIsOpen] = useState(false);

  // Sintetizador Web Audio API para clic mecánico de cerradura (0 dependencias)
  const toggleLocker = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = nextState ? "triangle" : "sine";
        osc.frequency.setValueAtTime(nextState ? 520 : 260, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(
          nextState ? 220 : 90,
          ctx.currentTime + 0.12
        );

        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      }
    } catch {
      // Ignorar restricciones de audio del navegador
    }
  };

  return (
    <section className="pt-6 pb-12 sm:pt-10 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Barra superior minimalista y sobria */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)] mb-10 pb-3 border-b border-[var(--border)]">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[var(--foreground)]">
              Disponible para proyectos de ingeniería y consultoría
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={toggleLocker}
              className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors underline underline-offset-4 cursor-pointer font-medium"
            >
              {isOpen ? "Cerrar casillero ✕" : "Explorar casillero ➔"}
            </button>
          </div>
        </div>

        {/* Grid principal ancho: Casillero 3D + Ficha ejecutiva (items-start para fijar la altura sin saltos) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COLUMNA 1: Casillero Estable (dimensiones constantes y fijas) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div
              onClick={toggleLocker}
              className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] xl:max-w-[560px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-900 cursor-pointer group select-none transition-all duration-300 hover:shadow-2xl"
              style={{ perspective: "1200px" }}
              title={isOpen ? "Haz clic para cerrar la puerta" : "Haz clic para abrir el casillero"}
            >
              {/* Capa de fondo: Interior del casillero con gabinete ancho y espacioso, Modfin y proyectos */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/images/locker-open-taller.jpg"
                  alt="Interior amplio del casillero completo con proyectos, Modfin y pertenencias de Enrique Becerra (ModLovelace)"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
                  priority
                  className="object-cover"
                />

                {/* Resplandor cálido sutil cuando está abierto */}
                <div
                  className={`absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-amber-200/25 via-amber-300/5 to-transparent pointer-events-none transition-opacity duration-500 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Capa frontal: Puerta cerrada amplia alineada con bisagras a la DERECHA y stickers de proyectos */}
              <div
                className={`absolute inset-0 w-full h-full origin-right transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                  isOpen
                    ? "[transform:rotateY(75deg)] opacity-0 pointer-events-none"
                    : "[transform:rotateY(0deg)] opacity-100 shadow-xl"
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/images/locker-closed-taller.jpg"
                  alt="Puerta cerrada del casillero amplio completo con stickers de proyectos"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Subtítulo discreto debajo del casillero */}
            <div className="mt-4 flex items-center justify-between w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[540px] xl:max-w-[560px] px-2 text-xs text-[var(--muted)]">
              <span>{isOpen ? "Puerta abierta · Modfin & stickers de proyectos" : "Casillero cerrado"}</span>
              <button
                onClick={toggleLocker}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
              >
                {isOpen ? "Cerrar puerta ✕" : "Tocar para abrir ➔"}
              </button>
            </div>

          </div>

          {/* COLUMNA 2: Información Ejecutiva & Proyectos */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 flex flex-col justify-between">
            
            {/* Tag de Posicionamiento */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 font-medium w-fit">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Desarrollo de Software &amp; Soluciones Integrales</span>
            </div>

            {/* Nombre & Titular */}
            <div className="space-y-1.5">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--foreground)]">
                Enrique Becerra
              </h1>
              <p className="text-base text-[var(--muted)] font-medium">
                Android · iOS · Web · Desktop
              </p>
            </div>

            {/* Propuesta de valor en lenguaje natural y humano */}
            <p className="text-sm sm:text-base text-[var(--foreground)]/85 leading-relaxed font-normal">
              Me apasiona crear aplicaciones y experiencias digitales que la gente realmente disfrute usar. Transformo ideas y necesidades cotidianas en productos sólidos, rápidos y bien cuidados para <strong>Android</strong>, <strong>iOS</strong>, <strong>Web</strong> y <strong>Desktop</strong>.
            </p>

            {/* BOTONES PRINCIPALES DE ALTO CONTRASTE */}
            <div className="flex flex-wrap items-center gap-3.5 pt-0.5">
              <Link
                href="#proyectos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Ver Proyectos Seleccionados</span>
                <ArrowDown className="w-4 h-4" />
              </Link>

              <Link
                href="#contacto"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--card)] hover:bg-[var(--border)]/50 border border-[var(--border)] text-[var(--foreground)] font-medium text-sm transition-all hover:-translate-y-0.5"
              >
                <span>Iniciar Contacto</span>
                <ArrowRight className="w-4 h-4 text-[var(--muted)]" />
              </Link>
            </div>

            {/* BANDEJA DERECHA: PROYECTOS PROPIOS (Exactamente a la misma altura) */}
            <div className={`p-5 sm:p-6 rounded-2xl bg-[var(--card)] border transition-all duration-300 space-y-3.5 shadow-sm ${
              isOpen ? "border-blue-500/50 ring-1 ring-blue-500/20" : "border-[var(--border)]"
            }`}>
              <div className="flex items-center justify-between text-xs pb-2.5 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-blue-500 animate-pulse" : "bg-emerald-500"}`} />
                  <span className="font-bold text-[var(--foreground)] uppercase tracking-wider font-mono text-[11px]">
                    Proyectos Propios en el Casillero
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-blue-600 dark:text-blue-400 font-semibold">
                  <span>🐾 El Gato &amp; 🌻 Las Flores</span>
                </div>
              </div>

              {/* Grid de 2 Proyectos Personales: Ambos con la misma altura exacta y alineación perfecta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch">
                
                {/* 1. Catjang-Sue (El del gato) */}
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between h-full hover:border-blue-500/50 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <div className="space-y-2.5">
                    {/* Fila superior: Ícono y Badge en extremos opuestos */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                        🐾
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 font-medium shrink-0">
                        Open Source
                      </span>
                    </div>

                    {/* Título y Subtítulo con ancho completo (sin truncamiento) */}
                    <div>
                      <h3 className="text-sm font-bold text-[var(--foreground)] leading-tight">
                        Catjang-Sue
                      </h3>
                      <p className="text-[11px] font-mono text-[var(--muted)] mt-0.5">
                        Desktop · Linux / Mac / Win
                      </p>
                    </div>

                    {/* Descripción con altura y espaciado consistente */}
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Mascota virtual de escritorio con física elástica, seguimiento ocular DBus en Wayland y reactividad para desarrollo.
                    </p>
                  </div>

                  {/* Enlaces de acción anclados a la misma línea base */}
                  <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-[var(--border)]/60 text-xs font-mono">
                    <Link
                      href="https://catjang.modlovelace.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                    >
                      Web Oficial ↗
                    </Link>
                    <div className="flex items-center gap-2.5">
                      <Link
                        href="https://github.com/ModLovelace/catjang-sue"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        GitHub ↗
                      </Link>
                      <Link
                        href="https://github.com/ModLovelace/catjang-sue/releases/latest"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--muted)] hover:text-[var(--foreground)]"
                      >
                        Releases ↗
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 2. Regala Flores Amarillas (El de las flores) */}
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between h-full hover:border-blue-500/50 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  <div className="space-y-2.5">
                    {/* Fila superior: Ícono y Badge en extremos opuestos */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-xl bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                        🌻
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-medium shrink-0">
                        Open Source
                      </span>
                    </div>

                    {/* Título y Subtítulo con ancho completo (sin truncamiento) */}
                    <div>
                      <h3 className="text-sm font-bold text-[var(--foreground)] leading-tight">
                        Flores Amarillas
                      </h3>
                      <p className="text-[11px] font-mono text-[var(--muted)] mt-0.5">
                        Web Interactiva con Audio
                      </p>
                    </div>

                    {/* Descripción con altura y espaciado consistente */}
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      Floración procedural interactiva con sintetizador acústico en tiempo real (Web Audio API) y dedicatorias compartibles.
                    </p>
                  </div>

                  {/* Enlaces de acción anclados a la misma línea base */}
                  <div className="flex items-center justify-between pt-2.5 mt-3 border-t border-[var(--border)]/60 text-xs font-mono">
                    <Link
                      href="https://flores.modlovelace.com"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      Ver en vivo ↗
                    </Link>
                    <Link
                      href="https://github.com/ModLovelace/flores-amarillas-primavera"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--muted)] hover:text-[var(--foreground)]"
                    >
                      GitHub ↗
                    </Link>
                  </div>
                </div>

              </div>

              {/* Pie interactivo de la tarjeta */}
              <div className="pt-2 text-[11px] font-mono text-[var(--muted)] flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-[var(--border)]">
                <span>{isOpen ? "✨ Casillero abierto: Catjang, Flores & Modfin en cabina" : "💡 Toca el casillero para abrir y ver los detalles"}</span>
                <button
                  onClick={toggleLocker}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium cursor-pointer"
                >
                  {isOpen ? "Cerrar puerta ✕" : "Abrir casillero ➔"}
                </button>
              </div>
            </div>

            {/* Enlaces Sociales Limpios */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs font-medium text-[var(--muted)]">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </Link>
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </Link>
              <Link
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
                <span>YouTube</span>
              </Link>
              <Link
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-[var(--foreground)] transition-colors"
                aria-label="Instagram de Modfin y Enrique"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>@modfin_lovelace ↗</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
