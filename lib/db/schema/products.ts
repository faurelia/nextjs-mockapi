import { pgTable } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", (table) => ({
  id: table.integer().primaryKey().generatedAlwaysAsIdentity(),
  name: table.varchar({ length: 255 }).notNull(),
  price: table.numeric({ precision: 100, scale: 2 }).notNull(),
}));
