import { pgTable, uuid, varchar, integer, decimal, boolean, timestamp, text, pgEnum, jsonb, time, date } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enums
export const generoEnum = pgEnum("genero", ["Masculino", "Femenino", "Otro", "Prefiero no decir"]);
export const sectorEnum = pgEnum("sector", ["Publico", "Privado"]);
export const tipoTicketEnum = pgEnum("tipo_ticket", ["Pagado", "Gratuito", "Conferencista", "Patrocinador"]);
export const modalidadTicketEnum = pgEnum("modalidad_ticket", ["Dia1", "Dia2", "Completo"]);
export const estadoTicketEnum = pgEnum("estado_ticket", ["Activo", "Usado", "Cancelado", "Reembolsado"]);
export const estadoCompraEnum = pgEnum("estado_compra", ["Iniciado", "Completado", "Abandonado", "Cancelado"]);
export const tipoDescuentoEnum = pgEnum("tipo_descuento", ["Porcentaje", "MontoFijo"]);
export const metodoPagoEnum = pgEnum("metodo_pago", ["OnvoPayments", "Datafono"]);
export const monedaEnum = pgEnum("moneda", ["USD", "CRC"]);
export const estadoPagoEnum = pgEnum("estado_pago", ["Pendiente", "Pagado", "Fallido", "Reembolsado"]);
export const tipoRegistroEnum = pgEnum("tipo_registro", ["Entrada_Evento", "Salida_Evento"]);
export const tipoCertificadoEnum = pgEnum("tipo_certificado", ["Participacion", "Aprovechamiento"]);
export const estadoCertificadoEnum = pgEnum("estado_certificado", ["Generado", "Enviado", "Error"]);
export const rolAdminEnum = pgEnum("rol_admin", ["SuperAdmin", "Admin", "Staff", "Scanner"]);

