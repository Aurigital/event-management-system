CREATE TYPE "public"."estado_certificado" AS ENUM('Generado', 'Enviado', 'Error');--> statement-breakpoint
CREATE TYPE "public"."estado_compra" AS ENUM('Iniciado', 'Completado', 'Abandonado', 'Cancelado');--> statement-breakpoint
CREATE TYPE "public"."estado_pago" AS ENUM('Pendiente', 'Pagado', 'Fallido', 'Reembolsado');--> statement-breakpoint
CREATE TYPE "public"."estado_ticket" AS ENUM('Activo', 'Usado', 'Cancelado', 'Reembolsado');--> statement-breakpoint
CREATE TYPE "public"."genero" AS ENUM('Masculino', 'Femenino', 'Otro');--> statement-breakpoint
CREATE TYPE "public"."metodo_pago" AS ENUM('OnvoPayments', 'Datafono');--> statement-breakpoint
CREATE TYPE "public"."modalidad_ticket" AS ENUM('Dia1', 'Dia2', 'Completo');--> statement-breakpoint
CREATE TYPE "public"."moneda" AS ENUM('USD', 'CRC');--> statement-breakpoint
CREATE TYPE "public"."nivel_patrocinador" AS ENUM('Diamante', 'Oro', 'Plata', 'Bronce');--> statement-breakpoint
CREATE TYPE "public"."rol_admin" AS ENUM('SuperAdmin', 'Admin', 'Staff', 'Scanner');--> statement-breakpoint
CREATE TYPE "public"."sector" AS ENUM('Publico', 'Privado');--> statement-breakpoint
CREATE TYPE "public"."tipo_certificado" AS ENUM('Participacion', 'Aprovechamiento');--> statement-breakpoint
CREATE TYPE "public"."tipo_descuento" AS ENUM('Porcentaje', 'MontoFijo');--> statement-breakpoint
CREATE TYPE "public"."tipo_registro" AS ENUM('Entrada_Evento', 'Salida_Evento');--> statement-breakpoint
CREATE TYPE "public"."tipo_ticket" AS ENUM('Pagado', 'Gratuito', 'Conferencista', 'Patrocinador');--> statement-breakpoint
CREATE TABLE "administradores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"correo" varchar(200) NOT NULL,
	"rol" "rol_admin" NOT NULL,
	"password_hash" text NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"ultimo_acceso" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "administradores_correo_unique" UNIQUE("correo")
);
--> statement-breakpoint
CREATE TABLE "asistencia" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_ticket" uuid NOT NULL,
	"tipo_registro" "tipo_registro" NOT NULL,
	"fecha_hora" timestamp DEFAULT now() NOT NULL,
	"escaneado_por" uuid,
	"ubicacion" varchar(200),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "asistencia_resumen" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_ticket" uuid NOT NULL,
	"dia_1_entrada" timestamp,
	"dia_1_salida" timestamp,
	"dia_2_entrada" timestamp,
	"dia_2_salida" timestamp,
	"cumple_certificacion" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "asistencia_resumen_id_ticket_unique" UNIQUE("id_ticket")
);
--> statement-breakpoint
CREATE TABLE "certificados" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_ticket" uuid NOT NULL,
	"id_usuario" uuid NOT NULL,
	"tipo_certificado" "tipo_certificado" NOT NULL,
	"fecha_emision" timestamp DEFAULT now() NOT NULL,
	"archivo_url" text NOT NULL,
	"estado" "estado_certificado" DEFAULT 'Generado' NOT NULL,
	"fecha_envio" timestamp,
	"codigo_verificacion" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "certificados_id_ticket_unique" UNIQUE("id_ticket"),
	CONSTRAINT "certificados_codigo_verificacion_unique" UNIQUE("codigo_verificacion")
);
--> statement-breakpoint
CREATE TABLE "charlas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"titulo" varchar(300) NOT NULL,
	"descripcion" text,
	"fecha" date NOT NULL,
	"hora_inicio" time NOT NULL,
	"hora_fin" time NOT NULL,
	"duracion_minutos" integer NOT NULL,
	"id_conferencista" uuid,
	"ubicacion" varchar(200),
	"cupo_maximo" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "compras" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"correo_comprador" varchar(200) NOT NULL,
	"cantidad_tickets" integer NOT NULL,
	"subtotal" numeric(10, 2) NOT NULL,
	"descuento_total" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"total" numeric(10, 2) NOT NULL,
	"id_cupon" uuid,
	"estado_compra" "estado_compra" DEFAULT 'Iniciado' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conferencistas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"biografia" text,
	"foto_url" text,
	"correo" varchar(200),
	"organizacion" varchar(200),
	"redes_sociales" jsonb,
	"orden_display" integer NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cupones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"codigo" varchar(50) NOT NULL,
	"tipo_descuento" "tipo_descuento" NOT NULL,
	"valor_descuento" numeric(10, 2) NOT NULL,
	"fecha_inicio" timestamp NOT NULL,
	"fecha_expiracion" timestamp NOT NULL,
	"usos_maximos" integer,
	"usos_actuales" integer DEFAULT 0 NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"descripcion" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cupones_codigo_unique" UNIQUE("codigo")
);
--> statement-breakpoint
CREATE TABLE "fases_precio" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre_fase" varchar(100) NOT NULL,
	"fecha_inicio" timestamp NOT NULL,
	"fecha_fin" timestamp NOT NULL,
	"precio_dia_individual" numeric(10, 2) NOT NULL,
	"precio_completo" numeric(10, 2) NOT NULL,
	"precio_fiesta" numeric(10, 2) NOT NULL,
	"descripcion" text,
	"activo" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pagos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_compra" uuid NOT NULL,
	"metodo_pago" "metodo_pago" NOT NULL,
	"moneda" "moneda" NOT NULL,
	"monto" numeric(10, 2) NOT NULL,
	"estado_pago" "estado_pago" DEFAULT 'Pendiente' NOT NULL,
	"fecha_pago" timestamp,
	"referencia_transaccion" varchar(200),
	"detalles_adicionales" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patrocinadores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"logo_url" text NOT NULL,
	"nivel" "nivel_patrocinador" NOT NULL,
	"orden_display" integer NOT NULL,
	"url_sitio_web" text,
	"descripcion" text,
	"activo" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_usuario" uuid NOT NULL,
	"id_compra" uuid NOT NULL,
	"tipo_ticket" "tipo_ticket" NOT NULL,
	"modalidad" "modalidad_ticket" NOT NULL,
	"incluye_fiesta" boolean DEFAULT false NOT NULL,
	"precio_pagado" numeric(10, 2) NOT NULL,
	"precio_original" numeric(10, 2) NOT NULL,
	"id_fase_precio" uuid,
	"estado_ticket" "estado_ticket" DEFAULT 'Activo' NOT NULL,
	"qr_code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tickets_qr_code_unique" UNIQUE("qr_code")
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"apellido" varchar(200) NOT NULL,
	"edad" integer NOT NULL,
	"genero" "genero" NOT NULL,
	"procedencia" varchar(200) NOT NULL,
	"profesion" varchar(200) NOT NULL,
	"sector" "sector" NOT NULL,
	"telefono" varchar(20) NOT NULL,
	"correo" varchar(200) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_correo_unique" UNIQUE("correo")
);
--> statement-breakpoint
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_id_ticket_tickets_id_fk" FOREIGN KEY ("id_ticket") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "asistencia" ADD CONSTRAINT "asistencia_escaneado_por_administradores_id_fk" FOREIGN KEY ("escaneado_por") REFERENCES "public"."administradores"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "asistencia_resumen" ADD CONSTRAINT "asistencia_resumen_id_ticket_tickets_id_fk" FOREIGN KEY ("id_ticket") REFERENCES "public"."tickets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_id_ticket_tickets_id_fk" FOREIGN KEY ("id_ticket") REFERENCES "public"."tickets"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_id_usuario_usuarios_id_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charlas" ADD CONSTRAINT "charlas_id_conferencista_conferencistas_id_fk" FOREIGN KEY ("id_conferencista") REFERENCES "public"."conferencistas"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "compras" ADD CONSTRAINT "compras_id_cupon_cupones_id_fk" FOREIGN KEY ("id_cupon") REFERENCES "public"."cupones"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pagos" ADD CONSTRAINT "pagos_id_compra_compras_id_fk" FOREIGN KEY ("id_compra") REFERENCES "public"."compras"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_id_usuario_usuarios_id_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuarios"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_id_compra_compras_id_fk" FOREIGN KEY ("id_compra") REFERENCES "public"."compras"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_id_fase_precio_fases_precio_id_fk" FOREIGN KEY ("id_fase_precio") REFERENCES "public"."fases_precio"("id") ON DELETE set null ON UPDATE no action;