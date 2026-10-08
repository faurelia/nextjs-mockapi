import { z } from "zod";

export const createMovieSchema = z.object({
  name: z.string({ error: "name is required" }).min(1),
  year: z.coerce
    .number({ error: "year must be a valid number" })
    .gte(1000)
    .lte(9999),
});

export const updateMovieSchema = createMovieSchema.partial();
