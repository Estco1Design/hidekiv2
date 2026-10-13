import "server-only";
import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { mailConfigured, sendAccountEmail } from "./mail";

const directory = process.env.HIDEKI_DATA_DIR || join(process.cwd(), ".local");
mkdirSync(directory, { recursive: true });
export const database = new Database(join(directory, "hideki.sqlite"));
database.pragma("journal_mode = WAL");
database.pragma("foreign_keys = ON");
export const auth = betterAuth({
  appName: "HIDEKI",
  database,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    ...(mailConfigured
      ? {
          sendResetPassword: async ({
            user,
            url,
          }: {
            user: { email: string };
            url: string;
          }) => {
            await sendAccountEmail(user.email, url, "reset");
          },
        }
      : {}),
  },
  ...(mailConfigured
    ? {
        emailVerification: {
          sendOnSignUp: true,
          sendVerificationEmail: async ({
            user,
            url,
          }: {
            user: { email: string };
            url: string;
          }) => {
            await sendAccountEmail(user.email, url, "verify");
          },
        },
      }
    : {}),
  rateLimit: { enabled: true, window: 60, max: 20, storage: "database" },
  session: { expiresIn: 60 * 60 * 24 * 7 },
});
