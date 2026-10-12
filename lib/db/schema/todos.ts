import { pgTable } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const todosTable = pgTable("todos", (table) => ({
  id: table.integer().primaryKey().generatedAlwaysAsIdentity(),
  text: table.text().notNull(),
  completed: table.boolean().notNull().default(false),
  userId: table
    .text()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
}));
