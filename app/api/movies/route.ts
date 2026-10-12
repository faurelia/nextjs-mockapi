import { db } from "@/lib/db";
import { moviesTable } from "@/lib/db/schema";
import { createMovieSchema } from "@/lib/validations/movie";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/handler";
import { AppError } from "@/lib/api/errors";

export const GET = api(
  async () => {
    const data = await db.select().from(moviesTable);

    return NextResponse.json({ data });
  },
  { auth: "none" },
);

export const POST = api(async ({ req }) => {
  const data = createMovieSchema.parse(await req.json());

  const [movie] = await db.insert(moviesTable).values(data).returning();

  if (!movie)
    throw new AppError(500, "MOVIE_CREATE_FAILED", "Failed to create movie");

  return NextResponse.json({ data: movie }, { status: 201 });
});
