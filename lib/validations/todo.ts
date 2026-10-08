import { z } from "zod";

export const createTodoSchema = z.object({
  text: z.string().trim().min(1, "Text is too short"),
  completed: z.boolean().optional(),
});

export const updateTodoSchema = createTodoSchema.partial();
