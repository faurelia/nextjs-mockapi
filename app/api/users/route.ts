import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/handler";

export const GET = api(async () => {
  const users = await db.query.usersTable.findMany({
    columns: {
      id: true,
      name: true,
      image: true,
      email: true,
    },
  });

  return NextResponse.json({ data: users });
});
