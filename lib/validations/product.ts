import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(1, { error: "name is required" }),
  price: z.coerce
    .number({ error: "price is not a valid number" })
    .min(0)
    .max(999999)
    .transform((p) => p.toFixed(2)),
});

export const updateProductSchema = createProductSchema.partial();
