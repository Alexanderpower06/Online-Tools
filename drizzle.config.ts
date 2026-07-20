import { defineConfig } from "drizzle-kit";

// Drizzle Kit is a CLI companion for Drizzle ORM — it generates SQL migration files.
export default defineConfig({
  out: "./drizzle",       // folder where generated migration SQL files are written
  schema: "./db/schema.ts", // TypeScript file that describes your database tables
  dialect: "sqlite",     // Cloudflare D1 uses SQLite under the hood
});
