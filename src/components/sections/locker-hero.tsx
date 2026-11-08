"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Sparkles, FlaskConical, ChevronDown } from "lucide-react";

export function LockerHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [stickersPopped, setStickersPopped] = useState(false);
  const [activeProject, setActiveProject] = useState<number>(0);
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* COLUMNA 1: Casillero Estable con animación en 3 actos */}
          <div className="lg:col-span-6 flex flex-col justify-between items-center h-full">
            
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
                    src="/images/locker-open-v3.jpg"
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
                  {/* Luz difusa de estudio focalizada en el interior del gabinete */}
                  <div className="absolute inset-x-[12%] top-0 h-44 bg-gradient-to-b from-amber-100/18 via-amber-100/5 to-transparent" />
                  {/* Foco de luz directo sobre el tubo fluorescente */}
                  <div className="absolute top-3 left-[18%] right-[44%] h-12 bg-gradient-to-b from-white/35 via-amber-100/20 to-transparent blur-md rounded-full" />
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

                {/* Pegatina 3: Network JSON · DevTools */}
                <a
                  href="https://pub.dev/packages/network_json_devtools"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group/netjson z-30 block ${
                    stickersPopped
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-0 translate-y-4 pointer-events-none"
                  }`}
                  style={{
                    left: "65.5%",
                    top: "62.0%",
                    width: "11.8%",
                    aspectRatio: "1/1",
                    transformOrigin: "center center",
                    transitionDelay: stickersPopped ? "240ms" : "0ms",
                  }}
                  title="Network JSON · DevTools Extension en pub.dev (Abrir paquete)"
                >
                  <div className="relative w-full h-full transition-transform duration-300 ease-out hover:scale-125 hover:-rotate-3 active:scale-105">
                    <Image
                      src="/images/sticker-network-json.png"
                      alt="Sticker Network JSON DevTools"
                      fill
                      className="object-contain filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.6)] group-hover/netjson:drop-shadow-[0_12px_22px_rgba(6,182,212,0.65)]"
                    />
                    {/* Badge flotante tooltip clickeable */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-cyan-600 hover:bg-cyan-500 text-[10px] font-mono font-semibold text-white whitespace-nowrap opacity-0 group-hover/netjson:opacity-100 transition-opacity shadow-lg shadow-cyan-500/25 border border-cyan-400/30 pointer-events-auto cursor-pointer z-40">
                      Network JSON ↗
                    </div>
                  </div>
                </a>

                {/* Pegatina 4: StarForces Game (iOS 17+ Swift 6) */}
                <Link
                  href="/lab#starforces-game"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className={`absolute transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group/starforces z-30 block ${
                    stickersPopped
                      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 scale-0 translate-y-4 pointer-events-none"
                  }`}
                  style={{
                    left: "72.0%",
                    top: "72.5%",
                    width: "11.8%",
                    aspectRatio: "1/1",
                    transformOrigin: "center center",
                    transitionDelay: stickersPopped ? "300ms" : "0ms",
                  }}
                  title="StarForces Game · Swift 6 & SceneKit 2.5D (Ver avances)"
                >
                  <div className="relative w-full h-full transition-transform duration-300 ease-out hover:scale-125 hover:rotate-3 active:scale-105">
                    <Image
                      src="/images/sticker-starforces.png"
                      alt="Sticker StarForces Game"
                      fill
                      className="object-contain filter drop-shadow-[0_8px_14px_rgba(0,0,0,0.6)] group-hover/starforces:drop-shadow-[0_12px_22px_rgba(245,158,11,0.65)]"
                    />
                    {/* Badge flotante tooltip clickeable */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-600 hover:bg-amber-500 text-[10px] font-mono font-semibold text-white whitespace-nowrap opacity-0 group-hover/starforces:opacity-100 transition-opacity shadow-lg shadow-amber-500/25 border border-amber-400/30 pointer-events-auto cursor-pointer z-40">
                      StarForces Lab ➔
                    </div>
                  </div>
                </Link>
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
                  src="/images/locker-closed-v2.jpg"
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
                className="text-violet-600 dark:text-violet-400 hover:underline font-semibold cursor-pointer"
              >
                {isOpen ? "Cerrar puerta ✕" : "Tocar para abrir ➔"}
              </button>
            </div>

          </div>

          {/* COLUMNA 2: Información Ejecutiva & Proyectos */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full gap-4">
            
            <div className="space-y-4">
              {/* Tag de Posicionamiento */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--card)] border border-[var(--border)] text-xs text-[var(--foreground)] font-medium w-fit shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#ff6b4a]" />
                <span>Desarrollo de Software &amp; Soluciones Integrales</span>
              </div>

              {/* Nombre & Titular */}
              <div className="space-y-1">
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-wide uppercase text-[var(--foreground)]">
                  Enrique Becerra
                </h1>
                <p className="font-mono text-xs sm:text-sm text-[var(--muted)] font-semibold tracking-wider uppercase">
                  Mobile · Web · Desktop
                </p>
              </div>

              {/* Propuesta de valor en lenguaje natural y humano */}
              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-normal">
                Me apasiona crear aplicaciones y experiencias digitales que la gente realmente disfrute usar. Transformo ideas y necesidades cotidianas en productos sólidos, rápidos y bien cuidados para <strong className="text-[var(--foreground)] font-semibold">Mobile</strong>, <strong className="text-[var(--foreground)] font-semibold">Web</strong> y <strong className="text-[var(--foreground)] font-semibold">Desktop</strong>.
              </p>

              {/* BOTONES PRINCIPALES DE ALTO CONTRASTE */}
              <div className="flex flex-wrap items-center gap-3.5 pt-0.5">
                <Link
                  href="#proyectos"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff6b4a] hover:bg-[#ea580c] text-white font-semibold text-sm transition-all shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Ver Proyectos Seleccionados</span>
                  <ArrowDown className="w-4 h-4" />
                </Link>

                <Link
                  href="#contacto"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--card)] hover:bg-[var(--border)]/50 border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm transition-all hover:-translate-y-0.5"
                >
                  <span>Iniciar Contacto</span>
                  <ArrowRight className="w-4 h-4 text-[var(--muted)]" />
                </Link>
              </div>
            </div>

            {/* BANDEJA DERECHA: ACORDEÓN DE 4 PROYECTOS EN EL CASILLERO (Siempre 1 abierto para altura fija y alineada) */}
            <div className={`p-4 sm:p-5 rounded-2xl bg-[var(--card)] border transition-all duration-300 flex flex-col justify-between gap-3 shadow-sm ${
              isOpen ? "border-violet-500/50 ring-1 ring-violet-500/20" : "border-[var(--border)]"
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-2.5 border-b border-[var(--border)]">
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? "bg-violet-500 animate-pulse" : "bg-emerald-500"}`} />
                  <span className="font-bold text-[var(--foreground)] uppercase tracking-wider font-mono text-[11px] whitespace-nowrap">
                    Proyectos en el Casillero
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--muted)]">
                  Selecciona un proyecto para ver detalles
                </span>
              </div>

              {/* Acordeón exclusivo de los 4 proyectos (siempre se abre uno y se cierran los demás) */}
              <div className="space-y-2">
                {[
                  {
                    id: 0,
                    title: "Catjang-Sue",
                    subtitle: "Desktop · Linux / Mac / Win",
                    icon: "/images/sticker-catjang.png",
                    badge: "Open Source",
                    badgeClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
                    description:
                      "Mascota virtual de escritorio con física elástica de 16 segmentos, seguimiento ocular DBus a 50Hz en Linux Wayland y reactividad para desarrollo.",
                    primaryAction: { label: "Web Oficial", href: "https://catjang.modlovelace.com", external: true },
                    secondaryActions: [
                      { label: "GitHub", href: "https://github.com/ModLovelace/catjang-sue" },
                      { label: "Releases", href: "https://github.com/ModLovelace/catjang-sue/releases/latest" },
                    ],
                  },
                  {
                    id: 1,
                    title: "Regala Flores",
                    subtitle: "Web Interactiva con Audio",
                    icon: "/images/sticker-sunflower.png",
                    badge: "Open Source",
                    badgeClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
                    description:
                      "Floración procedural interactiva en 4 fases con sintetizador acústico en tiempo real (Web Audio API) y dedicatorias compartibles 9:16 y 1:1.",
                    primaryAction: { label: "Web Oficial", href: "https://regalaflores.modlovelace.com", external: true },
                    secondaryActions: [
                      { label: "Personalizar", href: "https://flores.modlovelace.com" },
                      { label: "GitHub", href: "https://github.com/ModLovelace/flores-amarillas-primavera" },
                    ],
                  },
                  {
                    id: 2,
                    title: "Network JSON · DevTools",
                    subtitle: "Dart DevTools Extension",
                    icon: "/images/sticker-network-json.png",
                    badge: "pub.dev v0.1.4",
                    badgeClass: "bg-sky-500/10 border-sky-500/30 text-sky-700 dark:text-sky-300",
                    description:
                      "Inspector HTTP en tiempo real con árbol JSON reactivo y descifrado local en memoria (RSA-OAEP / AES-CBC) para aplicaciones Dart y Flutter.",
                    primaryAction: { label: "pub.dev", href: "https://pub.dev/packages/network_json_devtools", external: true },
                    secondaryActions: [
                      { label: "GitHub", href: "https://github.com/ModLovelace/network_json_devtools" },
                    ],
                  },
                  {
                    id: 3,
                    title: "StarForces Game",
                    subtitle: "iOS 17+ · Swift 6 & SceneKit 2.5D",
                    icon: "/images/sticker-starforces.png",
                    badge: "En desarrollo",
                    badgeClass: "bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300",
                    description:
                      "Videojuego nativo para iPhone con física determinista a 60 FPS, colisiones OBB, cámara ortográfica 2.5D y despliegue USB desde Linux vía xtool.",
                    primaryAction: { label: "Ver en Lab", href: "/lab#starforces-game", external: false, isLab: true },
                    secondaryActions: [],
                    statusNote: "32 Tests OK",
                  },
                ].map((proj) => {
                  const isExpanded = activeProject === proj.id;
                  return (
                    <div
                      key={proj.id}
                      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                        isExpanded
                          ? "bg-[var(--background)]/80 border-violet-500/60 shadow-sm"
                          : "bg-[var(--background)]/40 border-[var(--border)] hover:border-violet-500/40"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveProject(proj.id)}
                        className="w-full px-3.5 py-2.5 flex items-center justify-between gap-3 text-left cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-[var(--card)] border border-[var(--border)] flex items-center justify-center p-1 shrink-0 overflow-hidden">
                            <img
                              src={proj.icon}
                              alt={proj.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              <h3 className="text-xs sm:text-sm font-bold text-[var(--foreground)] shrink-0">
                                {proj.title}
                              </h3>
                              <span className="hidden sm:inline-block text-[11px] font-mono text-[var(--muted)] truncate">
                                · {proj.subtitle}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${proj.badgeClass}`}>
                            {proj.badge}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 ${
                              isExpanded ? "rotate-180 text-violet-500" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-3.5 pb-3.5 pt-1 border-t border-[var(--border)]/50 space-y-3">
                          <p className="text-xs text-[var(--muted)] leading-relaxed">
                            {proj.description}
                          </p>

                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                            <Link
                              href={proj.primaryAction.href}
                              target={proj.primaryAction.external ? "_blank" : undefined}
                              rel={proj.primaryAction.external ? "noreferrer" : undefined}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all shadow-xs"
                            >
                              {proj.primaryAction.isLab && <FlaskConical className="w-3.5 h-3.5" />}
                              <span>{proj.primaryAction.label}</span>
                              <span className="text-[10px] select-none">
                                {proj.primaryAction.external ? "↗" : "➔"}
                              </span>
                            </Link>

                            <div className="flex items-center gap-1.5">
                              {proj.secondaryActions.map((sec, sIdx) => (
                                <Link
                                  key={sIdx}
                                  href={sec.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)]/60 border border-[var(--border)] text-[var(--foreground)] font-medium text-xs transition-colors"
                                >
                                  <span>{sec.label}</span>
                                  <span className="text-[10px] text-[var(--muted)] select-none">↗</span>
                                </Link>
                              ))}
                              {proj.statusNote && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  <span>{proj.statusNote}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Pie interactivo de la tarjeta */}
              <div className="pt-2 text-[11px] font-mono text-[var(--muted)] flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-[var(--border)]">
                <span>{stickersPopped ? "✨ Pegatinas activas: Haz clic en el casillero o aquí" : isOpen ? "✨ Casillero abierto: Catjang, Regala Flores, Network JSON, StarForces & Modfin" : "💡 Toca el casillero para abrir y ver los detalles"}</span>
                <button
                  onClick={toggleLocker}
                  className="text-violet-600 dark:text-violet-400 hover:underline font-semibold cursor-pointer"
                >
                  {isOpen ? "Cerrar puerta ✕" : "Abrir casillero ➔"}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
