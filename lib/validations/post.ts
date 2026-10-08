import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is too short")
    .max(255, "Title is too long"),
  body: z.string().trim().min(1, "Body is too short"),
  userId: z.number().int().positive(),
});

export const updatePostSchema = createPostSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required",
    path: ["_errors"],
  });
