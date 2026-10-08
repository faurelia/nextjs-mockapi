import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { updateUserSchema } from "@/lib/validations/user";
import { paramsProps } from "@/types/params";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, +id))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  });
}

export async function PATCH(request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const data = updateUserSchema.parse(await request.json());

    const [user] = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, +id))
      .returning();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  });
}

export async function DELETE(_request: Request, { params }: paramsProps) {
  return apiHandler(async () => {
    const { id } = await params;

    const [user] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, +id))
      .returning();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  });
}
