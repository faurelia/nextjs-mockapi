import { db } from "@/lib/db";
import { booksTable } from "@/lib/db/schema";
import { createBookSchema } from "@/lib/validations/book";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/handler";
import { AppError } from "@/lib/api/errors";

export const GET = api(
  async () => {
    const data = await db.query.booksTable.findMany({
      with: { author: true },
    });

    return NextResponse.json({ data });
  },
  { auth: "none" },
);

export const POST = api(async ({ req }) => {
  const data = createBookSchema.parse(await req.json());

  const [book] = await db.insert(booksTable).values(data).returning();

  if (!book)
    throw new AppError(500, "BOOK_CREATE_FAILED", "Failed to create book");

  return NextResponse.json({ data: book }, { status: 201 });
});
