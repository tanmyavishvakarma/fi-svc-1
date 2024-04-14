import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { db } from "../../../../db";
import { transactions, NewTransaction } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const data = db.select().from(transactions).all().toReversed();

  const expenses = data
    .filter((item) => item.isExpense)
    .map((item) => ({ x: new Date(item.date), y: item.amount }));

  const income = data
    .filter((item) => !item.isExpense)
    .map((item) => ({ x: new Date(item.date), y: item.amount }));

  const categories: { [key: string]: number } = {};

  data.forEach((expense) => {
    const { category, amount, isExpense } = expense;
    if (isExpense) {
      categories[category] = (categories[category] || 0) + Math.abs(amount);
    }
  });

  const names: string[] = Object.keys(categories);
  const quantities: number[] = Object.values(categories).map((value) =>
    Math.abs(value)
  );

  return NextResponse.json({ income, expenses, names, quantities });
}
