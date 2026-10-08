import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

loadEnvConfig(process.cwd());

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./lib/db/schema/index.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
