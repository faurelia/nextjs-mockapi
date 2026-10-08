import { db } from "@/lib/db";
import { booksTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { createBookSchema } from "@/lib/validations/book";
import { NextResponse } from "next/server";

export async function GET() {
  return apiHandler(async () => {
    const books = await db.query.booksTable.findMany({
      with: { author: true },
    });

    return NextResponse.json(books);
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const data = createBookSchema.parse(await request.json());

    const [book] = await db.insert(booksTable).values(data).returning();

    if (!book) {
      return NextResponse.json(
        { error: "Unable to create book" },
        { status: 400 },
      );
    }

    return NextResponse.json(book, { status: 201 });
  });
}
