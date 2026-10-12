import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { todosTable } from "@/lib/db/schema";
import { createTodoSchema } from "@/lib/validations/todo";
import { api } from "@/lib/api/handler";
import { AppError } from "@/lib/api/errors";
import { eq } from "drizzle-orm";

export const GET = api(async ({ user }) => {
  const todos = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.userId, user.id));
  return NextResponse.json({ data: todos });
});

export const POST = api(async ({ req, user }) => {
  const data = createTodoSchema.parse(await req.json());

  const [todo] = await db
    .insert(todosTable)
    .values({
      ...data,
      userId: user.id,
    })
    .returning();

  if (!todo)
    throw new AppError(500, "TODO_CREATE_FAILED", "Failed to create todo");

  return NextResponse.json({ data: todo }, { status: 201 });
});
