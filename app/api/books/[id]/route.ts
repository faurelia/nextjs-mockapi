import { db } from "@/lib/db";
import { booksTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { updateBookSchema } from "@/lib/validations/book";
import { paramsProps } from "@/types/params";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const book = await db.query.booksTable.findFirst({
      with: { author: true },
      where: { id: +id },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  });
}

export async function PATCH(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;
    const data = updateBookSchema.parse(await request.json());

    const [book] = await db
      .update(booksTable)
      .set(data)
      .where(eq(booksTable.id, +id))
      .returning();

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  });
}

export async function DELETE(_request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const [book] = await db
      .delete(booksTable)
      .where(eq(booksTable.id, +id))
      .returning();

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  });
}
