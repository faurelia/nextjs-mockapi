import { pgTable } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const postsTable = pgTable("posts", (table) => ({
  id: table.integer().primaryKey().generatedAlwaysAsIdentity(),
  title: table.varchar({ length: 255 }).notNull(),
  body: table.text().notNull(),
  userId: table
    .integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
}));
