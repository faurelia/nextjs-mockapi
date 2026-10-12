import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/handler";

export const GET = api<{ id: string }, "none">(
  async ({ params }) => {
    const { id } = params;

    const data = await db.query.authorsTable.findFirst({
      with: {
        books: {
          columns: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
      where: {
        id: +id,
      },
    });

    return NextResponse.json({ data });
  },
  { auth: "none" },
);
