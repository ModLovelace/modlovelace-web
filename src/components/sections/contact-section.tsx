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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado industrial */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--border)] pb-3 mb-8 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--foreground)] font-bold">
              03 // Canal de Contacto Directo &amp; Consultoría
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[var(--muted)]">
            Respuesta directa · Sin intermediarios
          </span>
        </div>

        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-2xl">
            ¿Tienes un reto técnico complejo, necesitas diseñar o construir una solución para móvil, web o desktop, o deseas consultoría sobre arquitectura y agentes de IA? Envíame un mensaje directo.
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
                  <label htmlFor="name" className="text-xs font-medium text-[var(--foreground)]">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-[var(--card)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-[var(--foreground)]">
                    Correo
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="tu@correo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-[var(--card)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-blue-600 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-medium text-[var(--foreground)]">
                  Motivo de contacto
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-[var(--card)] border border-[var(--border)] rounded-xl text-[var(--foreground)] focus:outline-none focus:border-blue-600 transition-colors cursor-pointer"
                >
                  <option value="Soluciones Móviles (Android / iOS / Flutter)">Soluciones Móviles (Android / iOS / Flutter)</option>
                  <option value="Desarrollo Web & Plataformas Cloud">Desarrollo Web &amp; Plataformas Cloud</option>
                  <option value="Software de Escritorio (Desktop Linux/Win/Mac)">Software de Escritorio (Desktop Linux/Win/Mac)</option>
                  <option value="Backend & APIs (.NET Core / Docker)">Backend &amp; APIs (.NET Core / Docker)</option>
                  <option value="Flujos de Agentes de IA & QA Automatizado">Flujos de Agentes de IA &amp; QA Automatizado</option>
                  <option value="Propuesta laboral / Consultoría">Propuesta laboral / Consultoría</option>
                  <option value="Otro motivo">Otro motivo</option>
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
                  placeholder="Describe el proyecto o reto técnico..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm bg-[var(--card)] border border-[var(--border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)]/50 focus:outline-none focus:border-blue-600 transition-colors resize-y"
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-md shadow-blue-600/25 disabled:opacity-50 cursor-pointer"
                >
                  <span>{status === "loading" ? "Enviando..." : "Enviar mensaje"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-mono"
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
