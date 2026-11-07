import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, company, email, whatsapp, subject, message, website } = body;

    // Trampa Honeypot: si el campo 'website' tiene algo, es un bot de spam.
    if (website) {
      console.warn("Spam detectado vía trampa honeypot:", { name, email, whatsapp });
      return NextResponse.json({ success: true, note: "ok" });
    }

    // Validación: nombre, mensaje y al menos uno entre email o whatsapp
    if (!name || (!email && !whatsapp) || !message) {
      return NextResponse.json(
        { success: false, message: "Por favor completa tu nombre, tu correo o WhatsApp, y un mensaje." },
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
            .header { border-bottom: 2px solid #8b5cf6; padding-bottom: 14px; margin-bottom: 20px; }
            .title { font-size: 18px; font-weight: 600; color: #111; margin: 0; }
            .meta { font-size: 13px; color: #666; margin-top: 4px; font-family: monospace; }
            .field { margin-bottom: 16px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #888; font-family: monospace; margin-bottom: 4px; }
            .value { font-size: 14px; color: #222; }
            .message-box { background: #f8f9fa; border-left: 3px solid #8b5cf6; padding: 16px; border-radius: 2px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #111; }
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
              <div class="value"><strong>${name}</strong> ${company ? `(${company})` : ""}</div>
            </div>

            <div class="field">
              <div class="label">Contacto</div>
              <div class="value">
                ${email ? `Email: &lt;<a href="mailto:${email}">${email}</a>&gt;<br>` : ""}
                ${whatsapp ? `WhatsApp: <strong>${whatsapp}</strong>` : ""}
              </div>
            </div>

            <div class="field">
              <div class="label">Sobre qué quiere conversar</div>
              <div class="value">${subject || "Contacto General"}</div>
            </div>

            <div class="field">
              <div class="label">Mensaje</div>
              <div class="message-box">${message}</div>
            </div>

            <div class="footer">
              ${email ? `Puedes responder directamente a este correo para contestar a ${name}.` : `Contacto registrado vía WhatsApp: ${whatsapp}`}
            </div>
          </div>
        </body>
      </html>
    `;

    const textContent = `
Nuevo contacto desde modlovelace.com
Fecha: ${timestamp}

Remitente: ${name} ${company ? `(${company})` : ""}
Contacto: ${email || "No indicó email"} | WhatsApp: ${whatsapp || "No indicó WhatsApp"}
Sobre qué quiere conversar: ${subject || "Contacto General"}

Mensaje:
${message}
    `.trim();

    // Envío a través de Resend
    const { data, error } = await resend.emails.send({
      from: "ModLovelace Web <onboarding@resend.dev>",
      to: [recipient],
      replyTo: email || recipient,
      subject: `[modlovelace.com] ${subject || "Nuevo Mensaje"} - ${name}`,
      text: textContent,
      html: htmlContent,
    });

    if (error) {
      console.error("Error al enviar correo con Resend:", error);
      return NextResponse.json(
        { success: false, message: "No se pudo despachar el mensaje por el servicio de correo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Error interno en api/contact:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor al procesar la solicitud." },
      { status: 500 }
    );
  }
}
