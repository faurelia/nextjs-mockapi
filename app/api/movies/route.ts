import { db } from "@/lib/db";
import { moviesTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { createMovieSchema } from "@/lib/validations/movie";
import { NextResponse } from "next/server";

export async function GET() {
  return apiHandler(async () => {
    const movies = await db.select().from(moviesTable);

    return NextResponse.json(movies);
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const data = createMovieSchema.parse(await request.json());

    const [movie] = await db.insert(moviesTable).values(data).returning();

    if (!movie) {
      return NextResponse.json(
        { error: "Unable to create movie" },
        { status: 400 },
      );
    }

    return NextResponse.json(movie, { status: 201 });
  });
}
