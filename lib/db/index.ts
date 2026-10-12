import { drizzle } from "drizzle-orm/neon-http";
import { relations } from "@/lib/db/schema/relations";
import { authRelations } from "./schema/auth";

export const db = drizzle(process.env.DATABASE_URL!, {
  relations: { ...relations, ...authRelations },
});
