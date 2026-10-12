import { db } from "@/lib/db";
import { authorsTable } from "@/lib/db/schema";
import { createAuthorSchema } from "@/lib/validations/author";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/handler";
import { AppError } from "@/lib/api/errors";

export const GET = api(
  async () => {
    const data = await db.query.authorsTable.findMany();

    return NextResponse.json({ data });
  },
  { auth: "none" },
);

export const POST = api(async ({ req }) => {
  const data = createAuthorSchema.parse(await req.json());

  const [author] = await db.insert(authorsTable).values(data).returning();

  if (!author) {
    throw new AppError(500, "AUTHOR_CREATE_FAILED", "Failed to create author");
  }

  return NextResponse.json({ data: author }, { status: 201 });
});
