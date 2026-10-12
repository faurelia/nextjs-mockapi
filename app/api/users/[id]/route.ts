import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { updateUserSchema } from "@/lib/validations/user";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/handler";
import { Errors } from "@/lib/api/errors";

export const GET = api<{ id: string }, "optional">(
  async ({ params }) => {
    const { id } = params;

    const [user] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        image: usersTable.image,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    if (!user) throw Errors.notFound("User");

    return NextResponse.json({ data: user });
  },
  { auth: "optional" },
);

export const PATCH = api<{ id: string }>(async ({ req, params }) => {
  const { id } = params;

  const data = updateUserSchema.parse(await req.json());

  const [user] = await db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, id))
    .returning({
      id: usersTable.id,
      name: usersTable.name,
      image: usersTable.image,
      email: usersTable.email,
    });

  if (!user) throw Errors.notFound("User");

  return NextResponse.json({ data: user });
});
