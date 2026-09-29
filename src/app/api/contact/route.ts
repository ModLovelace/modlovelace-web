import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, website } = body;

    // Trampa Honeypot: si el campo 'website' tiene algo, es un bot de spam.
    if (website) {
      console.warn("Spam detectado vía trampa honeypot:", { name, email });
      return NextResponse.json({ success: true, note: "ok" });
    }

    // Validación básica de campos requeridos
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Por favor completa tu nombre, correo y mensaje." },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || "enriquerafaelbecerrabocangel@gmail.com";
    const timestamp = new Date().toLocaleString("es-PE", { timeZone: "America/Lima" });

    // Plantilla HTML limpia y profesional para el correo
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafafa; color: #111; padding: 24px; }
            .card { background: #ffffff; border: 1px solid #eaeaea; border-radius: 6px; padding: 28px; max-width: 580px; margin: 0 auto; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            .header { border-bottom: 2px solid #e63946; padding-bottom: 14px; margin-bottom: 20px; }
            .title { font-size: 18px; font-weight: 600; color: #111; margin: 0; }
            .meta { font-size: 13px; color: #666; margin-top: 4px; font-family: monospace; }
            .field { margin-bottom: 16px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; font-family: monospace; margin-bottom: 4px; }
            .value { font-size: 14px; color: #222; }
            .message-box { background: #f8f9fa; border-left: 3px solid #e63946; padding: 16px; border-radius: 2px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #111; }
            .footer { margin-top: 24px; padding-top: 14px; border-top: 1px solid #eaeaea; font-size: 12px; color: #999; text-align: center; font-family: monospace; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h2 class="title">Nuevo contacto desde modlovelace.com</h2>
              <div class="meta">${timestamp} (Hora Perú)</div>
            </div>

            <div class="field">
              <div class="label">Remitente</div>
              <div class="value"><strong>${name}</strong> &lt;<a href="mailto:${email}">${email}</a>&gt;</div>
            </div>

            <div class="field">
              <div class="label">Motivo</div>
              <div class="value">${subject || "Contacto General"}</div>
            </div>

            <div class="field">
              <div class="label">Mensaje</div>
              <div class="message-box">${message}</div>
            </div>

            <div class="footer">
              Puedes responder directamente a este correo para contestar a ${name}.
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
Nuevo contacto desde modlovelace.com
Fecha: ${timestamp}

Remitente: ${name} (${email})
Motivo: ${subject || "Contacto General"}

Mensaje:
${message}

---
Puedes responder a este correo para contestar directamente a ${email}.
    `.trim();

    // Envío a través de Resend
    const { data, error } = await resend.emails.send({
      from: "ModLovelace Web <onboarding@resend.dev>",
      to: [recipient],
      replyTo: email,
      subject: `[modlovelace.com] ${subject || "Nuevo Mensaje"} - ${name}`,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("Error al despachar correo con Resend:", error);
      return NextResponse.json(
        { success: false, message: `Error del servicio de correo: ${error.message}` },
        { status: 500 }
      );
    }

    console.log("Correo enviado con éxito vía Resend:", {
      id: data?.id,
      to: recipient,
      sender: email,
      name,
    });

    return NextResponse.json({
      success: true,
      message: "Mensaje enviado exitosamente. Te responderemos pronto.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Error general en API de contacto:", error);
    return NextResponse.json(
      { success: false, message: "Hubo un error procesando el mensaje." },
      { status: 500 }
    );
  }
}
