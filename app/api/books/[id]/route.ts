import { db } from "@/lib/db";
import { booksTable } from "@/lib/db/schema";
import { updateBookSchema } from "@/lib/validations/book";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/handler";
import { Errors } from "@/lib/api/errors";

export const GET = api<{ id: string }, "optional">(
  async ({ params }) => {
    const { id } = params;

    const book = await db.query.booksTable.findFirst({
      with: { author: true },
      where: { id: +id },
    });

    if (!book) throw Errors.notFound("Book");

    return NextResponse.json({ data: book });
  },
  { auth: "optional" },
);

export const PATCH = api<{ id: string }>(async ({ req, params }) => {
  const { id } = params;
  const data = updateBookSchema.parse(await req.json());

  const [book] = await db
    .update(booksTable)
    .set(data)
    .where(eq(booksTable.id, +id))
    .returning();

  if (!book) throw Errors.notFound("Book");

  return NextResponse.json({ data: book });
});

export const DELETE = api<{ id: string }>(async ({ params }) => {
  const { id } = params;

  const [book] = await db
    .delete(booksTable)
    .where(eq(booksTable.id, +id))
    .returning();

  if (!book) throw Errors.notFound("Book");

  return new NextResponse(null, { status: 204 });
});
