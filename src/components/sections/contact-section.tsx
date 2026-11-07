"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { Inbox, Cpu, CheckCircle2, Check, ArrowRight } from "lucide-react";

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

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
    <section id="contacto" className="py-16 sm:py-24 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout en 2 Columnas Delpaqq: "CONVERSEMOS" + Pasos y Formulario */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Columna Izquierda: Manifiesto y 3 Pasos de Proceso */}
          <div className="lg:col-span-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 sm:p-9 shadow-sm space-y-6">
            <div className="space-y-3">
              <div className="w-0.5 h-6 bg-pink-500 rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-wide uppercase text-[var(--foreground)]">
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
                <div className="w-9 h-9 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0 text-pink-500 mt-0.5">
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
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 text-purple-400 mt-0.5">
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
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
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
          <div className="lg:col-span-7 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 sm:p-9 shadow-sm">
            {status === "success" ? (
              <div className="py-12 px-6 border border-emerald-500/30 bg-emerald-500/5 rounded-xl space-y-3 text-center">
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
              <form onSubmit={handleSubmit} className="space-y-5">
                
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400 block">
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
                    <label htmlFor="company" className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400 block">
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
                <div className="space-y-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400 block">
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
                      <label htmlFor="whatsapp" className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400 block">
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

                {/* Fila 3: SOBRE QUÉ QUIERES CONVERSAR */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400 block">
                    SOBRE QUÉ QUIERES CONVERSAR
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                  >
                    <optgroup label="Formatos de Trabajo (20% OFF)">
                      <option value="Primera conversación (20 min, gratis)">Primera conversación (20 min, gratis)</option>
                      <option value="Formato #1: Revisión puntual (USD 72–120)">Formato #1: Revisión puntual (USD 72–120)</option>
                      <option value="Formato #2: Mini proyecto (Desde USD 480)">Formato #2: Mini proyecto (Desde USD 480)</option>
                      <option value="Formato #3: Acompañamiento (Desde USD 320/mes)">Formato #3: Acompañamiento (Desde USD 320/mes)</option>
                    </optgroup>
                    <optgroup label="Especialidades &amp; Consultoría">
                      <option value="Soluciones Móviles (Android / iOS / Flutter)">Soluciones Móviles (Android / iOS / Flutter)</option>
                      <option value="Desarrollo Web & Plataformas Cloud">Desarrollo Web &amp; Plataformas Cloud</option>
                      <option value="Software de Escritorio (Desktop Linux/Win/Mac)">Software de Escritorio (Desktop Linux/Win/Mac)</option>
                      <option value="Backend & APIs (.NET Core / Docker)">Backend &amp; APIs (.NET Core / Docker)</option>
                      <option value="Flujos de Agentes de IA & QA Automatizado">Flujos de Agentes de IA &amp; QA Automatizado</option>
                      <option value="Propuesta laboral / Consultoría">Propuesta laboral / Consultoría</option>
                      <option value="Otro motivo">Otro motivo</option>
                    </optgroup>
                  </select>
                </div>

                {/* Fila 4: MENSAJE */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400 block">
                    MENSAJE
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Qué intentas resolver, qué has probado y dónde se traba."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-violet-500 transition-colors resize-y"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs font-medium text-rose-500">
                    {errorMessage}
                  </p>
                )}

                {/* Fila de Acción: Botón Violeta + Nota "El mensaje me llega directo." */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
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
