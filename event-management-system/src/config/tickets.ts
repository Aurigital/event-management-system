export const ticketCategories = {
  PAGADO: {
    id: "Pagado",
    nombre: "Entrada General",
    descripcion: "Para doctores colegiados y profesionales",
    color: "blue",
  },
  GRATUITO: {
    id: "Gratuito",
    nombre: "Entrada Gratuita",
    descripcion: "Invitados especiales",
    color: "green",
  },
  CONFERENCISTA: {
    id: "Conferencista",
    nombre: "Conferencista",
    descripcion: "Acceso completo para speakers",
    color: "purple",
  },
  PATROCINADOR: {
    id: "Patrocinador",
    nombre: "Patrocinador",
    descripcion: "Entradas corporativas",
    color: "gold",
  },
} as const;

export const ticketModalidades = {
  DIA1: {
    id: "Dia1",
    nombre: "Día 1",
    descripcion: "Acceso solo al primer día",
  },
  DIA2: {
    id: "Dia2",
    nombre: "Día 2",
    descripcion: "Acceso solo al segundo día",
  },
  COMPLETO: {
    id: "Completo",
    nombre: "Entrada Completa",
    descripcion: "Acceso a todos los días del evento",
  },
} as const;

export type TicketCategory = keyof typeof ticketCategories;
export type TicketModalidad = keyof typeof ticketModalidades;
