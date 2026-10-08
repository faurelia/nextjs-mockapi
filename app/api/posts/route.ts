import { db } from "@/lib/db";
import { postsTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { createPostSchema } from "@/lib/validations/post";
import { NextResponse } from "next/server";

export async function GET() {
  return apiHandler(async () => {
    const posts = await db.query.postsTable.findMany({
      with: { user: true },
    });

    return NextResponse.json(posts);
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const data = createPostSchema.parse(await request.json());

    const [post] = await db.insert(postsTable).values(data).returning();

    if (!post)
      return NextResponse.json(
        { error: "Failed to add post" },
        { status: 400 },
      );

    return NextResponse.json(post, { status: 201 });
  });
}
