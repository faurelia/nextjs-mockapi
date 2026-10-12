import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { authorsTable } from "@/lib/db/schema";
import { createAuthorSchema } from "@/lib/validations/author";
import { api } from "@/lib/api/handler";
import { Errors } from "@/lib/api/errors";

export const GET = api<{ id: string }, "optional">(
  async ({ params }) => {
    const { id } = params;

    const author = await db.query.authorsTable.findFirst({
      where: { id: +id },
    });

    if (!author) throw Errors.notFound("Author");

    return NextResponse.json({ data: author });
  },
  {
    auth: "optional",
  },
);

export const PATCH = api<{ id: string }>(async ({ req, params }) => {
  const { id } = params;
  const data = createAuthorSchema.parse(await req.json());

  const [author] = await db
    .update(authorsTable)
    .set(data)
    .where(eq(authorsTable.id, +id))
    .returning();

  if (!author) throw Errors.notFound("Author");

  return NextResponse.json({ data: author });
});

export const DELETE = api<{ id: string }>(async ({ params }) => {
  const { id } = params;

  const [author] = await db
    .delete(authorsTable)
    .where(eq(authorsTable.id, +id))
    .returning();

  if (!author) throw Errors.notFound("Author");

  return new NextResponse(null, { status: 204 });
});
