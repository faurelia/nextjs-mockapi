import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1, "title is too short").max(255, "title is too long"),
  description: z.string().min(1, "description is too short"),
  authorId: z.number().int().positive(),
});

export const updateBookSchema = createBookSchema.partial();
