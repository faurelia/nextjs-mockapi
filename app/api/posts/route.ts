import { db } from "@/lib/db";
import { postsTable } from "@/lib/db/schema";
import { createPostSchema } from "@/lib/validations/post";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/handler";
import { AppError } from "@/lib/api/errors";

export const GET = api(async ({ user }) => {
  const posts = await db.query.postsTable.findMany({
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    where: { userId: user.id },
  });

  return NextResponse.json({ data: posts });
});

export const POST = api(async ({ req, user }) => {
  const data = createPostSchema.parse(await req.json());

  const [post] = await db
    .insert(postsTable)
    .values({
      ...data,
      userId: user.id,
    })
    .returning();

  if (!post)
    throw new AppError(500, "POST_CREATE_FAILED", "Failed to create post");

  return NextResponse.json({ data: post }, { status: 201 });
});
