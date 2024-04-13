import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./db/*",
  out: "./drizzle",
  driver: 'better-sqlite',
  dbCredentials: {
    url: './collection.db', // 👈 this could also be a path to the local sqlite file
  }
} satisfies Config;