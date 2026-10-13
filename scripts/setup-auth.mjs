import { mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import Database from "better-sqlite3";
import { getMigrations } from "better-auth/db/migration";
if (existsSync(".env.local")) process.loadEnvFile(".env.local");
const directory = process.env.HIDEKI_DATA_DIR || join(process.cwd(), ".local");
mkdirSync(directory, { recursive: true });
const database = new Database(join(directory, "hideki.sqlite"));
database.pragma("journal_mode = WAL");
const migrations = await getMigrations({
  database,
  rateLimit: { enabled: true, storage: "database" },
});
await migrations.runMigrations();
database.close();
console.log("Authentication database ready.");
