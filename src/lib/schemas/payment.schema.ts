import { z } from "zod";

export const paymentSchema = z.discriminatedUnion("method", [
  z.object({
    method: z.literal("card"),
    brand_hint: z.string().max(40),
    last4: z.string().regex(/^\d{4}$/, "last4 = 4 digitos"),
    exp: z.string().regex(/^\d{2}\/\d{2}$/, "exp MM/YY"),
    holder_len: z.number().int().min(2).max(120),
  }),
  z.object({
    method: z.literal("pse"),
    person_type: z.enum(["natural", "juridica"]),
    bank: z.string().max(80),
    doc_type: z.enum(["CC", "CE", "NIT", "PP"]),
    doc_last: z.string().regex(/^\d{2,6}$/, "doc_last: 2-6 digitos"),
    email_domain: z.string().max(120),
  }),
]);

export type PaymentInput = z.infer<typeof paymentSchema>;
