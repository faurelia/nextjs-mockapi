import { db } from "@/lib/db";
import { postsTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { updatePostSchema } from "@/lib/validations/post";
import { paramsProps } from "@/types/params";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const post = await db.query.postsTable.findFirst({
      with: { user: true },
      where: { id: +id },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  });
}

export async function PATCH(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const data = updatePostSchema.parse(await request.json());

    const [post] = await db
      .update(postsTable)
      .set(data)
      .where(eq(postsTable.id, +id))
      .returning();

    return NextResponse.json(post);
  });
}

export async function DELETE(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const [post] = await db
      .delete(postsTable)
      .where(eq(postsTable.id, +id))
      .returning();

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  });
}
