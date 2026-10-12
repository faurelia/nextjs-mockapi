import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { updatePostSchema } from "@/lib/validations/post";
import { db } from "@/lib/db";
import { postsTable } from "@/lib/db/schema";
import { api } from "@/lib/api/handler";
import { Errors } from "@/lib/api/errors";

export const GET = api<{ id: string }, "optional">(
  async ({ params }) => {
    const { id } = params;

    const post = await db.query.postsTable.findFirst({
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      where: { id: +id },
    });

    if (!post) throw Errors.notFound("Post");

    return NextResponse.json({ data: post });
  },
  { auth: "optional" },
);

export const PATCH = api<{ id: string }>(async ({ req, params, user }) => {
  const { id } = params;

  const data = updatePostSchema.parse(await req.json());

  const [post] = await db
    .update(postsTable)
    .set(data)
    .where(and(eq(postsTable.id, +id), eq(postsTable.userId, user.id)))
    .returning();

  if (!post) throw Errors.notFound("Post");

  return NextResponse.json({ data: post });
});

export const DELETE = api<{ id: string }>(async ({ params, user }) => {
  const { id } = params;

  const [post] = await db
    .delete(postsTable)
    .where(and(eq(postsTable.id, +id), eq(postsTable.userId, user.id)))
    .returning();

  if (!post) throw Errors.notFound("Post");

  return new NextResponse(null, { status: 204 });
});
