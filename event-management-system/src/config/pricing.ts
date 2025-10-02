export const pricingPhases = {
  EARLY_BIRD: {
    id: "early-bird",
    nombre: "Early Bird",
    fechaInicio: new Date("2025-11-01"),
    fechaFin: new Date("2025-12-31"),
    precioDiaIndividual: 50.0,
    precioCompleto: 90.0,
    precioFiesta: 25.0,
    descripcion: "Precio especial para compras anticipadas",
    activo: true,
  },
  REGULAR: {
    id: "regular",
    nombre: "Precio Regular",
    fechaInicio: new Date("2026-01-01"),
    fechaFin: new Date("2026-05-15"),
    precioDiaIndividual: 70.0,
    precioCompleto: 120.0,
    precioFiesta: 30.0,
    descripcion: "Precio estándar del evento",
    activo: true,
  },
  ESTUDIANTE: {
    id: "estudiante",
    nombre: "Precio Estudiante",
    fechaInicio: new Date("2025-11-01"),
    fechaFin: new Date("2026-05-28"),
    precioDiaIndividual: 35.0,
    precioCompleto: 60.0,
    precioFiesta: 20.0,
    descripcion: "Tarifa especial para estudiantes con validación",
    activo: true,
  },
  LAST_MINUTE: {
    id: "last-minute",
    nombre: "Last Minute",
    fechaInicio: new Date("2026-05-16"),
    fechaFin: new Date("2026-05-28"),
    precioDiaIndividual: 80.0,
    precioCompleto: 140.0,
    precioFiesta: 35.0,
    descripcion: "Precio de última hora",
    activo: false, // Se activa manualmente si se desea
  },
} as const;

export const monedas = {
  USD: {
    codigo: "USD",
    simbolo: "$",
    nombre: "Dólar estadounidense",
  },
  CRC: {
    codigo: "CRC",
    simbolo: "₡",
    nombre: "Colón costarricense",
  },
} as const;

export type PricingPhase = keyof typeof pricingPhases;
export type Moneda = keyof typeof monedas;
