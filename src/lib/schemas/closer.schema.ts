import { z } from "zod";

export const closerSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(8000),
      })
    )
    .min(1, "messages requerido (min 1)")
    .max(40, "historial demasiado largo"),
  stream: z.boolean().optional(),
});

export type CloserInput = z.infer<typeof closerSchema>;
