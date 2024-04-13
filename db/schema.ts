import { sql } from "drizzle-orm";
import { integer, text, sqliteTable, real } from "drizzle-orm/sqlite-core";

export const transactions = sqliteTable("Transactions",{
  id:integer("id").primaryKey({autoIncrement:true}),
  date:text("date").notNull(),
  isExpense:integer("is_expense",{mode:"boolean"}), 
  amount:real("amount").notNull(),
  category:text("category").notNull(),
  description:text("description"),
  createdAt:text("created_at").default(sql`CURRENT_DATE`)   
})

export type NewTransaction = typeof transactions.$inferInsert;