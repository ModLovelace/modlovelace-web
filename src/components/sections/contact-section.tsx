"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { ArrowRight, Check } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Primera conversación (20 min · Gratis)",
    message: "",
    website: "", // Honeypot anti-spam
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Escuchar selección de formatos desde WorkFormatsSection
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
        email: "",
        subject: "Primera conversación (20 min · Gratis)",
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera Estilo Delpaqq */}
        <div className="flex flex-col items-center text-center mb-10 space-y-1.5">
          <div className="w-0.5 h-6 bg-pink-500 mx-auto rounded-full" />
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-neutral-400">
            07 / CONTACTO
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide uppercase text-[var(--foreground)]">
            HABLEMOS DE TU PROYECTO
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl mx-auto leading-relaxed pt-1">
            Respuesta directa y sin intermediarios. Cuéntame sobre el reto técnico que buscas resolver.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
          {status === "success" ? (
            <div className="p-6 border border-emerald-500/30 bg-emerald-500/5 rounded-xl space-y-3 text-center">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <Check className="w-5 h-5 text-emerald-500" />
                <span>Mensaje recibido correctamente.</span>
              </div>
              <p className="text-xs text-[var(--muted)] max-w-md mx-auto">
                Reviso todos los mensajes directamente y te responderé al correo indicado a la brevedad.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-xs font-mono font-semibold text-[#ff6b4a] hover:underline pt-2 block mx-auto cursor-pointer"
              >
                Enviar otro mensaje →
              </button>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-[var(--foreground)]">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Tu nombre o empresa"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-[var(--foreground)]">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="tu@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-medium text-[var(--foreground)]">
                  Formato o motivo de contacto
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] focus:outline-none focus:border-violet-500 transition-colors cursor-pointer"
                >
                  <optgroup label="Formatos de Trabajo (Precios con 20% off)">
                    <option value="Primera conversación (20 min · Gratis)">Primera conversación (20 min · Gratis)</option>
                    <option value="Formato #1: Revisión puntual (USD 72–120)">Formato #1: Revisión puntual (USD 72–120)</option>
                    <option value="Formato #2: Mini proyecto (Desde USD 480)">Formato #2: Mini proyecto (Desde USD 480)</option>
                    <option value="Formato #3: Acompañamiento (Desde USD 320/mes)">Formato #3: Acompañamiento (Desde USD 320/mes)</option>
                  </optgroup>
                  <optgroup label="Otros Motivos">
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

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-[var(--foreground)]">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Describe el reto técnico, proyecto o lo que intentas resolver..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-violet-500 transition-colors resize-y"
                />
              </div>

              {status === "error" && (
                <p className="text-xs font-medium text-rose-500">
                  {errorMessage}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ff6b4a] hover:bg-[#ea580c] text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-orange-500/20 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <span>{status === "loading" ? "Enviando mensaje..." : "Enviar mensaje"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-xs text-[var(--muted)] hover:text-[#ff6b4a] transition-colors font-mono"
                >
                  {siteConfig.email}
                </a>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
