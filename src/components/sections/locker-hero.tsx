"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon, YoutubeIcon, InstagramIcon } from "@/components/icons";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

export function LockerHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [stickersPopped, setStickersPopped] = useState(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Limpiar temporizadores al desmontar
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // Sintetizador Web Audio API: Clic mecánico, ignición de lámpara y pop elástico de stickers
  const playLockerSound = (action: "open" | "close") => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      if (action === "open") {
        // 1. Clic metálico inicial de cerradura desenganchando (0ms)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = "triangle";
        osc1.frequency.setValueAtTime(460, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.1);
        gain1.gain.setValueAtTime(0.12, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start();
        osc1.stop(ctx.currentTime + 0.14);

        // 2. Encendido suave de tubo fluorescente (a los 380ms)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(130, ctx.currentTime + 0.38);
        osc2.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.48);
        gain2.gain.setValueAtTime(0.001, ctx.currentTime + 0.38);
        gain2.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 0.42);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.58);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(ctx.currentTime + 0.38);
        osc2.stop(ctx.currentTime + 0.58);

        // 3. Pop elástico de pegatinas (a los 750ms)
        const osc3 = ctx.createOscillator();
        const gain3 = ctx.createGain();
        osc3.type = "sine";
        osc3.frequency.setValueAtTime(380, ctx.currentTime + 0.75);
        osc3.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.86);
        gain3.gain.setValueAtTime(0.001, ctx.currentTime + 0.75);
        gain3.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.78);
        gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
        osc3.connect(gain3);
        gain3.connect(ctx.destination);
        osc3.start(ctx.currentTime + 0.75);
        osc3.stop(ctx.currentTime + 0.9);
      } else {
        // Cierre: Retorno suave y clac definitivo del pestillo
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(240, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);

        // Clac de impacto al encajar en el marco a los 650ms
        const lockOsc = ctx.createOscillator();
        const lockGain = ctx.createGain();
        lockOsc.type = "triangle";
        lockOsc.frequency.setValueAtTime(170, ctx.currentTime + 0.65);
        lockOsc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.78);
        lockGain.gain.setValueAtTime(0.001, ctx.currentTime + 0.65);
        lockGain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.68);
        lockGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        lockOsc.connect(lockGain);
        lockGain.connect(ctx.destination);
        lockOsc.start(ctx.currentTime + 0.65);
        lockOsc.stop(ctx.currentTime + 0.8);
      }
    } catch {
      // Sin sonido si las políticas de autoplay del navegador lo bloquean
    }
  };

  // Toggle orquestado en 3 actos secuenciales
  const toggleLocker = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const nextState = !isOpen;

    if (nextState) {
      // ACTO 1: Apertura - La puerta se mueve hacia la derecha expandiéndose
      setIsOpen(true);
      playLockerSound("open");

      // ACTO 2: A los 380ms, la lámpara se enciende e ilumina el interior
      const t1 = setTimeout(() => {
        setLightOn(true);
      }, 380);

      // ACTO 3: A los 750ms, salen las pegatinas de los proyectos destacados
      const t2 = setTimeout(() => {
        setStickersPopped(true);
      }, 750);

      timersRef.current.push(t1, t2);
    } else {
      // SECUENCIA DE CIERRE PAUSADA Y NATURAL:
      // 1. Las pegatinas se repliegan
      setStickersPopped(false);
      playLockerSound("close");

      // 2. La luz se apaga
      const t1 = setTimeout(() => {
        setLightOn(false);
      }, 140);

      // 3. La puerta vuelve hacia la izquierda
      const t2 = setTimeout(() => {
        setIsOpen(false);
      }, 180);

      timersRef.current.push(t1, t2);
    }
  };

  // Manejador inteligente de clics sobre el casillero
  const handleLockerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isOpen) {
      toggleLocker();
      return;
    }
    // Si está abierto: sólo cerramos si el usuario hace clic en el área de la puerta abierta (derecha, x > 56%)
    // Si hace clic en el gabinete interior (póster, Modfin, lámpara), NO cerramos accidentalmente
    const rect = e.currentTarget.getBoundingClientRect();
    const clickXRatio = (e.clientX - rect.left) / rect.width;
    if (clickXRatio > 0.56) {
      toggleLocker();
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

        {/* Grid principal ancho: Casillero 3D + Ficha ejecutiva */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* COLUMNA 1: Casillero Estable con animación en 3 actos */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div
              onClick={handleLockerClick}
              className="relative w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[560px] xl:max-w-[580px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-neutral-300 dark:border-neutral-800 bg-neutral-900 cursor-pointer group select-none transition-all duration-300 hover:shadow-2xl"
              style={{ perspective: "1400px" }}
              title={isOpen ? "Haz clic en la puerta para cerrarla" : "Haz clic para abrir el casillero"}
            >
              {/* Capa de fondo: Interior del casillero con ZOOM cinemático enfocado en el gabinete y los datos de Enrique */}
              <div
                className={`absolute inset-0 w-full h-full transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "scale-[1.07]" : "scale-100"
                }`}
                style={{
                  transformOrigin: "32% 42%",
                  transitionDuration: isOpen ? "900ms" : "780ms",
                }}
              >
                <div
                  className={`relative w-full h-full transition-all duration-700 ease-out ${
                    lightOn
                      ? "filter brightness-100 contrast-[1.02]"
                      : "filter brightness-[0.3] contrast-[0.9]"
                  }`}
                >
                  <Image
                    src="/images/locker-open-taller.jpg"
                    alt="Interior amplio del casillero completo con proyectos, Modfin y pertenencias de Enrique Becerra (ModLovelace)"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px"
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Sombra de penumbra interior antes de que la luz se encienda */}
                <div
                  className={`absolute inset-0 bg-neutral-950/65 pointer-events-none transition-opacity duration-600 ease-out ${
                    lightOn ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Resplandor cálido de la lámpara fluorescente cuando la luz se enciende */}
                <div
                  className={`absolute top-0 inset-x-0 h-56 pointer-events-none transition-all duration-700 ease-out ${
                    lightOn ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                >
                  {/* Luz difusa cálida */}
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-200/35 via-amber-300/10 to-transparent" />
                  {/* Foco de luz directo sobre la lámpara */}
                  <div className="absolute top-2 inset-x-12 h-16 bg-gradient-to-b from-white/40 via-amber-100/25 to-transparent blur-md rounded-full" />
                </div>

                {/* ACTO 3: Salen las pegatinas sobre la puerta limpia (nace vacía y se agregan con relieve 3D elástico) */}
                {/* Pegatina 0: MODLOVELACE Crest */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-30 ${
                    stickersPopped
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-0 translate-y-4 pointer-events-none"
                  }`}
                  style={{
                    left: "64.5%",
                    top: "27.5%",
                    width: "20.5%",
                    aspectRatio: "243/149",
                    transformOrigin: "center center",
                    transitionDelay: stickersPopped ? "0ms" : "80ms",
                  }}
                  title="MODLOVELACE"
                >
                  <div className="relative w-full h-full transition-transform duration-300 ease-out hover:scale-115">
                    <Image
                      src="/images/sticker-modlovelace.png"
                      alt="Sticker MODLOVELACE"
                      fill
                      className="object-contain filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                </div>

                {/* Pegatina 1: Catjang-Sue (El Gato) */}
                <a
                  href="https://catjang.modlovelace.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group/cat z-30 block ${
                    stickersPopped
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-0 translate-y-4 pointer-events-none"
                  }`}
                  style={{
                    left: "66.5%",
                    top: "40.5%",
                    width: "12%",
                    aspectRatio: "136/127",
                    transformOrigin: "center center",
                    transitionDelay: stickersPopped ? "90ms" : "40ms",
                  }}
                  title="Catjang-Sue · Mascota de Escritorio (Abrir proyecto)"
                >
                  <div className="relative w-full h-full transition-transform duration-300 ease-out hover:scale-125 hover:-rotate-3 active:scale-105">
                    <Image
                      src="/images/sticker-catjang.png"
                      alt="Sticker Catjang-Sue"
                      fill
                      className="object-contain filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.6)] group-hover/cat:drop-shadow-[0_12px_22px_rgba(59,130,246,0.65)]"
                    />
                    {/* Badge flotante tooltip clickeable */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-blue-600 hover:bg-blue-500 text-[10px] font-mono font-semibold text-white whitespace-nowrap opacity-0 group-hover/cat:opacity-100 transition-opacity shadow-lg shadow-blue-500/25 border border-blue-400/30 pointer-events-auto cursor-pointer z-40">
                      Catjang-Sue ↗
                    </div>
                  </div>
                </a>

                {/* Pegatina 2: Regala Flores */}
                <a
                  href="https://regalaflores.modlovelace.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group/flower z-30 block ${
                    stickersPopped
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-0 translate-y-4 pointer-events-none"
                  }`}
                  style={{
                    left: "73.5%",
                    top: "51.0%",
                    width: "12.5%",
                    aspectRatio: "127/141",
                    transformOrigin: "center center",
                    transitionDelay: stickersPopped ? "170ms" : "0ms",
                  }}
                  title="Regala Flores · Web Oficial & Guía (Abrir proyecto)"
                >
                  <div className="relative w-full h-full transition-transform duration-300 ease-out hover:scale-125 hover:rotate-3 active:scale-105">
                    <Image
                      src="/images/sticker-sunflower.png"
                      alt="Sticker Regala Flores"
                      fill
                      className="object-contain filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.6)] group-hover/flower:drop-shadow-[0_12px_22px_rgba(245,158,11,0.65)] scale-110"
                    />
                    {/* Badge flotante tooltip clickeable */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-600 hover:bg-amber-500 text-[10px] font-mono font-semibold text-white whitespace-nowrap opacity-0 group-hover/flower:opacity-100 transition-opacity shadow-lg shadow-amber-500/25 border border-amber-400/30 pointer-events-auto cursor-pointer z-40">
                      Regala Flores ↗
                    </div>
                  </div>
                </a>
              </div>

              {/* ACTO 1: Puerta cerrada amplia pivotando en la bisagra real (62% 50%) hacia la DERECHA */}
              <div
                className={`absolute inset-0 w-full h-full transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen
                    ? "[transform:perspective(1200px)_rotateY(74deg)_translateX(8px)_translateZ(8px)] opacity-0 pointer-events-none"
                    : "[transform:perspective(1200px)_rotateY(0deg)_translateX(0px)_translateZ(0px)] opacity-100 shadow-xl"
                }`}
                style={{
                  transformOrigin: "62% 50%",
                  transformStyle: "preserve-3d",
                  transitionDuration: isOpen ? "900ms" : "780ms",
                }}
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
            <div className="mt-4 flex items-center justify-between w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[560px] xl:max-w-[580px] px-2 text-xs text-[var(--muted)]">
              <span>{isOpen ? "Puerta abierta · Modfin & stickers interactivos" : "Casillero cerrado"}</span>
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
                  <span className="inline-flex items-center gap-1.5">
                    <img src="/images/sticker-catjang.png" alt="Cat" className="w-3.5 h-3.5 object-contain inline" />
                    <span>El Gato</span>
                    <span className="text-neutral-400">&amp;</span>
                    <img src="/images/sticker-sunflower.png" alt="Flores" className="w-3.5 h-3.5 object-contain inline" />
                    <span>Regala Flores</span>
                  </span>
                </div>
              </div>

              {/* Grid de 2 Proyectos Personales: Ambos con la misma altura exacta y alineación perfecta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-stretch">
                
                {/* 1. Catjang-Sue (El del gato) */}
                <div className={`p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border flex flex-col justify-between h-full transition-all duration-500 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${
                  stickersPopped
                    ? "border-blue-500/60 ring-1 ring-blue-500/20 shadow-md shadow-blue-500/5"
                    : "border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50"
                }`}>
                  <div className="space-y-2.5">
                    {/* Fila superior: Ícono oficial del casillero y Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-center p-1 shadow-sm shrink-0 overflow-hidden">
                        <img
                          src="/images/sticker-catjang.png"
                          alt="Sticker Catjang"
                          className="w-full h-full object-contain filter drop-shadow-sm"
                        />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-medium shrink-0">
                        Open Source
                      </span>
                    </div>

                    {/* Título y Subtítulo con ancho completo */}
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

                  {/* Enlaces de acción con estilo y colores 100% unificados */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-[var(--border)]/60 text-xs font-mono">
                    <Link
                      href="https://catjang.modlovelace.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-sm"
                    >
                      <span>Web Oficial</span>
                      <span className="text-[10px] select-none">↗</span>
                    </Link>
                    <div className="flex items-center gap-1.5">
                      <Link
                        href="https://github.com/ModLovelace/catjang-sue"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-200/60 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 font-medium text-xs transition-colors"
                      >
                        <span>GitHub</span>
                        <span className="text-[10px] text-neutral-400 select-none">↗</span>
                      </Link>
                      <Link
                        href="https://github.com/ModLovelace/catjang-sue/releases/latest"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-neutral-200/60 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 font-medium text-xs transition-colors"
                      >
                        <span>Releases</span>
                        <span className="text-[10px] text-neutral-400 select-none">↗</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 2. Regala Flores (El de las flores) */}
                <div className={`p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/80 border flex flex-col justify-between h-full transition-all duration-500 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${
                  stickersPopped
                    ? "border-amber-500/60 ring-1 ring-amber-500/20 shadow-md shadow-amber-500/5"
                    : "border-neutral-200 dark:border-neutral-800 hover:border-blue-500/50"
                }`}>
                  <div className="space-y-2.5">
                    {/* Fila superior: Ícono oficial del casillero y Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/80 flex items-center justify-center p-1 shadow-sm shrink-0 overflow-hidden">
                        <img
                          src="/images/sticker-sunflower.png"
                          alt="Sticker Regala Flores"
                          className="w-full h-full object-contain filter drop-shadow-sm scale-105"
                        />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-medium shrink-0">
                        Open Source
                      </span>
                    </div>

                    {/* Título y Subtítulo con ancho completo */}
                    <div>
                      <h3 className="text-sm font-bold text-[var(--foreground)] leading-tight">
                        Regala Flores
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

                  {/* Enlaces de acción con estilo y colores 100% unificados */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-[var(--border)]/60 text-xs font-mono">
                    <Link
                      href="https://regalaflores.modlovelace.com"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-sm"
                    >
                      <span>Web Oficial</span>
                      <span className="text-[10px] select-none">↗</span>
                    </Link>
                    <div className="flex items-center gap-1.5">
                      <Link
                        href="https://flores.modlovelace.com"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-200/60 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 font-medium text-xs transition-colors"
                      >
                        <span>Personalizar</span>
                        <span className="text-[10px] text-neutral-400 select-none">↗</span>
                      </Link>
                      <Link
                        href="https://github.com/ModLovelace/flores-amarillas-primavera"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-200/60 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700/80 text-neutral-800 dark:text-neutral-200 font-medium text-xs transition-colors"
                      >
                        <span>GitHub</span>
                        <span className="text-[10px] text-neutral-400 select-none">↗</span>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>

              {/* Pie interactivo de la tarjeta */}
              <div className="pt-2 text-[11px] font-mono text-[var(--muted)] flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-[var(--border)]">
                <span>{stickersPopped ? "✨ Pegatinas activas: Haz clic en el casillero o aquí" : isOpen ? "✨ Casillero abierto: Catjang, Regala Flores & Modfin en cabina" : "💡 Toca el casillero para abrir y ver los detalles"}</span>
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
