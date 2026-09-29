export interface Project {
  title: string;
  category: string;
  status: "Producción" | "Open Source" | "En desarrollo" | "Experimento";
  description: string;
  highlights: string[];
  tech: string[];
  links: {
    repo?: string;
    live?: string;
    playStore?: string;
    appStore?: string;
    releases?: string;
  };
  badgeColor?: string;
}

export const siteConfig = {
  name: "Enrique Becerra",
  alias: "Mod / ModLovelace",
  domain: "modlovelace.com",
  title: "Enrique Becerra (Mod) | Ingeniero de Software · Soluciones Móviles & Retos Complejos",
  description:
    "Ingeniero de software con amplia experiencia en tecnología, especializado en ingeniería móvil y preparado para liderar y resolver cualquier desafío técnico de extremo a extremo.",
  email: "enriquerafaelbecerrabocangel@gmail.com",
  links: {
    github: "https://github.com/ModLovelace",
    linkedin: "https://www.linkedin.com/in/enrique-becerra-bo/",
    youtube: "https://www.youtube.com/@modlovelace",
    vercel: "https://vercel.com/modlovelace",
  },
  now: {
    date: "Septiembre 2026",
    status: "Resolviendo retos técnicos de ingeniería & Open Source",
    items: [
      {
        title: "Ecosistema Open Source & Arquitectura",
        description:
          "Escalando Catjang-Sue multiplataforma (Linux Wayland/X11, macOS universal y Windows) y conectándolo con agentes de IA.",
      },
      {
        title: "Ingeniería Móvil de Alto Rendimiento",
        description:
          "Diseño de arquitecturas móviles resilientes, optimización de consumo de memoria y puentes nativos de bajo nivel.",
      },
      {
        title: "Sistemas & Flujos Aumentados por IA",
        description:
          "Diseñando arquitecturas con agentes de IA, guardarraíles estrictos y suites de testing automatizado de alta fidelidad.",
      },
    ],
  },
  skills: {
    mobile: [
      { name: "Flutter & Dart", level: "Dominio Profundo", role: "Multiplataforma de alto rendimiento" },
      { name: "Kotlin (Android)", level: "Nativo", role: "Puentes de hardware y optimización" },
      { name: "Swift (iOS)", level: "Nativo", role: "Arquitecturas móviles nativas" },
      { name: "Mobile DevOps & CI/CD", level: "Avanzado", role: "Publicación en Google Play & App Store" },
    ],
    fullstack: [
      { name: "React 19 / Next.js / Vite", level: "Avanzado", role: "Frontend moderno y web apps interactivas" },
      { name: "Tailwind CSS", level: "Avanzado", role: "Sistemas de diseño escalables y modo oscuro" },
      { name: ".NET Core (C#)", level: "Sólido", role: "Microservicios, APIs y backend robusto" },
      { name: "PostgreSQL & SQL Server", level: "Sólido", role: "Modelado relacional y alta concurrencia" },
      { name: "Docker & Linux", level: "Avanzado", role: "Contenedores, administración de servidores y entornos" },
    ],
    aiAndMethodology: [
      { name: "Orquestación de Agentes IA", level: "Avanzado", role: "Gemini CLI / Antigravity, Claude Code, Cursor, Codex" },
      { name: "QA & Diagnóstico Metódico", level: "Avanzado", role: "Principio rector: Pausar, Diagnosticar y Resolver" },
      { name: "Pipelines CI/CD & Deploy", level: "Sólido", role: "GitHub Actions, Vercel, Docker Hub y builds multi-SO" },
      { name: "Diseño & Accesibilidad (A11y)", level: "Avanzado", role: "WCAG 2.1, tokens de diseño y UI adaptativa" },
      { name: "Resolución Polyglot", level: "Dominio", role: "Versatilidad técnica para aprender y dominar cualquier stack" },
    ],
  },
  projects: [
    {
      title: "Catjang-Sue",
      category: "Desktop / Open Source & AI",
      status: "Open Source",
      badgeColor: "emerald",
      description:
        "Mascota virtual de escritorio para desarrolladores con 6 especies y reactividad en tiempo real a 5 agentes de IA (Gemini, Claude, Cursor, Codex y Kiro).",
      highlights: [
        "Multiplataforma nativo: Windows (.exe NSIS), macOS (.dmg universal M1-M4/Intel) y Linux.",
        "6 mascotas animadas en SVG, audio reactivo y suite de QA con 54/54 tests pasando.",
      ],
      tech: ["Electron", "SVG Animations", "Node.js", "AI Agent Hooks", "CI/CD Actions"],
      links: {
        repo: "https://github.com/ModLovelace/catjang-sue",
        releases: "https://github.com/ModLovelace/catjang-sue/releases/latest",
      },
    },
    {
      title: "Regala Flores Amarillas",
      category: "Web Interactiva / Experiencia",
      status: "Producción",
      badgeColor: "amber",
      description:
        "Experiencia web interactiva con floración procedural en 4 fases, sintetizador acústico en tiempo real con Web Audio API y generador de tarjetas virales.",
      highlights: [
        "Motor de floración procedural con mariposas orbitales y audio acústico sintetizado.",
        "Generador y exportador de tarjetas HD en formato 9:16 y 1:1 con cartas personalizadas.",
      ],
      tech: ["React 19", "Vite", "Tailwind CSS", "Web Audio API", "Vercel"],
      links: {
        repo: "https://github.com/ModLovelace/flores-amarillas-primavera",
        live: "https://regala-flores-amarillas.vercel.app",
      },
    },
    {
      title: "Santa Isabel Socia",
      category: "Mobile / Fintech Cooperativo",
      status: "Producción",
      badgeColor: "blue",
      description:
        "Aplicación móvil oficial para socios de la Cooperativa Santa Isabel. Consultas financieras seguras, movimientos de cuentas y votaciones en asambleas.",
      highlights: [
        "Arquitectura móvil segura y reactiva para consultas financieras y transferencias.",
        "Módulo integral de votaciones institucionales en tiempo real para asambleas.",
      ],
      tech: ["Flutter", "Dart", "Android", "iOS", "API REST Segura"],
      links: {
        playStore: "https://play.google.com/store/apps/details?id=pe.com.santaisabel.socia&hl=es_419",
      },
    },
    {
      title: "WebControl App",
      category: "Mobile / Enterprise & Logística",
      status: "Producción",
      badgeColor: "purple",
      description:
        "Solución móvil empresarial para entornos industriales y mineros de alta exigencia: control de fatiga, credenciales digitales y gestión de accesos.",
      highlights: [
        "Credenciales digitales con sincronización offline/online y validación en portería.",
        "Módulo ergonómico de control de fatiga y monitoreo preventivo en tiempo real.",
      ],
      tech: ["Mobile Multiplataforma", "C# / .NET", "APIs Empresariales", "Cloud Sync"],
      links: {
        playStore: "https://play.google.com/store/apps/details?id=com.webcontrol.android&hl=es_419",
        appStore: "https://apps.apple.com/us/app/webcontrolapp/id1453757601",
      },
    },
  ] as Project[],
  services: [
    {
      title: "Especialista en Soluciones Móviles",
      tag: "Android, iOS & Multiplataforma",
      description:
        "Arquitectura, diseño y desarrollo de aplicaciones móviles fluidas, robustas y preparadas para millones de usuarios, sea con Flutter o de forma nativa.",
      features: [
        "Experiencia avanzada en puentes nativos (Kotlin / Swift) y optimización de hardware",
        "Publicación, resolución de rechazos y ciclo de vida en Google Play & App Store",
        "Manejo de estado escalable, arquitecturas offline-first y seguridad de datos",
      ],
    },
    {
      title: "Ingeniería de Software & Retos Complejos",
      tag: "Polyglot & Arquitectura Integral",
      description:
        "Capacidad probada para entrar a cualquier reto técnico de software, entender el problema de raíz y construir la solución adecuada en el stack que se requiera.",
      features: [
        "Desarrollo backend y APIs de alta concurrencia (.NET Core, Docker, SQL/NoSQL)",
        "Aplicaciones Web modernas y software de escritorio multiplataforma",
        "Refactorización de sistemas con deuda técnica y optimización de rendimiento",
      ],
    },
    {
      title: "Flujos de IA & Automatización de Calidad",
      tag: "AI-Augmented Engineering",
      description:
        "Integración metódica de agentes de IA en flujos de desarrollo reales, con guardarraíles de contexto estrictos y testing automatizado continuo.",
      features: [
        "Diseño de pruebas automatizadas y QA metódico guiado por IA",
        "Orquestación de tareas complejas con agentes sin alucinaciones",
        "Principio rector: «Pausar, Diagnosticar y Corregir» para entregas sin errores",
      ],
    },
  ],
};
