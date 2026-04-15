import { z } from 'zod';

export const obraSchema = z.object({
    nombre: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(50, "El nombre es demasiado Largo"),
    cliente: z
        .string()
        .min(2, "El nombre del cliente es obligatorio"),
    direccion: z
        .string()
        .min(5, "Ingresa una dirección especifica"),
    fechaInicio: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Fecha de inicio Inválida"),
    fechaFin: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), "Fecha de inicio Inválida"),
}).refine((data) => {
    const inicio = new Date(data.fechaInicio);
    const fin = new Date(data.fechaFin);
    return fin >= inicio;
}, {
    message: "La fecha de fin no puede ser anterior a la de inicio",
    path: ["fechaFin"],
});

export type ObraFormData = z.infer<typeof obraSchema>