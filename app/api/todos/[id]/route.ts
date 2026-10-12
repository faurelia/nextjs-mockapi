import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { todosTable } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { updateTodoSchema } from "@/lib/validations/todo";
import { api } from "@/lib/api/handler";
import { Errors } from "@/lib/api/errors";

export const GET = api<{ id: string }, "optional">(
  async ({ params }) => {
    const { id } = params;

    const [todo] = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, +id))
      .limit(1);

    if (!todo) throw Errors.notFound("Todo");

    return NextResponse.json({ data: todo });
  },
  { auth: "optional" },
);
export const PATCH = api<{ id: string }>(async ({ req, params, user }) => {
  const { id } = params;
  const data = updateTodoSchema.parse(await req.json());

  const [todo] = await db
    .update(todosTable)
    .set(data)
    .where(and(eq(todosTable.id, +id), eq(todosTable.userId, user.id)))
    .returning();

  if (!todo) throw Errors.notFound("Todo");

  return NextResponse.json({ data: todo });
});

export const DELETE = api<{ id: string }>(async ({ params, user }) => {
  const { id } = params;

  const [todo] = await db
    .delete(todosTable)
    .where(and(eq(todosTable.id, +id), eq(todosTable.userId, user.id)))
    .returning();

  if (!todo) throw Errors.notFound("Todo");

  return new NextResponse(null, { status: 204 });
});
