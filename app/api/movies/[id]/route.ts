import { db } from "@/lib/db";
import { moviesTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { updateMovieSchema } from "@/lib/validations/movie";
import { paramsProps } from "@/types/params";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const [movie] = await db
      .select()
      .from(moviesTable)
      .where(eq(moviesTable.id, +id));

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  });
}

export async function PATCH(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;
    const data = updateMovieSchema.parse(await request.json());

    const [movie] = await db
      .update(moviesTable)
      .set(data)
      .where(eq(moviesTable.id, +id))
      .returning();

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  });
}

export async function DELETE(_request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const [movie] = await db
      .delete(moviesTable)
      .where(eq(moviesTable.id, +id))
      .returning();

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  });
}
