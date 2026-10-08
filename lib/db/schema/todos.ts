import { pgTable } from "drizzle-orm/pg-core";

export const todosTable = pgTable("todos", (table) => ({
  id: table.integer().primaryKey().generatedAlwaysAsIdentity(),
  text: table.text().notNull(),
  completed: table.boolean().notNull().default(false),
}));
