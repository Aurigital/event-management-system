export const eventConfig = {
  nombre: "Congreso 2026",
  descripcion: "Congreso profesional",
  fechas: {
    inicio: new Date("2026-05-29"),
    fin: new Date("2026-05-30"),
  },
  ubicacion: {
    nombre: "Centro de Convenciones",
    direccion: "",
    ciudad: "",
    pais: "",
    coordenadas: {
      lat: 0,
      lng: 0,
    },
  },
  contacto: {
    email: "info@evento.com",
    telefono: "",
    whatsapp: "",
  },
  dias: [
    {
      numero: 1,
      fecha: "2026-05-29",
      nombre: "Día 1",
    },
    {
      numero: 2,
      fecha: "2026-05-30",
      nombre: "Día 2",
    },
  ],
  fiesta: {
    disponible: true,
    fecha: "2026-05-30",
    nombre: "Fiesta de Clausura",
    ubicacion: "",
  },
};

export type EventConfig = typeof eventConfig;
