"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { Inbox, Cpu, CheckCircle2, Check, ArrowRight, ChevronDown } from "lucide-react";

const CONVERSATION_TOPICS = [
  {
    value: "Primera conversación (20 min, gratis)",
    label: "Primera conversación (20 min, gratis)",
    badge: "Gratis",
    badgeColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
  {
    value: "Revisión puntual (USD 50–100)",
    label: "Revisión puntual",
    badge: "USD 50–100",
    badgeColor: "text-violet-600 dark:text-violet-300 bg-violet-500/10 border-violet-500/30",
  },
  {
    value: "Mini proyecto (USD 200–400)",
    label: "Mini proyecto (Mobile, Web o Desktop)",
    badge: "USD 200–400",
    badgeColor: "text-[#ff6b4a] bg-[#ff6b4a]/10 border-[#ff6b4a]/30",
  },
  {
    value: "Acompañamiento mensual (Desde USD 350/mes)",
    label: "Acompañamiento técnico mensual",
    badge: "USD 350/mes",
    badgeColor: "text-violet-600 dark:text-violet-300 bg-violet-500/10 border-violet-500/30",
  },
  {
    value: "Proyecto a medida (Mobile · Web · Desktop)",
    label: "Proyecto a medida (Mobile · Web · Desktop)",
    badge: "Full-Stack",
    badgeColor: "text-sky-600 dark:text-sky-300 bg-sky-500/10 border-sky-500/30",
  },
  {
    value: "Otro tema / Colaboración",
    label: "Otro tema / Colaboración",
    badge: "General",
    badgeColor: "text-[var(--muted)] bg-[var(--border)]/40 border-[var(--border)]",
  },
];

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    whatsapp: "",
    subject: "Primera conversación (20 min, gratis)",
    message: "",
    website: "", // Honeypot anti-spam
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escuchar selección interactiva desde WorkFormatsSection
  useEffect(() => {
    const handleFormatSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ subject: string; hint: string }>;
      if (customEvent.detail?.subject) {
        setFormData((prev) => ({
          ...prev,
          subject: customEvent.detail.subject,
          message: prev.message.trim() ? prev.message : customEvent.detail.hint || prev.message,
        }));
      }
    };

    window.addEventListener("modlovelace:select-format", handleFormatSelect);
    return () => {
      window.removeEventListener("modlovelace:select-format", handleFormatSelect);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) {
      setStatus("success");
      return;
    }

    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Por favor ingresa tu nombre.");
      return;
    }

    if (!formData.email.trim() && !formData.whatsapp.trim()) {
      setStatus("error");
      setErrorMessage("Por favor ingresa tu correo electrónico o tu número de WhatsApp para poder responderte.");
      return;
    }

    if (!formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Por favor escribe un mensaje sobre lo que buscas resolver.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error al enviar el mensaje.");
      }

      setStatus("success");
      setFormData({
        name: "",
        company: "",
        email: "",
        whatsapp: "",
        subject: "Primera conversación (20 min, gratis)",
        message: "",
        website: "",
      });
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Hubo un inconveniente al enviar el formulario. Puedes escribirme directamente a mi correo."
      );
    }
  };

  return (
    <section id="contacto" className="py-16 sm:py-20 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout en 2 Columnas Delpaqq: "CONVERSEMOS" + Pasos y Formulario */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Columna Izquierda: Manifiesto y 3 Pasos de Proceso */}
          <div className="lg:col-span-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 sm:p-9 shadow-sm flex flex-col justify-between h-full gap-6">
            <div className="space-y-3">
              <div className="w-0.5 h-6 bg-gradient-to-b from-violet-500 to-[#ff6b4a] rounded-full" />
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-[var(--foreground)]">
                CONVERSEMOS
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Si tienes un proyecto en mente, dudas sobre dónde usar IA, o quieres una mirada externa sobre cómo está trabajando tu equipo técnico, escríbeme.
              </p>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Me interesa saber qué estás intentando resolver, qué han probado y dónde se están trabando. Conocer bien el caso es lo que lleva a buenos resultados.
              </p>
            </div>

            {/* 3 Pasos de Proceso */}
            <div className="space-y-3.5 pt-2">
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--background)]/60 flex items-start gap-3.5 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-[#ff6b4a] mt-0.5">
                  <Inbox className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-xs sm:text-sm text-[var(--foreground)]">
                    1. Me cuentas el contexto
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[var(--muted)] leading-relaxed">
                    El problema, qué han intentado y cómo prefieres que te responda.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--background)]/60 flex items-start gap-3.5 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-violet-500 dark:text-violet-400 mt-0.5">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-xs sm:text-sm text-[var(--foreground)]">
                    2. Lo leo con calma
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[var(--muted)] leading-relaxed">
                    Si puedo ayudar, te digo cómo. Si no es lo mío, también te lo digo.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--background)]/60 flex items-start gap-3.5 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 text-emerald-500 dark:text-emerald-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-bold text-xs sm:text-sm text-[var(--foreground)]">
                    3. Te respondo con un siguiente paso
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[var(--muted)] leading-relaxed">
                    Una idea, una conversación corta o una propuesta concreta.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario Estilo Delpaqq */}
          <div className="lg:col-span-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 sm:p-9 shadow-sm flex flex-col h-full">
            {status === "success" ? (
              <div className="my-auto py-12 px-6 border border-emerald-500/30 bg-emerald-500/5 rounded-xl space-y-3 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mb-2">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-[var(--foreground)]">
                  Mensaje recibido correctamente
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted)] max-w-md mx-auto leading-relaxed">
                  Gracias por escribirme. Lo revisaré con calma y te responderé con un siguiente paso a la brevedad.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-violet-500 hover:text-violet-400 cursor-pointer"
                  >
                    <span>Enviar otro mensaje</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full gap-5">
                
                {/* Honeypot anti-spam */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                {/* Fila 1: NOMBRE + EMPRESA U ORGANIZACIÓN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] leading-4 font-mono font-bold tracking-wider uppercase text-[var(--muted)] block">
                      NOMBRE
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-[10px] leading-4 font-mono font-bold tracking-wider uppercase text-[var(--muted)] block">
                      EMPRESA U ORGANIZACIÓN <span className="text-[9px] lowercase opacity-80">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Si aplica"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Fila 2: EMAIL + WHATSAPP */}
                <div className="space-y-1.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] leading-4 font-mono font-bold tracking-wider uppercase text-[var(--muted)] block">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="tu@correo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="whatsapp" className="text-[10px] leading-4 font-mono font-bold tracking-wider uppercase text-[var(--muted)] block">
                        WHATSAPP
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        placeholder="+51 ..."
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-violet-500 transition-colors"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-[var(--muted)] font-normal pt-0.5">
                    Con uno de los dos basta para responderte.
                  </p>
                </div>

                {/* Fila 3: SOBRE QUÉ QUIERES CONVERSAR (Selector personalizado con la identidad de la web) */}
                <div className="space-y-1.5 relative" ref={dropdownRef}>
                  <label htmlFor="subject-trigger" className="text-[10px] leading-4 font-mono font-bold tracking-wider uppercase text-[var(--muted)] block">
                    SOBRE QUÉ QUIERES CONVERSAR
                  </label>
                  <button
                    type="button"
                    id="subject-trigger"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className={`w-full px-4 py-2.5 text-xs sm:text-sm bg-[var(--background)] border rounded-xl text-[var(--foreground)] flex items-center justify-between gap-2 transition-colors cursor-pointer text-left ${
                      dropdownOpen ? "border-violet-500 ring-1 ring-violet-500/20" : "border-[var(--border)] hover:border-violet-500/50"
                    }`}
                  >
                    <span className="truncate font-medium">
                      {CONVERSATION_TOPICS.find((t) => t.value === formData.subject)?.label || formData.subject}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      {CONVERSATION_TOPICS.find((t) => t.value === formData.subject)?.badge && (
                        <span
                          className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            CONVERSATION_TOPICS.find((t) => t.value === formData.subject)?.badgeColor
                          }`}
                        >
                          {CONVERSATION_TOPICS.find((t) => t.value === formData.subject)?.badge}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-4 h-4 text-[var(--muted)] transition-transform duration-200 ${
                          dropdownOpen ? "rotate-180 text-violet-500" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute z-30 left-0 right-0 mt-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-2xl p-1.5 space-y-1">
                      {CONVERSATION_TOPICS.map((topic) => {
                        const isSelected = formData.subject === topic.value;
                        return (
                          <button
                            key={topic.value}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, subject: topic.value });
                              setDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 rounded-lg text-xs sm:text-sm flex items-center justify-between gap-2 text-left transition-colors cursor-pointer ${
                              isSelected
                                ? "bg-violet-500/15 text-violet-600 dark:text-violet-300 font-semibold"
                                : "text-[var(--foreground)] hover:bg-[var(--background)]/80"
                            }`}
                          >
                            <span className="truncate">{topic.label}</span>
                            <span
                              className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${topic.badgeColor}`}
                            >
                              {topic.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Fila 4: MENSAJE */}
                <div className="space-y-1.5 flex-1 flex flex-col">
                  <label htmlFor="message" className="text-[10px] leading-4 font-mono font-bold tracking-wider uppercase text-[var(--muted)] block">
                    MENSAJE
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="Qué intentas resolver, qué has probado y dónde se traba."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full flex-1 min-h-[120px] px-4 py-2.5 text-xs sm:text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-violet-500 transition-colors resize-y"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs font-medium text-rose-500">
                    {errorMessage}
                  </p>
                )}

                {/* Fila de Acción: Botón Violeta + Nota "El mensaje me llega directo." */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-violet-600/25 active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{status === "loading" ? "Enviando mensaje..." : "Enviar mensaje"}</span>
                  </button>

                  <span className="text-xs text-[var(--muted)] font-normal">
                    El mensaje me llega directo.
                  </span>
                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
