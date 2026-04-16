import { z } from "zod";

export const parteSchema = z.object({
  fecha: z.string().optional(),
  descripcion: z.string().min(10, "Describe mejor los trabajos realizados"),
  horas: z.number().min(1, "Minimo 1 hora").max(24, "Maximo 24 horas"),
  estado: z.enum(["NORMAL", "RETRASADO", "INCIDENTE", "FINALIZADO"]).default("NORMAL"),
  obraId: z.string(),
});

export type ParteFormInput = z.input<typeof parteSchema>;
export type ParteFormData = z.output<typeof parteSchema>;