// Usuarios / Asistentes
export const usuarios = pgTable("usuarios", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
  apellido: varchar("apellido", { length: 200 }).notNull(),
  edad: integer("edad").notNull(),
  genero: generoEnum("genero").notNull(),
  procedencia: varchar("procedencia", { length: 200 }).notNull(),
  profesion: varchar("profesion", { length: 200 }).notNull(),
  sector: sectorEnum("sector").notNull(),
  telefono: varchar("telefono", { length: 20 }).notNull(),
  correo: varchar("correo", { length: 200 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Compras
export const compras = pgTable("compras", {
  id: uuid("id").primaryKey().defaultRandom(),
  correoComprador: varchar("correo_comprador", { length: 200 }).notNull(),
  cantidadTickets: integer("cantidad_tickets").notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  descuentoTotal: decimal("descuento_total", { precision: 10, scale: 2 }).default("0.00").notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  idCupon: uuid("id_cupon").references(() => cupones.id),
  estadoCompra: estadoCompraEnum("estado_compra").default("Iniciado").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Cupones
export const cupones = pgTable("cupones", {
  id: uuid("id").primaryKey().defaultRandom(),
  codigo: varchar("codigo", { length: 50 }).notNull().unique(),
  tipoDescuento: tipoDescuentoEnum("tipo_descuento").notNull(),
  valorDescuento: decimal("valor_descuento", { precision: 10, scale: 2 }).notNull(),
  fechaInicio: timestamp("fecha_inicio").notNull(),
  fechaExpiracion: timestamp("fecha_expiracion").notNull(),
  usosMaximos: integer("usos_maximos"),
  usosActuales: integer("usos_actuales").default(0).notNull(),
  activo: boolean("activo").default(true).notNull(),
  descripcion: text("descripcion"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Fases de Precio
export const fasesPrecio = pgTable("fases_precio", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombreFase: varchar("nombre_fase", { length: 100 }).notNull(),
  fechaInicio: timestamp("fecha_inicio").notNull(),
  fechaFin: timestamp("fecha_fin").notNull(),
  precioDiaIndividual: decimal("precio_dia_individual", { precision: 10, scale: 2 }).notNull(),
  precioCompleto: decimal("precio_completo", { precision: 10, scale: 2 }).notNull(),
  precioFiesta: decimal("precio_fiesta", { precision: 10, scale: 2 }).notNull(),
  descripcion: text("descripcion"),
  activo: boolean("activo").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tickets
export const tickets = pgTable("tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  idUsuario: uuid("id_usuario").references(() => usuarios.id).notNull(),
  idCompra: uuid("id_compra").references(() => compras.id).notNull(),
  tipoTicket: tipoTicketEnum("tipo_ticket").notNull(),
  modalidad: modalidadTicketEnum("modalidad").notNull(),
  incluyeFiesta: boolean("incluye_fiesta").default(false).notNull(),
  precioPagado: decimal("precio_pagado", { precision: 10, scale: 2 }).notNull(),
  precioOriginal: decimal("precio_original", { precision: 10, scale: 2 }).notNull(),
  idFasePrecio: uuid("id_fase_precio").references(() => fasesPrecio.id),
  estadoTicket: estadoTicketEnum("estado_ticket").default("Activo").notNull(),
  qrCode: text("qr_code").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Pagos
export const pagos = pgTable("pagos", {
  id: uuid("id").primaryKey().defaultRandom(),
  idCompra: uuid("id_compra").references(() => compras.id).notNull(),
  metodoPago: metodoPagoEnum("metodo_pago").notNull(),
  moneda: monedaEnum("moneda").notNull(),
  monto: decimal("monto", { precision: 10, scale: 2 }).notNull(),
  estadoPago: estadoPagoEnum("estado_pago").default("Pendiente").notNull(),
  fechaPago: timestamp("fecha_pago"),
  referenciaTransaccion: varchar("referencia_transaccion", { length: 200 }),
  detallesAdicionales: jsonb("detalles_adicionales"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Conferencistas
export const conferencistas = pgTable("conferencistas", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
  biografia: text("biografia"),
  fotoUrl: text("foto_url"),
  correo: varchar("correo", { length: 200 }),
  organizacion: varchar("organizacion", { length: 200 }),
  redesSociales: jsonb("redes_sociales"),
  ordenDisplay: integer("orden_display").notNull(),
  activo: boolean("activo").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Charlas / Agenda
export const charlas = pgTable("charlas", {
  id: uuid("id").primaryKey().defaultRandom(),
  titulo: varchar("titulo", { length: 300 }).notNull(),
  descripcion: text("descripcion"),
  fecha: date("fecha").notNull(),
  horaInicio: time("hora_inicio").notNull(),
  horaFin: time("hora_fin").notNull(),
  duracionMinutos: integer("duracion_minutos").notNull(),
  idConferencista: uuid("id_conferencista").references(() => conferencistas.id),
  ubicacion: varchar("ubicacion", { length: 200 }),
  cupoMaximo: integer("cupo_maximo"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Patrocinadores
export const patrocinadores = pgTable("patrocinadores", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
  logoUrl: text("logo_url").notNull(),
  ordenDisplay: integer("orden_display").notNull(),
  urlSitioWeb: text("url_sitio_web"),
  descripcion: text("descripcion"),
  activo: boolean("activo").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Administradores
export const administradores = pgTable("administradores", {
  id: uuid("id").primaryKey().defaultRandom(),
  nombre: varchar("nombre", { length: 200 }).notNull(),
  correo: varchar("correo", { length: 200 }).notNull().unique(),
  rol: rolAdminEnum("rol").notNull(),
  passwordHash: text("password_hash").notNull(),
  activo: boolean("activo").default(true).notNull(),
  ultimoAcceso: timestamp("ultimo_acceso"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Asistencia
export const asistencia = pgTable("asistencia", {
  id: uuid("id").primaryKey().defaultRandom(),
  idTicket: uuid("id_ticket").references(() => tickets.id).notNull(),
  tipoRegistro: tipoRegistroEnum("tipo_registro").notNull(),
  fechaHora: timestamp("fecha_hora").defaultNow().notNull(),
  escannadoPor: uuid("escaneado_por").references(() => administradores.id),
  ubicacion: varchar("ubicacion", { length: 200 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Asistencia Resumen
export const asistenciaResumen = pgTable("asistencia_resumen", {
  id: uuid("id").primaryKey().defaultRandom(),
  idTicket: uuid("id_ticket").references(() => tickets.id).unique().notNull(),
  dia1Entrada: timestamp("dia_1_entrada"),
  dia1Salida: timestamp("dia_1_salida"),
  dia2Entrada: timestamp("dia_2_entrada"),
  dia2Salida: timestamp("dia_2_salida"),
  cumpleCertificacion: boolean("cumple_certificacion").default(false).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Certificados
export const certificados = pgTable("certificados", {
  id: uuid("id").primaryKey().defaultRandom(),
  idTicket: uuid("id_ticket").references(() => tickets.id).unique().notNull(),
  idUsuario: uuid("id_usuario").references(() => usuarios.id).notNull(),
  tipoCertificado: tipoCertificadoEnum("tipo_certificado").notNull(),
  fechaEmision: timestamp("fecha_emision").defaultNow().notNull(),
  archivoUrl: text("archivo_url").notNull(),
  estado: estadoCertificadoEnum("estado").default("Generado").notNull(),
  fechaEnvio: timestamp("fecha_envio"),
  codigoVerificacion: varchar("codigo_verificacion", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
