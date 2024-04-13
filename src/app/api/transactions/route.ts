import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { db } from "../../../../db";
import { transactions, NewTransaction } from "../../../../db/schema";

export async function GET() {
    return NextResponse.json({ a: "b" })
}

export async function POST(req: NextRequest) {
    const data = await req.json()

    try {
        const newPost = {
            date: data.date,
            description: data.text,
            amount: data.amount,
            category: data.category,
            isExpense: data.isExpense
        };

        await db.insert(transactions).values(newPost);

        return NextResponse.json({ success: true, data: newPost });
    } catch (error) {
        console.error('Error inserting data:', error);
        return NextResponse.error();
    }
}