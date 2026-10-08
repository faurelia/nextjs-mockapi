import { db } from "@/lib/db";
import { authorsTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { createAuthorSchema } from "@/lib/validations/author";
import { paramsProps } from "@/types/params";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const author = await db.query.authorsTable.findFirst({
      with: { books: true },
      where: { id: +id },
    });

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json(author);
  });
}

export async function PATCH(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;
    const data = createAuthorSchema.parse(await request.json());

    const [author] = await db
      .update(authorsTable)
      .set(data)
      .where(eq(authorsTable.id, +id))
      .returning();

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return NextResponse.json(author);
  });
}

export async function DELETE(_request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const [author] = await db
      .delete(authorsTable)
      .where(eq(authorsTable.id, +id))
      .returning();

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  });
}
