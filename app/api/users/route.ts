import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { apiHandler } from "@/lib/utils/api-handler";
import { createUserSchema } from "@/lib/validations/user";
import { NextResponse } from "next/server";

export async function GET() {
  return apiHandler(async () => {
    const users = await db.select().from(usersTable);

    return NextResponse.json(users);
  });
}

export async function POST(request: Request) {
  return apiHandler(async () => {
    const data = createUserSchema.parse(await request.json());

    const [user] = await db.insert(usersTable).values(data).returning();

    if (!user) {
      return NextResponse.json(
        { error: "Unable to add user" },
        { status: 400 },
      );
    }

    return NextResponse.json(user, { status: 201 });
  });
}
