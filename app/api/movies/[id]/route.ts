import { db } from "@/lib/db";
import { moviesTable } from "@/lib/db/schema";
import { updateMovieSchema } from "@/lib/validations/movie";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/handler";
import { Errors } from "@/lib/api/errors";

export const GET = api<{ id: string }, "optional">(
  async ({ params }) => {
    const { id } = params;

    const [movie] = await db
      .select()
      .from(moviesTable)
      .where(eq(moviesTable.id, +id));

    if (!movie) throw Errors.notFound("Movie");

    return NextResponse.json({ data: movie });
  },
  { auth: "optional" },
);

export const PATCH = api<{ id: string }>(async ({ req, params }) => {
  const { id } = params;
  const data = updateMovieSchema.parse(await req.json());

  const [movie] = await db
    .update(moviesTable)
    .set(data)
    .where(eq(moviesTable.id, +id))
    .returning();

  if (!movie) throw Errors.notFound("Movie");

  return NextResponse.json({ data: movie });
});

export const DELETE = api<{ id: string }>(async ({ params }) => {
  const { id } = params;

  const [movie] = await db
    .delete(moviesTable)
    .where(eq(moviesTable.id, +id))
    .returning();

  if (!movie) throw Errors.notFound("Movie");

  return new NextResponse(null, { status: 204 });
});
