import { ImageResponse } from "next/og";

export const alt = "Enrique Becerra (ModLovelace) | Ingeniero de Software & Especialista Móvil";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#ededed",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "22px", color: "#808080" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#e63946" }} />
          <span>modlovelace.com</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "64px", fontWeight: "600", letterSpacing: "-0.03em", color: "#ffffff" }}>
            Enrique Becerra
          </div>
          <div style={{ fontSize: "28px", color: "#e63946", fontWeight: "500" }}>
            Ingeniero de Software &amp; Soluciones Móviles
          </div>
          <div style={{ fontSize: "22px", color: "#999999", maxWidth: "900px", lineHeight: "1.4" }}>
            Android · iOS · Flutter · .NET Core · Docker · Agentes de IA
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1f1f1f",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#666666",
          }}
        >
          <span>Portafolio Profesional</span>
          <span>github.com/ModLovelace</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
