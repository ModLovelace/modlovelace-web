"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { ArrowRight, Check } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Soluciones Móviles (Android / iOS / Flutter)",
    message: "",
    website: "", // Honeypot anti-spam
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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
      setFormData({ name: "", email: "", subject: "Soluciones Móviles (Android / iOS / Flutter)", message: "", website: "" });
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
    <section id="contacto" className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        
        {/* Encabezado editorial */}
        <div className="flex items-baseline justify-between border-b border-[var(--border)] pb-3 mb-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
            Contacto Directo
          </h2>
          <span className="text-[11px] font-mono text-[var(--muted)]">
            Consultoría &amp; Ingeniería
          </span>
        </div>

        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-lg">
            ¿Tienes un reto técnico, requieres desarrollo móvil de alto nivel o deseas consultar arquitectura de sistemas? Envíame un mensaje directo.
          </p>

          {status === "success" ? (
            <div className="p-6 border border-[var(--border)] rounded-[2px] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--foreground)]">
                <Check className="w-4 h-4 text-[#e63946]" />
                <span>Mensaje recibido correctamente.</span>
              </div>
              <p className="text-xs text-[var(--muted)]">
                Te responderé al correo indicado a la brevedad.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="text-xs font-mono text-[#e63946] hover:underline"
              >
                Enviar otro mensaje →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Honeypot */}
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
                  <label htmlFor="name" className="text-[11px] font-mono text-[var(--muted)]">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono bg-transparent border border-[var(--border)] rounded-[2px] text-[var(--foreground)] placeholder:text-[var(--muted)]/40 focus:outline-none focus:border-[#e63946] transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[11px] font-mono text-[var(--muted)]">
                    Correo
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="tu@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs font-mono bg-transparent border border-[var(--border)] rounded-[2px] text-[var(--foreground)] placeholder:text-[var(--muted)]/40 focus:outline-none focus:border-[#e63946] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-[11px] font-mono text-[var(--muted)]">
                  Motivo de contacto
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono bg-[var(--background)] border border-[var(--border)] rounded-[2px] text-[var(--foreground)] focus:outline-none focus:border-[#e63946] transition-colors cursor-pointer"
                >
                  <option value="Soluciones Móviles (Android / iOS / Flutter)">Soluciones Móviles (Android / iOS / Flutter)</option>
                  <option value="Backend & APIs (.NET Core / Docker)">Backend &amp; APIs (.NET Core / Docker)</option>
                  <option value="Flujos de Agentes de IA & QA Automatizado">Flujos de Agentes de IA &amp; QA Automatizado</option>
                  <option value="Colaboración Open Source (Catjang-Sue)">Colaboración Open Source (Catjang-Sue)</option>
                  <option value="Propuesta laboral / Consultoría">Propuesta laboral / Consultoría</option>
                  <option value="Otro motivo">Otro motivo</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[11px] font-mono text-[var(--muted)]">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Describe el proyecto o reto técnico..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-mono bg-transparent border border-[var(--border)] rounded-[2px] text-[var(--foreground)] placeholder:text-[var(--muted)]/40 focus:outline-none focus:border-[#e63946] transition-colors resize-y"
                />
              </div>

              {status === "error" && (
                <p className="text-xs font-mono text-[#e63946]">
                  {errorMessage}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-[2px] bg-[var(--foreground)] text-[var(--background)] hover:bg-[#e63946] hover:text-white font-mono text-xs transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <span>{status === "loading" ? "Enviando..." : "Enviar mensaje"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-xs font-mono text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
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
