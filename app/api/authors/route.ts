import { db } from "@/lib/db";
import { authorsTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { createAuthorSchema } from "@/lib/validations/author";
import { NextResponse } from "next/server";

export async function GET() {
  return apiHandler(async () => {
    const authors = await db.query.authorsTable.findMany({
      with: { books: true },
    });

    return NextResponse.json(authors);
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const data = createAuthorSchema.parse(await request.json());

    const [author] = await db.insert(authorsTable).values(data).returning();

    if (!author) {
      return NextResponse.json(
        { error: "Failed to add author" },
        { status: 400 },
      );
    }

    return NextResponse.json(author, { status: 201 });
  });
}
