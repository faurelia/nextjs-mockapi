import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { todosTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { paramsProps } from "@/types/params";
import { apiHandler } from "@/lib/utils/api-handler";
import { updateTodoSchema } from "@/lib/validations/todo";

export async function GET(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const [todo] = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, +id))
      .limit(1);

    if (!todo)
      return NextResponse.json(
        { error: `Todo not found: ${id}` },
        { status: 404 },
      );

    return NextResponse.json(todo);
  });
}

export async function PATCH(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;
    const data = updateTodoSchema.parse(await request.json());

    const [todo] = await db
      .update(todosTable)
      .set(data)
      .where(eq(todosTable.id, +id))
      .returning();

    if (!todo)
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });

    return NextResponse.json(todo);
  });
}

export async function DELETE(_request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const [todo] = await db
      .delete(todosTable)
      .where(eq(todosTable.id, +id))
      .returning();

    if (!todo)
      return NextResponse.json(
        { error: `Failed to delete todo ${id}` },
        { status: 400 },
      );

    return new NextResponse(null, { status: 204 });
  });
}
