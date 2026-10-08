import { pgTable } from "drizzle-orm/pg-core";

export const authorsTable = pgTable("authors", (table) => ({
  id: table.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: table.varchar({ length: 255 }).notNull(),
}));
