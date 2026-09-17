import { z } from "zod";

/**
 * Enum estatico provisional de nichos (SDD 4/3c).
 * WP3b lo sustituira por import del manifiesto generado.
 */
export const NICHOS_PROVISIONAL = [
  "Odontologia",
  "Gimnasios",
  "Fisioterapia",
  "Peluqueria",
  "Veterinaria",
  "Agro-Vet",
  "Hoteles",
  "Bicicleterias",
] as const;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "fullName requerido (min 2)"),
  workEmail: z
    .string()
    .trim()
    .email("workEmail invalido")
    .refine((e) => e.includes("."), "workEmail debe tener dominio con punto"),
  company: z.string().trim().min(2, "company requerido (min 2)"),
  infrastructureType: z
    .enum(["public_cloud", "hybrid", "on_prem"])
    .optional()
    .default("public_cloud"),
  workload: z.string().optional(),
  complianceNeeds: z.string().optional(),
  score: z.number().optional(), // ignorado server-side (SC-1) — solo presentacional
  nichoInteres: z.enum(NICHOS_PROVISIONAL).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
