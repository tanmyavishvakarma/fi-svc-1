import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { db } from "../../../../db";
import { transactions, NewTransaction } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    const data = db.select().from(transactions).all().toReversed();

    const newDataArray = data.map(item => {
        const { description, ...rest } = item;
        return { ...rest, text: description };
    });

    return NextResponse.json(newDataArray);
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

export async function DELETE(req: NextRequest) {
    console.log("heresss")
    try {
        const { searchParams } = new URL(req.url);
        const paramid = searchParams.get("id") || "-1";
        await db.delete(transactions).where(eq(transactions.id, parseInt(paramid))).run();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting data:', error);
        return NextResponse.error();
    }
}