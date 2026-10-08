import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().min(1, "name is too short"),
});
