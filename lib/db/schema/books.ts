import { pgTable } from "drizzle-orm/pg-core";
import { authorsTable } from "./authors";

export const booksTable = pgTable("books", (table) => ({
  id: table.integer().primaryKey().generatedAlwaysAsIdentity(),
  title: table.varchar({ length: 255 }).notNull(),
  description: table.text().notNull(),
  authorId: table
    .integer()
    .notNull()
    .references(() => authorsTable.id, { onDelete: "cascade" }),
}));
