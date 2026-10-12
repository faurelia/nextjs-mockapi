import { db } from "@/lib/db";
import { productsTable } from "@/lib/db/schema";
import { updateProductSchema } from "@/lib/validations/product";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { api } from "@/lib/api/handler";
import { Errors } from "@/lib/api/errors";

export const GET = api<{ id: string }, "optional">(
  async ({ params }) => {
    const { id } = params;

    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, +id))
      .limit(1);

    if (!product) throw Errors.notFound("Product");

    return NextResponse.json({ data: product });
  },
  { auth: "optional" },
);

export const PATCH = api<{ id: string }>(async ({ req, params }) => {
  const { id } = params;
  const data = updateProductSchema.parse(await req.json());

  const [product] = await db
    .update(productsTable)
    .set(data)
    .where(eq(productsTable.id, +id))
    .returning();

  if (!product) throw Errors.notFound("Product");

  return NextResponse.json({ data: product });
});

export const DELETE = api<{ id: string }>(async ({ params }) => {
  const { id } = params;

  const [product] = await db
    .delete(productsTable)
    .where(eq(productsTable.id, +id))
    .returning();

  if (!product) throw Errors.notFound("Product");

  return new NextResponse(null, { status: 204 });
});
