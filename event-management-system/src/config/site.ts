export const siteConfig = {
  name: "Sistema de Gestión de Eventos",
  description: "Plataforma de inscripciones, venta de tickets y control de acceso para eventos",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "",
    github: "",
    facebook: "",
    instagram: "",
  },
  creator: {
    name: "Tu Organización",
    url: "",
  },
};

export type SiteConfig = typeof siteConfig;
