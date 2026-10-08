import { pgTable } from "drizzle-orm/pg-core";

export const moviesTable = pgTable("movies", (table) => ({
  id: table.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: table.varchar().notNull(),
  year: table.integer().notNull(),
}));
