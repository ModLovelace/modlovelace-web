"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink, FlaskConical } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ProjectsSection() {
  const projects = [
    {
      title: "StarForces Game",
      status: "EN DESARROLLO",
      statusColor: "text-violet-700 dark:text-violet-300 border-violet-500/30 bg-violet-500/10",
      dotColor: "bg-violet-500 animate-pulse",
      image: "/images/projects/starforces-game.jpg",
      problem:
        "Desarrollar videojuegos nativos para iOS habitualmente obliga a trabajar dentro de macOS con Xcode y lidiar con los altos consumos de memoria de motores de propósito general.",
      whatIDid:
        "Diseñé una arquitectura híbrida desacoplada en Swift 6: físicas puras a 60 FPS con colisiones OBB y proyección ortográfica 2.5D en SceneKit (Metal) con 6 capas parallax Z, compilado y desplegado por USB desde Linux vía xtool.",
      result:
        "60 FPS estables con <1.5ms de loop budget, 32/32 tests aprobados e instalación directa al iPhone en < 2 segundos sin intermediación de macOS.",
      linkText: "Cómo funciona →",
      linkHref: "/lab#starforces-game",
      secondaryLinks: [
        { label: "Ver en Lab", href: "/lab#starforces-game", isInternal: true },
      ],
    },
    {
      title: "Network JSON · DevTools",
      status: "OPEN SOURCE",
      statusColor: "text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      dotColor: "bg-emerald-500",
      image: "/images/projects/network-json-devtools.jpg",
      problem:
        "Inspeccionar tráfico seguro HTTPS en aplicaciones Flutter durante depuración exponía credenciales en logs o requería alterar el código antes de compilar para producción.",
      whatIDid:
        "Creé una extensión oficial para Dart DevTools con captura HTTP en tiempo real (dart:io, package:http, Dio), visor de árbol JSON reactivo y descifrado local RSA-OAEP / AES-CBC en memoria.",
      result:
        "Publicado en pub.dev (v0.1.4) con instalación como dependencia de desarrollo (dev_dependencies) y cero impacto en binarios compilados de producción.",
      linkText: "Cómo funciona →",
      linkHref: "/lab#network-json-devtools",
      secondaryLinks: [
        { label: "pub.dev v0.1.4", href: "https://pub.dev/packages/network_json_devtools" },
        { label: "GitHub", href: "https://github.com/ModLovelace/network_json_devtools" },
      ],
    },
    {
      title: "Catjang-Sue",
      status: "OPEN SOURCE",
      statusColor: "text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      dotColor: "bg-emerald-500",
      image: "/images/projects/catjang.jpg",
      problem:
        "Las mascotas virtuales de escritorio consumían demasiada CPU y en entornos modernos de Linux Wayland el seguimiento de cursor se congelaba al interactuar con otras ventanas.",
      whatIDid:
        "Implementé una arquitectura en Electron con recorte transparente setShape(), física de elongación continua de 16 segmentos y un daemon nativo DBus contra GNOME Shell a 50Hz.",
      result:
        "54/54 tests de equivalencia de mascotas aprobados, 0.2ms de latencia en seguimiento ocular y empaquetado nativo multiplataforma (Linux, Windows, macOS).",
      linkText: "Cómo funciona →",
      linkHref: "/lab#catjang-linux-native",
      secondaryLinks: [
        { label: "Web Oficial", href: "https://catjang.modlovelace.com" },
        { label: "GitHub", href: "https://github.com/ModLovelace/catjang-sue" },
      ],
    },
    {
      title: "Regala Flores Amarillas",
      status: "OPEN SOURCE",
      statusColor: "text-emerald-700 dark:text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
      dotColor: "bg-emerald-500",
      image: "/images/projects/regala-flores-v2.jpg",
      problem:
        "Las plataformas de felicitaciones digitales usaban vídeos pregrabados lentos de descargar o imágenes estáticas sin interactividad real ni personalización emocional.",
      whatIDid:
        "Desarrollé un motor de floración procedural en 4 fases animado en React 19, con sintetizador acústico en tiempo real (Web Audio API) y exportador de cartas virales 9:16 y 1:1.",
      result:
        "Carga instantánea sin depender de vídeos en la nube, miles de tarjetas compartidas y experiencia con sonido dinámico 100% sintetizado en el cliente.",
      linkText: "Cómo funciona →",
      linkHref: "/lab#flores-web-audio",
      secondaryLinks: [
        { label: "Web Oficial", href: "https://regalaflores.modlovelace.com" },
        { label: "Personalizar", href: "https://flores.modlovelace.com" },
      ],
    },
    {
      title: "Santa Isabel Socia",
      status: "EN PRODUCCIÓN",
      statusColor: "text-sky-700 dark:text-sky-300 border-sky-500/30 bg-sky-500/10",
      dotColor: "bg-sky-500",
      image: "/images/projects/santa-isabel-store.jpg",
      problem:
        "Los miles de socios de la cooperativa necesitaban consultar sus finanzas, transferir y votar en asambleas institucionales de forma remota y con máxima seguridad.",
      whatIDid:
        "Diseñé una arquitectura móvil reactiva en Flutter & Dart con autenticación biométrica, comunicación cifrada de extremo a extremo y módulo electoral en tiempo real.",
      result:
        "Publicado y operativo en Google Play para socios activos con alta disponibilidad, transferencias inmediatas y soporte para asambleas institucionales.",
      linkText: "Ver en Google Play →",
      linkHref: "https://play.google.com/store/apps/details?id=pe.com.santaisabel.socia&hl=es_419",
      secondaryLinks: [
        { label: "Google Play Store", href: "https://play.google.com/store/apps/details?id=pe.com.santaisabel.socia&hl=es_419" },
      ],
    },
    {
      title: "WebControl App",
      status: "EN PRODUCCIÓN",
      statusColor: "text-sky-700 dark:text-sky-300 border-sky-500/30 bg-sky-500/10",
      dotColor: "bg-sky-500",
      image: "/images/projects/webcontrol-store.jpg",
      problem:
        "El control de fatiga laboral y la validación de accesos en faenas mineras remotas fallaban frecuentemente por la falta total de señal o conectividad a internet.",
      whatIDid:
        "Solución móvil empresarial con motor de sincronización offline-first, validación criptográfica de credenciales en portería y encuestas ergonómicas preventivas.",
      result:
        "Desplegada en Google Play y App Store para las operaciones mineras e industriales más exigentes de la región, garantizando continuidad operativa.",
      linkText: "Ver en App Store →",
      linkHref: "https://apps.apple.com/us/app/webcontrolapp/id1453757601",
      secondaryLinks: [
        { label: "App Store", href: "https://apps.apple.com/us/app/webcontrolapp/id1453757601" },
        { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.webcontrol.android&hl=es_419" },
      ],
    },
  ];

  return (
    <section id="proyectos" className="pb-16 sm:pb-20 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Uniforme Estilo Delpaqq: Línea conectada al borde + Numerador + Título */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-12">
          <div className="w-0.5 h-10 sm:h-12 bg-gradient-to-b from-violet-500 to-[#ff6b4a] mx-auto mb-3.5" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-1.5">
            01 / PROYECTOS
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-[var(--foreground)]">
            PROYECTOS Y SU ESTADO
          </h2>
          <p className="text-xs font-mono text-[var(--muted)] pt-1.5">
            Sistemas en producción, herramientas open source y desarrollo nativo
          </p>
        </div>

        {/* Grid de Cards Estilo Delpaqq (3 Campos Estructurados: PROBLEMA, QUÉ HICE, RESULTADO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((proj, idx) => (
            <article
              key={idx}
              className="flex flex-col justify-between rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-violet-500/50 hover:shadow-xl transition-all duration-300 overflow-hidden shadow-sm"
            >
              <div className="space-y-4">
                {/* Imagen / Diagrama Preview a ancho completo (16:9 exacto para 1200x675 sin recortes laterales) */}
                <div className="relative w-full aspect-video bg-neutral-900 overflow-hidden">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>

                {/* Contenido Estructurado Delpaqq */}
                <div className="p-5 pt-1 space-y-4">
                  {/* Badge de Estado con viñeta */}
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${proj.statusColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${proj.dotColor}`} />
                      <span>{proj.status}</span>
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="font-bold text-lg text-[var(--foreground)] leading-snug">
                    {proj.title}
                  </h3>

                  {/* Campo 1: PROBLEMA */}
                  <div className="space-y-1 lg:min-h-[76px]">
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--muted)] block">
                      PROBLEMA
                    </span>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      {proj.problem}
                    </p>
                  </div>

                  {/* Campo 2: QUÉ HICE */}
                  <div className="space-y-1 lg:min-h-[92px]">
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--muted)] block">
                      QUÉ HICE
                    </span>
                    <p className="text-xs text-[var(--muted)] leading-relaxed">
                      {proj.whatIDid}
                    </p>
                  </div>

                  {/* Campo 3: RESULTADO */}
                  <div className="space-y-1 lg:min-h-[76px]">
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-[var(--muted)] block">
                      RESULTADO
                    </span>
                    <p className="text-xs text-[var(--foreground)]/90 leading-relaxed font-medium">
                      {proj.result}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pie de Enlaces de Acción Estilo Delpaqq */}
              <div className="p-5 pt-3 border-t border-[var(--border)]/60 flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={proj.linkHref}
                  target={proj.linkHref.startsWith("http") ? "_blank" : undefined}
                  rel={proj.linkHref.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300 transition-colors"
                >
                  <span>{proj.linkText}</span>
                </Link>

                <div className="flex items-center gap-2">
                  {proj.secondaryLinks.map((sLink, sIdx) => {
                    const isInternal = sLink.href.startsWith("/");
                    return (
                      <Link
                        key={sIdx}
                        href={sLink.href}
                        target={isInternal ? undefined : "_blank"}
                        rel={isInternal ? undefined : "noreferrer"}
                        className="px-2.5 py-1 rounded-lg bg-[var(--background)] hover:bg-[var(--border)]/60 border border-[var(--border)] text-[11px] font-mono text-[var(--foreground)] transition-colors inline-flex items-center gap-1"
                      >
                        <span>{sLink.label}</span>
                        {!isInternal && <span className="text-[10px] text-[var(--muted)]">↗</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
