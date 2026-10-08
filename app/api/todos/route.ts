import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { todosTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { createTodoSchema } from "@/lib/validations/todo";

export async function GET() {
  return apiHandler(async () => {
    const todos = await db.select().from(todosTable);

    return NextResponse.json(todos);
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const data = createTodoSchema.parse(await request.json());

    const [todo] = await db.insert(todosTable).values(data).returning();

    if (!todo) {
      return NextResponse.json("Failed to add todo", { status: 400 });
    }

    return NextResponse.json(todo, { status: 201 });
  });
}
