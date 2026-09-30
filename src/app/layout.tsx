import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: "Enrique Becerra | Ingeniero de Software & Soluciones Móviles",
    template: "%s | Enrique Becerra",
  },
  description:
    "Portafolio oficial de Enrique Becerra (ModLovelace). Ingeniero de software especializado en aplicaciones móviles (Flutter, Android, iOS), backend robusto (.NET Core, Docker) y flujos con agentes de IA.",
  keywords: [
    "Enrique Becerra",
    "ModLovelace",
    "Enrique Rafael Becerra Bocangel",
    "Ingeniero de Software",
    "Desarrollador Flutter",
    "Mobile Specialist",
    "Desarrollo Móvil",
    "Android",
    "iOS",
    "Flutter",
    ".NET Core",
    "Docker",
    "Catjang-Sue",
    "Desarrollador Perú",
    "Software Engineer Peru",
    "AI Agent Workflows",
    "Open Source",
  ],
  authors: [{ name: "Enrique Becerra", url: `https://${siteConfig.domain}` }],
  creator: "Enrique Becerra (ModLovelace)",
  publisher: "Enrique Becerra",
  alternates: {
    canonical: `https://${siteConfig.domain}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Enrique Becerra | Ingeniero de Software & Soluciones Móviles",
    description:
      "Especialista en ecosistemas móviles (Flutter, Android, iOS), backend con .NET Core y Docker, y orquestación deliberada de agentes de IA.",
    url: `https://${siteConfig.domain}`,
    siteName: "Enrique Becerra (ModLovelace)",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enrique Becerra | Ingeniero de Software & Soluciones Móviles",
    description:
      "Especialista en ecosistemas móviles (Flutter, Android, iOS), backend con .NET Core y Docker, y orquestación deliberada de agentes de IA.",
    creator: "@modlovelace",
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "SquMRkov6k2-OVLRw2kYtdcpCZMacVnstCJCJ4ioU2o",
  },
};

// Datos Estructurados Schema.org para Google Knowledge Graph
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `https://${siteConfig.domain}/#person`,
      name: "Enrique Becerra",
      alternateName: ["ModLovelace", "Mod", "Enrique Rafael Becerra Bocangel"],
      url: `https://${siteConfig.domain}`,
      jobTitle: "Software Engineer & Mobile Solutions Architect",
      description: siteConfig.description,
      email: siteConfig.email,
      sameAs: [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.youtube,
      ],
      knowsAbout: [
        "Flutter",
        "Dart",
        "Android",
        "iOS",
        "Kotlin",
        "Swift",
        ".NET Core",
        "Docker",
        "Electron",
        "Artificial Intelligence",
        "TypeScript",
        "React",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `https://${siteConfig.domain}/#website`,
      url: `https://${siteConfig.domain}`,
      name: "Enrique Becerra | Portafolio Oficial",
      description: siteConfig.description,
      publisher: {
        "@id": `https://${siteConfig.domain}/#person`,
      },
      inLanguage: "es-PE",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <head>
        <meta name="google-site-verification" content="SquMRkov6k2-OVLRw2kYtdcpCZMacVnstCJCJ4ioU2o" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-150 antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
